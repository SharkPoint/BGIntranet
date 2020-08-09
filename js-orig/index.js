var gridLocked = true;

$(window).on("load", function () {
    // Animate loader off screen    
});

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();

    $(function () {

        var options = {
            float: true,
            cellHeight: 70,
            width: 12
        };
        $('.grid-stack').gridstack(options);
        $('.grid-stack').data('gridstack').setStatic(true);

        new function () {

            this.staticWidgets = ["BIG2"];

            this.grid = $('.grid-stack').data('gridstack');

            this.loadGrid = function () {
                var items = JSON.parse(localStorage.getItem('positions'));
                if (items != null) {
                    this.grid.removeAll();
                    _.each(items, function (node) {
                        this.grid.addWidget($(
                                '<div class="grid-stack-item"><div class="grid-stack-item-content">' +
                                node.content + '</div></div>'), node.x, node.y,
                            node
                            .width, node
                            .height, false, node.minWidth, node.maxWidth, node
                            .minHeight,
                            node.maxHeight, node.id, node.noMove, node.noResize);
                    }, this);
                    //Remove and re-add the click event listeners after the grid has reloaded                
                    initialise();
                    $(".slideContainer").removeClass('show');
                    setTimeout(this.bindEvents, 4500);
                    this.setStaticWidgets();
                }
                return false;
            }.bind(this);

            this.saveGrid = function () {
                this.setStaticWidgets();
                this.serializedData = _.map($('.grid-stack > .grid-stack-item:visible'),
                    function (el) {
                        el = $(el);
                        var node = el.data('_gridstack_node');
                        // console.log(node);
                        return {
                            x: node.x,
                            y: node.y,
                            width: node.width,
                            height: node.height,
                            locked: node.locked,
                            maxHeight: node.maxHeight,
                            maxWidth: node.maxWidth,
                            minHeight: node.minHeight,
                            minWidth: node.minWidth,
                            noMove: node.noMove,
                            noResize: node.noResize,
                            id: node.id,
                            content: $('.grid-stack-item-content', el).parent().html()
                        };
                    }, this);
                var sd = JSON.stringify(this.serializedData);
                localStorage.setItem('positions', sd);
                return false;
            }.bind(this);

            $('.grid-stack').on('gsresizestop', function (event, elem) {
                // console.log($(elem).attr('data-gs-width') + " - " + $(elem).attr('data-gs-height'));
            });

            this.revertToDefault = function () {
                localStorage.removeItem('positions');
                window.location.reload(true);
                // saveGridToSharePoint('');                
            }.bind(this);

            this.clearGrid = function () {
                this.grid.removeAll();
                return false;
            }.bind(this);

            this.lockUnlock = function () {
                $('#lockIcon').toggleClass("fa-lock fa-lock-open");
                var toggle = $('.grid-stack').data('gridstack').opts.staticGrid;
                $('.grid-stack').data('gridstack').setStatic(!toggle);
                gridLocked = !toggle;
                this.setStaticWidgets();
                return false;
            }.bind(this);

            this.iconlockUnlock = function () {
                //Toggle the grid lock/unlock
                this.lockUnlock();
                //If we are locking then also save the grid
                $('#lockIcon').hasClass('fa-lock') ? this.saveGrid() : "";
            }.bind(this);

            this.setStaticWidgets = function () {
                this.staticWidgets.forEach(function (widget) {
                    var el = $("[data-gs-id=BIG2]");
                    $('.grid-stack').data('gridstack').resizable(el, false);
                    $('.grid-stack').data('gridstack').movable(el, false);
                    $('.grid-stack').data('gridstack').locked(el, true);
                })
            }

            this.bindEvents = function () {
                $(".slideContainer").addClass('show');
                $('#lockIcon').unbind('click');
                $('#loadIcon').unbind('click');
                $('#loadDefaultIcon').unbind('click');
                $('#lockIcon').click(this.iconlockUnlock);
                $('#loadIcon').click(this.loadGrid);
                $('#loadDefaultIcon').click(this.revertToDefault);
                $('[data-toggle="tooltip"]').tooltip();

            }.bind(this);

            this.refreshGridFromProfile = function () {

                axios("https://corporatedocument.sharepoint.com/_api/SP.UserProfiles.PeopleManager/GetMyProperties")
                    .then(response => {
                        var EmailAddress = response.data.Email;
                        var userProfile = getUserProfileByEmail(siteURL, EmailAddress);
                        userProfile.then((response) => {

                            var localPositions = localStorage.getItem('positions');
                            var serverPositions = response.data.value["0"].GridLayout;

                            if (serverPositions != localPositions) {
                                console.log("Local & Server Positions Are Not In Sync - Resetting")
                                localStorage.removeItem('positions');
                                localStorage.setItem('positions', serverPositions);
                                this.loadGrid();
                            } else {
                                console.log("Local & Server Positions Are In Sync")
                            }
                        })
                    })
            }.bind(this);



            var items = JSON.parse(localStorage.getItem('positions'));
            if (items != null) {
                this.loadGrid();
            } else {
                //This has basic config set or is new so initialise as normal
                initialise();
                setTimeout(this.bindEvents, 4500);
            }
            //Now we check the SharePoint profile and if different change local and UI
            //this.refreshGridFromProfile();


        };
    });
});

