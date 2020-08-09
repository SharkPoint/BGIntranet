$(document).ready(function () {


})

document.onreadystatechange = function () {
    if (document.readyState === 'complete') {

        $(".loadingSpinner").fadeOut(50);
    }
}

vm_Main = new Vue({

    el: '#wrapper',
    data: {
        allImages: [],
    },

    created: function () {
        this.getImages();
    },

    methods: {

        getImages: function () {

            var vm = this;
            vm.showNoResults = false;
            var endPointUrl = "https://corporatedocument.sharepoint.com/sites/bgintranet_people" + "\\_api\\web\\lists\\getbytitle('PeoplePictureLibrary')\\items?$select=FileRef,EncodedAbsThumbnailUrl&$filter=Category%20eq%20%27Engage%20Poster%27";

            console.log(endPointUrl);

            axios.get(endPointUrl)
                .then(response => {
                    vm.allImages = response.data.value
                    console.log(vm.allImages);

                    vm.$nextTick(function () {

                    vm.handlePagination()

                    lightbox.option({
                        'resizeDuration': 800,
                        'wrapAround':true
                      })

                    });

                })
        },


        handlePagination: function () {

            $('#pagination-container').pagination('destroy');
            $(".person").removeAttr("style");

            var items = $(".person");
            var numItems = items.length;
            var perPage = 15;
            var vm = this;

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

        },

    }
});