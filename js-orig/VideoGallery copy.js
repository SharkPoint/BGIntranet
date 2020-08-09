$(document).ready(function () {
    $(".loadingSpinner").fadeOut(50);

})

document.onreadystatechange = function () {
    if (document.readyState === 'complete') {

        
    }
}

vm_Main = new Vue({

    el: '#wrapper',
    data: {
        allImages: [],
        showIT: false,
    },

    created: function () {
        this.getImages();
    },

    methods: {

        getImages: function () {

            //Test if video type param passed in URL otherwise default to talking heads
            var videoType = qs("vt");
            var videoFilter = videoType == null ? "Talking Heads" : videoType;


            var vm = this;
            var requestUri = peopleURL + "\\_api\\web\\lists\\getbytitle('Site Pages')\\items?$select=Created,EncodedAbsUrl,ID,Title,VideoURL,Link_x0020_To_x0020_Page,BannerImageUrl,Description,Category,ShowInPeopleTile&$filter=Category eq '" + videoFilter + "'&$orderby=Modified desc"

            console.log(requestUri);

            axios.get(requestUri)
                .then(response => {

                    vm.allImages = response.data.value;

                     vm.$nextTick(function () {

                     vm.handlePagination()

                        $('.thumb,.imgTitle,.playIcon').click(function(event){
                            //Reset the array
                            // vm.allImages.forEach(element => {
                            //     element.showTile = false;
                            // });
                            vm.allImages = vm.allImages.slice(0);

                            //Now set the selected image to show the video
                            vm.allImages[event.target.id].showTile = true;
                            console.log(vm.allImages);
                            vm.allImages = vm.allImages.slice(0);                
                        })
                     });
                })
        },


        handlePagination: function () {

            $('#pagination-container').pagination('destroy');
            $(".person").removeAttr("style");

            var items = $(".person");
            var numItems = items.length;
            var perPage = 9;
            var vm = this;

             if (numItems <= perPage) {
                $('#pagination-container').hide();
            } else {

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
                $('#pagination-container').show();
            }

        },

    }
});