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
            videoType: qs("vt"),
        },

        created: function () {
            this.getImages();
        },

        methods: {

            getImages: function () {

                var vm = this;

                var videoFilter = vm.videoType == 'myFavThings' ? "Two Minute Interview" : vm.videoType;
                
                var requestUri = peopleURL + "\\_api\\web\\lists\\getbytitle('Site Pages')\\items?$select=Created,EncodedAbsUrl,ID,Title,VideoURL,BannerImageUrl,Description,Category,ShowInPeopleTile&$filter=Category eq '" + videoFilter + "'&$orderby=Modified desc"

                console.log(requestUri);

                axios.get(requestUri)
                    .then(response => {

                        vm.allImages = response.data.value;

                        vm.$nextTick(function () {

                            //Change the text on mobile screens to fit
                            if ((screen.width<1024)){
                                $('#myFavThings').text('Fave Things');
                                $('#talkingHeads').text('Engage');
                                $('#MAD').text('MAD');
                            }

                            //Set the selected tab
                            console.log(vm.videoType);
                            console.log( $('#myFavThings'));
                            $('#' + vm.videoType).addClass('tabActive');

                            vm.handlePagination()

                            $('.thumb,.imgTitle,.playIcon').click(function (event) {
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

            tabClicked: function (tabName) {

                var vm = this;

                tablinks = document.getElementsByClassName("tablink");
                for (i = 0; i < tablinks.length; i++) {
                  tablinks[i].className = tablinks[i].className.replace(" tabActive", "");
                }
                event.target.className += " tabActive";

                vm.videoType = tabName
                vm.getImages();

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