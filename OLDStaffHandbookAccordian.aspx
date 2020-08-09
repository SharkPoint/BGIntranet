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

    <link href='https://fonts.googleapis.com/css?family=News+Cycle:400,700' rel='stylesheet' type='text/css'>
    <link href="https://fonts.googleapis.com/css?family=Lobster" rel="stylesheet" type="text/css">



    <style>
        * {
            margin: 0;
            padding: 0;
        }

        body {
            font-size: 100%;
        }

        #wrapper {
            background: #202020;
            color: black;
            max-width: 1140px;
            margin: 0 auto;
            margin-bottom: 20px;
        }

        .accordion {
            width: 100%;
            margin: 20px auto;
        }

        .accordion h1,
        h2,
        h3,
        h4 {
            cursor: pointer;
        }

        .accordion h2,
        h3,
        h4 {
            font-family: "News Cycle";
        }

        .accordion h1 {
            padding: 15px 20px;
            background-color: #333;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            font-size: 1.5rem;
            font-weight: 700;
            color: lightgray;
        }

        .accordion h1:hover {
            color: white;
        }

        .accordion h1:first-child {
            border-radius: 10px 10px 0 0;
        }

        .accordion h1:last-of-type {
            border-radius: 0 0 10px 10px;
        }

        .accordion h1:not(:last-of-type) {
            border-bottom: 1px dotted firebrick;
        }

        .accordion div,
        .accordion p {
            display: none;
        }

        .accordion h2 {
            padding: 5px 25px;
            background-color: #70001a;
            font-size: 1.1rem;
            color: lightgray;
        }

        .accordion h2:hover {
            background-color: #8f0d2b;
            color: white;
        }

        .accordion h3 {
            padding: 5px 30px;
            /* background-color: #003470; */
            background-color: #007056;
            font-size: .9rem;
            color: #ddd;
        }

        .accordion h3:hover {
            /* background-color: #0c4b92; */
            background-color: #048567;
            color:white;
        }

        .accordion h4 {
            padding: 5px 35px;
            background-color: #003470;
            font-size: .9rem;
            color: lightgray;
        }

        .accordion h4:hover {
            background-color: #0c4b92;
            color:white
        }

        .accordion p {
            padding: 15px 35px;
            background-color: #333;
            font-family: "roboto";
            font-size: .8rem;
            color: lightgray;
            line-height: 1.3rem;
        }

        .accordion .opened {
            display: block;
        }
    </style>


</head>

