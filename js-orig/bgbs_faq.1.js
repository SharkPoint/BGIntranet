$(document).ready(function () {

    $('.faqQuestion').select2({

        ajax: {
            url: siteURL + "/_api/web/lists/GetByTitle('Faq')/Items",
            dataType: "json",
            data: function (term) {
                var query = "";
                if (term) {
                    query = "substringof('" + term.term + "', Title)";
                }
                return {

                    "$filter": query,
                };
            },

            processResults: function (data) {

                var dataObjs = [];
                var dataObj;
                var dataItems = data.value;
                for (i = 0; i < dataItems.length; i++) {

                    dataObj = {
                        id: dataItems[i].ID,
                        text: dataItems[i].Title,
                        category: dataItems[i].Category,
                    }
                    dataObjs.push(dataObj);
                }
                return {
                    results: dataObjs
                };
            },

            params: {
                contentType: "application/json;odata=verbose",
                headers: {
                    "accept": "application/json;odata=verbose"
                }
            }
        },

        width: '100%',
        placeholder: 'Please Type in Your Question',
        minimumInputLength: 1,
        templateResult: function (item) {
            return item.Title || item.text;
        },
        templateSelection: function (item) {
            return item.Title || item.text;
        },
    }).on('change', function (e) {
        // Access to full data
        selFaq = $(this).select2('data');
        if (selFaq != null) {
            console.log(selFaq[0].id);
            window.open("faqAnswer.aspx?id=" + selFaq[0].id + "&cat=" + selFaq[0].category, "_self")
        }
    });

    function formatResult(item) {
        return item.Title;
    };

    function formatSelection(item) {
        return item.Title;
    };

    // Function to get parameter from url
    function getURLParam(name, url) {
        // get query string part of url into its own variable
        url = decodeURIComponent(url);
        var query_string = url.split("?");

        // make array of all name/value pairs in query string
        var params = query_string[1].split("&");

        // loop through the parameters
        var i = 0;
        while (i < params.length) {
            // compare param name against arg passed in
            var param_item = params[i].split("=");
            if (param_item[0] == name) {
                // if they match, return the value
                return param_item[1];
            }
            i++;
        }
        return "";
    }

    //Handle New Faq - Functions In bgbs_utils
    $('#newFaq').click(() => {
        CreateNewFaq();
    });
    $('#SaveNewFAQ').click(function (e) {
        SaveNewFaq();
    });

});

document.onreadystatechange = function () {
    if (document.readyState === 'complete') {

        $(".se-pre-con").fadeOut(50);
    }
}


