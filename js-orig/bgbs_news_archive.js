
$(document).ready(function () {

    $('.selectMonth').select2({
        width: '100%',
        placeholder: 'Month',
        minimumResultsForSearch: Infinity,
    })

    $('.selectYear').select2({
        width: '100%',
        placeholder: 'Year',
        minimumResultsForSearch: Infinity,
    })

    $('.selectCompany').select2({
        width: '100%',
        placeholder: 'Company',
        minimumResultsForSearch: Infinity,
    })

    function formatResult(item) {
        return item.Title;
    };

    function formatSelection(item) {
        return item.Title;
    };
                
    //Set the pre data set button to disabled inititially
    $('.PrevButton').prop('disabled', true);

});

document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
        // $(".loadingSpinner").fadeOut(50);
    }
}

vm_NewsList = new Vue({

    el: '.NewsList',
    data: {
        canAdd: false,
        canEdit: false,
        currentUserRoles: [],
        NewsItems: null,
        startRow: 0,
        totalRows: 0,
        step:5,
        rowLimit: 5,
    },

    created: function () {
        this.getFTNews()
    },

    methods: {

        createNews: function() {

            window.open("https://corporatedocument.sharepoint.com/sites/groupnews/SitePages/Forms/ByAuthor.aspx?viewid=25c7b083-a856-445c-b462-9c5448bea20e","_self")
        },

        editNews: function () {

            //This is an onclick within an onclick so the following makes sue the upper level click is not actioned
            //Just the actual target being clicked.
            if (!e) var e = window.event;
            e.cancelBubble = true;
            if (e.stopPropagation) e.stopPropagation();
            var url = $(event.target).closest('.NewsContainer').find('.pageURL').val();

            //Check if edit rights before opening
            window.open(url + '?ControlMode=Edit&DisplayMode=Design', '_self');
        },

        pageNav: function (){

            var curRow = this.startRow;
            var totalRow = this.totalRows;

            if($(event.target).hasClass('PrevButton')){
                this.startRow = curRow - this.step < 0 ? 0 : curRow - this.step;               
            }else{
                this.startRow = curRow + this.step >= totalRow ? curRow : curRow + this.step;                
            }   

            curRow = this.startRow;

            $('.PrevButton').prop('disabled', this.startRow == 0 ? true : false);
            $('.NextButton').prop('disabled', totalRow <= curRow + this.step ? true : false);   

            this.getFTNews();
        },

        getFTNews: function () {

            if(qs("srch") != null && $('#searchTerm').val() == "") {
                $('#searchTerm').val(qs("srch"))
            };

            var term = $('#searchTerm').val() == '' ? '*' : $('#searchTerm').val();
            var termCompany = ($('.selectCompany').val() == '' || $('.selectCompany').val() == 'All') ? '*' : $('.selectCompany').val();
            var termMonth = ($('.selectMonth').val() == '' || $('.selectMonth').val() == '0') ? '*' : $('.selectMonth').val();
            var termYear = $('.selectYear').val() == '' ? '*' : $('.selectYear').val();  

            
            //Drop out if no search criteria
            if(term==""){return;}

            var vm = this;

            var url = newsURL + "_api/search/query?querytext='(" + term + ")+AND+(path:https://corporatedocument.sharepoint.com/sites/groupnews/SitePages)+AND+RefinableString08:Yes+AND+RefinableString10:" + termMonth + "+AND+RefinableString100:" + termYear + "+AND+RefinableString09:" + termCompany + "'&enableSorting=true&sortlist='LastModifiedTime:descending'&rowlimit=" + this.rowLimit + "&startrow=" + this.startRow;
            console.log(url);
            axios(url).then(function (response) {

                // console.log(response);
                vm.totalRows = response.data.PrimaryQueryResult.RelevantResults.TotalRows;

                console.log(response.data.PrimaryQueryResult.RelevantResults);

                //If records returned is less than the step then disable the next button
                console.log(response);
                console.log("Step - " + vm.step );
                console.log("totalRows - " + vm.totalRows );
                console.log("startRow - " + vm.startRow );
                if(vm.startRow == 0){$('.NextButton').prop('disabled', vm.step >= vm.totalRows ? true : false);}
                

                //Initiate Doc Counter
                var upperStep = Number(vm.startRow) + Number(vm.step) > Number(vm.totalRows) ? Number(vm.totalRows) : Number(vm.startRow) + Number(vm.step);
                var docCounter = Number(vm.startRow) + 1 + " to " + upperStep + " of " + Number(vm.totalRows) + " docs"
                $('#docCounter').text(docCounter);

                var results = response.data.PrimaryQueryResult.RelevantResults.Table.Rows;
                // console.log(results);
                vm.NewsItems = [];

                if(results.length==0){
                    $('.Pagination').css('display','none');   
                    // $('Body').css('background-image','url(assets/images/NoSearchResults.png)');
                    $('.noResults').css('display','block');
                    $('.noResults').html("<p>No Results Found</p><p>Please Try Again</p>")
                }else{
                    $('.Pagination').css('display','block');  
                    $('Body').css('background-image','none');   
                    $('.noResults').css('display','none');        

                    results.forEach(element => {
                        var NewsItem = [];

                        console.log("element");
                        console.log(element)
                            
                        element.Cells.forEach(key => {

                            switch (key.Key) {
                                case 'Title':
                                    NewsItem.Title = key.Value;
                                    break;
                                case 'Description':
                                    NewsItem.Description = key.Value;
                                    break;
                                case 'LastModifiedTime':
                                    NewsItem.LastUpdated = moment(key.Value).format("Do MMMM YYYY");
                                    break;
                                case 'Author':
                                    NewsItem.Author = key.Value;
                                    var initials = key.Value.match(/\b\w/g) || [];
                                    initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
                                    NewsItem.initials = initials
                                    break;
                                case 'PictureThumbnailURL':
                                    NewsItem.imgURL = key.Value + "&Resolution=6";
                                    break;
                                case 'ViewsRecent':
                                    NewsItem.RecentViews = key.Value > 0 ? " - " + key.Value + " views" : '';
                                    break;
                                case 'ViewsLifeTime':
                                    NewsItem.LifetimeViews = key.Value > 0 ? " - " + key.Value + " views" : '';
                                    break;
                                case 'HitHighlightedSummary':
                                    NewsItem.HitHighlightedSummary = key.Value;
                                    break;
                                case 'OriginalPath':
                                    NewsItem.pageUrl = key.Value;
                                    break;
                            }
                        });
                        vm.NewsItems.push(NewsItem)
                    });
                    // console.log(vm.NewsItems);  

                    vm.$nextTick(function () {

                        $(".loadingSpinner").fadeOut(50);
                        vm.getPermissions();
                    });                
  
                }

            }).catch(function(error){
                console.log(error);
            })
        },

        getPermissions: function () {

                var vm = this;
                var userProfile = JSON.parse(localStorage.getItem('userDetails'));
                vm.currentUserRoles = userProfile.Roles;
                vm.canAdd = vm.currentUserRoles.includes("News Creator");
                vm.canEdit = vm.currentUserRoles.includes("News Editor");
                console.log("Permissions");
                console.log(vm.currentUserRoles);
                console.log(vm.canAdd);
                console.log(vm.canEdit);

        },

        showNews: function () {
            var pageURL = $(event.target).closest('.NewsContainer').find('.pageURL').val();
            window.open("news.aspx?pageURL=" + pageURL, '_self');
        },
    }
});




