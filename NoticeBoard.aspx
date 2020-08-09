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
    <title>BIG - Notice Board</title>
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

</head>

<body class="noticeBoard">
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
                    <select class="selectCompany" name="CompanySearch">
                        <option></option>
                        <option value='All'>All</option>
                        <option value='Group'>Group</option>
                        <option value='CDS'>CDS</option>
                        <option value='CDS DS'>CDS DS</option>
                        <option value='BGBS'>BGBS</option>
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
            <div class="newQuestion" onclick="vm_Main.createNewNote()"><a id="newFaq" href=#>New Note</a></div>
            <ul class="main notices list-wrapper" id="noticeList">
                <li class="faqBox quote-container list-item" v-for="post in allPosts">
                    <div :id="post.ID" class="notePost" ondblclick='vm_Main.editNote()'>
                        <i class="pin"></i>
                        <blockquote class="note" :class="{[post.Style]:true}">
                            <h2 class='title'>{{post.Title}}</h2>
                            <p class='description'>{{post.Description}}</p>
                            <cite class="author">{{post.Author}} - {{post.PhoneNumber}}</cite>
                            <cite class="noteIcons">
                                <a :href='post.Email'><i id="noteEmail" class="noteIcon far fa-envelope fa-lg"
                                        :class="{active: true}"></i></a>
                                <a :href='post.Image' :data-lightbox='post.LighboxVal' :data-title='post.Title'><i
                                        id="noteImage" class="noteIcon fas fa-camera fa-lg"
                                        :class="{active: post.ActiveImage, inactive: !post.ActiveImage}"></i></a>
                                <a :href="post.Link" target="_blank"><i id="noteLink" class="noteIcon fas fa-link fa-lg"
                                        :class="{active: post.ActiveLink, inactive: !post.ActiveLink}"></i></a>
                                <i :id="post.ID" onclick="vm_Main.deletePost()" class="noteIcon far fa-trash-alt fa-lg"
                                    :class="{active: post.ActiveDelete, inactive: !post.ActiveDelete}"></i>
                            </cite>
                        </blockquote>
                    </div>
                </li>
            </ul>
            <div id="pagination-container" class="dark-theme"></div>
        </div>
    </div>
    </div>

    <!-- Page Footer  -->
    <div id="footer" class="PageFooter" v-html="pageFooterHTML">{{pageFooterHTML}}</div>

    <!-- New FAQ Modal -->
    <div class="modal fade" id="NewNoteModal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog"
        aria-labelledby="NewFaqModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="userProfileModalLabel"></h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" id="faqFeedbackModalBody">
                    <div class="container">
                        <form class="newNote">
                            <div class="form-group">
                                <input class="form-control" type="text" id="nbTitle" placeholder="Please Enter A Title"
                                    val="">
                            </div>
                            <div class="form-group nbCompany">
                                <select class="selectCompany" id="CompanyCombo" name="CompanySearch">
                                    <option></option>
                                    <option value='Group'>Group</option>
                                    <option value='CDS'>CDS</option>
                                    <option value='CDS DS'>CDS DS</option>
                                    <option value='BGBS'>Newspress</option>
                                    <option value='BGBS'>BGBS</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <textarea id="nbDescription" rows="5" class="textarea form-control"
                                    placeholder="Please Enter A Message"></textarea>
                            </div>
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" id="bgImage"
                                    placeholder="Web Address Of Image (Optional)"
                                    aria-label="Web Address Of Image (Optional)" aria-describedby="Web Address Image">
                                <div class="input-group-append">
                                    <button class="btn btn-primary mb-2 test-bgImage" type="button">Test Link</button>
                                </div>
                            </div>
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" id="bgLink"
                                    placeholder="Web Address Of Link (Optional)"
                                    aria-label="Web Address Of Link (Optional)" aria-describedby="Web Address Link">
                                <div class="input-group-append">
                                    <button class="btn btn-primary mb-2 test-bgLink" type="button">Test Link</button>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="input-group">
                                    <input type="text" id="creatorsName" readonly class="form-control"
                                        placeholder="Creators Name" />
                                    <span class="input-group-addon">-</span>
                                    <input type="text" id="creatorsPhone" class="form-control"
                                        placeholder="Creators Phone Number" />
                                </div>
                            </div>
                            <div class="form-group text-right">
                                <button type="submit" class="btn btn-primary mb-2">Submit</button>
                                <button type="button" class="btn btn-primary mb-2" data-dismiss="modal">Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

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
    <script type="text/javascript" src="js/NoticeBoard.min.js"></script>

</body>

</html>