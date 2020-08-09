document.onreadystatechange = function () {
    if (document.readyState === 'complete') {

        $(".loadingSpinner").fadeOut(50);

        //clicks
        $('.engage').click(() => {
            window.open('https://app.engageyourpeople.com/login', target = '_blank');
        })

        $('.engageGallery').click(() => {
            window.open('https://corporatedocument.sharepoint.com/sites/bgintranet/sitepages/intranet/Gallery.aspx', target = '_self');
        })

        $('.peopleHR').click(() => {
            window.open('https://cds.peoplehr.net', target = '_blank');
        })

        $('.staffHandbook').click(() => {
            window.open('https://corporatedocument.sharepoint.com/sites/bgintranet/sitepages/Intranetdev/StaffHandbook.aspx', target = '_self');
        })

        $('.eap').click(() => {
            window.open('https://corporatedocument.sharepoint.com/sites/bgintranet/sitepages/Intranetdev/Eap.aspx', target = '_self');
        })

        $('.talkingHeads').click(() => {
            window.open('https://corporatedocument.sharepoint.com/sites/bgintranet/sitepages/Intranet/VideoGallery.aspx?vt=MAD', target = '_self');
        })

        $('.myFavoriteThings').click(() => {
            window.open('https://corporatedocument.sharepoint.com/sites/bgintranet/sitepages/Intranet/VideoGallery.aspx?vt=myFavThings', target = '_self');
        })

        $('.loveMyIdeas').click(() => {
            window.open('https://corporatedocument-9eed295e264c7d.sharepoint.com/sites/IntranetIdeaBoard/IdeaBoard/pages/Default.aspx?SPHostUrl=https://corporatedocument.sharepoint.com/sites/IntranetIdeaBoard/&SPLanguage=en-US&SPClientTag=0&SPAppWebUrl=https://CorporateDocument-9eed295e264c7d.sharepoint.com/sites/IntranetIdeaBoard/IdeaBoard/', target = '_blank');
        })

        $('.iceAwards').click(() => {
            window.open('https://corporatedocument.sharepoint.com/sites/bgintranet/sitepages/Intranetdev/IceAwards/IceAwards.aspx', target = '_self');
        })

        $('.jobBoard').click(() => {
            window.open('https://corporatedocument.sharepoint.com/sites/bgintranet/sitepages/Intranetdev/JobBoard.aspx', target = '_self');
        })

        $('.learningDevelopment').click(() => {
            window.open('https://www.linkedin.com/learning', target = '_blank');
        })

        $('.peopleData').click(() => {
            window.open('https://corporatedocument.sharepoint.com/sites/bgintranet/sitepages/Intranetdev/PeopleData.aspx', target = '_self');
        })

        $('.whistleBlower').click(() => {
            window.open('https://corporatedocument.sharepoint.com/sites/bgintranet/sitepages/intranetdev/news.aspx?pageURL=https://corporatedocument.sharepoint.com/sites/groupnews/SitePages/Concerned--Report-It!.aspx', target = '_self');
        })

        $('.medicash').click(() => {
            window.open('https://corporatedocument.sharepoint.com/sites/bgintranet/sitepages/Intranetdev/news.aspx?pageURL=https://corporatedocument.sharepoint.com/sites/groupnews/SitePages/Medicash.aspx', target = '_self');
        })

        $('.cyprus').click(() => {
            window.open('https://corporatedocument.sharepoint.com/sites/bgintranet_people/AdHoc%20Docs/20200220_CDS_Org%20Chart.pdf', target = '_blank');
        })

        $('.onBoarding').click(() => {
            window.open('https://corporatedocument.sharepoint.com/sites/bgintranet/sitepages/Intranetdev/PDFDisplay.aspx?typ=Onboarding', target = '_self');
        })

        $('.recruitment').click(() => {
            window.open('https://corporatedocument.sharepoint.com/sites/bgintranet/sitepages/Intranetdev/PDFDisplay.aspx?typ=Recruitment', target = '_self');
        })

        $('.howToGuides').click(() => {
            window.open('https://corporatedocument.sharepoint.com/sites/bgintranet/sitepages/Intranetdev/PDFDisplay.aspx?typ=How%20To%20Guide', target = '_self');
        })

        $('.tedTalks').click(() => {
            window.open('https://corporatedocument.sharepoint.com/sites/bgintranet/sitepages/Intranetdev/TedTalks.aspx', target = '_self');
        })

        $('.feedBack').click(() => {
            window.open('https://forms.office.com/Pages/ResponsePage.aspx?id=Sn0AGU8lv0-MjcWbbTK3ZuqDZB9eOdVEqoeBCbuJYVBURDcwMkZQRVZQWFk3SkdGQUpKUEtFWlBHVi4u', target = '_blank');
        })

        $('.homeWorking').click(() => {
            window.open('HomeWorking.aspx', target = '_self');
        })        
    }
}

