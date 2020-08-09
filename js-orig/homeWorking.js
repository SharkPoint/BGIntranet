document.onreadystatechange = function () {
    if (document.readyState === 'complete') {

        $(".loadingSpinner").fadeOut(50);

        //clicks

        $('.homeWorkingGuide').click(() => {
            window.open('https://corporatedocument.sharepoint.com/sites/bgintranet_people/AdHoc%20Docs/The%20BG%20Guide%20to%20Working%20From%20Home.pdf', target = '_blank');
        })    
        $('.homeWorkingRiskAssesment').click(() => {
            window.open('https://forms.office.com/Pages/ResponsePage.aspx?id=Sn0AGU8lv0-MjcWbbTK3ZuqDZB9eOdVEqoeBCbuJYVBUQ05VSUxCNlpONklZQ0dYOTgwTEhCMVVXMC4u', target = '_blank');
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