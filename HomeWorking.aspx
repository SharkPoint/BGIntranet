<!DOCTYPE html>
<html lang="en" xmlns:mso="urn:schemas-microsoft-com:office:office"
    xmlns:msdt="uuid:C2F41010-65B3-11d1-A29F-00AA00C14882">

<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

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


    <!--[if lt IE 9]>
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>BIG</title>
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="-1" />
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

    <link rel="stylesheet" href="styles/style.min.css">

    <style>
        .container {
            width: 100%;
            padding-right: 15px;
            padding-left: 15px;
            margin-right: auto;
            margin-left: auto;
        }

        .topLevel {
            grid-template-columns: repeat(54, 1fr);
            grid-auto-columns: minmax(80px, auto);
            /* grid-auto-rows: minmax(52px, auto); */
            grid-auto-rows: 52px;
            grid-gap: 20px;
            text-align: center;
            display: grid;
            max-width: 1140px;
            margin: 0 auto;
            padding-left: 12px;
            padding-right: 7px;
            margin-bottom: 20px;
        }

        .secondLevel {
            grid-template-columns: repeat(54, 1fr);
            grid-auto-columns: minmax(40px, auto);
            grid-auto-rows: 10px;
            grid-gap: 20px;
            text-align: center;
            display: grid;
            max-width: 1140px;
            margin: 0 auto;
            padding-left: 12px;
            padding-right: 7px;
            margin-bottom: 20px;
        }

        .tile {
            color: white;
            padding: 30px;
            position: relative;
            border: 1px solid black;
        }

        .tile:not(.comingSoon):hover {
            border:none;
            cursor:none;
            border: 1px solid yellow;
            cursor: pointer;
        }

        .comingSoon.Medium:hover {
            cursor:none;
            background-image: url(assets/images/PeopleSite/ComingSoonBlueMedium.jpg);
            border: 1px solid whitesmoke;
            transition: background-image 1s;
        }

        .comingSoon.large:hover {
            cursor:none;
            background-image: url(assets/images/PeopleSite/ComingAprilBlueLarge.jpg);
            border: 1px solid whitesmoke;
            transition: background-image 1s;
        }
        

        .comingSoon.Small:hover {
            background-image: url(assets/images/PeopleSite/ComingSoonBlueSmall.jpg);
            border: 1px solid whitesmoke;
            transition: background-image 1s;
        }

        .comingSoon.Smaller:hover {
            background-image: url(assets/images/PeopleSite/ComingSoonFeedbackSmall.jpg);
            border: 1px solid whitesmoke;
            transition: background-image 1s;
        }        

        .tile p {
            color: white;
            font-family: 'Roboto';
            font-weight: 400;
            font-size: 1.5em;
            position: absolute;
            width: 100%;
            left: 0;
            bottom: 0;
            text-align: center;
            margin: 0;
        }

        .mainTile {
            grid-column: 1/37;
            grid-row: 1/13;
            background-image: url(assets/images/HomeWorking/HomeWorkingMain.jpg);
            border: 1px solid black;
        }

        .homeWorkingRiskAssesment {
            grid-column: 37/55;
            grid-row: 1/7;
            background-image: url(assets/images/HomeWorking/RiskAssesmentMedium.jpg);
            border: 1px solid black;
        }

        .homeWorkingGuide {
            grid-column: 37/55;
            grid-row: 7/13;
            background-image: url(assets/images/HomeWorking/HomeWorkingGuideMedium.jpg);
            border: 1px solid black;
        }

        .staffHandbook {
            grid-column: 37/55;
            grid-row: 1/6;
            background-image: url("../Intranet/assets/images/HomeWorking/MainImage.jpg");
            border: 1px solid black;
            transition: background-image 1s;
        }

        .loveMyIdeas {
            grid-column: 1/10;
            grid-row: 1/7;
            background-image: url(assets/images/PeopleSite/LoveMyIdeas.jpg);
            border: 1px solid black;
        }

        .iceAwards {
            grid-column: 10/19;
            grid-row: 1/7;
            background-image: url(assets/images/PeopleSite/IceAwards.jpg);
            border: 1px solid black;
        }

        .howToGuides {
            grid-column: 37/46;
            grid-row: 1/7;
            background-image: url(assets/images/PeopleSite/HowToGuide.jpg);
            border: 1px solid black;
            background-repeat: no-repeat;
	        transition: background-image 1s;
        }

        .recruitment {
            grid-column: 46/55;
            grid-row: 1/7;
            background-image: url(assets/images/PeopleSite/StaffRecruitment.jpg);
            border: 1px solid black;
            background-repeat: no-repeat;
	        transition: background-image 1s;
        }

        .engage {
            grid-column: 1/19;
            grid-row: 7/13;
            background-image: url(assets/images/PeopleSite/Engage.jpg);
            border: 1px solid black;
        }

        .eap {
            grid-column: 19/37;
            grid-row: 25/31;      
            background-image: url(assets/images/PeopleSite/EAPSmall.jpg);
            border: 1px solid black;
        }


        .jobBoard {
            grid-column: 37/55;
            grid-row: 7/13;
            background-image: url(assets/images/PeopleSite/JobBoard.jpg);
            border: 1px solid black;
        }

        .peopleHR {
            grid-column: 1/19;
            grid-row: 13/19;
            background-image: url(assets/images/PeopleSite/PeopleHR.jpg);
            border: 1px solid black;
        }

        .peopleData {
            grid-column: 37/55;
            grid-row: 13/19;
            background-image: url(assets/images/PeopleSite/PeopleData.jpg);
            border: 1px solid black;
        }

        .medicash {
            grid-column: 37/55;
            grid-row: 19/25;
            background-image: url(assets/images/PeopleSite/Medicash.jpg);
            border: 1px solid black;
        }

        .cyprus {
            grid-column: 37/55;
            grid-row: 19/25;
            background-image: url(assets/images/PeopleSite/Cyprus.jpg);
            border: 1px solid black;
        }

        .whistleBlower {
            grid-column: 19/37;
            grid-row: 1/7;    
            background-image: url(assets/images/PeopleSite/WhistleBlowing.jpg);
            border: 1px solid black;
        }

        .myFavoriteThings {
            grid-column: 28/37;
            grid-row: 13/19;
            background-image: url(assets/images/PeopleSite/MyFavouriteThingsSmall.jpg);
            border: 1px solid black;
        }

        .talkingHeads {
            grid-column: 19/28;
            grid-row: 13/19;
            background-image: url(assets/images/PeopleSite/TalkingHeadsSmall.jpg);
            border: 1px solid black;
        }

        .engageGallery {
            grid-column: 1/19;
            grid-row: 19/25;
            background-image: url(assets/images/PeopleSite/EngageGallery.jpg);
            border: 1px solid black;
        }

        .onBoarding {
            grid-column: 1/19;
            grid-row: 25/31;
            background-image: url(assets/images/PeopleSite/OnBoarding.jpg);
            border: 1px solid black;
            background-repeat: no-repeat;
	        transition: background-image 1s;
        }

        .learningDevelopment {
            grid-column: 19/37;
            grid-row: 19/25;
            background-image: url(assets/images/PeopleSite/LearningandDevelopmentMedium.jpg);
            border: 1px solid black;
        }

        .homeWorking {
            grid-column: 19/28;
            grid-row: 7/13;
            background-image: url(assets/images/PeopleSite/HomeWorkingSmall.jpg);
            border: 1px solid black;
        }

        
        .feedBack {
            grid-column: 28/37;
            grid-row: 7/13;
            background-image: url(assets/images/PeopleSite/FeedBackSmall.jpg);
            border: 1px solid black;
            background-repeat: no-repeat;
        }


        .tedTalks {
            grid-column: 37/55;
            grid-row: 25/31;
            background-image: url(assets/images/PeopleSite/TedTalks.jpg);
            border: 1px solid black;
        }

        .tile p {
            color: black;
            font-family: 'Roboto';
            font-weight: bolder;
            font-size: 1em;
            position: absolute;
            width: 100%;
            left: 0;
            bottom: 10px;
            text-align: center;
            margin: 0;
        }

        .hideTile {
            display: none;
        }

    </style>