var people_slideShow = new Vue({

    el: '.people-slides',
    data: {
        slides: [],
        ps_currentSelection: 1,
        showReadMore: false,
        slideshowCounter: 1,
    },

    created: function () {
        this.getNewNews();
    },

    methods: {

        getNewNews: function () {

            //Check whether to display the cyprus tile(s)
            var user = JSON.parse(localStorage.getItem('userDetails'));
            var office = user.Office;
            // office = "Cyprus";
            if (office.toLowerCase() == "cyprus") {
                $('.cyprus').removeClass( "hideTile" );
            } else {
                $('.medicash').removeClass( "hideTile" );
            }

            var requestUri = peopleURL + "\\_api\\web\\lists\\getbytitle('Site Pages')\\items?$select=EncodedAbsUrl,ID,Title,Category,Link_x0020_To_x0020_Page,BannerImageUrl,Description,ShowInPeopleTile&$filter=ShowInPeopleTile eq 1&$top=10&$orderby=Modified desc"

            // console.log(requestUri);
            var vm = this;

            var sitePages = axios(requestUri);
            sitePages.then(function (response) {
                vm.slides = response.data.value;

                // console.log(vm.slides);
                var slideCount = vm.slides.length
                var elemCounter = 0;
                var NavElements = "";
                var peoplePrevNav = "";
                var peopleNextNav = ""

                vm.slides.forEach(function (element, i) {
                    element.imgURL = "url(" + element.BannerImageUrl.Url + "&resolution=5 )";
                    element.newsLink = intranetNews + "?pageURL=" + element.EncodedAbsUrl;
                    element.BGTitle = element.Title.substring(0, 60)
                    element.showReadMore = element.Link_x0020_To_x0020_Page == true ? "Watch" : "";
                    element.showText = element.Link_x0020_To_x0020_Page == true;

                    elemCounter++
                    NavElements += '<input type="radio" class="css-fadeshow" name="people-fadeshow" id="people-slide-' + elemCounter + '" />'
                    peoplePrevNav += '<label class="people-prev-btn" for="people-slide-' + elemCounter + '"></label>'
                    peopleNextNav += '<label class="people-next-btn" for="people-slide-' + elemCounter + '"></label>'
                });

                //Set the showVideoGalleryIcon
                vm.galleryIconDisplay(0);

                $("#NavElements").prepend(NavElements);
                $("#peoplePrevNav").append(peoplePrevNav);
                $("#peopleNextNav").append(peopleNextNav);

                vm.$nextTick(function () {
                    vm.updateThermometer();
                    $('#goal-thermometer').click(function () {
                        vm.updateThermometer();
                    })
                    //Start slideshow
                    vm.updateSlideshow();

                    //Slide Change Event
                    $('input[type=radio][name=people-fadeshow]').change(function () {
                        var currSel = ($(event.target)["0"].id).split('-')[2];
                        vm.ps_currentSelection = currSel;
                        vm.galleryIconDisplay(parseInt(currSel) - 1);
                    });

                    //Gallery Icons Click Event
                    $('.slideGallery').click(function () {
                        window.open("./Gallery.aspx", "_self")
                    });
                    $('.videoGallery').click(function () {
                        window.open("./VideoGallery.aspx", "_self")
                    });

                });

            }).catch(function (error) {
                console.log(error);
            })
        },

        showNews: function () {

            // console.log("Click");
            var newsURL = this.slides[this.ps_currentSelection - 1].newsLink;
            window.open(newsURL, "_self");
        },

        //Update the thermometer reading
        updateThermometer: function () {

            //get the latest thermometer value from SharePoint
            var requestUri = peopleURL + "\\_api\\web\\lists\\getbytitle('Element Config')\\items?$select=Element,Title&$filter=Element eq 'Thermometer Reading'"
            var response = axios(requestUri);
            response.then(function (response) {
                var updateVal = response.data.value["0"].Title;
                Update(parseInt(updateVal));
            })
        },

        //update slideshow
        updateSlideshow: function () {
            var vm = this;
            var noSlides = vm.slides.length;
            var interval = setInterval(function () {
                var slideNo = parseInt(vm.ps_currentSelection);
                // console.log("Current - " + vm.ps_currentSelection)
                // console.log("No Slides - " + noSlides + " - Current Slide : " + slideNo);
                vm.ps_currentSelection = slideNo == noSlides ? "1" : (slideNo + 1).toString();
                var elem = "#people-slide-" + vm.ps_currentSelection;
                $(elem).trigger("click");
            }, 10000);
        },

        galleryIconDisplay: function (index) {

            var vm = this;

            // console.log("Gallery Icon Display");
            // console.log(index);
            // console.log(vm.slides[index].Category);

            if (vm.slides[index].Category == "Talking Heads") {
                $('.videoGallery').show();
                $('.slideGallery').hide();
            } else {
                $('.videoGallery').hide();
                $('.slideGallery').show();
            }
        }
    }
})