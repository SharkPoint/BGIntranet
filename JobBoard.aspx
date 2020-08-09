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
    <title>BIG - Job Board</title>
    <meta name="Baird Group Job Board" content="">
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

</head>

<body class="jobBoard">
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

        <div id="content">
            <div class="SearchBar">
                <div class="SearchCombo">
                    <input id="searchTerm" Placeholder="Search For ..." type="text" class="newsSearch"
                        name="newsSearch">
                </div>
                <div class="SearchCompany">
                    <select class="selectCompany" id="CompanySearch">
                        <option></option>
                        <option value='All'>All</option>
                        <option value='Group'>Group</option>
                        <option value='CDS'>CDS</option>
                        <option value='CDS DS'>CDS DS</option>
                        <option value='Newspress'>Newspress</option>
                        <option value='BGBS'>BGBS</option>
                    </select>
                </div>
                <div class="SearchLocation">
                    <select class="selectLocation" id="LocationSearch">
                        <option></option>
                        <option value='All'>All</option>
                        <option value='Aylesbury'>Aylesbury</option>
                        <option value='Aylesbury'>Belfast</option>
                        <option value='Aylesbury'>Bicester</option>
                        <option value='Bristol'>Bristol</option>
                        <option value='Cheltenham'>Cheltenham</option>
                        <option value='Horsham'>Horsham</option>
                        <option value='Leeds'>Leeds</option>
                        <option value='London'>London</option>
                        <option value='Norwich'>Norwich</option>
                    </select>
                </div>
                <div class="searchButton">
                    <p class="goBtn" onclick="vm_Main.searchPosts()">GO</p>
                </div>
            </div>
            <div class="navpath">
                <ul class="breadcrumb">
                    <li><i id="refreshIcon" class="fas fa-retweet fa-2x"></i></li>
                </ul>
            </div>
            <ul class="main notices list-wrapper" id="noticeList">
                <li class="faqBox quote-container bgcard list-item" v-for="post in displayPosts">
                    <div class="cardOverlay" :class="{[post.Style]:true}">

                        <div :id="post.ID" class="notePost">
                            <i class="pin"></i>
                            <blockquote class="note">
                                <h2 class='title'>{{post.Title}}</h2>
                                <p class='description'>{{post.Description}}</p>
                            </blockquote>
                        </div>

                        <div class="CompanyImage">
                            <img :src="post.CompanyImage" style="height:55px; position: absolute; bottom:2px; left:4px">
                        </div>

                        <cite class="noteIcons">
                            <a :href="post.Link" target="_blank"
                                :class="{active: post.ActiveLink, inactive: !post.ActiveLink}"><i
                                    class="fas fa-glasses"></i>&nbsp;&nbsp;Read Full Job
                                Spec & Apply</a>
                        </cite>
                    </div>
                </li>
            </ul>
            <div id="pagination-container" class="dark-theme"></div>
        </div>

    </div>


    <!-- Page Footer  -->
    <div id="footer" class="PageFooter" v-html="pageFooterHTML">{{pageFooterHTML}}</div>


    <script type="text/javascript" src="js/vue-2-5-17.js"></script>
    <script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js">
    </script>
    <script type="text/javascript" src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <script type="text/javascript" src="js/moment.min.js"></script>
    <script type="text/javascript" src="js/axios-0-2-1.js"></script>
    <script type="text/javascript" src="js/sharepoint.min.js"></script>
    <script type="text/javascript" src="js/store.js"></script>
    <script type="text/javascript" src="js/simplePagination.js"></script>
    <script type="text/javascript" src="js/lightbox.js"></script>
    <script type="text/javascript" src="js/bgbs_utils.min.js"></script>
    <script type="text/javascript" src="js/SharedComponents.min.js"></script>
    <script type="text/javascript" src="js/JobBoard.min.js"></script>

</body>

</html>