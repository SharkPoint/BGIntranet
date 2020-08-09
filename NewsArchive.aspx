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

            <div class="SearchBar">
                <div class="SearchCombo">
                    <input id="searchTerm" Placeholder="Search For ..." type="text" class="newsSearch"
                        name="newsSearch">
                </div>
                <div class="SearchCompany">
                    <select class="selectCompany" name="CompanySearch">
                        <option></option>
                        <option value='All'>All</option>
                        <option value='Group'>Group</option>
                        <option value='CDS'>CDS</option>
                        <option value='CDS DS'>CDS DS</option>
                        <option value='BGBS'>BGBS</option>
                    </select>
                </div>
                <div class="SearchMonth">
                    <select class="selectMonth" name="monthSearch">
                        <option></option>
                        <option value='0'>All</option>
                        <option value='01'>Jan</option>
                        <option value='02'>Feb</option>
                        <option value='03'>Mar</option>
                        <option value='04'>Apr</option>
                        <option value='05'>May</option>
                        <option value='06'>Jun</option>
                        <option value='07'>Jul</option>
                        <option value='08'>Aug</option>
                        <option value='09'>Sep</option>
                        <option value='10'>Oct</option>
                        <option value='11'>Nov</option>
                        <option value='12'>Dec</option>
                    </select>
                </div>
                <div class="searchYear">
                    <select class="selectYear" name="yearSearch">
                        <option></option>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                        <option value=2021>2021</option>
                        <option value=2022>2022</option>
                        <option value=2023>2023</option>
                        <option value=2024>2024</option>
                        <option value=2025>2025</option>
                        <option value=2026>2026</option>
                        <option value=2027>2027</option>
                        <option value=2028>2028</option>
                        <option value=2029>2029</option>
                        <option value=2030>2030</option>
                    </select>
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
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js">    </script>
    <script type="text/javascript" src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.min.js"></script>    
    <script type="text/javascript" src="js/axios-0-2-1.js"></script>
    <script type="text/javascript" src="js/moment.min.js"></script>
    <script type="text/javascript" src="js/sharepoint.min.js"></script>
    <script type="text/javascript" src="js/store.js"></script>
    <script type="text/javascript" src="js/bgbs_utils.min.js"></script>
    <script type="text/javascript" src="js/SharedComponents.min.js"></script>
    <!-- <script type="text/javascript" src="js/bgbs_news_archive.min.js"></script> -->
    <script>
        document.write('<script src="js/bgbs_news_archive.min.js?dev=' + Math.floor(Math.random() * 100) + '"\><\/script>');
    </script>

</body>

</html>