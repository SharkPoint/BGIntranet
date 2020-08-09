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
    <title>BIG - EAP</title>
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

<body class="eap">

    <div class="loadingSpinner">
        <div class="lds-eclipse">
            <div></div>
        </div>
    </div>
    <div class="navBar" v-html="navBarHTML">{{navBarHTML}}</div>
    <div class="sideMenu" v-html="sideMenuHTML">{{sideMenuHTML}}</div>

    <div class="container">

        <div class="content">
            <div class="welcome">In an ideal world, each and every one of us would be able to leave our problems at home
                and focus on the job 100%.
                An EAP is an invaluable tool for any organisation, ensuring mental health is promoted and facilitated,
                as well as minimising the impact of any external distractions on us to function or focus while at work.
                Our service provide Validium EAPs integrate several clinically proven counselling programmes with an
                array with an array of specialist work / life services
            </div>
            <div class="main">
                <object id="docDisplay" v-bind:data="selectedURL" type="application/pdf" height="100%" width="100%">
                </object>
            </div>
            <div class="sideBar">
                <div class="links WelcomeLetter" v-on:click="showWelcome()">
                    <h6>Welcome To Your EAP</h6>
                </div>
                <div class="links" v-on:click="openExistingAccount()">
                    <h6>Open My Validium Account</h6>
                </div>
                <div class="container1" id="container1">
                    <h6 class="links" v-on:click="panelExpand()">Create A New Validium Account</h6>
                    <div id="container1p">
                        <p>Use the following credentials:</p>
                        <p><b>UserName - baird</b></p>
                        <p><b>Password - eap4support</b></p>
                        <div class="text-center">
                            <button type="button" v-on:click="createNewAccount()"
                                class="btn btn-outline-secondary">Create Account</button>
                        </div>
                    </div>
                </div>
                <div class="archive">
                    <h6>Newsletter Archive</h6>
                    <div id="archiveList">
                        <ul>
                            <li v-for="eapDoc in displayDocs">
                                <i class="pdfLink fas fa-expand fa-xs" :href="eapDoc.linkURL"></i>
                                &nbsp;&nbsp;
                                <span class="pdfShow" v-on:click="showDoc()"
                                    :href="eapDoc.linkURL">{{eapDoc.Title}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    </div>


    <!-- Page Footer  -->
    <div class="PageFooter" v-html="pageFooterHTML">{{pageFooterHTML}}</div>

    <script type="text/javascript" src="js/vue-2-5-17.js"></script>
    <script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/axios-0-2-1.js"></script>
    <script type="text/javascript" src="js/sharepoint.min.js"></script>
    <script type="text/javascript" src="js/bgbs_utils.min.js"></script>
    <script type="text/javascript" src="js/SharedComponents.min.js"></script>
    <script type="text/javascript" src="js/EZView.js"></script>
    <script type="text/javascript" src="js/Eap.min.js"></script>

</body>

</html>