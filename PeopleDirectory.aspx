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
    <title>BIG - People Directory</title>
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

    <style>
        body {
            overflow-y: scroll;
        }

        #wrapper {

            background: #202020;
            color: lightgray;
            max-width: 1140px;
            margin: 0 auto;
        }

        #content {
            display: grid;
            grid-template-columns: 12fr;
            grid-gap: 10px;
            margin: 0 auto;
            margin-bottom: 20px;

        }

        .refiners {
            display: grid;
            grid-template-columns: 1fr;
            padding: 10px;
        }

        .offices {
            padding: 15px 15px 15px 20px;
        }

        .departments {
            padding: 15px 15px 15px 20px;
        }

        .main {
            display: grid;
            grid-template-columns: 1fr;
            grid-gap: 10px;
        }

        .searchBar {
            padding-top: 10px;
            padding-bottom: 0px;
            padding-left: 6px;
        }

        #searchBox {
            overflow: visible;
            padding: 2px 8px;
            border-radius: 5px;
            width: 99%;
        }

        .people {
            padding: 5px;
            display: grid;
            grid-gap: 8px;
            align-items: center;
            grid-template-columns: repeat(auto-fit, minmax(300px, auto));
            grid-auto-rows: minmax(50px, auto);
            min-height: 95px;
        }

        .person {
            display: grid;
            padding: 5px;
            grid-gap: 5px;
            grid-template-columns: 1fr 3fr;
            grid-auto-rows: minmax(50px, auto);
            background: blue;
            border-radius: 5px;
            max-width: 390px;
        }

        .people :hover {
            background: rgb(55, 55, 206);
        }

        .alphaNav {
            padding-left: 0;
            border-bottom-width: 20px;
            margin-bottom: 10px;
            margin-top: 10px;
        }

        .alphaNavItem {
            width: 37.9px;
            height: 36px;
            padding: 2px;
            border-radius: 5px;
            text-align: center;
            display: inline-block;
            background: blue;
            font-size: 1.3rem;
        }

        .alphaNav li {
            display: inline;
        }

        .alphaNavItem:hover {
            background: firebrick;
            color: white;
            font-weight: 600;
        }

        .selectedAlpha {
            color: blue;
            background: white;
            font-weight: 600;
        }

        .selectedAlpha:hover {
            color: white;
            background: firebrick;
            font-weight: 600;
        }

        .profilePic img {
            width: 75px;
            height: 75px;
            border-radius: 5px;
        }

        .refinerList {
            list-style-type: none;
            padding: 0;
            margin: 0;
        }

        .SearchBar {
            display: grid;
            grid-template-columns: 4fr 3fr 3fr 1fr 1fr;
            /* grid-column: 1/12; */
            grid-row: 1/2;
            grid-gap: 3px;
            height: 70px;
        }

        .SearchBar div {
            border: 1px solid #000000;
            border: none;
            padding: 10px 2px 2px 2px;
        }

        #searchTerm {
            padding: 10px 2px 10px 10px;
            height: 50px;
            border-radius: 5px;
            border: 1px solid rgb(179, 179, 179);
            line-height: 50px;
            color: #999;
            font-size: 18px;
            font-weight: normal;
            background: white;
        }

        .goBtn {
            height: 50px;
            border-radius: 5px;
            border: 1px solid rgb(179, 179, 179);
            line-height: 50px;
        }

        .goBtn:hover {
            cursor: pointer;
            background-color: #464646;
            color: whitesmoke;
            font-weight: bold;
        }

        #searchTerm,
        .selectCompany,
        .selectLocation {

            width: 100%;
            text-align: left;
            color: #999;
            background: white;
        }

        .searchButton {
            width: 100%;
            text-align: center;
        }

        /* Select 2 styling */

        .select2-container--default .select2-selection--single {
            height: 50px;
            border-radius: 5px;
        }

        .select2-container--default .select2-selection--single .select2-selection__rendered {
            height: 50px;
            line-height: 50px;
        }

        .select2-container--default .select2-selection--single .select2-selection__arrow {
            height: 50px;
        }

        .select2-container--default .select2-results__option--highlighted[aria-selected] {
            background-color: darkgray;
            color: whitesmoke;
        }

        .select2-results {
            color: rgb(179, 179, 179);
        }

        #pagination-container {
            margin: 0;
            grid-column: 1;
        }

        .profile {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            grid-auto-rows: minmax(50px, auto);
            border: 1px solid grey;
            padding: 20px;
            margin-bottom: 20px
        }

        .back {
            grid-column: 1/2;
            padding: 10px;
        }

        .profileImage {
            grid-column: 2/5;
            display: grid;
            grid-template-columns: 1fr;
        }

        .userProfilePic {
            padding: 15px;
        }

        .userProfilePic img {
            width: 250px;
            height: 250px;
        }

        .companyImage ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
        }

        .contactList {
            list-style-type: none;
            padding: 15px;
            margin: 0;
            background: gray;
            color: black;
            border-radius: 5px;
            font-size: 1.1rem;
        }

        .contactList li {
            padding: 0 8px;
        }

        .contactList li a {
            text-decoration: none
        }

        .contactList li a:hover {
            color: white;
        }


        .profileDetails {
            grid-column: 5/13;
            margin-top: 60px;
        }

        #backButton:hover {
            color: white;
        }

        .contactDetails {
            border-radius: 5px;
        }

        .personal {
            height: 110px;
            padding-left: 10px;
            margin-top: 80px;
            margin-bottom: 20px;
        }

        .companyImage {
            padding-top: 10px;
            background: white;
            margin-top: 6px;
            border-radius: 5px;
            height: 197px;
        }

        img.coImage {
            width: 250px;
            height: auto;
            padding: 10px;
            margin: 30px -0px;
        }

        .noUsersFound {
            text-align: center;
            margin-top: 30px;
            width: 98%;
        }

        .mobileBack {
            padding: 10px;
            margin-top: 30px;
            margin-left: 0px;
            background: #202020;
            color: white;
            text-align: center;
            border-radius: 5px;
            display: block;
            width: 100px;
            margin: auto;
            display: none;
        }

        @media only screen and (max-width: 600px) {

            .back {
                grid-column: 0;
                padding: 0;
                display: none;
            }

            #backButton {
                display: none;
            }

            .profile {
                display: grid;
                grid-template-columns: 1fr;
                grid-auto-rows: minmax(50px, auto);
                padding: 20px;
                margin-bottom: 20px;
            }

            .profileDetails {
                grid-column-end: 1;
                margin-top: 0;
            }

            .personal {
                height: 100%;
                display: block;
                overflow: visible;
                padding-left: 10px;
                margin-bottom: 20px;
                margin-top: 0;
                text-align: center;
            }

            .companyImage {
                display: none;
                padding-top: 10px;
                background: white;
                margin-top: 6px;
                border-radius: 5px;
                height: 197px;
            }

            .profileImage {
                grid-column: 1/2;
                display: grid;
                grid-template-columns: 1fr;
            }

            .userProfilePic img {
                width: 100%;
                height: auto;
            }

            .mobileBack {
                display: block;
            }

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

        <div id="content" v-show="!showProfile">
            <div class="SearchBar">
                <div class="SearchCombo">
                    <input id="searchTerm" Placeholder="Search For ..." type="text" class="newsSearch"
                        name="newsSearch">
                </div>
                <div class="SearchCompany">
                    <select class="selectCompany" id="CompanySearch">
                        <option></option>
                        <option value='All'>All</option>
                        <option value='The Baird Group'>Group</option>
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
                    <p class="goBtn" onclick="vm_Main.clearAllSearch()">CLR</p>
                </div>
                <div class="searchButton">
                    <p class="goBtn" onclick="vm_Main.searchUsersFromSearchFields()">GO</p>
                </div>
            </div>

            <div class="main">

                <div class="nav">
                    <ul class="alphaNav">
                        <li>
                            <div class="alphaNavItem">*</div>
                        </li>
                        <li>
                            <div class="alphaNavItem selectedAlpha">A</div>
                        </li>
                        <li>
                            <div class="alphaNavItem">B</div>
                        </li>
                        <li>
                            <div class="alphaNavItem">C</div>
                        </li>
                        <li>
                            <div class="alphaNavItem">D</div>
                        </li>
                        <li>
                            <div class="alphaNavItem">E</div>
                        </li>
                        <li>
                            <div class="alphaNavItem">F</div>
                        </li>
                        <li>
                            <div class="alphaNavItem">G</div>
                        </li>
                        <li>
                            <div class="alphaNavItem">H</div>
                        </li>
                        <li>
                            <div class="alphaNavItem">I</div>
                        </li>
                        <li>
                            <div class="alphaNavItem">J</div>
                        </li>
                        <li>
                            <div class="alphaNavItem">K</div>
                        </li>
                        <li>
                            <div class="alphaNavItem">L</div>
                        </li>
                        <li>
                            <div class="alphaNavItem">M</div>
                        </li>
                        <li>
                            <div class="alphaNavItem">N</div>
                        </li>
                        <li>
                            <div class="alphaNavItem">O</div>
                        </li>
                        <li>
                            <div class="alphaNavItem">P</div>
                        </li>
                        <li>
                            <div class="alphaNavItem">Q</div>
                        </li>
                        <li>
                            <div class="alphaNavItem">R</div>
                        </li>
                        <li>
                            <div class="alphaNavItem">S</div>
                        </li>
                        <li>
                            <div class="alphaNavItem">T</div>
                        </li>
                        <li>
                            <div class="alphaNavItem">U</div>
                        </li>
                        <li>
                            <div class="alphaNavItem">V</div>
                        </li>
                        <li>
                            <div class="alphaNavItem">W</div>
                        </li>
                        <li>
                            <div class="alphaNavItem">X</div>
                        </li>
                        <li>
                            <div class="alphaNavItem">Y</div>
                        </li>
                        <li>
                            <div class="alphaNavItem">Z</div>
                        </li>
                    </ul>
                </div>
                <ul class="people">
                    <div class="noUsersFound" v-show="showNoResults">
                        <h4>
                            << No Results Found>>
                        </h4>
                    </div>
                    <li class="person" v-for="user in filteredUsers">
                        <input type="hidden" class="userEmail" :value="user.Email">
                        <div v-if="user.PictureURL===null" class="profilePic"><img
                                src="assets/images/missingprofile.jpg"></div>
                        <div v-else class="profilePic"><img v-bind:src="user.PictureURL"></div>
                        <div class="userDetails">
                            <div class="name">{{user.FullName}}</div>
                            <div v-if="user.JobTitle<25">{{user.JobTitle}}</div>
                            <div v-else class="detail">{{user.JobTitle.substring(0,32)}}</div>
                            <div class="phoneNumber">{{user.WorkPhoneNumber}}</div>
                        </div>
                    </li>
                </ul>
            </div>
            <div id="pagination-container" class="dark-theme"></div>
        </div>

        <div class="profile" v-show="showProfile">
            <div class="back"><i id="backButton" class="far fa-arrow-alt-circle-left fa-5x"></i></div>
            <div class="profileImage">
                <div class="userProfilePic">
                    <div v-if="selectedProfile.PictureURL===null" class="profilePic"><img
                            src="assets/images/missingprofile.jpg"></div>
                    <div v-else class="profilePic"><img v-bind:src="selectedProfile.PictureURL"></div>
                    <div class="companyImage">
                        <img class="coImage" :src="selectedProfile.CompanyImage">
                    </div>
                </div>
            </div>
            <div class="profileDetails">
                <div class="personal">
                    <h1>{{selectedProfile.FullName}}</h1>
                    <h4>{{selectedProfile.JobTitle}}</h4>
                    <h6>{{selectedProfile.Company}}, {{selectedProfile.Department}}, {{selectedProfile.Office}}</h6>
                </div>
                <div class="contactDetails">
                    <ul class="contactList">
                        <li>
                            <p><span class="fas fa-phone fa-lg fa-fw"></span> {{selectedProfile.WorkPhoneNumber}}</p>
                        </li>
                        <li>
                            <p><span class="fas fa-mobile-alt fa-lg fa-fw"></span> {{selectedProfile.WorkMobileNumber}}
                            </p>
                        </li>
                        <li>
                            <p><span class="fab fa-skype fa-lg fa-fw"></span><a :href="selectedProfile.skypeaddress">
                                    Skype {{selectedProfile.FullName}}</a></p>
                        </li>
                        <li>
                            <p><span class="far fa-envelope fa-lg fa-fw"></span><a
                                    :href="selectedProfile.mailtoaddress"> {{selectedProfile.Email}}</a></p>
                        </li>
                        <li>
                            <div class="mobileBack">Back</div>
                        </li>
                    </ul>

                </div>
            </div>
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
    <script type="text/javascript" src="js-orig/PeopleDirectory.js"></script>

</body>

</html>