</head>

<body class='index'>
    <div class="loadingSpinner">
        <div class="lds-eclipse">
            <div></div>
        </div>
    </div>
    <div class="navBar" v-html="navBarHTML">{{navBarHTML}}</div>
    <div class="sideMenu" v-html="sideMenuHTML">{{sideMenuHTML}}</div>

    <div class="container">

        <div class="alertContainer" style="padding:0 10px">
        <div class="alert alert-primary" role="alert">
            Please note this 'Home Working' area is a work in progress and new content will be added rapidly over the coming weeks to help with transition to temporary home working 
          </div>
        </div>

        <div class="secondLevel">

            <div class="tile mainTile"></div>

            <div class="tile homeWorkingRiskAssesment"></div>

            <div class="tile homeWorkingGuide"></div>

            <!-- <div class="tile learningDevelopment"></div>

            <div class="tile homeWorking"></div>

            <div class="tile feedBack"></div>

            <div class="tile howToGuides"></div>

            <div class="tile recruitment"></div>

            <div class="tile engage"></div>

            <div class="tile jobBoard"></div>

            <div class="tile peopleHR"></div>

            <div class="tile whistleBlower"></div>

            <div class="tile eap"></div>

            <div class="tile peopleData"></div>

            <div class="tile myFavoriteThings"></div>

            <div class="tile talkingHeads"></div>

            <div class="tile engageGallery"></div>

            <div class="tile medicash hideTile"></div>

            <div class="tile cyprus hideTile"></div>

            <div class="tile onBoarding"></div>      

            <div class="tile tedTalks"></div> -->

        </div>

    </div>

    <!-- Page Footer  -->
    <div class="PageFooter" v-html="pageFooterHTML">{{pageFooterHTML}}</div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/jquery-latest.js"></script>
    <script type="text/javascript" src="js/goal-thermometer.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js"
        integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous">
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.5.0/lodash.min.js"></script>
    <script src="js/vue-2-5-17.js"></script>

    <script src='js/breaking-news-ticker.min.js'></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/3.5.4/select2.js" type="text/javascript"></script>
    <script src="js/bgbs_utils.min.js"></script>
    <script src="js/jquery.fittext.js"></script>
    <script src="js/axios-0-2-1.js"></script>
    <script src="js/moment.min.js"></script>
    <script src="js/evendar.min.js"></script>
    <script src="js/gridstack-040.js"></script>
    <script src="js/gridstack.jQueryUI.js"></script>

    <script src="js/sharepoint.min.js"></script>
    <script>
        document.write('<script src="js/SharedComponents.min.js?dev=' + Math.floor(Math.random() * 100) +
            '"\><\/script>');
    </script>
    <script>
        document.write('<script src="js/homeWorking.min.js?dev=' + Math.floor(Math.random() * 100) +
            '"\><\/script>');
    </script>

</body>

</html>