function showNews(id) {

    // BBC thumbnail is no longer being included in the rss feed so not much point in opening the panel to show news image
    // Should the thumbnail be included at later date remove commenting on all lines below and remove the window.open line
    // at the bottom of the function

    var elem = $('#' + id)

    var thumb = elem.attr('thumb');
    var link = elem.attr('nlink');
    // var description = elem.attr('description');

    // console.log(thumb);

    // $('#newsImage').attr('src', thumb);
    // $('#newsDescription').text(description);
    // $('#newsReadMore').attr('href', link);

    // if ($("#NewsBox").hasClass('open') == false) {
    //     $("#NewsBox").css('margin-bottom', '20px')
    //     $(".hidden").toggleClass('open');
    // }

    window.open(link, "_blank");
}

function initialise() {

    //Set up SpotLight Profile
    getSpotlight();
    // getTodaysUserProfile();

    //Whats Happening Calendar
    $('.evendar-container').remove();
    if ($("#whatsHappeningEvendar").length == 0) {
        $('.whatsHappeningBody').append('<input type="text" id="whatsHappeningEvendar" />');
    }

    var calEntries;
    getCalendarEntries().then((response) => {
        calEntries = getFormattedCalendarEntries(response.data.value)

        var test = $("#whatsHappeningEvendar").evendar({
            events: calEntries,
            format: "DD-MM-YYYY HH:mm",
            calendarCount: 1,
            oneCalendarWidth: 340,
            inline: true,
            staticBoxHeight: true,
            boxHeight: 422,
            enableGridView: false,
            enableMinimize: false,
            enableMaximize: false,
            defaultEventColor: "#fff",
            defaultEventImage: "./assets/images/calendarEventHdr.jpg",
            locale: "en-gb"
        });
    })

    //People Finder Select2 Init
    $('#s2id_searchName').remove();
    $("#searchName").remove();
    $('#searchJob').before('<input class="searchField" id="searchName" type="text" placeholder="Search by name" />');
    $("#searchName").select2({

        allowClear: true,
        placeholder: "<i class='fas fa-user fa-lg'></i>&nbsp;&nbsp;People Finder",
        minimumInputLength: 3,
        ajax: {
            url: "https://corporatedocument.sharepoint.com/sites/bgintranet/_api/web/lists/getbytitle('UserProfileInfoV2')/items?&$top=1000",
            dataType: "json",
            data: function (term, page) {
                return {
                    "$filter": "((substringof('" + term + "', FullName)) and (ProfileVisible eq 1))"
                };
            },

            results: function (data, page) {
                $("#select2-chosen-1", "#select2-chosen-2").css({
                    "padding-top": "7px",
                    "padding-left": "8px"
                });
                $('#searchName').select2("val", "");
                var res = data.d.results.sort(function (a, b) {
                    a = a.FullName.toLowerCase();
                    b = b.FullName.toLowerCase();
                    if (a > b) {
                        return 1;
                    } else if (a < b) {
                        return -1;
                    }
                    return 0;
                });

                return {
                    results: res
                };
            },

            params: {
                contentType: "application/json;odata=verbose",
                headers: {
                    "accept": "application/json;odata=verbose"
                }
            }
        },
        id: function (person) {
            return {
                id: person.ID
            };
        },
        formatResult: function (person, container) {
            var pic = person.PictureURL;
            res = "<img src='" + pic + "' style='width:50px;height50px;border-radius:50%;' onerror='imgError(this)'>&nbsp&nbsp" + person.FullName;
            return res
        },

        formatSelection: function (person, container) {

            $("#select2-chosen-1,.select2-choice, #select2-chosen-2").css({
                "padding-top": "0px",
                "padding-left": "0px"
            });
            var pic = person.PictureURL;
            var phone = person.WorkPhoneNumber != null ? person.WorkPhoneNumber : "";

            res = '<div class="banner"><p><img src="' + pic + '" + width="40px" height="40px" onerror=\'imgError(this)\' class="profileImage" align="left"><span class="ban1" style="display:flex;text-align:left;padding-left:10px;height:100%;line-height:40px;">' + person.FullName + '</span></p></div>';

            container.append($('<span class="selected-state"></span>').html(res));
        },

        //},
        formatNoMatches: function () {
            return "No people found. (Case Sensitive)";
        },
        escapeMarkup: function (m) {
            return m;
        },
        dropdownCssClass: "bigdrop"

    }).on('change', function (e) {
        var obj = $(this).select2('data');
        var phoneNumber = obj.WorkPhoneNumber != null ? obj.WorkPhoneNumber : 'No Phone Found'
        if (obj == null) {
            $(".select2-choice").css({
                "padding-top": "7px",
                "padding-left": "8px"
            });
            $('#FindPeople .subHeadline2').text("Find");
            $('#FindPeople .subHeadline').text("People");
            if($('#PeopleFinderImg').hasClass('hideProfile')==false){$('#PeopleFinderImg').addClass('hideProfile')};
            $('#FindPeople .subHeadline').unbind();
            $('#emailAddress').val("");
        } else {
            $('#FindPeople .subHeadline').unbind();
            $('#emailAddress').val(obj.Email);
            $('#FindPeople .subHeadline2').html("<a href='mailto:" + obj.Email + "'>" + obj.FullName + "</a>");
            $('#FindPeople .subHeadline').text(phoneNumber);
            $('#FindPeople .subHeadline').mouseover(function(){ 
                $('#FindPeople .subHeadline').css('cursor','pointer');
            }).mouseout(function() { 
                $('#FindPeople .subHeadline').css('cursor','default ');
            });
            $('#FindPeople .subHeadline').click(function(){
                 if( $('#FindPeople .subHeadline').text() == obj.WorkPhoneNumber && obj.WorkMobileNumber != null){
                    $('#FindPeople .subHeadline').text(obj.WorkMobileNumber)
                } else {
                    $('#FindPeople .subHeadline').text(obj.WorkPhoneNumber)
                }           
            })
            
            $('#PeopleFinderImg').attr('src', obj.PictureURL);
            if(checkFileExistence(obj.PictureURL)){$('#PeopleFinderImg').removeClass('hideProfile')};
        }
    });


    //Launch profile in delve - Delve disabled for the time being
    $('.Spotlight').click(() => {
        if (gridLocked == true) {
            var profileEmail = $('#profileID').val();
            peopleFinderURL = "PeopleDirectory.aspx?p=" + profileEmail;
            window.open(peopleFinderURL, target = "_self");
        }
    });

    $(".NewStarter").click(() => {
        if (gridLocked == true) {
            if ($('#TMIVideoURL').attr('name') != null) {
                tmiURL = "./news.aspx?pageURL=" + $('#TMIVideoURL').attr('name');
                window.open(tmiURL, target = '_self');
            }           
        }
    });

    //Launch Selections
    $('#Engage').click(function (e) {
        if (gridLocked == true) {
            window.open('https://app.engageyourpeople.com/login', target = '_blank');
        }
    });

    //Launch Selections
    $('#HubSpot').click(function (e) {
        if (gridLocked == true) {
            window.open('https://app.hubspot.com/login?loginRedirectUrl=https%3A%2F%2Fapp.hubspot.com%2Fshortlink%2Fdashboard', target = '_blank');
        }
    });

    $('#JobBoard').click(function (e) {
        if (gridLocked == true) {
            window.open('./JobBoard.aspx', target = '_self');
        }
    });

    $('#newsClose').click(function () {
        closeNews();
    })

    //Launch Selections
    $('#Synergist').click(function (e) {
        if (gridLocked == true) {
            window.open('https://cdsltd.synergist.cloud/', target = '_blank');
        }
    });

    $('#LoveMyIdea').click(function () {
        if (gridLocked == true) {
                window.open('https://corporatedocument-9eed295e264c7d.sharepoint.com/sites/IntranetIdeaBoard/IdeaBoard/pages/Default.aspx?SPHostUrl=https://corporatedocument.sharepoint.com/sites/IntranetIdeaBoard/&SPLanguage=en-US&SPClientTag=0&SPAppWebUrl=https://CorporateDocument-9eed295e264c7d.sharepoint.com/sites/IntranetIdeaBoard/IdeaBoard/')
            }
        });
        
    $('#IceAwards').click(function (e) {
        if (gridLocked == true) {
            window.open('./IceAwards/IceAwards.aspx', target = '_self');
        }
    });

    $('#NoticeBoard').click(function (e) {
        if (gridLocked == true) {
            window.open('./noticeboard.aspx', target = '_self');
        }
    });

    $('#CorporateTraveller').click(function (e) {
        if (gridLocked == true) {
            window.open('https://yourct.corptraveller.co.uk/Account/Login', target = '_blank');
        }
    });

    $('#MeetUpCall').click(function (e) {
        if (gridLocked == true) {
            window.open('https://manage.meetupcall.com/login', target = '_blank');
        }
    });

    $('#FAQ').click(function (e) {
        if (gridLocked == true) {
            window.open('./faq.aspx', target = '_self');
        }
    });

    // $('.people-slides').click(function (e) {
    //     if (gridLocked == true) {
    //         console.log('ClickedPeople');
    //         window.open('PeopleHome.aspx', target = "_self");
    //     }
    // });

    $('#AskHR').click(function (e) {
        if (gridLocked == true) {
            window.open(' https://forms.office.com/Pages/ResponsePage.aspx?id=Sn0AGU8lv0-MjcWbbTK3ZuqDZB9eOdVEqoeBCbuJYVBUMzlDVUlNSTVWNjdPNVFST1RHTDhBOFg0QS4u', target = "_blank");
        }
    });
   

    $('#Email').click(function (e) {
        if (gridLocked == true) {
            window.open('https://outlook.office365.com/owa.cds.co.uk', target = "_blank");
        }
    });

    $('#OneDrive').click(function (e) {
        if (gridLocked == true) {
            var userDetails = JSON.parse(localStorage.userDetails)
            window.open(userDetails.OneDriveAddress, target = "_blank");
        }
    });


    //People Finder
    $('#peopleFinderButton').click(function () {

        if (gridLocked == true) {

            var searchEmail = $('#emailAddress').val();
            var jobTitle = $('#searchJob').val();
            var location = $('#searchLocation').val();
            var term = jobTitle + "&l=" + location
            var delveURL = null;
            // console.log(term);

            //If there are no value selected then do not action click
            if(searchEmail =="" && jobTitle == "" && location == ""){return}

            if (searchEmail != "") {
                peopleFinderURL = "PeopleDirectory.aspx?p=" + searchEmail;
                window.open(peopleFinderURL, target = "_self");
            } else if (term.trim() != "") {
                peopleFinderURL = "PeopleDirectory.aspx?j=" + term.trim()
                window.open(peopleFinderURL, target = "_self");
            }
        }
    })

    //Google style search
    $('#searchTerm').on('keyup', function (e) {
        if (e.keyCode == 13 && $('#searchTerm').val().trim() != "") {
            var searchURL = "https://corporatedocument.sharepoint.com/sites/bigsearch/Pages/results.aspx?k=" + $('#searchTerm').val().trim();
            window.open(searchURL, target = "_self");
        }
    })

    //FitText Configuration
    $('#LoveIdeaSubHeadline').fitText(1.00, {
        minFontSize: '29px',
        maxFontSize: '60px'
    });
    $('#LoveIdeaSubHeadline2').fitText(1.00, {
        minFontSize: '27px',
        maxFontSize: '60px'
    });

    $('#IceAwardsSubHeadline').fitText(1.00, {
        minFontSize: '29px',
        maxFontSize: '60px'
    });
    $('#IceAwardsSubHeadline2').fitText(1.00, {
        minFontSize: '27px',
        maxFontSize: '60px'
    });

    $('#MeetUpCallSubHeadline').fitText(1.00, {
        minFontSize: '29px',
        maxFontSize: '60px'
    });
    $('#MeetUpCallSubHeadline2').fitText(1.00, {
        minFontSize: '27px',
        maxFontSize: '60px'
    });

    $('#CorporateTravellerSubHeadline').fitText(1.00, {
        minFontSize: '29px',
        maxFontSize: '60px'
    });
    $('#CorporateTravellerSubHeadline2').fitText(1.00, {
        minFontSize: '20px',
        maxFontSize: '60px'
    });

    $('#EmailSubHeadline').fitText(0.95, {
        minFontSize: '29px',
        maxFontSize: '60px'
    });
    $('#EmailSubHeadline2').fitText(0.95, {
        minFontSize: '27px',
        maxFontSize: '60px'
    });

    $('#AskHRSubHeadline').fitText(1.00, {
        minFontSize: '28px',
        maxFontSize: '60px'
    });
    $('AskHRSubHeadline2').fitText(1.00, {
        minFontSize: '29px',
        maxFontSize: '60px'
    });

    $('#NoticeBoardSubHeadline').fitText(0.95, {
        minFontSize: '29px',
        maxFontSize: '60px'
    });
    $('#NoticeBoardSubHeadline2').fitText(0.95, {
        minFontSize: '27px',
        maxFontSize: '60px'
    });

    $('#OneDriveSubHeadline').fitText(0.95, {
        minFontSize: '29px',
        maxFontSize: '60px'
    });
    $('#OneDriveSubHeadline2').fitText(0.95, {
        minFontSize: '27px',
        maxFontSize: '60px'
    });

    $('#SynergistHeadline').fitText(0.95, {
        minFontSize: '30px',
        maxFontSize: '150px'
    });

    $('#SynergistLineOne').fitText(1.2, {
        minFontSize: '12px',
        maxFontSize: '20px'
    });

    $('#SynergistLineTwo').fitText(1.2, {
        minFontSize: '12px',
        maxFontSize: '20px'
    });

    $('#FaqSubHeadline2').fitText(0.95, {
        minFontSize: '10px',
        maxFontSize: '30px'
    });

    $('#FaqSubHeadline').fitText(0.95, {
        minFontSize: '5px',
        maxFontSize: '30px'
    });

    //Get the custom settings
    $(".loadingSpinner").fadeOut("slow");
}

