$(document).ready(function () {

    $('.alphaNavItem').click(function (event) {
        vm_Main.getUserByInitial(event)
    });

    $('#backButton').click(function () {
        vm_Main.closeProfile();
    });

    $('.mobileBack').click(function () {
        vm_Main.closeProfile();
    });

    $('.selectCompany').select2({
        width: '100%',
        placeholder: 'Company',
        minimumResultsForSearch: Infinity,
    })

    $('.selectLocation').select2({
        width: '100%',
        placeholder: 'Location',
        minimumResultsForSearch: Infinity,
    })

})

document.onreadystatechange = function () {
    if (document.readyState === 'complete') {

        $(".loadingSpinner").fadeOut(50);
    }
}

vm_Main = new Vue({

    el: '#wrapper',
    data: {
        allUsers: [],
        filteredUsers: [],
        searchResults: [],
        showProfile: false,
        profileOnly: false,
        paramSearch: false,
        showNoResults: false,
        selectedProfile: {},
    },

    created: function () {
        this.initialise()
    },

    methods: {

        initialise: function () {

            var vm = this;

            //Parse parans if any
            var p_eMail = qs("p");
            var p_jobTitle = qs("j");
            var p_location = qs("l");

            //If no params then run getUsers for standard opening
            if (p_eMail == null && p_jobTitle == null && p_location == null) {

                vm.getUsers();
                return;
            }

            //If email is not null then we are looking to open the profile for that user only
            if (p_eMail != null) {
                vm.profileOnly = true;
                vm.showUserProfileFromList(p_eMail);
                return;
            }

            //If we get to here then params have been passed in for searching
            vm.paramSearch = true;
            vm.getUsers();

        },

        getUsers: function () {

            var vm = this;
            vm.showNoResults = false;
            var endPointUrl = siteURL + "/_api/Web/Lists/getbytitle('UserProfileInfoV2')/Items?$filter=(Email ne null and ProfileVisible eq '1')&$orderby=PersonName asc&$top=999";
            // var endPointUrl = siteURL + "/_api/Web/Lists/getbytitle('UserProfileInfoV2')/Items?$filter=ProfileVisible eq '1'&$orderby=PersonName asc&$top=999";

            axios.get(endPointUrl)
                .then(response => {

                    var responses = response.data.value;
                    vm.allUsers = responses;

                    //if this is not a param search then get users starting with A
                    if (!vm.paramSearch) {
                        vm.filteredUsers = vm.allUsers.filter(function (el) {
                            return el.FullName.startsWith('A');
                        });
                    } else {
                        var jobTitle = qs("j");
                        var location = qs("l")
                        vm.searchUsersFromParams(jobTitle, location)
                        vm.paramSearch = false;
                    }

                    vm.$nextTick(function () {
                        vm.handlePagination();
                    });
                })

        },

        searchUsersFromParams(p_jobTitle, p_location) {

            if (p_jobTitle != null) {
                $('#searchTerm').val(p_jobTitle)
            };
            if (p_location != null) {

                var optionValues = [];
                var sLocation = jsUcfirst(p_location);

                $('#LocationSearch option').each(function() {
                    optionValues.push($(this).val());
                });

                var optionIndex = optionValues.findIndex(element => element.includes(sLocation));

                $('#LocationSearch').val(optionValues[optionIndex]);
                $('#LocationSearch').select2().trigger('change');
            }

            this.searchUsers(p_jobTitle == '' || p_jobTitle == null ? '*' : p_jobTitle, "*", p_location == null || p_location == '' ? '*' : jsUcfirst(p_location));
        },

        searchUsersFromSearchFields() {

            if( $('#searchTerm').val() == '' && $('.selectCompany').val() == '' && $('.selectLocation').val() == ''){return}

            var term = $('#searchTerm').val() == '' ? '*' : $('#searchTerm').val();
            var termCompany = ($('.selectCompany').val() == '' || $('.selectCompany').val() == 'All') ? '*' : $('.selectCompany').val();
            var termCompany = $('.selectCompany').val() == 'CDS DS' ? 'CDSDS' : termCompany;
            var termLocation = ($('.selectLocation').val() == '' || $('.selectLocation').val() == 'All') ? '*' : $('.selectLocation').val();

            this.searchUsers(term, termCompany, termLocation);
        },

        searchUsers: function (term, termCompany, termLocation) {

            var vm = this;
            var termArray = [];
            var companyArray = [];

            console.log("term - " + term);
            console.log("termCompany - " + termCompany);
            console.log("termLocation - " + termLocation);
            vm.showNoResults = false;

            if (term == "*" & termCompany == "*" & termLocation == "*") {
                // console.log("All Blank")
                vm.filteredUsers = vm.allUsers.slice(0)
                vm.$nextTick(function () {
                    vm.handlePagination();
                });
                return;
            }

            if (term != "*") {
                termArray = vm.allUsers.filter(function (el) {
                    var jobTitle = el.JobTitle == null ? "" : el.JobTitle;
                    var fullName = el.FullName == null ? "" : el.FullName;
                    return (fullName.toLowerCase() + jobTitle.toLowerCase()).includes(term.toLowerCase())
                })
            } else {
                termArray = vm.allUsers.slice(0);
            }

            if (termCompany != "*") {
                companyArray = termArray.filter(function (el) {
                    return el.Company == termCompany
                })
            } else {
                companyArray = termArray.slice(0);
            }

            if (termLocation != "*") {
                vm.searchResults = companyArray.filter(function (el) {
                    if (el.Office == null) {
                        return false;
                    } else {
                        return el.Office.includes(termLocation);
                    }
                })
            } else {
                vm.searchResults = companyArray.slice(0);
            }

            if (!Array.isArray(vm.searchResults) || !vm.searchResults.length) {
                vm.showNoResults = true;
                vm.filteredUsers = [];               
            } else {
                vm.showNoResults = false;
                vm.filteredUsers = vm.searchResults.slice(0);                
            }

            console.log(vm.filteredUsers);

            vm.$nextTick(function () {
                vm.handlePagination();
                $('.alphaNavItem').removeClass('selectedAlpha');
                $(".alphaNav li:nth-child(1) .alphaNavItem").addClass('selectedAlpha');
            });
        },

        getUserByInitial: function (event) {

            var vm = this;
            var filterSource = [];

            var initialLetter = event.target.innerHTML

            $('.alphaNavItem').removeClass('selectedAlpha');
            $(event.target).addClass("selectedAlpha");

            if (!Array.isArray(vm.searchResults) || !vm.searchResults.length) {
                filterSource = vm.allUsers.slice(0);
            } else {
                filterSource = vm.searchResults.slice(0);
            }

            if (initialLetter == '*') {
                vm.filteredUsers = filterSource.slice(0);
            } else {
                vm.filteredUsers = filterSource.filter(function (el) {
                    return el.FullName.startsWith(initialLetter);
                });
            }

            vm.showNoResults = !Array.isArray(vm.filteredUsers) || !vm.filteredUsers.length ? true : false;

            vm.$nextTick(function () {
                vm.handlePagination();
            });
        },

        clearAllSearch: function() {

            var vm = this;

            $('#searchTerm').val('');
            $('.selectCompany').val(null).trigger('change');
            $('.selectLocation').val(null).trigger('change');

            vm.searchResults = [];
            vm.filteredUsers = vm.allUsers.filter(function (el) {
                return el.FullName.startsWith('A');
            });

            $('.alphaNavItem').removeClass('selectedAlpha');
            $(".alphaNav li:nth-child(2) .alphaNavItem").addClass('selectedAlpha');

            vm.showNoResults = false;

            vm.$nextTick(function () {
                vm.handlePagination();
            });       
        },

        handlePagination: function () {

            $('#pagination-container').pagination('destroy');
            $(".person").removeAttr("style");

            var items = $(".person");
            var numItems = items.length;
            var perPage = 18;
            var vm = this;

            items.slice(perPage).hide();

            $('#pagination-container').pagination({
                items: numItems,
                itemsOnPage: perPage,
                prevText: "Prev",
                nextText: "Next",
                onPageClick: function (pageNumber) {
                    var showFrom = perPage * (pageNumber - 1);
                    var showTo = showFrom + perPage;
                    items.hide().slice(showFrom, showTo).show();
                }
            });

            //Make sure click works for all visible items
            $('.person').unbind();
            $('.person').click(function (event) {
                vm.showUserProfile(vm.getEmailAddressFromSelected(event))
            });
        },

        getEmailAddressFromSelected: function (event) {
            return ($(event.target).closest('li').find('.userEmail')["0"].value);
        },

        showUserProfileFromList: function (userEmail) {

            var vm = this;
            var endPointUrl = siteURL + "/_api/Web/Lists/getbytitle('UserProfileInfoV2')/Items?$filter=Email eq '" + userEmail + "'";

            axios.get(endPointUrl)
                .then(response => {

                    vm.selectedProfile = response.data.value["0"];
                    vm.addExtraGoodiesToProfile();
                    this.showProfile = true;
                })
        },

        addExtraGoodiesToProfile() {

            var vm = this;

            vm.selectedProfile.skypeaddress = "sip:" + vm.selectedProfile.Email;
            vm.selectedProfile.mailtoaddress = "mailto:" + vm.selectedProfile.Email;

            //Company Image
            switch (vm.selectedProfile.Company) {
                case "CDSDS":
                    vm.selectedProfile.CompanyImage = "./assets/images/mm_images/CDS_DS_Large_Transparent.png";
                    break;
                case "CDS":
                    vm.selectedProfile.CompanyImage = "./assets/images/mm_images/cds2020.png";
                    break;
                case "BGBS":
                    vm.selectedProfile.CompanyImage = "./assets/images/mm_images/bgbs_Bailie.png";
                    break;
                case "Newspress":
                    vm.selectedProfile.CompanyImage = "./assets/images/mm_images/newspress.png";
                    break;
                case "The Baird Group":
                    vm.selectedProfile.CompanyImage = "./assets/images/mm_images/Group_Bailie.png"
                case "Bailie Group":
                    vm.selectedProfile.CompanyImage = "./assets/images/mm_images/Group_Bailie.png"  
                default:
                    // code block
            }
        },

        showUserProfile: function (userEmail) {
            var vm = this;
            console.log(userEmail);
            var chosenProfile = [];
            chosenProfile = vm.allUsers.filter(function (el) {
                return el.Email == userEmail;
            });

            vm.selectedProfile = (chosenProfile["0"]);
            console.log(vm.selectedProfile)
            vm.addExtraGoodiesToProfile();

            console.log(this.selectedProfile);
            this.showProfile = true;
        },

        closeProfile: function () {

            var vm = this;

            if (vm.profileOnly) {
                window.open("./index.aspx", target = "_self");
            } else {
                this.showProfile = false;
            }
        },

        mobileBack: function(){
alert('mobileback');
        }
    }
});