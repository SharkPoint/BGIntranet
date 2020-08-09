document.onreadystatechange = function () {
    "complete" === document.readyState && ($(".loadingSpinner").fadeOut(50), $(".engage").click(() => {
        window.open("https://app.engageyourpeople.com/login", target = "_blank")
    }), $(".engageGallery").click(() => {
        window.open("https://corporatedocument.sharepoint.com/sites/bgintranet/sitepages/intranet/Gallery.aspx", target = "_self")
    }), $(".peopleHR").click(() => {
        window.open("https://cds.peoplehr.net", target = "_blank")
    }), $(".staffHandbook").click(() => {
        window.open("https://corporatedocument.sharepoint.com/sites/bgintranet/sitepages/Intranetdev/StaffHandbook.aspx", target = "_self")
    }), $(".eap").click(() => {
        window.open("https://corporatedocument.sharepoint.com/sites/bgintranet/sitepages/Intranetdev/Eap.aspx", target = "_self")
    }), $(".talkingHeads").click(() => {
        window.open("https://corporatedocument.sharepoint.com/sites/bgintranet/sitepages/Intranetdev/VideoGallery.aspx?vt=MAD", target = "_self")
    }), $(".myFavoriteThings").click(() => {
        window.open("https://corporatedocument.sharepoint.com/sites/bgintranet/sitepages/Intranetdev/VideoGallery.aspx?vt=myFavThings", target = "_self")
    }), $(".loveMyIdeas").click(() => {
        window.open("https://corporatedocument-9eed295e264c7d.sharepoint.com/sites/IntranetIdeaBoard/IdeaBoard/pages/Default.aspx?SPHostUrl=https://corporatedocument.sharepoint.com/sites/IntranetIdeaBoard/&SPLanguage=en-US&SPClientTag=0&SPAppWebUrl=https://CorporateDocument-9eed295e264c7d.sharepoint.com/sites/IntranetIdeaBoard/IdeaBoard/", target = "_blank")
    }), $(".iceAwards").click(() => {
        window.open("https://corporatedocument.sharepoint.com/sites/bgintranet/sitepages/Intranetdev/IceAwards/IceAwards.aspx", target = "_self")
    }), $(".jobBoard").click(() => {
        window.open("https://corporatedocument.sharepoint.com/sites/bgintranet/sitepages/Intranetdev/JobBoard.aspx", target = "_self")
    }), $(".learningDevelopment").click(() => {
        window.open("https://www.linkedin.com/learning", target = "_blank")
    }), $(".peopleData").click(() => {
        window.open("https://corporatedocument.sharepoint.com/sites/bgintranet/sitepages/Intranetdev/PeopleData.aspx", target = "_self")
    }), $(".whistleBlower").click(() => {
        window.open("https://corporatedocument.sharepoint.com/sites/bgintranet/sitepages/intranetdev/news.aspx?pageURL=https://corporatedocument.sharepoint.com/sites/groupnews/SitePages/Concerned--Report-It!.aspx", target = "_self")
    }), $(".medicash").click(() => {
        window.open("https://corporatedocument.sharepoint.com/sites/bgintranet/sitepages/Intranetdev/news.aspx?pageURL=https://corporatedocument.sharepoint.com/sites/groupnews/SitePages/Medicash.aspx", target = "_self")
    }), $(".cyprus").click(() => {
        window.open("https://corporatedocument.sharepoint.com/sites/bgintranet_people/AdHoc%20Docs/20200220_CDS_Org%20Chart.pdf", target = "_blank")
    }), $(".onBoarding").click(() => {
        window.open("https://corporatedocument.sharepoint.com/sites/bgintranet/sitepages/Intranetdev/PDFDisplay.aspx?typ=Onboarding", target = "_self")
    }), $(".recruitment").click(() => {
        window.open("https://corporatedocument.sharepoint.com/sites/bgintranet/sitepages/Intranetdev/PDFDisplay.aspx?typ=Recruitment", target = "_self")
    }), $(".howToGuides").click(() => {
        window.open("https://corporatedocument.sharepoint.com/sites/bgintranet/sitepages/Intranetdev/PDFDisplay.aspx?typ=How%20To%20Guide", target = "_self")
    }), $(".tedTalks").click(() => {
        window.open("https://corporatedocument.sharepoint.com/sites/bgintranet/sitepages/Intranetdev/TedTalks.aspx", target = "_self")
    }), $(".feedBack").click(() => {
        window.open("https://forms.office.com/Pages/ResponsePage.aspx?id=Sn0AGU8lv0-MjcWbbTK3ZuqDZB9eOdVEqoeBCbuJYVBURDcwMkZQRVZQWFk3SkdGQUpKUEtFWlBHVi4u", target = "_blank")
    }), $(".homeWorking").click(() => {
        window.open("HomeWorking.aspx", target = "_self")
    }), $(".wellBeing").click(() => {
        window.open("PeopleNewsArchive.aspx?srch=Wellness-Mental_Health", target = "_self")
    }), $(".kidsCorner").click(() => {
        window.open("PeopleNewsArchive.aspx?srch=KidsCorner", target = "_self")
    }))
};
var people_slideShow = new Vue({
    el: ".people-slides",
    data: {
        slides: [],
        ps_currentSelection: 1,
        showReadMore: !1,
        slideshowCounter: 1
    },
    created: function () {
        this.getNewNews()
    },
    methods: {
        getNewNews: function () {
            vm = this;
            //Hide the medicash tile if the user is from Cyprus and vice versa
            var user, office;
            console.log("Live User")
            console.log(JSON.parse(localStorage.getItem("userDetails")))
            "cyprus" == JSON.parse(localStorage.getItem("userDetails")).Office.toLowerCase() ? $(".cyprus").removeClass("hideTile") : $(".medicash").removeClass("hideTile");

            //Start of GetNews Function
            vm = this;
            var requestUri = peopleURL + "\\_api\\web\\lists\\getbytitle('Site Pages')\\items?$select=EncodedAbsUrl,OData__OriginalSourceUrl,ID,Title,Category,ContentTypeId,ShowLink,ShowTitle,BannerImageUrl,Description,ShowInPeopleTile&$filter=ShowInPeopleTile eq 1&$top=10&$orderby=Modified desc";
            axios(requestUri).then((function (response) {
                vm.slides = response.data.value;
                var slideCount = vm.slides.length,
                    elemCounter = 0,
                    NavElements = "",
                    peoplePrevNav = "",
                    peopleNextNav = "";

                vm.slides.forEach((function (element, i) {

                        //Check which category we are using as this will drive the link
                        var linkURL = null;
                        var linkText = null;
                        switch (element.Category) {
                            case "KidsCorner":
                                linkURL = "PeopleNewsArchive.aspx?srch=KidsCorner";
                                linkText = "Read More In Kids Corner";
                                // element.ShowLink = 'Yes'
                                // element.ShowTitle = 'Yes'
                                break;
                            case "MAD":
                                linkURL = "VideoGallery.aspx?vt=MAD";
                                linkText = "Watch Now In The MAD Gallery";
                                // element.ShowLink = 'Yes'
                                // element.ShowTitle = 'Yes'
                                break;
                            case "Two Minute Interview":
                                linkURL = "VideoGallery.aspx?vt=myFavThings";
                                linkText = "Watch Now In The Favourite Things Gallery";
                                // element.ShowLink = 'Yes'
                                // element.ShowTitle = 'Yes'
                                break;
                            case "Talking Heads":
                                linkURL = "VideoGallery.aspx?vt=Talking%20Heads";
                                linkText = "Check Out The Talking Heads Gallery";
                                // element.ShowLink = 'Yes'
                                // element.ShowTitle = 'Yes'
                                break;
                            case "Ted Talks":
                                linkURL = "TedTalks.aspx";
                                linkText = "Watch It Now in The Ted Talks Gallery";
                                // element.ShowLink = 'Yes'
                                // element.ShowTitle = 'Yes'
                                break;
                            case "Wellness-Emotional_Intelligence":
                                linkURL = "PeopleNewsArchive.aspx?srch=Wellness-Emotional_Intelligence";
                                linkText = "Read More About This In BIG Wellbeing";
                                // element.ShowLink = 'Yes'
                                // element.ShowTitle = 'Yes'
                                break;
                            case "Wellness-Financial":
                                linkURL = "PeopleNewsArchive.aspx?srch=Wellness-Financial";
                                linkText = "Read More About This In BIG Wellbeing";
                                // element.ShowLink = 'Yes'
                                // element.ShowTitle = 'Yes'
                                break;
                            case "Wellness-Managing_Stress":
                                linkURL = "PeopleNewsArchive.aspx?srch=Wellness-Managing_Stress";
                                linkText = "Read More About This In BIG Wellbeing";
                                // element.ShowLink = 'Yes'
                                // element.ShowTitle = 'Yes'
                                break;
                            case "Wellness-Mental_Health":
                                linkURL = "PeopleNewsArchive.aspx?srch=Wellness-Mental_Health";
                                linkText = "Read More About This In BIG Wellbeing";
                                // element.ShowLink = 'Yes'
                                // element.ShowTitle = 'Yes'
                                break;
                            case "People Tile":
                                //The content id checked for is for news links and so the link is to the OData__OriginalSourceUrl not the page itself
                                if (element.ContentTypeId == "0x0101009D1CB255DA76424F860D91F20E6C4118002A50BFCFB7614729B56886FADA02339B00D65720AB89295C40882A55EA4C900332") {
                                    linkURL = element.OData__OriginalSourceUrl;
                                    // element.ShowLink = 'Yes';
                                    // element.ShowTitle = 'Yes';
                                    linkText = "Read More"
                                } else {
                                    linkURL = intranetNews + "?pageURL=" + element.EncodedAbsUrl;
                                    linkText = "Read More"
                                }
                                break;
                            default: {
                                console.log("Document has no category")
                            }
                        }

                        console.log(element);
                        var res = element.BannerImageUrl.Url.includes('guidSite') ? '&resolution=5' : '';
                        element.imgURL = "url(" + element.BannerImageUrl.Url + res + ")",
                        element.newsLink = linkURL
                        element.BGTitle = element.Title.substring(0, 60),
                        element.readMoreText = element.ShowLink == 'Yes' ? linkText : "",
                        element.ShowLink = element.ShowLink == 'Yes' ? 'Yes' : 'No',
                        element.showText = element.ShowTitle == 'Yes',
                        elemCounter++,
                        NavElements += '<input type="radio" class="css-fadeshow" name="people-fadeshow" id="people-slide-' + elemCounter + '" />',
                        peoplePrevNav += '<label class="people-prev-btn" for="people-slide-' + elemCounter + '"></label>',
                        peopleNextNav += '<label class="people-next-btn" for="people-slide-' + elemCounter + '"></label>'
                    })),

                    $("#NavElements").prepend(NavElements);
                    $("#peoplePrevNav").append(peoplePrevNav);
                    $("#peopleNextNav").append(peopleNextNav);

                vm.$nextTick((function () {
                    // vm.updateThermometer(),
                    // $("#goal-thermometer").click((function () {
                    //     vm.updateThermometer()
                    // })), 
                    vm.updateSlideshow(),
                        $("input[type=radio][name=people-fadeshow]").change(function () {
                            var currSel = $(event.target)[0].id.split("-")[2];
                            vm.ps_currentSelection = currSel
                        })

                    //Manage Rollover of read more link
                    $(".tileLink").mouseover(function () {
                        console.log("Over Now");
                        if (vm.slides[vm.ps_currentSelection - 1].ShowLink == 'Yes') {
                            $(".readMoreText").css("transform", "scale(1.1)");
                            $('.tileLink').css("cursor", "pointer");
                        }

                    });
                    $(".tileLink").mouseout(function () {
                        console.log("Out Now");
                        if (vm.slides[vm.ps_currentSelection - 1].ShowLink == 'Yes') {
                            $(".readMoreText").css("transform", "scale(1)");
                            $('.tileLink').css("cursor", "default");
                        }

                    });
                }))
            })).catch((function (error) {
                console.log(error)
            }))
        },
        showNews: function (test) {
            console.log(this.slides[this.ps_currentSelection - 1].ShowLink);
            if (this.slides[this.ps_currentSelection - 1].ShowLink == 'Yes') {
                var newsURL = this.slides[this.ps_currentSelection - 1].newsLink;
                let target = !newsURL.includes("https") || newsURL.includes("corporatedocument.sharepoint.com") ? "_self" : "_blank";
                window.open(newsURL, target)
            }
        },
        updateThermometer: function () {
            var requestUri = peopleURL + "\\_api\\web\\lists\\getbytitle('Element Config')\\items?$select=Element,Title&$filter=Element eq 'Thermometer Reading'",
                response;
            axios(requestUri).then((function (response) {
                var updateVal = response.data.value[0].Title;
                Update(parseInt(updateVal))
            }))
        },
        updateSlideshow: function () {
            var vm = this,
                noSlides = vm.slides.length,
                interval = setInterval((function () {
                    var slideNo = parseInt(vm.ps_currentSelection);
                    vm.ps_currentSelection = slideNo == noSlides ? "1" : (slideNo + 1).toString();
                    var elem = "#people-slide-" + vm.ps_currentSelection;
                    $(elem).trigger("click")
                }), 1e4)
        }
    }
});