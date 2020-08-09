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

        $(".loadingSpinner").fadeOut(50);
    }
}


// Main
vm_Main = new Vue({

    el: '.main',
    data: {
        selectedFAQ: [],
        allFaqs: [],
        faqCollection: [],
    },

    created: function () {
        this.getFAQs()
    },

    methods: {

        getFAQs: function () {

            var vm = this;
            var endPointUrl = siteURL + "/_api/Web/Lists/getbytitle('FAQ')/Items?$select=Title,ID,Answer,Category,NumberOfViews,Created,SortOrder&$filter=Status eq 'Active'";

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
                        question = {
                            Title: vm.allFaqs[i].Title,
                            Answer: vm.allFaqs[i].Answer,
                            SortOrder: vm.allFaqs[i].SortOrder,
                            Category: vm.allFaqs[i].Category,
                            NumberOfViews: vm.allFaqs[i].NumberOfViews,
                            Created: vm.allFaqs[i].Created,
                            id: vm.allFaqs[i].ID
                        }
                        questions.push(question);
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
                        question = {
                            Title: faqDateOrder[i].Title,
                            Answer: faqDateOrder[i].Answer,
                            SortOrder: faqDateOrder[i].SortOrder,
                            Category: faqDateOrder[i].Category,
                            NumberOfViews: faqDateOrder[i].NumberOfViews,
                            Created: faqDateOrder[i].Created,
                            id: vm.allFaqs[i].ID

                        }
                        questions.push(question);
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
                                question = {
                                    Title: el.Title,
                                    Answer: el.Answer,
                                    SortOrder: el.SortOrder,
                                    Category: el.Category,
                                    NumberOfViews: el.NumberOfViews,
                                    Created: vm.allFaqs[i].Created,
                                    id: vm.allFaqs[i].ID
                                }

                                //console.log(question);
                                questions.push(question);
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
    var sortedCols = shuffle(COLORS)
    boxArray.forEach((el) => {
        el.style.background = sortedCols[counter].back;
        $(el).find('a').css('color', sortedCols[counter].ink);
        counter++
    })

}