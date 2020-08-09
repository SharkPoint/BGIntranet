//JS Lib To Add NavBar / Footer & UserProfile To Pages

//Include The Following Divs At The Position You Wish The Componenents To Appear
//<div class="navBar" v-html="navBarHTML">{{navBarHTML}}</div>
//<div id="footer" class="PageFooter" v-html="pageFooterHTML">{{pageFooterHTML}}</div>
//<div class="UserProfile" v-html="userProfileHTML">{{userProfileHTML}}</div>

//Required JS Files:
//<script type="text/javascript" src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
//<script type="text/javascript" src="js/mdb.js"></script>    
//<script type="text/javascript" src="js/mdbFileUpload.min.js"></script>
//<script type="text/javascript" src="js/moment.min.js"></script>
//<script type="text/javascript" src="js/modal-loading.js"></script>
//<script type="text/javascript" src="js/bgbs_utils.js"></script>
//<script type="text/javascript" src="js/SharedComponents.js"></script>

//Required CSS Files
//<link rel="stylesheet" href="css/mdb.min.css">
//<link rel="stylesheet" href="css/mdbFileUpload.min.css">

// NavBar
var vm_navBar = new Vue({

    el: '.navBar',
    data: {
        currentUserRoles: [],
        showProperty: false,
        navBarHTML: null,
    },
    created: function () {
        this.getNavBar();
    },
    methods: {

        getNavBar: function () {

            var vm = this;

            var requestUri = "./header.html"

            axios.get(requestUri)
                .then(response => {
                    vm.navBarHTML = response.data

                    this.$nextTick(function () {

                        //Replace href for my profile
                        var userDetails = JSON.parse(localStorage.userDetails)
                        $('#AboutMe').attr("href", "PeopleDirectory.aspx?p=" + userDetails.EmailAddress)

                        //Set the Secure Menu Options For This user  
                        vm.currentUserRoles = userDetails.Roles;
                        vm.currentUserRoles.forEach(element => {
                            $('#' + element).removeClass('secureDisplay');
                        });

                        console.log('vm.showProperty');
                        console.log(vm.showProperty);


                        jQuery(document).ready(function () {
                            jQuery('#mega-canvas-close-link').on('click', function (e) {
                                jQuery('#sidebar').removeClass('active');

                            });
                            jQuery(window).scroll(function () {
                                var windowScroll = jQuery(window).scrollTop();
                                if (windowScroll >= 60) {
                                    jQuery('.demo-7').addClass('sticky');
                                } else {
                                    jQuery('.demo-7').removeClass('sticky');
                                }
                            });
                            //mega-canvas-link
                            jQuery('#mega-canvas-link').on('click', function (e) {
                                jQuery(this).toggleClass('active');
                                jQuery('#sidebar').toggleClass('active');
                                jQuery('.main-panel-container').toggleClass('show');
                            });
                            jQuery('.dropdown-menu .dropdown-toggle').on('click', function (e) {
                                if (!jQuery(this).next().hasClass('show')) {
                                    jQuery(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
                                }
                                jQuery(this).next(".dropdown-menu").toggleClass('show');
                                return false;
                            });
                            //for product mega menu
                            jQuery('.product-heading').click(function () {
                                if (!jQuery(this).next().hasClass('active')) {
                                    jQuery('.product-dropdown-list').removeClass('active');
                                    jQuery(this).next().addClass('active');
                                } else if (jQuery(this).next().hasClass('active')) {
                                    jQuery(this).next().removeClass('active');
                                }
                                return false;
                            });
                            //for shop mega menu
                            jQuery('.shop-heading').on('click', function () {
                                if (!jQuery(this).parent().parent().next().hasClass('active')) {
                                    jQuery('.shop-dropdown-list').removeClass('active');
                                    jQuery(this).parent().parent().next().addClass('active');
                                } else if (jQuery(this).parent().parent().next().hasClass('active')) {
                                    jQuery(this).parent().parent().next().removeClass('active');
                                }
                                return false;
                            });
                            //search link
                            jQuery('#search-link').click(function (e) {
                                e.preventDefault();
                                jQuery('.search-wrapper').slideDown('slow');
                            });
                            jQuery('#search-close').click(function () {
                                jQuery('.search-wrapper').slideUp('slow');
                            });
                            jQuery('#offcanvas-link').click(function (e) {
                                e.preventDefault();
                                jQuery('.mega-offcanvas').addClass('active');
                            });
                            jQuery('.off-canvas-close').click(function () {
                                jQuery('.mega-offcanvas').removeClass('active');
                            });
                            //for vertical mega menu
                            jQuery('[ data-toggle="collapse"]').on("click", function () {
                                if (jQuery(this).find('submenu').hasClass('show')) {
                                    jQuery(this).find('submenu').removeClass('show');
                                }

                            });
                            jQuery('.brands-navtab a').click(function (e) {
                                e.preventDefault();
                                jQuery(this).parent().parents('.dropdown-menu').addClass('active')
                            });
                            jQuery('.carousel-control-prev ,.carousel-control-next').click(function (e) {
                                e.preventDefault();
                                jQuery(this).parent().parents('.dropdown-menu').addClass('active')

                            });
                            jQuery('.bars').click(function () {
                                jQuery('#sidebar').toggleClass('active');
                                jQuery(this).toggleClass('active');
                            });

                        });

                    })

                })
        },
    },
});

// Page Footer
var pageFooter = new Vue({

    el: '.PageFooter',
    data: {
        pageFooterHTML: null,
    },

    created: function () {
        this.getPageFooter()
    },

    methods: {

        getPageFooter: function () {
            var requestUri = "./footer.html"

            axios.get(requestUri)
                .then(response => {
                    this.pageFooterHTML = response.data

                    this.$nextTick(function () {
                        $('.copyrightText').click(function () {
                            window.forceReload();
                        })
                    })
                })
        },
    }
});

var sideMenu = new Vue({

    el: '.sideMenu',
    data: {
        sideMenuHTML: null,
    },

    created: function () {
        this.getSideMenu()
    },

    methods: {

        getSideMenu: function () {
            var vm = this;
            var requestUri = "./SideMenu.html"

            axios.get(requestUri)
                .then(response => {
                    this.sideMenuHTML = response.data

                    this.$nextTick(function () {
                        //Side Menu Click Actions ..

                        //Synergist
                        $('.side-menu li:nth-child(7)').click(function (e) {
                            window.open('https://cdsltd.synergist.cloud/', target = '_blank');
                        });

                        //LoveMyIdea
                        $('.side-menu li:nth-child(8)').click(function (e) {
                            window.open('https://corporatedocument-9eed295e264c7d.sharepoint.com/sites/IntranetIdeaBoard/IdeaBoard/pages/Default.aspx?SPHostUrl=https://corporatedocument.sharepoint.com/sites/IntranetIdeaBoard/&SPLanguage=en-US&SPClientTag=0&SPAppWebUrl=https://CorporateDocument-9eed295e264c7d.sharepoint.com/sites/IntranetIdeaBoard/IdeaBoard/', target = '_blank');
                        });

                        //IceAwards
                        $('.side-menu li:nth-child(9)').click(function (e) {
                            window.open('IceAwards/IceAwards.aspx', target = '_blank');
                        });

                        //MeetUpCall
                        $('.side-menu li:nth-child(3)').click(function (e) {
                            window.open('https://manage.meetupcall.com/login', target = '_blank');
                        });

                        //My Email
                        $('.side-menu li:nth-child(2)').click(function (e) {
                            window.open('https://outlook.office365.com/owa.cds.co.uk', target = "_blank");
                        });

                        //My One Drive
                        $('.side-menu li:nth-child(6)').click(function (e) {
                            var userDetails = JSON.parse(localStorage.userDetails)
                            window.open(userDetails.OneDriveAddress, target = "_blank");
                        });

                        //Directory
                        $('.side-menu li:nth-child(5)').click((e) => {
                            window.open('./PeopleDirectory.aspx', target = "_self");
                        });

                        //Skype
                        $('.side-menu li:nth-child(4)').click((e) => {
                            window.open('https://teams.microsoft.com/', target = "_blank");
                        });

                        //Locations
                        // $('.side-menu li:nth-child(10)').click((e)=>{
                        //     $('html,body').animate({scrollTop: document.body.scrollHeight},"slow");
                        // });

                        //Feedback
                        $('.side-menu li:nth-child(10)').click((e) => {
                            window.open('https://forms.office.com/Pages/ResponsePage.aspx?id=Sn0AGU8lv0-MjcWbbTK3ZuqDZB9eOdVEqoeBCbuJYVBUOEwzT1dSQ1VGRE43MTRZMjBFTzUzQ01QNi4u', target = "_blank");
                        });

                    })
                })



        },
    }
});

window.forceReload = function () {
    if (!window.fetch) return document.location.reload(true);
    var els = document.getElementsByTagName("*");
    for (var i = 0; i < els.length; i++) {
        var src = "";
        if (els[i].tagName == "A") continue;
        if (!src && els[i].src) src = els[i].getAttribute("src");
        if (!src && els[i].href) src = els[i].getAttribute("href");
        if (!src) continue;
        fetch(src, {
            cache: "reload"
        });
    }
    return document.location.reload(true);
};