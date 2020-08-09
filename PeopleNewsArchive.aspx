<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js">
<!--<![endif]-->

<head>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-149584046-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());

        gtag('config', 'UA-149584046-1');
    </script>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>BIG - News Archive</title>
    <meta name="Baird Group FAQ" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="apple-touch-icon" sizes="180x180"
        href="https://corporatedocument.sharepoint.com/sites/bgintranet/sitepages/Intranet/FavIcons/WhiteText/apple-touch-icon.png">
    <link rel="android-chrome" sizes="192x192"
        href="https://corporatedocument.sharepoint.com/sites/bgintranet/sitepages/Intranet/FavIcons/WhiteText/android-chrome-192x192.png">
    <link rel="android-chrome" sizes="256x256"
        href="https://corporatedocument.sharepoint.com/sites/bgintranet/sitepages/Intranet/FavIcons/WhiteText/android-chrome-256x256.png">
    <link rel="icon" type="image/png" sizes="32x32"
        href="https://corporatedocument.sharepoint.com/sites/bgintranet/sitepages/Intranet/FavIcons/WhiteText/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16"
        href="https://corporatedocument.sharepoint.com/sites/bgintranet/sitepages/Intranet/FavIcons/WhiteText/favicon-16x16.png">
    <link rel="shortcut icon" id="favicon" type="image/x-icon" href="https://i.imgur.com/B5mWm03.png">

    <link rel="stylesheet" href="./styles/style.min.css" />

    <script type="text/javascript" src="https://ajax.aspnetcdn.com/ajax/4.0/1/MicrosoftAjax.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>

    <style>
        #searchBar {
            display: grid;
            grid-template-columns: 10fr 1fr;
            grid-gap: 3px;
            height: 70px;
        }

        #bannerContainer {
        width: 100%;
        height: 100px;
        border-radius: 5px;
        padding: 0 10px 0 6px;
        }

        #banner.KidsCorner {
            width:100%;
            height:100%;
            background:url('assets/images/KidsCorner/kc_banner.jpg');
            background-repeat: no-repeat;
            background-size:cover;
            border-radius: 5px;
        }

        #banner.Wellness {
            width:100%;
            height:100%;
            background:url('assets/images/Wellbeing/wellbeing_banner.jpg');
            background-repeat: no-repeat;
            background-size:cover;
            border-radius: 5px;
        }

        #buttonBar {
            padding-top:10px;
            padding-left:7px;
        }

        .tablink {
            border-radius: 5px;
        }

        .tablink {
            background: url(assets/images/Wellbeing/button_back.jpg);
            opacity: 0.8;
            color: royalblue;
            font-weight: bolder;
        }

        .tablink:hover {
            background: url(assets/images/Wellbeing/button_back.jpg);
            opacity: 1;
            color: royalblue;
            font-weight: bolder;
        }

        .tabActive {
            opacity: 1;
        }

        .hideObj {
            display: none;
        }

    </style>

</head>

<body class="newsArchive">
    <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="#">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->

    <div class="loadingSpinner">
        <div class="lds-eclipse">
            <div></div>
        </div>
    </div>

    <div id="wrapper">

        <div class="navBar" v-html="navBarHTML">{{navBarHTML}}</div>
        <div class="sideMenu" v-html="sideMenuHTML">{{sideMenuHTML}}</div>

        <div class="Content">

            <div id="bannerContainer">
                <div id="banner"></div>
            </div>

            <!-- Only displayed when page called for wellness -->
            <div id="buttonBar" class="hideObj">
                <button class="w3-bar-item w3-button tablink tabActive" id = "MHM" v-on:click="tabClicked('MHM')">Mental Health & Mindfulness</button>
                <button class="w3-bar-item w3-button tablink" id= "EI" v-on:click="tabClicked('EI')">Emotional Intelligence</button>
                <button class="w3-bar-item w3-button tablink" id= "MS" v-on:click="tabClicked('MS')">Managing Stress</button>
                <button class="w3-bar-item w3-button tablink" id= "FW" v-on:click="tabClicked('FW')">Financial</button>
                <button class="w3-bar-item w3-button tablink" id= "PATH" v-on:click="tabClicked('PATH')">Wellbeing LiL Pathway</button>
              </div>

            <div class="SearchBar" id="searchBar">
                <div class="SearchCombo">
                    <input id="searchTerm" Placeholder="Search For ..." type="text" class="newsSearch"
                        name="newsSearch">
                </div>

                <div class="searchButton">
                    <p class="goBtn" onclick="vm_NewsList.getFTNews()">GO</p>
                </div>
            </div>

            <div class="NewsList">
                <span v-show="canAdd" onclick="vm_NewsList.createNews()"><i
                        class="addNewsIcon far fa-plus-square">&nbsp;<span id="newNews">New News</span></i></span>
                <div class="noResults"></div>
                <div class="NewsContainer" v-for="NewsItem in NewsItems" onclick="vm_NewsList.showNews()">
                    <input type='hidden' class='pageURL' v-bind:value="NewsItem.pageUrl">
                    <div class="NewsImage"><img v-bind:src="NewsItem.imgURL" v-bind:alt="NewsItem.Title"></div>
                    <div class="NewsDetails">
                        <div class="Newsheader">{{NewsItem.Title}}</div>
                        <div class="NewsSummary">{{NewsItem.Description}}
                            <div id="SummaryAppend"><span id="ReadMore">READ MORE&nbsp;&nbsp;</span><span><i
                                        v-show="canEdit" class="editNewsIcon far fa-edit"
                                        onclick="vm_NewsList.editNews()"></i></span></div>
                        </div>
                        <div class="NewsMeta">
                            <div id="authorDetails"><span
                                    id="profileImage">{{NewsItem.initials}}</span><span>{{NewsItem.Author}} -
                                    {{NewsItem.LastUpdated}} {{NewsItem.LifetimeViews}}</span></div>
                        </div>
                    </div>
                </div>
                <div class="Pagination">
                    <button type="button" onclick="vm_NewsList.pageNav()"
                        class="PrevButton btn btn-outline-danger waves-effect btn-sm"><i
                            class="PrevButton fa fa-step-backward"></i></button>
                    <span id="docCounter"></span>
                    <button type="button" onclick="vm_NewsList.pageNav()"
                        class="NextButton btn btn-outline-danger waves-effect btn-sm"><i
                            class="NextButton fa fa-step-forward"></i></button>
                </div>
            </div>
        </div>
    </div>

    <!-- Page Footer  -->
    <div id="footer" class="PageFooter" v-html="pageFooterHTML">{{pageFooterHTML}}</div>

    <script type="text/javascript" src="js/vue-2-5-17.js"></script>
    <script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js">
    </script>
    <script type="text/javascript" src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/axios-0-2-1.js"></script>
    <script type="text/javascript" src="js/moment.min.js"></script>
    <script type="text/javascript" src="js/sharepoint.min.js"></script>
    <script type="text/javascript" src="js/store.js"></script>
    <script type="text/javascript" src="js/bgbs_utils.min.js"></script>
    <script type="text/javascript" src="js/SharedComponents.min.js"></script>
    <script type="text/javascript" src="js/people_news_archive.min.js"></script>

</body>

</html>