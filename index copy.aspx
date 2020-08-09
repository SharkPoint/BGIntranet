<!DOCTYPE html>
<html lang="en">

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

    <!-- Link to css - dynamic to force no caching -->
    <script>document.write('<link rel="stylesheet" href="styles/style.min.css?dev=' + Math.floor(Math.random() * 100) + '"\>')</script>

    <style>
        #AlertContainer {
            padding: 0 10px;
        }

        .redAlert,
        .alert-danger {
            background-color: rgb(133, 7, 37);
            color: lightgray;
        }

        .amberAlert {
            background-color: rgb(253, 201, 30);
            color: darkslategray;
        }

        .greenAlert {
            background-color: lightgreen;
            color: darkslategray;
        }

        .blueAlert {
            background-color: lightskyblue;
            color: darkslategray;
        }

        #alertBanner {
            font-family: 'Arial';
            border: none;
            font-weight: bolder;            
        }

        #alertBannerMobile {
            font-family: 'Arial';
            border: none;
            font-weight: bolder;
            padding: 5px 8px;
            display: none
        }

        #alertlatest {
            color: inherit;
            font-family: 'Arial';
            font-weight: normal;
            text-decoration: none;
            opacity: 0.7;
        }

        #mobileLink:hover {
            color: white;
            cursor: pointer;
        }

        #alertlatest:hover {
            opacity: 1.0;
            cursor: pointer;
        }

        #archiveLink {
            float: right;
            font-family: 'Arial';
            font-style: italic;
            text-decoration: none;
            opacity: 0.5;
        }

        #archiveLink:hover {
            opacity: 1.0;
            cursor: pointer;
        }

        .hideElement {
            display: none;
        }

        @media (min-width: 321px) and (max-width: 480px) {

            #alertBanner {
                display: none;
            }

            #alertBannerMobile {
                display: block;
            }
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

        <div id="AlertContainer" class="hideElement">
            <div class="alert alert-danger" role="alert" id="alertBanner">
                {{alertTitle}}<span id="alertlatest" @click="OpenAlert()" class="alert-link">{{alertLinkText}}</span>
                <span id="archiveLink" @click="OpenArchive()">{{alertArchiveText}}</span>
            </div>
            <div class="alert alert-danger" role="alert" id="alertBannerMobile">
                <span @click="OpenAlert()" id="mobileLink">{{alertTitleMobile}}</span>
                <span id="archiveLink" @click="OpenArchive()"><i class="far fa-folder-open"
                        style="padding-bottom: 10px;"></i></span>
            </div>
        </div>

        <div class="row" id="NewsSearch">
            <div class="col-lg-9 d-none d-lg-block bn-breaking-news" id="newsTicker5">
                <div class="bn-label">NEWS BULLETIN //</div>
                <div class="bn-news">
                    <ul id="NewsItems"></ul>
                </div>
                <div class="bn-controls">
                    <!-- <button><span class="bn-arrow bn-prev"></span></button> -->
                    <button><span class="bn-action"></span></button>
                    <!-- <button><span class="bn-arrow bn-next"></span></button> -->
                </div>
            </div>
            <input class="col-lg-3 col-md-12" type="text" id="searchTerm" placeholder="Search For ..." />
        </div>
        <div id="NewsBox" class="hidden">
            <div id="NewsSlider">
                <button id="newsClose"><i id="closeNews" class="fas fa-angle-double-up fa-2x"></i></button>
                <img id="newsImage" src='' />
                <span id="newsDescription"></span>
                <a id="newsReadMore" target="_blank" href=''>READ MORE</a>
            </div>
        </div>

        <div class="grid-stack">

            <!-- MainNews -->
            <div class="grid-stack-item" id="BIG2" data-gs-id="BIG2" data-gs-locked="yes" data-gs-no-resize="yes"
                data-gs-no-move="yes" data-gs-x="0" data-gs-y="0" data-gs-width="8" data-gs-height="5">
                <div class="grid-stack-item-content" id="MainNews">
                    <div id="defaultMain">
                        <div class="headline">BIG</div>
                        <div class="subHeadline">Baird Group</div>
                        <div class="subHeadline2">Intranet</div>
                    </div>
                    <div id="sliderMain">
                        <div class="slideContainer hide">
                            <div data-am-fadeshow="next-prev-navigation">

                                <!-- Radio -->
                                <input type="radio" class="css-fadeshow" name="css-fadeshow" id="slide-1" />
                                <input type="radio" class="css-fadeshow" name="css-fadeshow" id="slide-2" />
                                <input type="radio" class="css-fadeshow" name="css-fadeshow" id="slide-3" />
                                <input type="radio" class="css-fadeshow" name="css-fadeshow" id="slide-4" />
                                <input type="radio" class="css-fadeshow" name="css-fadeshow" id="slide-5" />
                                <input type="radio" class="css-fadeshow" name="css-fadeshow" id="slide-6" />

                                <!-- Slides -->
                                <div class="fs-slides">
                                    <div class="fs-slide" v-for="(slide, index) in slides" :key="slide.ID"
                                        v-bind:style="{'background':slide.imgURL,'background-repeat': 'no-repeat','background-size': 'cover','background-position': 'center center'}">
                                        <div class="slideOverlay"></div>
                                        <div class="slideHeadlineContainer">
                                            <h1>{{slide.BGTitle}}</h1>
                                            <p id="readBGNews" v-on:click="showNews()">Read More</p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Quick Navigation -->
                                <div class="fs-quick-nav">
                                    <label class="fs-quick-btn" for="slide-1"></label>
                                    <label class="fs-quick-btn" for="slide-2"></label>
                                    <label class="fs-quick-btn" for="slide-3"></label>
                                    <label class="fs-quick-btn" for="slide-4"></label>
                                    <label class="fs-quick-btn" for="slide-5"></label>
                                    <label class="fs-quick-btn" for="slide-6"></label>
                                </div>

                                <!-- Previous Navigation -->
                                <div class="fs-prev-nav">
                                    <label class="fs-prev-btn" for="slide-1"></label>
                                    <label class="fs-prev-btn" for="slide-2"></label>
                                    <label class="fs-prev-btn" for="slide-3"></label>
                                    <label class="fs-prev-btn" for="slide-4"></label>
                                    <label class="fs-prev-btn" for="slide-5"></label>
                                    <label class="fs-prev-btn" for="slide-6"></label>
                                </div>

                                <!-- Next Navigation -->
                                <div class="fs-next-nav">
                                    <label class="fs-next-btn" for="slide-1"></label>
                                    <label class="fs-next-btn" for="slide-2"></label>
                                    <label class="fs-next-btn" for="slide-3"></label>
                                    <label class="fs-next-btn" for="slide-4"></label>
                                    <label class="fs-next-btn" for="slide-5"></label>
                                    <label class="fs-next-btn" for="slide-6"></label>
                                </div>

                            </div>
                            <div id="iconBar">
                                <i id="loadDefaultIcon" class="fas fa-sync gridIcon" data-toggle="tooltip"
                                    data-placement="bottom" title="Reset The Layout To The Default"></i>
                                <i id="loadIcon" class="fas fa-th fa-lg gridIcon" data-toggle="tooltip"
                                    data-placement="bottom" title="Reset The Layout To The Last Saved"></i>
                                <i id="lockIcon" class="fas fa-lock fa-lg gridIcon" data-toggle="tooltip"
                                    data-placement="bottom" title="Unlock Grid To Customise Layout"></i>
                            </div>

                        </div>


                    </div>
                </div>
            </div>

            <!-- Spotlight -->
            <div class="grid-stack-item" data-gs-x="8" data-gs-y="0" data-gs-width="4" data-gs-height="5"
                data-gs-min-height="2" data-gs-min-width="2" data-gs-max-height="6" data-gs-max-width="8">
                <div class="grid-stack-item-content" id="Spotlight">
                    <div class="Spotlight hideProfile">
                        <input type=hidden id="profileID" value="">
                        <img src='' id="ProfileBackground" draggable="false">
                        <img class="ProfileDetail" id="profileRing" draggable="false" src="assets/images/ImageRing.png"
                            alt="">
                        <img class="ProfileDetail" id="profilePic" draggable="false" src="" alt="">
                        <div class="ProfileDetails">
                            <p class="ProfileDetail" id="spotlightName"></p>
                            <p class="ProfileDetail" id="spotlightJobDescription"></p>
                            <p class="ProfileDetail" id="lineBreak"><img class="ProfileDetail" draggable="false"
                                    src="assets/images/profileLine.jpg" alt=""></p>
                            <p class="ProfileDetail" id="spotlightEmail"></p>
                            <p class="ProfileDetail" id="spotlightPhone"></p>
                        </div>
                    </div>
                    <div class="NewStarter hideProfile"
                        style="height:100%;width:100%;background-image:url('https://corporatedocument.sharepoint.com/sites/bgintranet/SitePages/Intranet/assets/images/WelcomeTile.png'); background-size: cover">
                        <div class="NewStarterDetails">
                            <p class="NewStarterDetail" id="NewStarterWelcome">Welcome</p>
                            <p class="NewStarterDetail" id="NewStarterName"></p>
                            <p class="NewStarterDetail" id="NewStarterJobDescription"></p>
                            <p class="NewStarterDetail" id="NewStarterGreeting">We're Glad You're Here</p>
                            <img id="NewsStarterInterviewImage"
                                src="https://corporatedocument.sharepoint.com/sites/bgintranet/SitePages/Intranet/assets/images/Interview_dark.png">
                            <p class="NewStarterDetail" id="NewStarterInterview"></p>
                            <input type="hidden" id="TMIVideoURL">
                        </div>
                    </div>
                </div>
            </div>

            <!-- People -->
            <div class="grid-stack-item" data-gs-x="0" data-gs-y="5" data-gs-width="8" data-gs-height="4"
                data-gs-min-height="2" data-gs-min-width="2" data-gs-max-height="6" data-gs-max-width="8">
                <div class="grid-stack-item-content" id="People">
                    <div id="sliderMain">
                        <div class="slideContainer peopleSlider">
                            <div id="NavElements" people-data-am-fadeshow="next-prev-navigation">
                                <!-- Thermometer reading -->
                                <script type="text/javascript">
                                    var currentAmount = 0;
                                </script>

                                <!-- Radio -->

                                <!-- Slides -->
                                <div class="people-slides">
                                    <div class="people-slide" v-for="(slide, index) in slides" :key="slide.ID"
                                        v-bind:style="{'background':slide.imgURL,'background-repeat': 'no-repeat','background-size': 'cover'}">
                                        <div class="slideOverlay" v-show="slide.showText"></div>
                                        <div class="slideHeadlineContainer" @click="showNews()">
                                            <h3 v-show="slide.showText" style="margin:0">{{slide.BGTitle}}</h3>
                                            <p id="readBGNews">&nbsp;{{slide.showReadMore}}</p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Quick Navigation -->
                                <!-- <div class="fs-quick-nav">
                                <label class="people-quick-btn" for="people-slide-1"></label>
                                <label class="people-quick-btn" for="people-slide-2"></label>
                                <label class="people-quick-btn" for="people-slide-3"></label>
                                <label class="people-quick-btn" for="people-slide-4"></label>
                            </div> -->

                                <!-- Previous Navigation -->
                                <div id="peoplePrevNav" class="fs-prev-nav">
                                </div>

                                <!-- <div id="thermometer">
                                    <h4 style="margin-bottom: 10px">Learn</h4>
                                    <div id="goal-thermometer"></div>
                                    <h4 style="margin: 0">O'Meter</h4>
                                </div> -->

                                <!-- Next Navigation -->
                                <div id="peopleNextNav" class="fs-next-nav">
                                </div>
                            </div>
                            <div class="viewAll">
                                <!-- <img src="./assets/images/GalleryIcon.png" data-toggle="tooltip" title="View All Slides" class="slideGallery">
                            <img src="./assets/images/VideoGalleryIcon.png" data-toggle="tooltip" title="View All Videos" class="videoGallery"> -->
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            <!-- Email -->
            <div class="grid-stack-item" data-gs-x="0" data-gs-y="9" data-gs-width="4" data-gs-height="3"
                data-gs-min-height="2" data-gs-min-width="2" data-gs-max-height="6" data-gs-max-width="8">
                <div class="grid-stack-item-content" id="Email">
                    <div id="EmailContent">
                        <div id="EmailSubHeadline2" class="subHeadline2">My</div>
                        <div id="EmailSubHeadline" class="subHeadline">Email</div>
                    </div>
                </div>
            </div>
            <!-- OneDrive -->
            <div class="grid-stack-item" data-gs-x="4" data-gs-y="9" data-gs-width="4" data-gs-height="3"
                data-gs-min-height="2" data-gs-min-width="2" data-gs-max-height="6" data-gs-max-width="8">
                <div class="grid-stack-item-content" id="OneDrive">
                    <div id="OneDriveContent">
                        <div id="OneDriveSubHeadline2" class="subHeadline2">One</div>
                        <div id="OneDriveSubHeadline" class="subHeadline">Drive</div>
                    </div>
                </div>
            </div>

            <!-- Ask HR -->
            <!-- <div class="grid-stack-item" data-gs-x="8" data-gs-y="5" data-gs-width="4" data-gs-height="1"
                data-gs-min-height="1" data-gs-min-width="2" data-gs-max-height="6" data-gs-max-width="8">
                <div class="grid-stack-item-content" id="AskHR">
                    <div id="AskHRContent">
                        <div id="NoticeBoardSubHeadline2"><span class="subHeadline2">Ask</span><span class="subHeadline">HR</span></div>
                    </div>
                </div>
            </div> -->


            <!-- NoticeBoard -->
            <!-- <div class="grid-stack-item" data-gs-x="8" data-gs-y="6" data-gs-width="4" data-gs-height="2"
                data-gs-min-height="2" data-gs-min-width="2" data-gs-max-height="6" data-gs-max-width="8">
                <div class="grid-stack-item-content" id="NoticeBoard">
                    <div id="NoticeBoardContent">
                        <div id="NoticeBoardSubHeadline2" class="subHeadline2">Notice</div>
                        <div id="NoticeBoardSubHeadline" class="subHeadline">Board</div>
                    </div>
                </div>
            </div> -->


            <!-- NoticeBoard -->
            <div class="grid-stack-item" data-gs-x="8" data-gs-y="5" data-gs-width="4" data-gs-height="3"
                data-gs-min-height="2" data-gs-min-width="2" data-gs-max-height="6" data-gs-max-width="8">
                <div class="grid-stack-item-content" id="NoticeBoard">
                    <div id="NoticeBoardContent">
                        <div id="NoticeBoardSubHeadline2" class="subHeadline2">Notice</div>
                        <div id="NoticeBoardSubHeadline" class="subHeadline">Board</div>
                    </div>
                </div>
            </div>

            <div class="grid-stack-item" data-gs-x="8" data-gs-y="8" data-gs-width="4" data-gs-height="2"
                data-gs-min-height="2" data-gs-min-width="2" data-gs-max-height="6" data-gs-max-width="8">
                <div class="grid-stack-item-content" id="JobBoard">
                    <div id="JobBoardContent">
                        <div id="JobBoardSubHeadline2" class="subHeadline2">Job</div>
                        <div id="JobBoardSubHeadline" class="subHeadline">Board</div>
                    </div>
                </div>
            </div>



            <div class="grid-stack-item" data-gs-x="8" data-gs-y="10" data-gs-width="2" data-gs-height="2"
                data-gs-min-height="2" data-gs-min-width="2" data-gs-max-height="6" data-gs-max-width="8">
                <div class="grid-stack-item-content" id="LoveMyIdea">
                    <div id="LoveMyIdeaContent">
                        <div id="LoveIdeaSubHeadline2" class="subHeadline2">Love</div>
                        <div id="LoveIdeaSubHeadline" class="subHeadline">My Ideas</div>
                    </div>
                </div>
            </div>

            <div class="grid-stack-item" data-gs-x="10" data-gs-y="10" data-gs-width="2" data-gs-height="2"
                data-gs-min-height="2" data-gs-min-width="2" data-gs-max-height="6" data-gs-max-width="8">
                <div class="grid-stack-item-content" id="IceAwards">
                    <div id="IceAwardsContent">
                        <div id="IceAwardsSubHeadline2" class="subHeadline2">Ice</div>
                        <div id="IceAwardsSubHeadline" class="subHeadline">Awards</div>
                    </div>
                </div>
            </div>

            <div class="grid-stack-item" data-gs-x="4" data-gs-y="18" data-gs-width="2" data-gs-height="2"
                data-gs-min-height="2" data-gs-min-width="2" data-gs-max-height="6" data-gs-max-width="8">
                <div class="grid-stack-item-content" id="CorporateTraveller">
                    <div id="CorporateTravellerContent">
                        <div id="CorporateTravellerSubHeadline2" class="subHeadline2">Corporate</div>
                        <div id="CorporateTravellerSubHeadline" class="subHeadline">Traveller</div>
                    </div>
                </div>
            </div>

            <div class="grid-stack-item" data-gs-x="6" data-gs-y="18" data-gs-width="2" data-gs-height="2"
                data-gs-min-height="2" data-gs-min-width="2" data-gs-max-height="6" data-gs-max-width="8">
                <div class="grid-stack-item-content" id="MeetUpCall">
                    <div id="MeetUpCallContent">
                        <div id="MeetUpCallSubHeadline2" class="subHeadline2">Meet</div>
                        <div id="MeetUpCallSubHeadline" class="subHeadline">Up Call</div>
                    </div>
                </div>
            </div>


            <div class="grid-stack-item" data-gs-x="0" data-gs-y="12" data-gs-width="4" data-gs-height="6"
                data-gs-min-height="6" data-gs-min-width="4" data-gs-max-height="6" data-gs-max-width="4">
                <div class="grid-stack-item-content" id="FindPeople">
                    <img class="hideProfile" id="PeopleFinderImg" src=""
                        style="border-radius:50%;opacity:0.4;width:190px;height:190px;position:absolute;top:19px;left:79px">
                    <div class="subHeadline2">Find</div>
                    <div class="subHeadline">People</div>
                    <div id="SeachFields">
                        <input id="emailAddress" type="hidden" value="" />
                        <input class="searchField" id="searchName" type="text" placeholder="Search by name" />
                        <input class="searchField" id="searchJob" type="text" placeholder="Search by job title" />
                        <input class="searchField" id="searchLocation" type="text" placeholder="Search by location" />
                        <button id="peopleFinderButton">Search</button>
                    </div>
                </div>
            </div>

            <div class="grid-stack-item" data-gs-x="4" data-gs-y="12" data-gs-width="4" data-gs-height="2"
                data-gs-min-height="2" data-gs-min-width="2" data-gs-max-height="6" data-gs-max-width="8">
                <div class="grid-stack-item-content" id="FAQ">
                    <div id="FaqContent">
                        <div id="FaqSubHeadline2" class="subHeadline2">Frequently</div>
                        <div id="FaqSubHeadline" class="subHeadline">Asked Questions</div>
                    </div>
                </div>
            </div>

            <!-- <div class="grid-stack-item" data-gs-x="4" data-gs-y="14" data-gs-width="4" data-gs-height="4"
                data-gs-min-height="4" data-gs-min-width="4" data-gs-max-height="4" data-gs-max-width="4">
                <div class="grid-stack-item-content" id="PeopleHR">
                    <div class="subHeadline2">People</div>
                    <div class="subHeadline">HR</div>
                    <ul id="peopleHRLinks">
                        <li><a
                                href="JobBoard.aspx">Job
                                Board</a></li>
                        <li><a href="TwoMinuteInterview.aspx">Two Minute Interviews</a></li>
                        <li><a href="eap.aspx">Employee Assistance Programme</a></li>
                        <li><a href="https://cds.peoplehr.net">People HR Site</a></li>
                    </ul>
                </div>
            </div> -->

            <div class="grid-stack-item" data-gs-x="4" data-gs-y="14" data-gs-width="4" data-gs-height="4"
                data-gs-min-height="4" data-gs-min-width="4" data-gs-max-height="4" data-gs-max-width="4">
                <div class="grid-stack-item-content" id="Synergist">
                    <div id="SynergistContent">
                        <div id="SynergistHeadline" class="subHeadline">Synergist</div>
                        <div id="SynergistLineOne" class="subHeadline2 lineOne">+ Expenses</div>
                        <div id="SynergistLineTwo" class="subHeadline2 lineTwo">+ Timesheets</div>
                    </div>
                </div>
            </div>

            <div class="grid-stack-item" data-gs-x="8" data-gs-y="12" data-gs-width="4" data-gs-height="8"
                data-gs-min-height="8" data-gs-min-width="4" data-gs-max-height="8" data-gs-max-width="4">
                <div class="grid-stack-item-content" id="WhatsHappeningContainer">
                    <div class="whatsHappeningHeader" id="WhatsHappening">
                        <div class="subHeadline2">What's</div>
                        <div class="subHeadline">Happening</div>
                        <div class="subHeadline3">Today</div>
                    </div>
                    <div class="whatsHappeningBody">
                        <input type="text" id="whatsHappeningEvendar" />
                    </div>
                </div>
            </div>

            <div class="grid-stack-item" data-gs-x="0" data-gs-y="18" data-gs-width="4" data-gs-height="2"
                data-gs-min-height="2" data-gs-min-width="2" data-gs-max-height="6" data-gs-max-width="8">
                <div class="grid-stack-item-content" id="Engage">
                    <div id="EngageContent">
                        <div id="EngageSubHeadline" class="subHeadline">Engage</div>
                    </div>
                </div>
            </div>
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
        document.write('<script src="js/Index-vue.min.js?dev=' + Math.floor(Math.random() * 100) + '"\><\/script>');
    </script>
    <script>
        document.write('<script src="js/SharedComponents.min.js?dev=' + Math.floor(Math.random() * 100) +
            '"\><\/script>');
    </script>
    <script>
        document.write('<script src="js/index.min.js?dev=' + Math.floor(Math.random() * 100) + '"\><\/script>');
    </script>
    <!-- <script src="js/Index-vue.min.js"></script> -->
    <!-- <script src="js/SharedComponents.min.js"></script> -->
    <!-- <script src="js/index.min.js"></script> -->

</body>

</html>