function getSpotlight() {
    //Check if there is a new starter today, if not getTodays user profile

    var today = new Date();
    today.setHours(0, 0, 0, 0);

    var currentdate = today.toJSON().slice(0, 10);
    var nDate = currentdate.slice(8, 10) + '/' +
        currentdate.slice(5, 7) + '/' +
        currentdate.slice(0, 4);

    var endPointUrl = peopleURL + "/_api/Web/Lists/getbytitle('OnBoarding')/Items?$select=*&$Filter=Start_x0020_Date+eq+'" + nDate + "'"
    var headers = {
        "accept": "application/json;odata=verbose"
    };
    axios.get(endPointUrl).then(response => {
        // console.log("NewStarter");
        // console.log(response);

        if (!$.isArray(response.data.value) || !response.data.value.length) {
            getTodaysUserProfile();
        } else {
            var newName = response.data.value["0"].Title;
            var firstName = newName.split(" ")[0];
            var videoURL = response.data.value["0"].TwoMinuteInterviewVideoURL;

            $('#NewStarterName').html(newName)
            $('#NewStarterName').val(newName)
            $('#NewStarterJobDescription').html(response.data.value["0"].Position)
            // $('#NewStarterJobDescription').html(null)
            if (videoURL != null) {
                $('#NewStarterInterview').html("Watch " + firstName + "'s My Favourite Things Video");
                $('#TMIVideoURL').attr('name', videoURL);
            }else{
                $('#TMIVideoURL').attr('name', null);
            }
            $('.NewStarter').removeClass('hideProfile');
        }
    })

}

