$(document).ready(function () {

    // run test on initial page load
    vm_Main.checkSize();

    // run test on resize of the window
    $(window).resize(vm_Main.checkSize);

})

vm_Main = new Vue({

    el: '#wrapper',
    data: {
        paras: [],
        headerToShow: "",
        paraToShow: "",
        vCode: "",
        l3: "",
        typeaheadKeywords: [],
    },

    created: function () {
        this.getHandbook()
    },

    methods: {

        getHandbook: function () {

            var user = JSON.parse(localStorage.getItem('userDetails'));
            console.log("User")
            var vm = this;
            var company = user.Company.toUpperCase() == 'BGBS' ? 'CDS' : user.Company.toUpperCase();
            company = user.Company == '' ? 'NEWSPRESS' : user.Company.toLowerCase();
            // company = 'NEWSPRESS'



            var requestUri = peopleURL + "/_api/web/lists/getbytitle('Staff Handbook Repository')/items?$top=1000&$select=Title,Category,SectionTile,Section_x0020_Wording,SortTest4&$filter=((Audience eq null) or (Audience eq '" + company + "'))"

            axios.get(requestUri)
                .then(response => {
                    var data = ""
                    var responses = response.data.value;
                    var allCategories = [];

                    responses.forEach(element => {
                        element.sortOrder = parseFloat(element.SortTest4)
                        element.searchHeader = element.SectionTile;
                        allCategories.push(element.Category);
                        //Now we set the searchHeader - If current set to the generic term purpose it takes the section tile from the parent entity              
                        if (element.SectionTile.toLowerCase() == "purpose") {
                            var parentID = "";
                            var levels = element.Title.split('.');
                            for (i = 0; i < levels.length - 1; i++) {
                                parentID += levels[i] + "."
                            }
                            parentID = parentID.substring(0, parentID.length - 1)

                            var parent = responses.find(function (element) {
                                return element.Title == parentID;
                            });


                            element.searchHeader = parent.SectionTile;
                        }

                    });

                    vm.paras = responses.sort(function (a, b) {
                        return (a.sortOrder > b.sortOrder) - (a.sortOrder < b.sortOrder);
                    });

                    var Categories = allCategories.filter(onlyUnique).sort();
                    var TestCategories;

                    // If the user is not in the cyprus office then dont include the cyprus section
                    var user = JSON.parse(localStorage.getItem('userDetails'));
                    var handBookAdmin = user.Roles.includes("Handbook Administrator");
                    if (user.Office.toLowerCase() != 'cyprus' && handBookAdmin == false) {
                        Categories = Categories.filter(function (value, index, arr) {
                            return value.toLowerCase().includes("cyprus") == false;
                        });
                    }

                    var topLevel = [];
                    var secondlevel = [];
                    var thirdLevel = [];

                    vm.paras.forEach(element => {

                        //Populate the keywords for the type ahead
                        if (element.Section_x0020_Wording != null) {
                            vm.typeaheadKeywords.push(element.Title + ' - ' + element.searchHeader)
                        }
                        //Split the paragraphs into arrays for sorting to display in accordian
                        var paraNo = element.Title.split('.');
                        if (paraNo.length == 1) {
                            topLevel.push(element);
                        } else if (paraNo.length == 2) {
                            secondlevel.push(element);
                        } else {
                            thirdLevel.push(element);
                        }
                    });

                    console.log("vm.paras");
                    console.log(vm.paras);


                    Categories.forEach(category => {

                        vm.l3 += '<li><a class="toggle Category" id="' + category.replace(/ /g, "") + '" href="javascript:void(0);">' + category + '</a>'
                        vm.l3 += '<ul class="inner">'

                        topLevel.filter(element => {
                                return element.Category == category
                            })
                            .forEach(l1Element => {
                                vm.l3 += '<li><a class="toggle Toplevel" id="' + l1Element.Title.split(".").join("_") + '" href="javascript:void(0);">' + l1Element.Title + ' - ' + l1Element.SectionTile
                                if (l1Element.Section_x0020_Wording != null) {
                                    vm.l3 += '<i data-toggle="tooltip" data-placement="top" title="Copy Link To Clipboard" class="far fa-clipboard">'
                                }
                                vm.l3 += '</i></a>'
                                var secondLevelFilter = secondlevel.filter(code => code.Title.split('.')[0] == l1Element.Title);
                                if (secondLevelFilter.length != 0) {
                                    vm.l3 += '<ul class="inner">'
                                    if (l1Element.Section_x0020_Wording != null) {
                                        vm.l3 += '<li class="paraContent">' + l1Element.Section_x0020_Wording + '</li>'
                                    }
                                    secondLevelFilter.forEach(l2Element => {
                                        vm.l3 += '<li><a href="#" class="toggle Secondlevel" id="' + l2Element.Title.split(".").join("_") + '">' + l2Element.Title + ' - ' + l2Element.SectionTile
                                        if (l2Element.Section_x0020_Wording != null) {
                                            vm.l3 += '<i data-toggle="tooltip" data-placement="top" title="Copy Link To Clipboard" class="far fa-clipboard">'
                                        };
                                        vm.l3 += '</i></a>'
                                        var thirdLevelFilter = thirdLevel.filter(code => code.Title.split('.')[0] + "." + code.Title.split('.')[1] == l2Element.Title);
                                        if (thirdLevelFilter.length != 0) {
                                            vm.l3 += '<ul class="inner">'
                                            if (l2Element.Section_x0020_Wording != null) {
                                                vm.l3 += '<li class="paraContent">' + l2Element.Section_x0020_Wording + '</li>'
                                            }
                                            thirdLevelFilter.forEach(l3Element => {
                                                vm.l3 += '<li><a href="#" class="toggle ThirdLevel" id="' + l3Element.Title.split(".").join("_") + '">' + l3Element.Title + ' - ' + l3Element.SectionTile + '<i data-toggle="tooltip" data-placement="top" title="Copy Link To Clipboard" class="far fa-clipboard"></i></a>'
                                                if (l3Element.Section_x0020_Wording != null) {
                                                    vm.l3 += '<ul class="inner"  id="' + l3Element.Title.split(".").join("_") + '"><li class="paraContent">' + l3Element.Section_x0020_Wording + '</li></ul>'
                                                }
                                            })
                                            vm.l3 += '</ul>'
                                        } else {
                                            if (l2Element.Section_x0020_Wording != null) {
                                                vm.l3 += '<ul class="inner"  id="' + l2Element.Title.split(".").join("_") + '"><li class="paraContent">' + l2Element.Section_x0020_Wording + '</li></ul>'
                                            }
                                        }
                                    })

                                } else {
                                    if (l1Element.Section_x0020_Wording != null) {
                                        vm.l3 += '<ul class="inner"  id="' + l1Element.Title.split(".").join("_") + '"><li class="paraContent">' + l1Element.Section_x0020_Wording + '</li>'
                                    }
                                }
                                vm.l3 += '</ul></li>'
                            })
                        vm.l3 += '</ul></li>'
                    })

                    // console.log(vm.l3)

                    vm.$nextTick(function () {

                        $("i").tooltip();

                        //Configure click event of accordian
                        $('.toggle').click(function (e) {
                            e.preventDefault();

                            var $this = $(this);

                            if ($this.next().hasClass('show')) {
                                $this.next().removeClass('show');
                                $this.next().slideUp(350);
                            } else {
                                $this.parent().parent().find('li .inner').removeClass('show');
                                $this.parent().parent().find('li .inner').slideUp(350);
                                $this.next().toggleClass('show');
                                $this.next().slideToggle(350);
                            }
                        })

                        $('.fa-clipboard').click(function (e) {

                            var n = window.location.href.lastIndexOf("/");
                            var staffHandbookURL = window.location.href.substring(0, n + 1) + "StaffHandbook.aspx?srch=";

                            let tmp = document.createElement('input');
                            let srchKey = e.target.parentNode.innerText;

                            //if text of element is purpose then search for parent text and use that to search
                            var srchKeySplit = srchKey.toLowerCase().split(' - ');
                            if(srchKeySplit[1].trim() == "purpose"){
                                var currID = $(e.target).parent().attr("id");
                                var parID = currID.split('_')[0] ; 
                                var parElem = $('#' + parID) ;    
                                var parentText = parElem[0].text.split(" - ")[1];
                                srchKey = srchKeySplit[0] + " - " + parentText;
                            }

                            tmp.value = staffHandbookURL + srchKey;
                            document.body.appendChild(tmp);
                            tmp.select();
                            document.execCommand('copy');

                            Swal.fire({
                                title: '"' + srchKey + '"',
                                text: 'Link Has Been Copied To The Clipboard.',
                                icon: 'success',
                                confirmButtonText: 'Cool',
                                timer: 2500,
                              })  

                            document.body.removeChild(tmp);   
                            
                            e.stopPropagation();

                        })

                        //Configure the type ahead for search
                        vm.configTypeAhead()

                        //Test if search params in URL then drop into search field
                        var srchCriteria = qs("srch");
                        $('#searchBox').val(srchCriteria);

                        //Remove spinner as we should now be loaded
                        $(".loadingSpinner").fadeOut(50);

                        //IF search field has param then search
                        if(srchCriteria != null){vm.searchEvent()}

                    });
                })
        },

        expendSection: function (elem) {

            if (elem.next().hasClass('show')) {
                elem.next().removeClass('show');
            } else {
                elem.parent().parent().find('li .inner').removeClass('show');
                elem.next().toggleClass('show');
                elem.next().slideToggle(350);
            }

        },

        searchEvent: function () {

            var vm = this;

            $("*").removeClass('show');
            $('.toggle').removeClass('show');
            $('.inner').removeClass('show');
            $('.inner').slideUp(350);

            //Hide the mobile keyboard
            $('#mobileSearchBox').blur();

            //If we are in mobile take the search term from #mobileSearchBox otherwise #searchBox
            var searchTerm = $('.mobileSearch').css('display') == 'none' ? $('#searchBox').val() : $('#mobileSearchBox').val();

            if (searchTerm != "") {
                // console.log(searchTerm);
                var wordings = vm.paras.filter(code => code.Section_x0020_Wording != null);
                var searchresults = wordings.filter(code => (code.Section_x0020_Wording.toLowerCase().includes(searchTerm.toLowerCase()) || (code.Title + ' - ' + code.searchHeader).toLowerCase().includes(searchTerm.toLowerCase())));
                console.log("searchTerm");
                console.log(searchTerm);
                console.log("searchresults");
                console.log(searchresults);
                searchresults.forEach((element) => {
                    // console.log('#' + element.Category);
                    var searchParas = element.Title.split('.');

                    //First we expand the category as this will always be needed irrespective of the number of levels beneath
                    var cat = element.Category.replace(/ /g, "");
                    if (!$('#' + cat).hasClass('show')) {
                        vm.expendSection($('#' + cat));
                        $('#' + cat).toggleClass('show');
                    }

                    //Now we decide which of the subsections to display
                    if (searchParas.length == 1) {
                        if (!$('#' + searchParas[0]).hasClass('show')) {
                            vm.expendSection($('#' + searchParas[0]));
                            $('#' + searchParas[0]).toggleClass('show');
                        }
                    } else if (searchParas.length == 2) {
                        if (!$('#' + searchParas[0]).hasClass('show')) {
                            vm.expendSection($('#' + searchParas[0]));
                            $('#' + searchParas[0]).toggleClass('show');
                        }
                        if (!$('#' + searchParas[0] + "_" + searchParas[1]).hasClass('show')) {
                            vm.expendSection($('#' + searchParas[0] + "_" + searchParas[1]));
                            $('#' + searchParas[0] + "_" + searchParas[1]).toggleClass('show');
                        }
                    } else {
                        if (!$('#' + searchParas[0]).hasClass('show')) {
                            vm.expendSection($('#' + searchParas[0]));
                            $('#' + searchParas[0]).toggleClass('show');
                        }
                        if (!$('#' + searchParas[0] + "_" + searchParas[1]).hasClass('show')) {
                            vm.expendSection($('#' + element.Category));
                            vm.expendSection($('#' + searchParas[0] + "_" + searchParas[1]));
                            $('#' + searchParas[0] + "_" + searchParas[1]).toggleClass('show');
                        }
                        if (!$('#' + searchParas[0] + "_" + searchParas[1] + "_" + searchParas[2]).hasClass('show')) {
                            vm.expendSection($('#' + element.Category));
                            vm.expendSection($('#' + searchParas[0] + "_" + searchParas[1] + "_" + searchParas[2]));
                            $('#' + searchParas[0] + "_" + searchParas[1] + "_" + searchParas[2]).toggleClass('show');
                        }
                    }
                })

                console.log(searchresults[0].Title.replace(/\./g, '_'));
                $("body,html").animate({
                        scrollTop: $('#' + searchresults[0].Title.replace(/\./g, '_')).offset().top
                    },
                    2000 //speed
                );
            }
        },

        configTypeAhead: function () {

            var vm = this;
            // Defining the local dataset
            var keywords = vm.typeaheadKeywords;

            // Constructing the suggestion engine
            var keywords = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.whitespace,
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                local: keywords
            });

            // Initializing the typeahead
            $('.typeahead').typeahead({
                hint: true,
                highlight: true,
                /* Enable substring highlighting */
                minLength: 1 /* Specify minimum characters required for showing result */
            }, {
                name: 'keywords',
                source: keywords
            });
        },

        //Function to the css rule
        checkSize: function () {

            var vm = this;

            //Unbind all listeners to start with to prevent multi triggers
            $('#mobileSearchBox, #searchBox, .searchBox, .mobileSearchBox').unbind();

            $('#searchBox').on('typeahead:selected', function () {
                vm.searchEvent();
            });

            $('#searchBox, #mobileSearchBox').on("search", function () {
                vm.searchEvent();
            })

            //Check for click of search icon
            $('.searchBox, .mobileSearchBox').click(() => {
                vm.searchEvent();
            })
        }
    }
});

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

