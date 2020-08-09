$(document).ready(function () {

    $('input[type=radio][name=css-fadeshow]').change(function () {
        vm_slideShow.currentSelection = ($(event.target)["0"].id).split('-')[1];
        // console.log(vm_slideShow.currentSelection)
    });

    // $('.slideHeadlineContainer').click(function () {
    //     alert('Click');
    //     people_slideShow.showNews()
    // })

    var currentAmount = 15;

    var alertBanneralertBanner = new Vue({

        el: '#AlertContainer',
        data: {
            alertTitle: '',
            alertTitleMobile: '',
            alertLinkText: '',
            alertLink: '',
            alertArchiveText: '',
            alertArchive: ''
        },

        created: function () {
            this.setAlert();
        },

        methods: {

            setAlert: function () {
                console.log("Running SetAlert");
                var vm = this;
                //Find an active alert banner
                var requestUri = peopleURL + "\\_api\\web\\lists\\getbytitle('Alert Banner')\\items?&$filter=Status eq 'Active'&orderby=modified desc&top=1"
                console.log(requestUri)

                var response = axios(requestUri);
                response.then(function (response) {

                    if (response.data.value.length > 0) {
                        var newsPageURL = "news.aspx?pageURL=https://corporatedocument.sharepoint.com/sites/groupnews/SitePages/"
                        var alert = response.data.value["0"];
                        console.log("Alert");
                        console.log(alert);
                        vm.alertTitle = alert.Title;
                        vm.alertTitleMobile = alert.Mobile_x0020_Alert_x0020_Title
                        if (alert.AlertText != null && alert.AlertLink != null) {
                            vm.alertTitle = vm.alertTitle + " - ";
                            vm.alertLinkText = alert.AlertText;
                            vm.alertLink = newsPageURL + alert.AlertLink;
                        }
                        if (alert.ArchiveText != null && alert.ArchiveSearchTerm != null) {
                            vm.alertArchiveText = alert.ArchiveText;
                            vm.alertArchive = "NewsArchive.aspx?srch=" + alert.ArchiveSearchTerm;
                        }

                        //Set colours based upon BannerColour
                        switch (alert.BannerColour) {
                            case 'Red':
                                $('#alertBanner').addClass('redAlert');
                                break;
                            case 'Amber':
                                $('#alertBanner').addClass('amberAlert');
                                break;
                            case 'Green':
                                $('#alertBanner').addClass('greenAlert');
                                break;
                            case 'Blue':
                                $('#alertBanner').addClass('blueAlert');
                                break;
                        }

                        $('#AlertContainer').removeClass('hideElement');
                    }
                })
            },

            OpenAlert: function () {
                window.open(this.alertLink, '_self')
            },

            OpenArchive: function () {
                window.open(this.alertArchive, '_self')
            }
        }
    });

    // FAQ
    var userDetails = new Vue({

        el: '#EmailContent',
        data: {
            EmailAddress: null,
            OneDriveAddress: null,
            AccountName: null,
            Company: null,
        },

        created: function () {
            this.getCurrentUser();
        },
        methods: {
            getCurrentUser: function () {

                sessionStorage.clear();
                var WorkPhone

                axios("https://corporatedocument.sharepoint.com/_api/SP.UserProfiles.PeopleManager/GetMyProperties")
                    .then(response => {
                        response.data.UserProfileProperties.forEach(key => {
                            switch (key.Key) {
                                case 'WorkPhone':
                                    WorkPhone = key.Value;
                                    break;
                                case 'Office':
                                    Office = key.Value;
                                    break;
                            }
                        })
                        //First we add in the main user details to the session variable
                        console.log("My Details");
                        console.log(response.data);
                        var uDetails = {
                            //The replace is to remove single quotes from names like O'Conner which foul up json
                            DisplayName: response.data.DisplayName.replace(/\'/gi,''),    
                            OneDriveAddress: response.data.PersonalUrl + '/_layouts/15/onedrive.aspx',
                            EmailAddress: response.data.Email,
                            WorkPhone: WorkPhone,
                            Office: Office,
                            AccountName: response.data.AccountName,
                            Company: response.data.Email.split('@').pop().split('.').shift().toLowerCase(),
                        }

                        //Now we add the users roles to the profile
                        var endPointUrl = siteURL + "/_api/Web/Lists/getbytitle('Permissions')/Items?$select=Roles,UserNAme/Title&$expand=UserNAme&$filter=UserNAme/Title eq '" + encodeURI(uDetails.DisplayName) + "'";
                        axios.get(endPointUrl)
                            .then(response => {
                                var roles = [];
                                var userMatches = response.data.value;
                                if (Array.isArray(userMatches) && userMatches.length) {
                                    roles = userMatches["0"].Roles;
                                }
                                uDetails.Roles = roles;
                                localStorage.setItem('userDetails', JSON.stringify(uDetails));
                            })

                    }).catch(error => {
                        console.log("Current User Error - " + error);
                    })
            },
        }
    });

    var newsTicker = new Vue({

        el: '#NewsItems',
        data: {
            newsItems: [],
        },

        created: function () {
            this.getNews();
        },
        methods: {
            getNews: function () {

                var vm = this;
                var r2J = 'https://api.rss2json.com/v1/api.json?rss_url=';
                var api_key = 'j1nd29hylspxrhpd5r6yo4e2wdhrccikjvjtizeb';
                var linkArray = [
                    "http://feeds.bbci.co.uk/news/rss.xml",
                    "http://feeds.bbci.co.uk/news/technology/rss.xml",
                    "http://newsrss.bbc.co.uk/rss/sportonline_uk_edition/football/rss.xml"
                ]

                linkArray.forEach(link => {

                    var nItem = null;

                    axios(r2J + encodeURIComponent(link) + '&api_key=' + api_key)
                        .then(response => {

                            // console.log(response);

                            response.data.items.forEach(element => {

                                nItem = {
                                    'Title': element.title,
                                    'Link': element.link,
                                    'Thumb': element.thumbnail != "" ? element.thumbnail : "././assets/images/MissingImage.jpg",
                                    'Description': element.description
                                };

                                var id = /[^/]*$/.exec(element.link)[0];
                                var secLink = element.link.replace("http:", "https:");
                                var secThumb = nItem.Thumb.replace("http:", "https:");

                                // console.log(secThumb);

                                $("#NewsItems").append('<li><a nlink="' + secLink + '" thumb="' + secThumb + '" description="' + element.description + '" onclick="showNews($(this).attr(\'id\'))" + id=' + id + ' target="_blank"><span class="tab">' + element.title + '&nbsp;&nbsp;&nbsp;&nbsp;//</span></a></li>');
                            });

                            $('#newsTicker5').breakingNews({

                            });


                        }).catch(error => {
                            console.log("News - " + error);
                        })

                })
            },
        }

    });

    var vm_slideShow = new Vue({

        el: '.fs-slides',
        data: {
            slides: [],
            currentSelection: 1,
        },

        created: function () {
            this.getNewNews();
        },

        methods: {

            getNewNews: function () {

                console.log("OFFICE");
                var user = JSON.parse(localStorage.getItem('userDetails'));
                var office = user.Office;

                var requestUri = newsURL + "\\_api\\web\\lists\\getbytitle('Site Pages')\\items?$select=EncodedAbsUrl,PagePosition,OData__ModerationStatus,DisplayInCarousel,ID,ExcludeFrom,Title,BannerImageUrl,Description&$filter=((DisplayInCarousel eq 'Yes') and (ExcludeFrom ne '" + office + "') and (OData__ModerationStatus eq 0))&$top=6&$orderby=Modified desc"
                console.log(requestUri);
                var vm = this;

                var sitePages = axios(requestUri);
                sitePages.then(function (response) {
                    // console.log(response);          
                    vm.slides = response.data.value;
                    vm.slides.forEach(function (element, i) {
                        element.imgURL = "url(" + element.BannerImageUrl.Url + "&resolution=5 )";
                        element.newsLink = intranetNews + "?pageURL=" + element.EncodedAbsUrl;
                        element.BGTitle = element.Title.substring(0, 60)
                    });

                    vm.$nextTick(function () {
                        //Start slideshow
                        setTimeout(() => {
                            vm.updateSlideshow();
                        }, 15000);

                        // Show hide tile icons
                        // $('.slideContainer').unbind();
                        // $('.slideContainer').mouseover(() => {
                        //     $('#iconBar').toggle('hideElement') 
                        // })
                        // $('.slideContainer').mouseout(() => {
                        //     $('#iconBar').toggle('hideElement') 
                        // })
                    })
                    // console.log("slides");
                    // console.log(vm.slides);

                }).catch(function (error) {
                    console.log(error);
                })
            },

            showNews: function (pURL) {
                var newsURL = this.slides[this.currentSelection - 1].newsLink;
                window.open(newsURL, "_self");
            },

            //update slideshow
            updateSlideshow: function () {
                var vm = this;
                var noSlides = vm.slides.length;
                var interval = setInterval(function () {
                    var slideNo = parseInt(vm.currentSelection);
                    // console.log("Current - " + vm.ps_currentSelection)
                    // console.log("No Slides - " + noSlides + " - Current Slide : " + slideNo);
                    vm.currentSelection = slideNo == noSlides ? "1" : (slideNo + 1).toString();
                    var elem = "#slide-" + vm.currentSelection;
                    $(elem).trigger("click");
                }, 10000);
            },

        }
    })

    // var people_slideShow = new Vue({

    //     el: '.people-slides',
    //     data: {
    //         slides: [],
    //         ps_currentSelection: 1,
    //         showReadMore: false,
    //         slideshowCounter: 1,
    //     },

    //     created: function () {
    //         this.getNewNews();
    //     },

    //     methods: {

    //         getNewNews: function () {

    //             var requestUri = peopleURL + "\\_api\\web\\lists\\getbytitle('Site Pages')\\items?$select=EncodedAbsUrl,ID,Title,Category,BannerImageUrl,Description,ShowInPeopleTile&$filter=Category eq 'BIG Home'&$top=10&$orderby=Modified desc"
    //             //var requestUri = peopleURL + "\\_api\\web\\lists\\getbytitle('Site Pages')\\items?$select=EncodedAbsUrl,ID,Title,Category,Link_x0020_To_x0020_Page,BannerImageUrl,Description,ShowInPeopleTile&$filter=ShowInPeopleTile eq 1&$top=10&$orderby=Modified desc"
    //             //var requestUri = peopleURL + "\\_api\\web\\lists\\getbytitle('Site Pages')\\items?$select=EncodedAbsUrl,ID,Category,Title,Link_x0020_To_x0020_Page,BannerImageUrl,Description,ShowInPeopleTile&$top=10&$orderby=Created desc"

    //             // console.log(requestUri);
    //             var vm = this;

    //             var sitePages = axios(requestUri);
    //             sitePages.then(function (response) {
    //                 vm.slides = response.data.value;

    //                 // console.log(vm.slides);
    //                 var slideCount = vm.slides.length
    //                 var elemCounter = 0;
    //                 var NavElements = "";
    //                 var peoplePrevNav = "";
    //                 var peopleNextNav = ""

    //                 vm.slides.forEach(function (element, i) {
    //                     element.imgURL = "url(" + element.BannerImageUrl.Url + "&resolution=5 )";
    //                     element.newsLink = intranetNews + "?pageURL=" + element.EncodedAbsUrl;
    //                     element.BGTitle = element.Title.substring(0, 60)
    //                     // element.showReadMore = element.Link_x0020_To_x0020_Page == true ? "Watch" : "";
    //                     // element.showText = element.Link_x0020_To_x0020_Page == true;
    //                     element.showReadMore = false;
    //                     element.showText = false;
                        
    //                     elemCounter++
    //                     NavElements += '<input type="radio" class="css-fadeshow" name="people-fadeshow" id="people-slide-' + elemCounter + '" />'
    //                     peoplePrevNav += '<label class="people-prev-btn" for="people-slide-' + elemCounter + '"></label>'
    //                     peopleNextNav += '<label class="people-next-btn" for="people-slide-' + elemCounter + '"></label>'
    //                 });

    //                 //Set the showVideoGalleryIcon
    //                 vm.galleryIconDisplay(0);

    //                 $("#NavElements").prepend(NavElements);
    //                 $("#peoplePrevNav").append(peoplePrevNav);
    //                 $("#peopleNextNav").append(peopleNextNav);

    //                 vm.$nextTick(function () {
    //                     vm.updateThermometer();
    //                     $('#goal-thermometer').click(function () {
    //                         vm.updateThermometer();
    //                     })
    //                     //Start slideshow
    //                     vm.updateSlideshow();

    //                     //Slide Change Event
    //                     $('input[type=radio][name=people-fadeshow]').change(function () {
    //                         var currSel = ($(event.target)["0"].id).split('-')[2];
    //                         vm.ps_currentSelection = currSel;
    //                         vm.galleryIconDisplay(parseInt(currSel) - 1);
    //                     });

    //                     //Gallery Icons Click Event
    //                     $('.slideGallery').click(function () {
    //                         window.open("./Gallery.aspx", "_self")
    //                     });
    //                     $('.videoGallery').click(function () {
    //                         window.open("./VideoGallery.aspx", "_self")
    //                     });

    //                 });

    //             }).catch(function (error) {
    //                 console.log(error);
    //             })
    //         },

    //         showNews: function () {

    //             // console.log("Click");
    //             var newsURL = this.slides[this.ps_currentSelection - 1].newsLink;
    //             window.open(newsURL, "_self");
    //         },

    //         //Update the thermometer reading
    //         updateThermometer: function () {

    //             //get the latest thermometer value from SharePoint
    //             var requestUri = peopleURL + "\\_api\\web\\lists\\getbytitle('Element Config')\\items?$select=Element,Title&$filter=Element eq 'Thermometer Reading'"
    //             var response = axios(requestUri);
    //             response.then(function (response) {
    //                 var updateVal = response.data.value["0"].Title;
    //                 Update(parseInt(updateVal));
    //             })
    //         },

    //         //update slideshow
    //         updateSlideshow: function () {
    //             var vm = this;
    //             var noSlides = vm.slides.length;
    //             var interval = setInterval(function () {
    //                 var slideNo = parseInt(vm.ps_currentSelection);
    //                 // console.log("Current - " + vm.ps_currentSelection)
    //                 // console.log("No Slides - " + noSlides + " - Current Slide : " + slideNo);
    //                 vm.ps_currentSelection = slideNo == noSlides ? "1" : (slideNo + 1).toString();
    //                 var elem = "#people-slide-" + vm.ps_currentSelection;
    //                 $(elem).trigger("click");
    //             }, 10000);
    //         },

    //         galleryIconDisplay: function (index) {

    //             var vm = this;

    //             // console.log("Gallery Icon Display");
    //             // console.log(index);
    //             // console.log(vm.slides[index].Category);

    //             if (vm.slides[index].Category == "Talking Heads") {
    //                 $('.videoGallery').show();
    //                 $('.slideGallery').hide();
    //             } else {
    //                 $('.videoGallery').hide();
    //                 $('.slideGallery').show();
    //             }
    //         }
    //     }
    // })

    checkFileExistence = function (file) {
        result = false;
        jQuery.ajaxSetup({
            async: false
        });
        $.get(file)
            .done(function () {
                result = true;
            })
            .fail(function () {
                result = false;
            })
        jQuery.ajaxSetup({
            async: true
        });
        return (result);
    }

})