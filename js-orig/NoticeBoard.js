$(document).ready(function () {

    $('.newNote').on('submit', function (e) {
        if (vm_Main.EditMode == true) {
            vm_Main.updateNote();
        } else {
            vm_Main.saveNewNote();
        };
        return false;
    });

    $('.test-bgImage').click(() => {
        var link = $('#bgImage').val();
        if (link != '') window.open(link, '_blank')
    })

    $('.test-bgLink').click(() => {
        var link = $('#bgLink').val();
        if (link != '') window.open(link, '_blank')
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
        vm_Main.createNewNote();
    });
    $('#SaveNewFAQ').click(function (e) {
        SaveNewFaq();
    });

});

document.onreadystatechange = function () {
    if (document.readyState === 'complete') {

        // setColours();        
        $(".loadingSpinner").fadeOut(50);
    }
}


// Main
vm_Main = new Vue({

    el: '.main',
    data: {
        allPosts: [],
        currentNoteID: null,
        EditMode: false,
        bgImage: null,
        bgLink: null,
        validateFields: [{
            'name': '#nbTitle',
            'css': '#nbTitle'
        }, {
            'name': '#nbDescription',
            'css': '#nbDescription'
        }, {
            'name': '.nbCompany .selectCompany',
            'css': '.nbCompany .select2-container--default .select2-selection--single'
        }, {
            'name': '#creatorsPhone',
            'css': '#creatorsPhone'
        }],
        refreshFields: [{
            'name': '#nbTitle',
            'css': '#nbTitle'
        }, {
            'name': '#nbDescription',
            'css': '#nbDescription'
        }, {
            'name': '.nbCompany .selectCompany',
            'css': '.nbCompany .select2-container--default .select2-selection--single'
        }, {
            'name': '#creatorsPhone',
            'css': '#creatorsPhone'
        }, {
            'name': '#bgImage',
            'css': '#bgImage'
        }, {
            'name': '#bgLink',
            'css': '#bgLink'
        }]
    },

    created: function () {
        this.getPosts()
    },

    methods: {

        getPosts: function () {

            var vm = this;
            var endPointUrl = siteURL + "/_api/Web/Lists/getbytitle('NoticeBoard')/Items?$select=Author/Title,BGPhoneNumber,Author/EMail,BGImage,BGLink,Title,ID,Description,NumberOfViews,Created,ThumbsUp,ThumbsDown&$expand=Author&$filter=BGStatus eq 'Active'&$orderby=Created desc";

            axios.get(endPointUrl)
                .then(response => {

                    var responses = response.data.value;
                    vm.allPosts = [];

                    responses.forEach((elem) => {

                        console.log(elem);

                        var nbPost = [];

                        nbPost.ID = elem.ID;
                        nbPost.Title = elem.Title;
                        nbPost.Description = elem.Description;
                        nbPost.Author = elem.Author.Title;
                        nbPost.Email = "mailto:" + elem.Author.EMail + "?Subject=" + elem.Title;
                        nbPost.PhoneNumber = elem.BGPhoneNumber;
                        nbPost.Image = elem.BGImage;
                        nbPost.Link = elem.BGLink;
                        nbPost.Style = getColour();
                        //Control Icon Display
                        nbPost.ActiveImage = elem.BGImage == null ? false : true;
                        nbPost.ActiveLink = elem.BGLink == null ? false : true;
                        nbPost.ActiveDelete = JSON.parse(localStorage.getItem('userDetails')).DisplayName == elem.Author.Title ? true : false;
                        nbPost.LighboxVal = elem.BGImage == null ? false : elem.ID;

                        vm.allPosts.push(nbPost);
                    })

                    console.log(vm.allPosts)

                    vm.$nextTick(function () {
                        handlePagination();
                    });

                })
        },

        searchPosts: function () {

            var term = $('#searchTerm').val() == '' ? '*' : $('#searchTerm').val();
            var termCompany = ($('.selectCompany').val() == '' || $('.selectCompany').val() == 'All') ? '*' : $('.selectCompany').val();
            var termCompany = $('.selectCompany').val() == 'CDS DS' ? 'CDSDS' : termCompany;
            var termMonth = ($('.selectMonth').val() == '' || $('.selectMonth').val() == '0') ? '*' : $('.selectMonth').val();
            var termYear = $('.selectYear').val() == '' ? '*' : $('.selectYear').val();

            var vm = this;

            var url = siteURL + "_api/search/query?querytext='(" + term + ")+AND+(path:https://corporatedocument.sharepoint.com/sites/bgintranet/Lists/NoticeBoard)+AND+ContentType:Item+AND+RefinableString100:Active+AND+RefinableString07:" + termCompany + "'&enableSorting=true&sortlist='Created:descending'&selectproperties='ListItemID,Title,Author,Description,RefinableString07,RefinableString08,RefinableString09,RefinableString10,RefinableString100'&rowlimit='100'";
            axios(url).then(function (response) {

                var results = response.data.PrimaryQueryResult.RelevantResults.Table.Rows;
                console.log(results);
                vm.allPosts = [];
                results.forEach(element => {

                    var postArray = [];

                    element.Cells.forEach(key => {

                        switch (key.Key) {
                            case 'ListItemID':
                                postArray.ID = key.Value;
                                break;
                            case 'Title':
                                postArray.Title = key.Value;
                                break;
                            case 'Description':
                                postArray.Description = key.Value;
                                break;
                            case 'Author':
                                postArray.Author = key.Value;
                                postArray.ActiveDelete = JSON.parse(localStorage.getItem('userDetails')).DisplayName == key.Value ? true : false;
                                break;
                            case 'RefinableString10':
                                postArray.PhoneNumber = key.Value;
                                break;
                            case 'RefinableString08':
                                postArray.Image = key.Value;
                                postArray.ActiveImage = key.Value == "" ? false : true;
                                break;
                            case 'RefinableString09':
                                postArray.Link = key.Value;
                                postArray.ActiveLink = key.Value == "" ? false : true;
                                break;
                        }

                        postArray.Style = getColour();
                    })

                    vm.allPosts.push(postArray);

                });

                console.log(vm.allPosts);

                vm.$nextTick(function () {
                    handlePagination();
                });

            }).catch(function (error) {
                console.log(error);
            })
        },

        deletePost: function () {

            var noteID = event.target.getAttribute('ID');

            if ($(event.target).hasClass('active')) {

                swal({
                        title: "Are You Sure?",
                        text: "Once deleted, you will not be able to recover this note!",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                    .then((willDelete) => {
                        if (willDelete) {

                            var itemProperties = {};
                            itemProperties['BGStatus'] = 'Deleted';

                            var update = UpdateListItemByid(noteID, 'NoticeBoard', itemProperties);
                            update.done((response) => {
                                swal("Your Note Has Been Deleted", {
                                    icon: "success",
                                    timer: 2500
                                });
                                this.getPosts();
                            })
                        }
                    });
            }
        },

        createNewNote: function () {

            this.EditMode = false;
            this.resetFields();

            var userDetails = JSON.parse(localStorage.getItem('userDetails'));
            $('#creatorsName').val(userDetails.DisplayName);
            $('#creatorsPhone').val(userDetails.WorkPhone);
            $('.modal-title').html('Create New Note');

            $('#NewNoteModal').modal('toggle');
        },

        editNote: function () {

            this.currentNoteID = $(event.target).closest('.notePost')["0"].id;
            this.EditMode = true;

            var nbPost = getNoticeBoardById(siteURL, this.currentNoteID);
            nbPost.then((response) => {

                var notePost = response.data.value["0"];
                var authorName = getUserByID(notePost.AuthorId)
                authorName.then((uProfileResponse) => {

                    var aName = uProfileResponse.data.Title;
                    console.log(aName);

                    //Only allow edit if the authorname of note is the same as the current user                    
                    if (JSON.parse(localStorage.getItem('userDetails')).DisplayName == aName) {

                        $('#nbTitle').val(notePost.Title);
                        $('#nbDescription').val(notePost.Description);
                        $('#CompanyCombo').val(notePost.BGCompany).trigger('change');
                        $('#bgImage').val(notePost.BGImage);
                        $('#bgLink').val(notePost.BGLink);
                        $('#creatorsName').val(uProfileResponse.data.Title);
                        $('#creatorsPhone').val(notePost.BGPhoneNumber);

                        $('.modal-title').html('Edit Note');

                        //Now show the modal
                        $('#NewNoteModal').modal('toggle');

                    }else{
                        swal('Stop', 'You Are Not Able To Edit This Note', {
                            icon: "info",
                            timer: 2500,
                        })
                    }
                })
            })
        },

        updateNote: function () {

            var vm = this;
            var itemProperties = {};
            itemProperties['Title'] = $('#nbTitle').val();
            itemProperties['Description'] = $('#nbDescription').val();
            itemProperties['BGCompany'] = $('#CompanyCombo').val() == 'CDS DS' ? 'CDSDS' : $('#CompanyCombo').val();
            itemProperties['BGImage'] = $('#bgImage').val();
            itemProperties['BGLink'] = $('#bgLink').val();
            itemProperties['BGPhoneNumber'] = $('#creatorsPhone').val();

            var update = UpdateListItemByid(vm.currentNoteID, 'NoticeBoard', itemProperties);
            update.done((response) => {
                this.getPosts();
                $('#NewNoteModal').modal('toggle');
            })
        },

        resetFields: function () {

            this.refreshFields.forEach((el => {
                $(el.name).val('');
                $(el.css).css('border', '1px solid #ced4da');
            }))

            $('#CompanyCombo').val('').trigger('change');

        },

        validateForm: function () {

            var vm = this;
            var validArray = [];
            var valid;

            this.validateFields.forEach((el => {
                if ($(el.name).val() == '') {
                    $(el.css).css('border', '1px solid red');
                    vm.valid = false;
                } else {
                    $(el.css).css('border', '1px solid #ced4da');
                    vm.valid = true;
                }
                validArray.push(vm.valid);
            }))
            return validArray;
        },

        saveNewNote: function () {

            //ValidateForm
            var validNote = this.validateForm();

            if (!validNote.includes(false)) {

                var vm = this;

                var itemProperties = {};
                itemProperties['Title'] = $('#nbTitle').val();
                itemProperties['Description'] = $('#nbDescription').val();
                itemProperties['BGCompany'] = $('#CompanyCombo').val();
                itemProperties['BGImage'] = $('#bgImage').val();
                itemProperties['BGLink'] = $('#bgLink').val();
                itemProperties['BGPhoneNumber'] = $('#creatorsPhone').val();
                itemProperties['BGStatus'] = 'Awaiting Approval';

                var updateList = createSPListItem(siteURL, "NoticeBoard", itemProperties)
                updateList.then(function () {
                    console.log("New Note Saved Sucessfully");
                    vm.getPosts();
                    $('#NewNoteModal').modal('toggle');
                    swal('Submitted For Approval', 'You Will Receive An Email Once Approval Is Complete', {
                        icon: "success",
                        timer: 3000,
                    })
                }).catch(function (error) {
                    console.log("Notice Save Failed")
                    console.log(error);
                    swal('There was a problem saving your New Notice', 'Please try again', {
                        icon: "error",
                    })
                })
            }
        },

        setImage: function (field, link) {}
    }
});

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

getColour = function () {

    let COLORS = ['green', 'yellow', 'orange', 'pink', 'blue']
    return (COLORS[getRandomInt(0, 4)]);
}

$('.breadcrumb').click(function () {
    location.reload(true);
});


handlePagination = function () {

    var items = $(".list-wrapper .list-item");
    var numItems = items.length;
    var perPage = 9;

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
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}