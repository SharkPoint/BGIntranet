const colors = ['#00AA55', '#009FD4', '#B381B3', '#ff0000', '#E3BC00', '#D47500', '#DC2A2A'];
var calendar

document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');

    calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            // right: 'dayGridMonth'
        },
        buttonText: {
            today: 'Today'
        },
        initialDate: new Date,
        navLinks: false, // can click day/week names to navigate views
        selectable: true,
        selectMirror: false,
        editable: false,
        aspectRatio: 1.5,
        select: function (arg) {
            // calendar.unselect()
            vm_reservations.dateChange(arg.start, arg.end)
            // calendar.select()
        },
        eventClick: function (arg) {
            if (confirm('Are you sure you want to delete this event?')) {
                arg.event.remove()
            }
        },
        editable: true,
        dayMaxEvents: true, // allow "more" link when too many events
        events: [{}]
    });


    calendar.render();
    calendar.updateSize()

});


$(document).ready(function () {

    // Location Select
    $(".mdb-select").materialSelect();
    $('.selected-office').click(e => e.stopPropagation());
    $('#locationSelect option[value="' + vm_reservations.selectedOfficeId + '"]').attr("selected", true);
    $('#locationSelect').change((event) => {
        vm_reservations.locationChanged(event.currentTarget.selectedOptions[0].text)
    })

    // $('.fc-prev-button span').click(function(){
    //     vm_reservations.refreshReservations();
    //  });

    //  $('.fc-next-button span').click(function(){
    //     vm_reservations.refreshReservations();
    //  });

    $('.fc-button').click(function () {
        vm_reservations.refreshReservations();
    });

    document.addEventListener("contextmenu", function (e) {
        e.preventDefault();
    }, false);

    //  Set up refresh of reservations every 30 secs
    setInterval(function () {
        vm_reservations.startSpinnyThing()
        vm_reservations.refreshReservations();
    }, 30000);

    $("[data-toggle='tooltip']").tooltip();

});

document.onreadystatechange = function () {
    if (document.readyState === 'complete') {

        $(".loadingSpinner").fadeOut(50);
    }
}