<body class="StaffHandbook">
    <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="#">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->

    <!-- <div class="loadingSpinner">
        <div class="lds-eclipse">
            <div></div>
        </div>
    </div> -->
    <div class="navBar" v-html="navBarHTML">{{navBarHTML}}</div>
    <div class="sideMenu" v-html="sideMenuHTML">{{sideMenuHTML}}</div>

    <div id="wrapper">
        <div class="content">

            <link href='https://fonts.googleapis.com/css?family=News+Cycle:400,700' rel='stylesheet' type='text/css'>
            <link href="https://fonts.googleapis.com/css?family=Lobster" rel="stylesheet" type="text/css">

            <aside class="accordion">
                    <h1>Staff Handbook</h1>
                    <div class="opened">
    
                        <h2>Introduction</h2>
                        <p>This is the introduction text</p>
    
                        <h2>Our Values</h2>
                        <p>• A razor-sharp focus on a positive customer experience.
                            • Instil the values of honesty, hard work and integrity.
                            • Recruit and invest in talented professionals.
                            • Create an environment that provides people with a flexible work life, intellectually engaging
                            work and fair compensation.
                            • To maintain a positive, team-focused office atmosphere built on mutual, professional respect.
                            • Proactively learn best in breed practices and solutions.
                            • Cultivate ideas and entrepreneurial spirit.
                            • Have fun and create an environment where people want to come to work.
                            t</p>
    
                        <h2>Company Benefits</h2>
                        <div>
                            <h3>Pension</h3>
                            <p>While retirement is probably the furthest thing from your mind when you’re starting your career, the earlier you start paying into a pension the better off you’ll be when you finish working. We currently partner with Standard Life to help you build your nest egg if you contribute, the company will also contribute between four and five per cent of your basic salary. That’s like getting free money for the future! If you are eligible, you will be automatically enrolled into the pension scheme after your first payday – membership is postponed until the last day of your first payroll month. After you have been paid, you will be sent some information about the pension scheme which will operate on a salary exchange basis for most staff; a booklet will be provided to explain how this works.</p>
    
                            <h3>Child Voucher Scheme</h3>
                            <p>From 5 October 2018, childcare voucher schemes will close to new applicants and will be replaced by the Government’s scheme called Tax-free Childcare – for more details about this, go to  https://www.gov.uk/tax-free-childcare</p>
    
                            <h3>Cycle To Work Scheme</h3>
                            <p>Maybe you’re tired of sitting in traffic. Maybe you want to rein in the old waistline. Or maybe you just passed a shop one day and saw the bike of your dreams in the window. The Group offers a 12-month loan on bicycles purchased from Halfords or Evans Cycles. The only requirement is that you use it for at least part of your journey to work. So, enjoy tax-free cycling and save at least 25% of the cost of a brand-new bike and accessories!</p>
    
                            <h3>Death In Service</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                laboris nisi ut aliquip ex ea commodo consequat.</p>
    
                            <h3>Season Pass For Rail & Bus</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                laboris nisi ut aliquip ex ea commodo consequat.</p>
    
                            <h3>Themed Events</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                laboris nisi ut aliquip ex ea commodo consequat.</p>
    
                            <h3>Staff wellbeing</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                laboris nisi ut aliquip ex ea commodo consequat.</p>
    
                            <h3>Eyesight tests</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                laboris nisi ut aliquip ex ea commodo consequat.</p>
    
                            <h3>Social Committee Events & Sports</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                laboris nisi ut aliquip ex ea commodo consequat.</p>
    
                            <h3>Annual Leaver Allowance</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                laboris nisi ut aliquip ex ea commodo consequat.</p>
    
                            <h3>Ice Awards</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                laboris nisi ut aliquip ex ea commodo consequat.</p>
    
                            <h3>Employee Assistance Program</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
    
                        <h2>Time Away From Work</h2>
                        <div>
                            <h3>Holidays</h3>
                            <div>
                                <h4>Annual Holiday Entitlement</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                <h4>Long Term Service Allowance</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                <h4>Holiday Carryover</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            </div>
    
                            <h3>Statutory Holidays / Bank Holidays</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                laboris nisi ut aliquip ex ea commodo consequat.</p>
    
                            <h3>Time Off</h3>
                            <div>
                                <h4>Compassionate Leave</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    
                                <h4>Jury Service</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                                    do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    
                                <h4>Religious Holidays & Festivals</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                                    do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    
                                <h4>Volunteer reserve forces</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    
                                <h4>Appointments</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                                    do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    
                                <h4>Timekeeping</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                                    do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    
                                <h4>Absense & Formal Meetings</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                                    do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    
                                <h4>Unauthorised Absense</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                                    do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            </div>
                        </div>
    
                    </div>
    
                    <h1>Updates</h1>
                    <div>
                        <h2>Update #1</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat.</p>
    
                        <h2>Update #2</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat.</p>
    
                        <h2>Update #3</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat.</p>
    
                        <h2>Update #4</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
    
                    <h1>Miscellaneous</h1>
                    <div>
                        <h2>Misc. #1</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat.</p>
    
                        <h2>Misc. #2</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat.</p>
    
                        <h2>Misc. #3</h2>
                        <div>
                            <h3>Misc. Item #1a</h3>
                            <div>
                                <h4>Misc. Subitem 1</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    
                                <h4>Misc. Subitem 2</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    
                                <h4>Misc. Subitem 3</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            </div>
                            <h3>Misc. Item #2a</h3>
                            <div>
                                <h4>Misc. Subitem 1</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    
                                <h4>Misc. Subitem 2</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            </div>
                        </div>
                    </div>
                </aside> 
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
    <script type="text/javascript" src="js-orig\StaffHandbookAccordian.js"></script>


    <script>

    </script>
</body>

</html>