function getTodaysUserProfile() {
    var endPointUrl = siteURL + "/_api/Web/Lists/getbytitle('UserProfileInfoV2')/Items?$select=*&$Filter=CurrentSelectedProfile+eq+'Yes'";
    var headers = {
        "accept": "application/json;odata=verbose"
    };
    axios.get(endPointUrl).then(response => {

        if (!$.isArray(response.data.value) || !response.data.value.length) {
            GetRandomUserProfile()

        } else {
            var person = response.data.value["0"];
            // console.log("SpotlightUser");
            // console.log(response);
            showSpotlightProfile(person);
        }

    }).catch(function (error) {
        console.log("Spotlight Error");
        console.log(error);
    });
}

function GetRandomUserProfile() {

    var selectedUser;
    var endPointUrl = siteURL + "_api/Web/Lists/getbytitle('UserProfileInfo')/Items?$select=*&$Filter=ExcludeFromFrontPagePromo+eq+'No'+and+PastSelectedProfile+ne+'Yes'&$top=1000";
    var headers = {
        "accept": "application/json;odata=verbose"
    };
    axios.get(endPointUrl).then(response => {
        var userCount = response.data.value.length;
        var userHasPic = false;

        while (userHasPic == false) {

            var randItem = Math.floor(Math.random() * userCount);
            selectedUser = response.data.value[randItem];
            userHasPic = checkFileExistence(selectedUser.PictureURL);
        }

        // console.log("Random User");
        // console.log(selectedUser);

        showSpotlightProfile(selectedUser)

        //Update User Profile
        var itemProperties = {
            'CurrentSelectedProfile': "Yes",
            'PastSelectedProfile': "Yes",
            'DateLastSpotlight': new Date(),
        };
        var updateSpotlight = UpdateListItemByid(selectedUser.ID, "UserProfileInfo", itemProperties);
        updateSpotlight.done(() => {
            // console.log("updating user profile");
        }).fail(error => {
            console.log("Error Updating Profile")
            console.log(error);
        })
    }).catch(error => {
        console.log("Error Getting List Of Profiles")
        console.log(error);
    })
}