// Main
vm_Main = new Vue({

    el: '#content',
    data: {
        summaryLength:400,
        selectedFAQ: [],
        breadCrumb: null,
        showBreadCrumb: true,
        showMain: true,
        showSingleFaq: false,
        showCatList: false,
        selectedCategory: null,
        allFaqs: [],
        faqCollection: [],
        baseURL: siteURL + "/_api/Web/Lists/getbytitle('FAQ')/Items?$select=Title,ID,Author/Title,ThumbsUp,ThumbsDown,Answer,Category,NumberOfViews,Created,SortOrder&$expand=Author&$filter=(Status eq 'Active')"
    },

    created: function () {
        this.getFAQs()
    },

    methods: {

        getFAQs: function () {

            this.showMain = false;
            this.showSingleFaq = true;
            this.showCatList = true;

            this.breadCrumb = null;

            var vm = this;
            var endPointUrl = this.baseURL;

            axios.get(endPointUrl)
                .then(response => {

                    var responses = response.data.value;
                    vm.allFaqs = responses.sort(function (a, b) {
                        return (b.NumberOfViews > a.NumberOfViews) - (b.NumberOfViews < a.NumberOfViews);
                    });

                    var Categories = [];
                    var faqCollection = [];

                    $.each(responses, function (i, el) {
                        if ($.inArray(el.Category, Categories) === -1) Categories.push(el.Category);
                    });

                    //Create Most Popular Questions Section
                    var FAQ;
                    var questions = [];
                    FAQ = {
                        Category: 'Most Popular'
                    }
                    for (var i = 0; i < 5; i++) {
                        questions.push(vm.getQuestion(vm.allFaqs[i]));
                    }

                    FAQ.Questions = questions.sort(function (a, b) {
                        return (b.NumberOfViews > a.NumberOfViews) - (b.NumberOfViews < a.NumberOfViews);
                    });
                    faqCollection.push(FAQ);

                    //Create Latest Questions
                    var questions = [];
                    FAQ = {
                        Category: 'Latest'
                    }
                    var faqDateOrder = responses.sort(function (a, b) {
                        return (b.Created > a.Created) - (b.Created < a.Created);
                    });
                    for (var i = 0; i < 5; i++) {
                        questions.push(vm.getQuestion(faqDateOrder[i]));
                    }

                    FAQ.Questions = questions
                    faqCollection.push(FAQ);


                    //Go through each faq entry and group into categories
                    Categories.forEach(element => {
                        FAQ = {
                            Category: element
                        }

                        var questions = [];
                        var counter = 0;

                        // console.log(vm.allFaqs);

                        $.each(vm.allFaqs, function (i, el) {
                            if (el.Category == element) {
                                questions.push(vm.getQuestion(el));
                            }
                        });

                        FAQ.Questions = questions.sort(function (a, b) {
                            return (b.NumberOfViews > a.NumberOfViews) - (b.NumberOfViews < a.NumberOfViews);
                        }).slice(0, 5);
                        faqCollection.push(FAQ);

                    });

                    vm.faqCollection = faqCollection
                    // console.log(vm.faqCollection);    

                    this.$nextTick(function () {
                        setColours();
                    });

                })
        },

        getFaqsForCategory: function (category) {

            this.showMain = true;
            this.showSingleFaq = true;
            this.showCatList = false;

            this.breadCrumb = category;

            var vm = this;
            var catURL = this.baseURL + " and (Category eq '" + category + "')"
            var endPointUrl = (category != "Most Popular" & category != "Latest") ? catURL : this.baseURL;

            axios.get(endPointUrl)
                .then(response => {
                    var FAQ;
                    var questions = [];
                    vm.faqCollection = [];

                    var responses = response.data.value;

                    FAQ = {
                        Category: category
                    }
                    responses.forEach(function (elem) {
                        questions.push(vm.getQuestion(elem));
                    })

                    if (category == "Latest") {
                        FAQ.Questions = questions.sort(function (a, b) {
                            return (b.Created > a.Created) - (b.Created < a.Created);
                        });
                    } else {
                        FAQ.Questions = questions.sort(function (a, b) {
                            return (b.ThumbsUp > a.ThumbsUp) - (b.ThumbsUp < a.ThumbsUp);
                        });
                    }

                    vm.faqCollection.push(FAQ);

                    this.$nextTick(function () {
                        //Handle Pagination
                        $('.FaqsForCat').paginate({

                            // how many items per page
                            perPage: 5,

                            // boolean: scroll to top of the container if a user clicks on a pagination link        
                            autoScroll: false,

                            // which elements to target
                            scope: 'li',

                            // defines where the pagination will be displayed    
                            paginatePosition: ['bottom'],

                            // Pagination selectors
                            containerTag: 'nav',
                            paginationTag: 'ul',
                            itemTag: 'li',
                            linkTag: 'a',

                            // Determines whether or not the plugin makes use of hash locations
                            useHashLocation: true,

                            // Triggered when a pagination link is clicked
                            onPageClick: function () {}

                        });
                    })
                })
        },

        openFaqHome: function () {
            this.getFAQs();
        },

        openCategoryList: function (category) {
            event.preventDefault();
            this.getFaqsForCategory(category);
        },

        openFaqQuestion: function (questionID) {
            event.preventDefault();

            this.showMain = true;
            this.showSingleFaq = false;
            this.showCatList = true;

            var vm = this;
            var endPointUrl = this.baseURL + " and (ID eq '" + questionID + "')"

            axios.get(endPointUrl)
                .then(response => {
                    console.log(response);
                    this.selectedFAQ = vm.getQuestion(response.data.value["0"])
                    this.breadCrumb = this.selectedFAQ.Category;
                })
        },

        getQuestion: function (elem) {

            console.log(elem);
            var shMore = elem.Answer.length > this.summaryLength ?
                    "...  <span class='expand'>MORE >></span>" : "";

            var crtDate = moment(elem.Created, "YYYY-MM-DD HH:mm").utc().format('DD-MM-YYYY');
            question = {
                Title: elem.Title,
                Answer: elem.Answer,
                SortOrder: elem.SortOrder,
                Category: elem.Category,
                NumberOfViews: elem.NumberOfViews,
                Created: crtDate,
                id: elem.ID,
                Author: elem.Author.Title,
                ThumbsUp: elem.ThumbsUp,
                ThumbsDown: elem.ThumbsDown,
                FaqSummaryText: $.trim(elem.Answer).substring(0, this.summaryLength).trim(this) + shMore,
                FaqFullText: elem.Answer
            }

            return question;
        },

        processFeedback: function(id, direction, single) {

            if(single == true){
                if(direction =='down'){
                    this.selectedFAQ.ThumbsDown ++
                }else{
                    this.selectedFAQ.ThumbsUp ++
                } 
            }
        },
    }
});

//Non Vue Functions

function CreateNewFaq() {

    $('#NewFAQModal').on('hidden.bs.modal', function () {
        $('.newFaqDescription').val('')
        $('.mpStatus').text('');
    })

    $('#NewFAQModal').modal('toggle');
}

function SaveNewFaq() {

    if ($('.newFaqDescription').val() == "") {
        $('.newFaqDescription').css('border', '1px solid firebrick');
        $('.mpStatus').css('color', 'firebrick');
        $('.mpStatus').text('Please Enter Your New FAQ');

    } else {

        var itemProperties = {};
        itemProperties['Title'] = $('.newFaqDescription').val();
        itemProperties['FeedbackType'] = 'NewFAQ';
        var updateList = createSPListItem(siteURL, "FaqFeedback", itemProperties)
        updateList.then(function () {
            console.log("Feedback Updated Sucessfully")
            $('#NewFAQModal').modal('toggle');
            swal('Thank You', 'We will find an answer to your FAQ', {
                icon: "success",
                timer: 3000,
            })
        }).catch(function (error) {
            console.log("Feedback Update Failed")
            console.log(error);
            swal('There was a problem saving your FAQ', 'Please try again', {
                icon: "error",
            })
        })
    }
}

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function setColours() {

    const COLORS = [{
            'back': '#00827e',
            'ink': 'white'
        },
        {
            'back': '#8019f7',
            'ink': '#FFFF00'
        },
        {
            'back': '#009ad7',
            'ink': 'yellow'
        },
        {
            'back': '#feb700',
            'ink': 'blue'
        },
        {
            'back': '#ae2490',
            'ink': 'white'
        },
        {
            'back': '#970020',
            'ink': 'white'
        },
    ];

    let counter = 0;
    var boxArray = $('.faqBox').toArray();
    console.log(boxArray);
    var sortedCols = shuffle(COLORS)
    boxArray.forEach((el) => {
        el.style.background = sortedCols[counter].back;
        $(el).find('a').css('color', sortedCols[counter].ink);
        counter++
    })

}