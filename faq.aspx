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
    <title>BIG - FAQ</title>
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

<body class="faq">
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

            <div class="searchbar">

                <select class="faqQuestion" name="faqQ" style="width:100%;text-align:left">
                    <option></option>
                </select>

            </div>
            <div class="navpath">
                <ul class="breadcrumb">
                    <li style="color: rgb(179,179,179)">FAQ Home</li>
                </ul>
            </div>
            <div class="newQuestion"><a id="newFaq" href=#>New FAQ</a></div>
            <div class="main">
                <div class="faqBox" v-for="faq in faqCollection">
                    <h2 style="margin-bottom:15px;font-weight:600;padding:10px"><a
                            v-bind:href="'faqAnswer.aspx?id=0&amp;cat=' + faq.Category">{{faq.Category}} Questions</a>
                    </h2>
                    <ul style="margin-bottom:8px;padding-left:10px;list-style:none;">
                        <li v-for="question in faq.Questions" class="faqListItem"><a
                                v-bind:href="'faqAnswer.aspx?id=' + question.id + '&amp;cat=' + question.Category">{{question.Title}}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- Page Footer  -->
    <div id="footer" class="PageFooter" v-html="pageFooterHTML">{{pageFooterHTML}}</div>

    <!-- New FAQ Modal -->
    <div class="modal fade" id="NewFAQModal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog"
        aria-labelledby="NewFaqModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header" style="background-color:teal;color:white;font-weight:bolder">
                    <h4 class="modal-title" id="userProfileModalLabel">New FAQ</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" style="padding-bottom: 2px;">
                    <form>
                        <div class="modal-body" id="faqFeedbackModalBody" style="padding-bottom: 2px;">
                            <div class="container">
                                <div class="row">
                                    <div class="col-sm-12 col-md-12" style="background-color:white;">
                                        <textarea rows="5" style="width:100%;padding:10px" class="newFaqDescription"
                                            placeholder="Please Enter Your New FAQ"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="mpStatus" style="text-align: center;"></div>
                <div class="modal-footer" style="padding-top:2px;padding-bottom:2px;">
                    <button type="button" id="SaveNewFAQ" class="btn btn-info btn-sm">Save
                        FAQ</button>
                    <button type="button" id="CloseNewFAQ" style="margin-right:31px" class="btn btn-info btn-sm"
                        data-dismiss="modal">Close</button>
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
    <script type="text/javascript" src="js/bgbs_utils.min.js"></script>
    <script type="text/javascript" src="js/SharedComponents.min.js"></script>
    <script type="text/javascript" src="js/bgbs_faq.min.js"></script>

</body>

</html>