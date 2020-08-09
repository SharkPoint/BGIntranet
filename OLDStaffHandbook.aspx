<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js">
<!--<![endif]-->

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>BIG - Staff Handbook</title>
    <meta name="BIG Gallery" content="">
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

    <link href="//cdn.syncfusion.com/16.4.0.42/js/web/flat-azure/ej.web.all.min.css" rel="stylesheet" />


    <style>
        #wrapper {
            background: #202020;
            color: black;
            max-width: 1140px;
            margin: 0 auto;
            margin-bottom: 20px;
        }

        .content {
            display: grid;
            grid-template-columns: repeat(8, 1fr);
            grid-gap: 1rem;
        }

        .content div {
            align-items: center;
            justify-content: center;
        }

        #header {
            padding: 5px 20px 2px 20px;
            grid-column: 1/9;
            font-size: 1rem;
            background: #464646;
            color: #cecece;
        }

        .tree {
            position:relative;
            padding-top: 10px;
            grid-column: 1/3;
            background: url('assets/images/hb_Paper3.jpg');
            color: black;
        }

        .main {
            grid-column: 3/9;
            padding: 20px;
        }

        .e-treeview .e-active,
        .e-fullrow-wrap .e-li-active>.e-fullrow {
            background: black;
            color: white;
        }

        a:not([href]):not([tabindex]):focus,
        a:not([href]):not([tabindex]):hover {
            background: black;
            color: white;
            text-decoration: none;
        }

        a {
            text-decoration: underline;
            color: darkslategrey
        }

        a:hover {
            font-weight: 400;
            color: black;
        }

        #page {
            background: url('assets/images/hb_Paper3.jpg');
            /* background-repeat: no-repeat; */
            position: relative;
        }

        #pageContent {
            background: transparent;
            margin-top: 12px;
            line-height: 35px;
        }

        #headerText {
            margin-top: 30px;
        }

        #treeView_active {
            color:white;
        }

        .treeview {
            margin-top:12px;
        }

    </style>

</head>

<body class="PeopleDirectory">
    <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="#">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->

    <div class="loadingSpinner">
        <div class="lds-eclipse">
            <div></div>
        </div>
    </div>
    <div class="navBar" v-html="navBarHTML">{{navBarHTML}}</div>
    <div class="sideMenu" v-html="sideMenuHTML">{{sideMenuHTML}}</div>

    <div id="wrapper">

        <div class="content">

            <div id="header">
                <h5>Staff Handbook</h5>
            </div>

            <div class="tree">          
                
                <h3 style="margin-top:40px;margin-left:20px">Contents:</h3>
                <div id="treeView" style="margin-top:25px"></div>        
            </div>
            <div class="main" id="page">                            
                <img src="assets/images/mm_images/Group_trans.png"
                    style="position:absolute;top:-10px;right:5px;width:200px;height:auto;opacity:0.7">
                <h3 id="headerText">{{headerToShow}}</h3>
                <p id="pageContent" v-html="paraToShow"></p>                
            </div>

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
    <script type="text/javascript" src="IceAwards\js\mdb.js"></script>
    <!-- <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/jstree.min.js"></script> -->
    <script src="//corporatedocument.sharepoint.com///corporatedocument.sharepoint.com///cdn.syncfusion.com/16.4.0.42/js/web/ej.web.all.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="js-orig/StaffHandbook.js"></script>

</body>

</html>