$(document).ready(function () {

    var vm = this;
    var id = qs("id");
    var cat = qs("cat");
    var allFaqs;

    //ID > 0 then we are displaying a single FAQ otherwise we are displaying all FAQS for the category - cat.
    if (id > 0) {

        //Set background colour to teal
        $('main').css('background',"##00827e")
        $('.categoryList').hide();

        var selectedFaq = getFaqById(id)
        selectedFaq.then(function (faq) {

            var numViews = faq.data.value[0].NumberOfViews + 1;

            //PutBreadcrumbs in place
            $('#catCrumb').attr("href", "faqAnswer.aspx?id=0&cat=" + faq.data.value[0]
                .Category);
            $('#catCrumb').text(faq.data.value[0].Category);
            // $('#docCrumb').text(faq.data.value[0].Title);

            //Format The List Of Questions & Answers
            $('.faqSelectedQuestion').text(faq.data.value[0].Title);
            $('.faqSelectedAnswer').html(faq.data.value[0].Answer);
            var crtDate = moment(faq.data.value[0].Created, "YYYY-MM-DD HH:mm").utc().format(
                'DD-MM-YYYY');
            $('.faqDetails').html("<div class='feedback' style='font-size:small;padding-bottom:10px'>" + faq.data
                .value[0].Author.Title + " " + crtDate +
                "&nbsp;&nbsp<i class='far fa-thumbs-up' onclick=(faqFeedback('ThumbsUp'," + id + "))>&nbsp;&nbsp<span id='ThumbsUp'>(" + faq.data.value[0]
                .ThumbsUp +
                ")</span></i>&nbsp;&nbsp;<i class='far fa-thumbs-down' onclick=(faqFeedback('ThumbsDown'," + id + "))>&nbsp;&nbsp<span id='ThumbsDown'>(" + faq.data.value[0]
                .ThumbsDown + ")</span></i></div>");
            //Update the view counter for this faq
            incrementCounter('FAQ', faq.data.value[0].ID, 'NumberOfViews', numViews)

        });

    } else {

        $('.selectedAnswer').hide();

        //Set the background to page background colour
        $('main').css('background',"#202020");

        var vm = this;
        var cat = qs("cat");

        //PutBreadcrumbs in place
        $('#catCrumb').text(cat);
        $('.catBanner').text(cat + " Questions");


        //Formulate filter based upon whether we are returning all FAQs or just those for category
        var filter = (cat == 'Most Popular' || cat == 'Latest') ? "" : " and Category eq '" + cat +
            "'";

        //Get the FAQs From SharePoint    
        var endPointUrl = siteURL +
            "_api/Web/Lists/getbytitle('FAQ')/Items?$select=Author/Title,Title,ID,Answer,Category,ThumbsUp,ThumbsDown,NumberOfViews,Created,SortOrder&$expand=Author&$filter=Status eq 'Active'" +
            filter;
        axios.get(endPointUrl).then(response => {

            var responses = response.data.value;
            if (cat == 'Latest') {
                allFaqs = responses.sort(function (a, b) {
                    return (b.Created > a.Created) - (b.Created < a.Created);
                });
            } else {
                allFaqs = responses.sort(function (a, b) {
                    return (b.ThumbsUp > a.ThumbsUp) - (b.ThumbsUp < a
                        .ThumbsUp);
                });
            }
            var summaryLength = 270;

            for (var i = 0; i < allFaqs.length; i++) {

                var answer = allFaqs[i].Answer;
                var thisID = allFaqs[i].ID;
                var txtAnswer = $(answer).text();
                var shMore = txtAnswer.length > summaryLength ?
                    "...  <span class='expand'>MORE >></span>" : "";

                var crtDate = moment(allFaqs[i].Created, "YYYY-MM-DD HH:mm").utc().format('DD-MM-YYYY');
                var author = allFaqs[i].Author.Title;
                var titleURL = "faqAnswer.aspx?id=" + thisID + "&cat=" + cat;
                var faqTitle = allFaqs[i].Title;
                var numOfViews = allFaqs[i].NumberOfViews;
                var numOfThumbsUp = allFaqs[i].ThumbsUp;
                var numOfThumbDown = allFaqs[i].ThumbsDown;
                var faqSummaryText = $.trim(txtAnswer).substring(0, summaryLength).trim(this);
                var faqFullText = allFaqs[i].Answer;
                var dblSpace = "&nbsp;&nbsp";

                //Format the HTML for ech list item
                $(".FaqsForCat").append(

                    '<li class="faqList">' +

                        '<input type="hidden" id="NumberOfViews" value=' + numOfViews + '>' +

                        '<input type="hidden" id="faqID" value=' + thisID + '>' +

                        '<a href="' + titleURL + '">' +
                        '<span id="itemTitle">' + faqTitle + '</span></a>' +

                        '<input type="hidden" id="NumberOfViews" value="' + numOfViews + '">' +

                        "<div class='feedback' id='itemDetails'>" + author + " " + crtDate +                               

                            dblSpace +
                            "<i class='far fa-thumbs-up' onclick=(faqFeedback('ThumbsUp',0))>" +
                            dblSpace +
                            "<span id='ThumbsUp'>(" + numOfThumbsUp + ")</span></i>" +

                            dblSpace +
                            "<i class='far fa-thumbs-down' onclick=(faqFeedback('ThumbsDown',0))>" +
                            dblSpace +
                            "<span id='ThumbsDown'>(" + numOfThumbDown + ")</span></i>" +

                        "</div>" +

                        '<div class="faqSummary">' + faqSummaryText + shMore + '</div>' +
                        '<div class="faqFull">' + faqFullText + '</div>' +

                    '</li>');
            }

            //Handle See More Button
            $('.faqSummary').click(function () {

                console.log('Clicked');

                var parentListItem = $(event.target.closest( ".faqList" ));
                var numberOfViews = parentListItem.find('#NumberOfViews');
                var thisID = parentListItem.find('#faqID').val();

                //Hide Any Open FullText & Display All Summaries
                $('.faqSummary').show();
                $('.faqFull').hide();

                //For the Selected FAQ Hide The Summary And Show The Full Text
                parentListItem.find('.faqFull').show();
                parentListItem.find('.faqSummary').hide();

                //Increase the view counter for this item 
                var currCount = parseInt(numberOfViews.val());
                numberOfViews = currCount++;
                incrementCounter('FAQ', thisID, 'NumberOfViews', currCount++)
            })


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

        });
    }

});