vm_reservations = new Vue({

    el: '.gridContainer',
    data: {
        reservations: [],
        events: [],
        allReservations: [],
        SelectedDatesReservations: [],
        myReservations: [],
        userDefaultOffice: null,
        userEmail: null,
        defaultOfficeId: 0,
        selectedDate: moment().format('DD-MM-YY'),
        currentUserName: null,
        selectedOffice: null,
        selectedOfficeId: 0,
        selectedOfficeCapacity: 0,
        selectedOfficeCurrent: 0,
        selectedOfficeAtCapacity: false,
        reservationSiteURL: "https://corporatedocument.sharepoint.com/sites/GroupOfficeReservations",
        reservationList: "Office Reservations",
        locationList: "Location Details",
        debugMode: true,
        dateRangeSelected: false,
        requestReportBtnText: null,
        notifyAtCapacityEmail: null
    },

    created: function () {
        this.initialise()
    },

    methods: {

        testClick: function () {
            console.log("Clicked");
        },

        indicateMyReservations: function () {

            var vm = this;
            var niceDate;

            $('[data-toggle="tooltip"]').tooltip('dispose');
            $('.numberCircle').removeAttr("data-toggle");
            $('.numberCircle').removeAttr("data-placement");
            $('.numberCircle').removeAttr("reslocation");
            $('.numberCircle').removeAttr("resdate");
            $('.numberCircle').removeAttr("title");

            $('.numberCircle').addClass('fc-daygrid-day-number')
            $('.numberCircle').removeClass('numberCircle')

            vm.myReservations.forEach(element => {

                elemDate = moment(element.date, 'DD-MM-YY').format('YYYY-MM-DD')
                niceDate = moment(elemDate, 'YYYY-MM-DD').format("dddd, MMMM Do YYYY")

                var elem = $('[data-date="' + elemDate + '"]').find('.fc-daygrid-day-number')

                elem.addClass('numberCircle');
                elem.removeClass('fc-daygrid-day-number')
                elem.attr('data-toggle', 'tooltip')
                elem.attr('data-placement', 'auto')
                elem.attr('reslocation', element.office)
                elem.attr('resdate', element.date)
                elem.attr('title', 'Reservation in ' + element.office + ' on\n' + niceDate)
            });

            //Right click of number circle takes user to the booking date and location
            $('.numberCircle').unbind();
            $('.numberCircle').mousedown(function (e) {
                // console.log("Right Click")
                // console.log(e.currentTarget.attributes[4].value)
                if (e.which == 3) {

                    vm.selectedDate = e.currentTarget.attributes[5].value;
                    vm.selectedOffice = e.currentTarget.attributes[4].value

                    var today = moment(vm.selectedDate, 'DD-MM-YY').format('YYYY-MM-DD')
                    var tomorrow = moment(vm.selectedDate, 'DD-MM-YY').add(1, 'd').format('YYYY-MM-DD')

                    //Set the selection in the calendar to the selected date from the right click
                    vm.rightClickChange(vm.selectedOffice)
                    calendar.select(today, tomorrow)
                }
            })

            //Set Report Request Button Text
            niceDate = moment(vm.selectedDate, 'DD-MM-YY').format("ddd, MMMM Do YYYY")
            vm.requestReportBtnText = "Request Reservations for " + vm.selectedOffice + " - " + niceDate

            vm.$nextTick(function () {
                $("[data-toggle='tooltip']").tooltip();
            })
        },

        checkDeletionRequired: function () {

            if ($('.myRes-checkbox:checkbox:checked').length > 0) {

                var vm = this;

                Swal.fire({
                    title: 'Are you sure you want to delete the selected reservations?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete them!'
                }).then((result) => {
                    if (result.value) {
                        vm.deleteCheckedReservations()
                    }
                })
            }
        },

        requestListOfUsers: function () {

            var vm = this;

            var niceDate = moment(vm.selectedDate, 'DD-MM-YY').format("dddd, MMMM Do YYYY")
            var spDate = moment(vm.selectedDate, 'DD-MM-YY').format('YYYY-MM-DD')

            Swal.fire({
                title: 'Would You Like To Run The Reservations Request Report',
                text: vm.selectedOffice + ' - ' + niceDate,
                icon: 'question',
                showCancelButton: true,
                // confirmButtonColor: '#3085d6',
                // cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
            }).then((result) => {
                if (result.value) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        onOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })

                    var spDate = moment(vm.selectedDate, 'DD-MM-YY').format('YYYY-MM-DD')

                    flowURL = "https://prod-30.westeurope.logic.azure.com:443/workflows/e2456ebe80494e588b3c6eef14470b2f/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=gjuF4T8Qvb2jULrsoKi3jP4yHjYBUkvObAUjM_nGJKY"

                    axios.post(flowURL, {
                            email: vm.userEmail,
                            date: spDate,
                            location: vm.selectedOffice,
                            niceDate: moment(vm.selectedDate, 'DD-MM-YY').format("dddd, MMMM Do YYYY")
                        })
                        .then(function (response) {
                            Toast.fire({
                                icon: 'success',
                                title: 'Report is on its way to your inbox'
                            })
                        })
                        .catch(function (error) {
                            Toast.fire({
                                icon: 'error',
                                title: 'There was a problem ' + error
                            })
                        });
                }
            })
        },

        deleteCheckedReservations: function () {

            var vm = this
            var i;

            vm.startSpinnyThing()

            delChecked = $('.myRes-checkbox:checkbox:checked');
            $(".myRes-checkbox:checkbox:checked").prop('checked', false);

            for (i = 0; i < delChecked.length; i++) {
                vm.startSpinnyThing()
                var id = delChecked[i].id.split('-')[1]
                var delResult = deleteSPListItem(vm.reservationSiteURL, vm.reservationList, id)
                delResult.then(() => {
                    vm.refreshReservations()
                })
            }
        },

        deleteReservation: function (id) {
            var vm = this;
            var delResult = deleteSPListItem(vm.reservationSiteURL, vm.reservationList, id)

            delResult.then((response) => {
                vm.refreshReservations()
                console.log("Reservation Cancelled")
                swal('Thank You', 'Your Reservation Has Been Cancelled', {
                    icon: "success",
                    timer: 3000,
                })
            }).catch(function (error) {
                console.log("Reservation Cancellation Failed")
                console.log(error);
                swal('There was a problem cancelling your reservation', 'Please try again', {
                    icon: "error",
                })
            })
        },

        getAllReservations: function () {

            var vm = this

            //Offset the cirrent date by three hours to accomodate SharePoint weirdness
            var m = moment()
            m.set({
                hour: 0,
                minute: 0,
                second: 0,
                millisecond: 0
            })
            m.utcOffset(-3);
            var today = m.toISOString()

            var endPointUrl = vm.reservationSiteURL + "/_api/Web/Lists/getbytitle('" + vm.reservationList + "')/Items?$select=ID,EmployeeName,BookingDate,Location,EMail&$filter=BookingDate ge datetime'" + today + "'&$orderby=BookingDate asc&$top=5000";
            // var endPointUrl = reservationsUrl + "/_api/Web/Lists/getbytitle('Office Reservations')/Items?$select=ID,EmployeeName,BookingDate,Location,EMail";
            return axios(endPointUrl)
        },

        manualRefreshReservations: function () {

            var vm = this;

            vm.startSpinnyThing()
            vm.refreshReservations()
        },

        refreshReservations: function () {

            var vm = this;

            //Get the initial reservations
            return vm.getAllReservations().then((response) => {

                vm.allReservations = response.data.value

                //Get Current Users Reservations
                vm.getMyReservations();

                //Get all users in on the selected day
                vm.getReservationsForSelectedDate();

                //Reset the canvas so everything is working before we decide what to change
                vm.initCanvas();

                //Now update the canvas to prevent inadvertant booking
                vm.updateCanvas();

                //Stop the spinny thing
                vm.stopSpinnyThing()

                // $('#locationSelect option[value="' + vm.selectedOfficeId + '"]').attr("selected", true);
            })
        },

        startSpinnyThing: function () {
            //Start the spinny thing spinning
            if ($('.refresh-btn').hasClass('rotate') == false) {
                $('.refresh-btn').addClass('rotate')
            }
        },

        stopSpinnyThing: function () {
            setTimeout(function () {
                $('.refresh-btn').removeClass('rotate')
            }, 2000)
        },

        initCanvas: function () {

            var vm = this

            $('#BookingButton').attr('disabled', false);
            vm.selectedOfficeAtCapacity = false;
            $('.location-count-bookings, .fc-day').removeClass('capacity-none capacity-fine capacity-warning capacity-reached')

            //Clear the text from dates
            $('.fc-daygrid-day-events').text('')
        },

        updateCanvas: function () {

            var vm = this;

            vm.$nextTick(function () {

                var cur = vm.selectedOfficeCurrent
                var cap = vm.selectedOfficeCapacity
                var diff = (cur / cap) * 100

                // console.log("current capacity as %", diff)

                //Update the current count style
                $('.location-count-bookings').addClass(vm.getCountClass(diff))

                if (diff == 100) {
                    $('#BookingButton').attr('disabled', true);
                    vm.selectedOfficeAtCapacity = true;
                }

                // Update the calendar
                vm.updateCalendar()
            })

        },

        getCountClass: function (pc) {

            var retClass = 'capacity-none'

            if (pc == 0) {
                retClass = 'capacity-none'
            } else if (pc > 0 && pc <= 70) {
                retClass = 'capacity-fine'
            } else if (pc > 70 && pc < 100) {
                retClass = 'capacity-warning'
            } else {
                retClass = 'capacity-reached'
            }

            return retClass
        },

        updateCalendar: function () {

            var vm = this;
            var bookedDates = [];

            //Get just the dates for this location
            var selectedLocationDates = vm.allReservations.filter(function (obj) {
                return (obj.Location === vm.selectedOffice);
            });

            // Push the formatted dates into an array for counting
            for (i = 0; i < selectedLocationDates.length; i++) {
                bookedDates.push(moment(selectedLocationDates[i].BookingDate).format('YYYY-MM-DD'))
            }

            //Get the count of each date for this location
            var dateArray = vm.countArrayElements(bookedDates)

            //update the calendar elements
            dateArray.forEach(element => {
                if (element.pc > 0) $('[data-date="' + element.value + '"]').removeClass('fc-day-today');
                $('[data-date="' + element.value + '"]').addClass(vm.getCountClass(element.pc));
                var capacityText = element.pc == 100 ? "FULL" : element.pc + "%";
                $('[data-date="' + element.value + '"]').find('.fc-daygrid-day-events').text('');
                $('[data-date="' + element.value + '"]').find('.fc-daygrid-day-events').append('<span class="capPC">' + capacityText + '</span>');
            });
        },


        countArrayElements: function (original) {

            var vm = this;
            var locCapacity = vm.selectedOfficeCapacity
            var pc

            var compressed = [];
            // make a copy of the input array
            var copy = original.slice(0);

            // first loop goes over every element
            for (var i = 0; i < original.length; i++) {

                var myCount = 0;
                // loop over every element in the copy and see if it's the same
                for (var w = 0; w < copy.length; w++) {
                    if (original[i] == copy[w]) {
                        // increase amount of times duplicate is found
                        myCount++;
                        // sets item to undefined
                        delete copy[w];
                    }
                }

                if (myCount > 0) {
                    var a = new Object();
                    a.value = original[i];
                    a.count = myCount;
                    a.pc = parseInt((myCount / locCapacity) * 100)
                    compressed.push(a);
                }
            }

            return compressed;
        },

        getMyReservations: function () {
            var vm = this,
                i
            vm.myReservations = [];
            var filterednames = vm.allReservations.filter(function (obj) {
                return (obj.EmployeeName === vm.currentUserName);
            });

            //sort the array descending
            filterednames.sort(function (a, b) {
                return new Date(b.date) - new Date(a.date);
            });

            for (i = 0; i < filterednames.length; i++) {
                vm.myReservations.push({
                    key: i,
                    id: "myResChk-" + filterednames[i].Id,
                    date: moment(filterednames[i].BookingDate).format('DD-MM-YY'),
                    office: filterednames[i].Location
                });
            }

            //Now indicate my reservations
            vm.indicateMyReservations()

            vm.$nextTick(function () {

                var vm = this

                $('.form-check-label').unbind();
                $('.form-check-label').mousedown(function (e) {
                    // console.log("Right Click")
                    if (e.which == 3) {

                        vm.selectedDate = e.currentTarget.dataset.date;

                        var today = moment(vm.selectedDate, 'DD-MM-YY').format('YYYY-MM-DD')
                        var tomorrow = moment(vm.selectedDate, 'DD-MM-YY').add(1, 'd').format('YYYY-MM-DD')

                        //Set the selection in the calendar to the selected date from the right click
                        vm.rightClickChange(e.currentTarget.dataset.location)
                        calendar.select(today, tomorrow)
                    }
                });
            })
        },

        getReservationsForSelectedDate: function () {
            var vm = this,
                i
            vm.SelectedDatesReservations = [];
            var filteredDates = vm.allReservations.filter(function (obj) {
                // console.log(moment(obj.BookingDate).format('DD-MM-YYYY'));
                // console.log(vm.selectedDate);
                return (moment(obj.BookingDate).format('DD-MM-YY') === vm.selectedDate && obj.Location === vm.selectedOffice);
            });

            filteredDates.sort(function (a, b) {
                var textA = a.EmployeeName.toUpperCase();
                var textB = b.EmployeeName.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });

            // console.log(filteredDates)
            for (i = 0; i < filteredDates.length; i++) {
                var uName = filteredDates[i].EmployeeName.split(' ')
                vm.SelectedDatesReservations.push({
                    key: i,
                    init: uName[0].charAt(0).toUpperCase() + uName[1].charAt(0).toUpperCase(),
                    EmployeeName: filteredDates[i].EmployeeName,
                });
            }

            vm.$nextTick(function () {

                // Set the current count for this location
                vm.selectedOfficeCurrent = filteredDates.length

                var avatars = document.querySelectorAll('.avatar');

                // console.log("avatars")
                // console.log(avatars)

                avatars.forEach(avatar => {
                    const text = avatar.innerText; // => "AA"
                    // console.log(text);
                    avatar.style.backgroundColor = colors[vm.numberFromText(text) % colors.length]; // => "#DC2A2A"

                });
            });
        },

        numberFromText: function numberFromText(text) {
            // numberFromText("AA");
            const charCodes = text
                .split('') // => ["A", "A"]
                .map(char => char.charCodeAt(0)) // => [65, 65]
                .join(''); // => "6565" 
            return parseInt(charCodes, 10);
        },



        initialise: function () {

            var vm = this;

            //Start the spinny thing spinning
            vm.startSpinnyThing()

            var userProfile = JSON.parse(localStorage.getItem('userDetails'));

            vm.currentUserName = userProfile.DisplayName;
            vm.userEmail = userProfile.EmailAddress;
            vm.userEmail = userProfile.EmailAddress;
            vm.userDefaultOffice = userProfile.Office;


            vm.getOfficeDetails(vm.userDefaultOffice).then((response) => {

                if (response.data.value.length == 0) {
                    //No location found for this user so we  need to take a guess based upon the company in the email address
                    var company = vm.userEmail.split('@')[1].split('.')[0].toLowerCase()
                    var companyLocation;

                    switch (company) {
                        case 'cdsds':
                            companyLocation = "Cheltenham"
                            break;
                        case 'newspress':
                            companyLocation = "Bicester"
                            break;
                        case 'loop':
                            companyLocation = "Bicester"
                            break;
                        default:
                            companyLocation = "Leeds"
                    }
                    //Run the best guess through the location code again
                    var guessedOffice = vm.getOfficeDetails(companyLocation)
                    guessedOffice.then((response) => {
                        vm.setOfficeDetails(response)
                    })
                } else {
                    //Otherwise we have found the users default location
                    vm.setOfficeDetails(response)
                }

            }).catch(function (error) {
                console.log("Error Getting Office Details", error);
            })
        },

        setOfficeDetails: function (officeDetails) {

            var vm = this;

            var locDetails = officeDetails.data.value[0]

            vm.selectedOffice = locDetails.Title,
                vm.selectedOfficeId = locDetails.Id,
                vm.selectedOfficeCapacity = locDetails.Capacity,
                vm.notifyAtCapacityEmail = locDetails.NotifyAtCapacity

            //Set the select option    
            $("#locationSelect").prevAll('.select-dropdown').children('li:contains("' + vm.selectedOffice + '")').trigger('click');

            // Get the reservations
            vm.refreshReservations()
        },

        getOfficeDetails: function (p_office) {

            var vm = this
            var endPointUrl = vm.reservationSiteURL + "/_api/Web/Lists/getbytitle('" + vm.locationList + "')/Items?$select=ID,Title,NotifyAtCapacity,Capacity&$filter=(Title eq '" + p_office + "')";
            return axios(endPointUrl)
        },

        dateChange: function (startDate, endDate) {

            // console.log(startDate)
            // console.log(endDate)

            var vm = this;
            vm.selectedDate = moment(startDate).format('DD-MM-YY')

            //Now check if the user has chosen a date range
            vm.dateRangeSelected = vm.isRangeSelectedSelection(startDate, endDate)

            // Refresh reservations
            vm.refreshReservations();
        },

        isRangeSelectedSelection: function (startDate, endDate) {

            var sDate = moment(startDate).format("DD/MM/YYYY")
            var eDate = moment(endDate).subtract(1, 'days').format("DD/MM/YYYY")

            return sDate != eDate
        },

        checkBlockDateSelection: function () {

            var vm = this;
            if (vm.dateRangeSelected) {
                Swal.fire({
                    icon: 'error',
                    title: 'Block Booking Is Not Yet Supported',
                    text: 'Please Select A Single Date',
                    timer: 3000,
                })
                return false;
            } else {
                return true
            }
        },

        rightClickChange: function (location) {

            // console.log('New Right Click Function')
            // console.log(location)

            var vm = this;
            vm.getOfficeDetails(location).then((response) => {

                var locDetails = response.data.value[0]

                vm.selectedOffice = locDetails.Title,
                    vm.selectedOfficeId = locDetails.Id,
                    vm.selectedOfficeCapacity = locDetails.Capacity,
                    vm.notifyAtCapacityEmail = locDetails.NotifyAtCapacity

                // console.log(vm.selectedOfficeId)
                // console.log(vm.selectedOffice)

                $("#locationSelect").prevAll('.select-dropdown').children('li:contains("' + vm.selectedOffice + '")').trigger('click');

            })
        },

        locationChanged: function (location) {

            var vm = this;
            vm.getOfficeDetails(location).then((response) => {

                var locDetails = response.data.value[0]

                vm.selectedOffice = locDetails.Title,
                    vm.selectedOfficeId = locDetails.Id,
                    vm.selectedOfficeCapacity = locDetails.Capacity,
                    vm.notifyAtCapacityEmail = locDetails.NotifyAtCapacity

                // $("#locationSelect").prevAll('.select-dropdown').children('li:contains("' + vm.selectedOffice + '")').trigger('click');    

                // Refresh reservations
                vm.refreshReservations();

            })
        },

        updateSelectBox: function () {

            // console.log("Updating the select box");

            $(".mdb-select.select-wrapper").each(function () {
                let wrapper = $(this);
                let selected = wrapper.find('select').val() ? wrapper.find('select').children('option:selected').text() : "";
                wrapper.find('.select-dropdown').val(selected).removeAttr('readonly').prop('required', true).addClass('form-control');
                wrapper.find('ul').css('background-color', '#fff');
                wrapper.find('select').on('change', function () {
                    if ($(this).val()) {
                        wrapper.siblings('i.prefix').addClass('active');
                    } else {
                        wrapper.siblings('i.prefix').removeClass('active');
                    }
                });
                if (wrapper.find('select').val()) {
                    wrapper.siblings('i.prefix, label').addClass('active');
                } else {
                    wrapper.siblings('i.prefix, label').removeClass('active');
                }
            });

        },

        checkReservationExists: function () {

            // console.log("Checking Reservation Exists")

            var vm = this
            var pos = vm.myReservations.map(function (e) {
                return e.date;
            }).indexOf(vm.selectedDate)

            // console.log(pos)

            if (pos != -1) {
                var niceDate = moment(vm.myReservations[pos].date, 'DD-MM-YY').format("dddd, MMMM Do YYYY")
                Swal.fire({
                    icon: 'info',
                    title: 'You Have An Existing Reservation For This Date',
                    text: niceDate + ' - ' + vm.myReservations[pos].office,
                    timer: 5000,
                })
                return (true)
            } else {
                return (false)
            }
        },

        checkDateInRange: function () {

            var vm = this
            var laterThanMonth = moment(vm.selectedDate, 'DD-MM-YY').isAfter(moment().add(1, 'M'), 'day')
            var earlierThanToday = moment(vm.selectedDate, 'DD-MM-YY').isBefore(moment(), 'day')

            // console.log(laterThanMonth)
            // console.log(earlierThanToday)

            if (earlierThanToday) {
                // console.log("Too Early")
                Swal.fire({
                    icon: 'error',
                    title: 'Booking Cannot Be Completed',
                    text: 'Selected Date Must Be Today Or Later',
                    timer: 3000,
                })
                return false;
            } else if (laterThanMonth) {
                // console.log("Too Late")
                Swal.fire({
                    icon: 'error',
                    title: 'Booking Cannot Be Completed',
                    text: 'You Cannot Book More Than One Month In Advance',
                    timer: 3000,
                })
                return false;
            } else {
                // console.log("Fine")
                return true
            }
        },

        // This function called first to prevent double click of button creating 2 reservations
        reservationButtonClick: function (event) {
            vm = this
            if (!event.detail || event.detail == 1) {
                vm.bookReservation()
            }
        },

        notifyMaximumCapacity: function () {

            var vm = this;
            console.log(vm.selectedOfficeAtCapacity ? "Office Capacity Reached" : "Office Capacity Fine")

            if (vm.selectedOfficeAtCapacity) {               

                flowURL = "https://prod-163.westeurope.logic.azure.com:443/workflows/342cd28191b14ff5896ceb964198e61f/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=y09HfP1A26JKYZjCLFYuGp20Z9zNbIK6ViIlWXNmfos"

                axios.post(flowURL, {
                    email: vm.notifyAtCapacityEmail,
                    date: moment(vm.selectedDate, 'DD-MM-YY').format('YYYY-MM-DD'),
                    location: vm.selectedOffice,
                    niceDate: moment(vm.selectedDate, 'DD-MM-YY').format("dddd, MMMM Do YYYY"),
                    reservations: vm.SelectedDatesReservations
                }).then(()=>{
                    console.log("Capacity Notifiction Email Sent")
                })
            }
        },

        bookReservation: function () {

            $('#BookingButton').attr('disabled', true);

            var vm = this;
            vm.refreshReservations().then(() => {

                //Check if there is already a reservation for this date
                if (vm.checkReservationExists() || !vm.checkDateInRange() || !vm.checkBlockDateSelection()) return;

                //Check capacity has not been reached before save
                if (vm.selectedOfficeAtCapacity) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Booking Cannot Be Completed',
                        text: vm.selectedOffice + ' has reached capacity for this date.\nPlease select another date or location',
                        timer: 3000,
                    })
                    return;
                }

                //Capacity has not been reached so we can save

                //Start the spinny thing spinning
                vm.startSpinnyThing()

                var itemProperties = {};
                itemProperties['EmployeeName'] = vm.currentUserName;
                itemProperties['BookingDate'] = moment(vm.selectedDate, 'DD/MM/YY').format("MM/DD/YYYY");
                itemProperties['Location'] = vm.selectedOffice;
                itemProperties['EMail'] = vm.userEmail;

                var updateList = createSPListItem(vm.reservationSiteURL, vm.reservationList, itemProperties)
                updateList.then(function () {
                    vm.refreshReservations().then(()=>{

                        console.log("Reservation Saved")
                        Swal.fire({
                            icon: 'success',
                            title: 'Thank You',
                            text: 'Your Reservation Has Been Booked',
                            timer: 5000,
                        })
                        // Send notification if capacity reached
                        vm.notifyMaximumCapacity()
                    })
                }).catch(function (error) {
                    console.log("Reservation Booking Failed")
                    console.log(error);
                    Swal.fire({
                        icon: 'error',
                        title: 'There was a problem booking your reservation',
                        text: 'Please try again',
                    })
                })

            });
        }
    }
});