function showSpotlightProfile(selectedUser) {

    var WorkPhoneNumber = selectedUser.WorkPhoneNumber != null ? selectedUser.WorkPhoneNumber : '';

    //UpdateDom
    $('#Spotlight').css('background','rgb(151, 0, 33)');
    $('#profileID').val(selectedUser.Email);
    $('#ProfileBackground').attr('src', selectedUser.PictureURL);
    // $('#ProfileBackground').attr('src', GenerateThumbnail(selectedUser.PictureURL));
    $('#profilePic').attr('src', selectedUser.PictureURL);
    $('#spotlightName').text("Meet " + selectedUser.FullName);
    $('#spotlightJobDescription').text(selectedUser.JobTitle);
    $('#spotlightEmail').text(selectedUser.Email);
    $('#spotlightPhone').text(WorkPhoneNumber);   
    $('.Spotlight').removeClass('hideProfile'); 
}

function getCalendarEntries() {

    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var endPointUrl = siteURL + "/_api/Web/Lists/getbytitle('UpcomingEvents')/Items?$select=*&$Filter=Active+eq+1+and+EndDate+ge+'" + today.toISOString() + "'";
    return axios.get(endPointUrl);

}

function getFormattedCalendarEntries(CalEvents) {

    // console.log(CalEvents)

    var eventsArray = [];
    CalEvents.forEach(function (entry) {
        // console.log(entry);     
        let eDate = moment(entry.EventDate).format("DD/MM/YYYY HH:MM:SS");
        let fDate = moment(entry.EndDate).format("DD/MM/YYYY HH:MM:SS");
        let linkURL = entry.link != null ? entry.link.Url : '';
        var event = {
            id: entry.Id,
            name: entry.Title,
            startDate: eDate,
            eventDate: entry.EventDate,
            endDate: fDate,
            calEndDate: entry.EndDate,
            // excerpt: entry.Description,
            description: entry.Description,
            place: entry.Location,
            link: linkURL,
            target: "_blank",
        }
        //Only add the image element if there is a url in the event otherwise the default will not be used.
        if (entry.Image != null) {
            event.image = entry.Image.Url
        }

        eventsArray.push(event);
    })
    // console.log(eventsArray)
    return eventsArray;
}

function saveGridToSharePoint(positions) {

    // console.log(positions)

    //Get positions from local storage
    var positions = localStorage.getItem('positions');
    //Update profile using email as key with positions
    var itemProperties = {
        'GridLayout': positions
    };

    //Get Email From LocalStorage
    var user = JSON.parse(localStorage.getItem('userDetails'));
    var eMail = user.EmailAddress;
    var profileID;

    //Get User Profile ID from Email
    var Profile = getUserProfileByEmail(siteURL, eMail)
    Profile.then((response) => {
        profileID = response.data.value["0"].ID;
        uProfile = UpdateListItemByid(profileID, 'UserProfileInfo', itemProperties);
        uProfile.then(() => {
            if (positions == " ") {
                // console.log("Positions is blank")
                window.location.reload();
            } else {
                // console.log("Positions is not blank")
            }
        }).fail((error) => {
            console.log("Error Occurred Updating User Profile With Grid positions");
            console.log(error);
        })
    }).catch((error) => {
        console.log("Error Occurred Getting Profile ID By Email");
        console.log(error);
    })
}