//Handle FAQ Feedback
function faqFeedback(type,faqID) {

    var elms = event.target.children
    var parent = event.target.parentElement.parentElement.children;

    console.dir(event.target);

    var typeCount = type == "ThumbsUp" ? elms.ThumbsUp.innerHTML: elms.ThumbsDown.innerHTML;
    var count = parseInt(typeCount.substring(1, typeCount.length - 1)) + 1;

    if (faqID == 0)
        var faqID = parent.faqID.value;

    if (type == "ThumbsUp") {
        event.target.children.ThumbsUp.innerHTML = '(' + count + ')';
        incrementCounter('FAQ', faqID, type, count)

    } else {

        $('#NegativeFAQFeedbackModal').modal('show');

        //If Thumbs Down PopUp Modal To Find Out Reason For Negative
        //Reset Form

        $('#NegativeFAQFeedbackModal').on('hidden.bs.modal', function () {
            $('.faqFeedbackDescription').val('')
            $('.mpStatus').text('');
            $('#SaveFAQFeedback').unbind("click");
        })

        $('#SaveFAQFeedback').click(function () {

            if ($('.faqFeedbackDescription').val() == "") {
                $('.faqFeedbackDescription').css('border', '1px solid firebrick');
                $('.mpStatus').css('color', 'firebrick');
                $('.mpStatus').text('Please Enter The Reason For Your Feedback');

            } else {
                elms.ThumbsDown.innerHTML = '(' + count + ')';
                incrementCounter('FAQ', faqID, type, count);

                var itemProperties = {};
                itemProperties['Title'] = $('.faqFeedbackDescription').val();
                itemProperties['AssociatedFAQ'] = faqID;
                itemProperties['FeedbackType'] = 'FAQFeedback';
                var updateList = createSPListItem(siteURL, "FaqFeedback", itemProperties)
                updateList.then(function () {
                    $('#NegativeFAQFeedbackModal').modal('toggle');
                    swal('Thank You', 'Your Comments Have Been Logged', {
                        icon: "success",
                        timer: 3000,
                    })
                }).catch(function (error) {
                    console.log("Feedback Update Failed")
                    console.log(error);
                    swal("There was a problem saving your comments", "Please try again", {
                        icon: "error",
                    })
                })
            }
        })
    }
}