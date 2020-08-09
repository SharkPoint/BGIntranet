<!DOCTYPE html>
<html>

<head>
    <title>Ice Awards</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

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

    <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/3.5.4/select2.min.css" rel="stylesheet" />

    <link href='https://fonts.googleapis.com/css?family=Raleway:500,600,700,400,200,300' rel='stylesheet'
        type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700' rel='stylesheet' type='text/css'>


    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
        integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
    <link type="text/css" rel="stylesheet" href="css/bootstrap.min.css" />
    <link type="text/css" rel="stylesheet" href="css/slider.css" />
    <link type="text/css" rel="stylesheet" href="css/mdb.css" />
    <link type="text/css" rel="stylesheet" href="css/pagestyle.css" />
    <link type="text/css" rel="stylesheet"
        href="https://corporatedocument.sharepoint.com/sites/bgintranet/SitePages/IntranetDevOLD/styles/style.min.css" />
    <link rel="stylesheet" href="css/font-awesome.min.css">
    <link type="text/css" rel="stylesheet" href="css/ice_form.css" />

    <script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/select2/3.5.4/select2.js"></script>
    <script type="text/javascript" src="js/store.js"></script>
    <script type="text/javascript" src="../js/sharepoint.min.js"></script>
    <script type="text/javascript" src="js/toastr.js"></script>
    <script type="text/javascript" src="js/axios-0-2-1.js"></script>
    <script type="text/javascript" src="js/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/slider.js"></script>
    <script type="text/javascript" src="../js/bgbs_utils.min.js"></script>
    <script type="text/javascript" src="js/ice_awards.js"></script>

</head>

<body>
    <!-- Spinner Displayed Whilst Loading -->
    <div class="loadingSpinner">
        <div class="lds-eclipse">
            <div></div>
        </div>
    </div>

    <div class="xpro-slider-container">
        <div id="scroller" class="xpro-slider">
            <div class="xpro-slider-content">

                <div class="xpro-slider-item"
                    style="background-image:url(images/bgbs_pics/IceAwardsPic1.jpg);background-position:right center">

                    <div class="xpro-item-layer"
                        style="opacity:0;top:0px;bottom:0px;left:-700px;margin:auto;background-color:rgba(0,0,0,0.7);width:700px"
                        data-effect="animate({X:'700px', 'delay':'0.5s', 'duration':'500ms'})">

                        <div class="xpro-item-layer"
                            style="position:absolute;opacity:0;top:250px;right:50px;text-align:right;"
                            data-effect="animate({'Y':'-20px', 'delay':'1s', 'duration':'600ms'})">
                            <div class="xpro-item-layer-responsive xp-headsubtext" style='font-size: 15px;'>
                                Awards For Innovation Or Contribution Excellence
                            </div>
                            <h1 class="xpro-item-layer-responsive xp-headtext"
                                style="margin-top: 0px;padding:10px 0px;font-size:48px;">Ice
                                Awards</h1>
                        </div>

                        <div class="xpro-item-layer"
                            style="position:absolute;opacity:0;top:370px;right:50px;text-align:right"
                            data-effect="animate({'Y':'-20px', 'delay':'1.5s', 'duration':'600ms'})">
                            <div class="xpro-item-layer-responsive xp-headdetailtext"
                                style='font-size: 15px;width: 350px;'>
                                The contribution award is where a person or a team’s contribution (nominated by someone
                                else) is being recognised as going above and beyond their day to day activities.
                            </div>
                        </div>

                        <div class="xpro-item-layer" style="position:absolute;opacity:0;top:500px;right:50px"
                            data-effect="animate({'Y':'-20px', 'delay':'2s', 'duration':'600ms'})">
                            <a class='xpro-item-layer-responsive xp-hero-round-button' id="button1" onclick="Nominate()"
                                style="padding: 10px 30px;font-size:16px">Nominate Now</a>
                        </div>

                        <div class="xpro-item-layer" style="position:absolute;opacity:0;top:550px;right:65px"
                            data-effect="animate({'Y':'-20px', 'delay':'3s', 'duration':'600ms'})">
                            <a class='xpro-item-layer-responsive xp-hero-round-button' id="button2" onclick="Back2BIG()"
                                style="padding: 10px 30px;font-size:16px">Back To BIG</a>
                        </div>

                        <div class="view_nominations xpro-item-layer"
                            style="position:absolute;opacity:0;top:600px;right:65px"
                            data-effect="animate({'Y':'-20px','delay':'4s', 'duration':'600ms'})">
                            <a class='xpro-item-layer-responsive xp-hero-round-button' id="button3"
                                onclick="ViewNominations()" style="padding: 10px 30px;font-size:16px">View
                                Nominations</a>
                        </div>

                        <div class="view_approvals xpro-item-layer"
                            style="position:absolute;opacity:0;top:650px;right:65px"
                            data-effect="animate({'Y':'-20px','delay':'4.5s', 'duration':'600ms'})">
                            <a class='xpro-item-layer-responsive xp-hero-round-button' id="button3"
                                onclick="ViewMyApprovals()" style="padding: 10px 30px;font-size:16px">View My
                                Approvals</a>
                        </div>

                    </div>

                    <div class="xpro-item-layer"
                        style="opacity:0;bottom:20px;left:0px;right:0px;margin:auto;text-align: center;"
                        data-effect="animate({Y:'-10px', 'delay':'2.5s', 'duration':'500ms'})">
                        <div class="nextButton xp-custom-navigation"><a
                                class='xp-hero-circle-button xpro-pulse xp-custom-navigation'><i
                                    class="fa fa-long-arrow-down"></i></a></div>
                    </div>
                </div>

                <div class="xpro-slider-item"
                    style="background-image:url(images/bgbs_pics/IceAwardsPic2.jpg);background-position:left center">

                    <div class="xpro-item-layer"
                        style="opacity:0;top:0px;bottom:0px;left:1000px;margin:auto;background-color:rgba(0,0,0,0.5);width:100%"
                        data-effect="animate({X:'-500px', 'delay':'0.5s', 'duration':'500ms'})">

                        <div class="xpro-item-layer" style="position:absolute;opacity:0;top:25%;left:50px;"
                            data-effect="animate({'Y':'-20px', 'delay':'1s', 'duration':'600ms'})">
                            <div class="xpro-item-layer-responsive xp-headsubtext" style='font-size: 15px;'>
                                Awards For Innovation Or Contribution Excellence
                            </div>
                            <h1 class="xpro-item-layer-responsive xp-headtext"
                                style="margin-top: 0px;padding:10px 0px;font-size:48px;">Ice
                                Awards</h1>
                        </div>

                        <div class="xpro-item-layer" style="position:absolute;opacity:0;top:40%;left:50px;"
                            data-effect="animate({'Y':'-20px', 'delay':'1.5s', 'duration':'600ms'})">
                            <div class="xpro-item-layer-responsive xp-headdetailtext"
                                style='font-size: 15px;width: 350px;'>
                                The reviewed nominations are assessed by the ICE judging panel using the following
                                commonly used Personal Development criteria:
                                <ul style="padding-top:20px">
                                    <li>Achievement - Planning & Organising</li>
                                    <li>Analytical Thinking - Initiative</li>
                                    <li>Communication - Leadership</li>
                                    <li>Customer Focus - Teamwork</li>
                                    <li>Flexibility - Influencing</li>
                                </ul>
                            </div>
                        </div>

                        <div class="xpro-item-layer" style="position:absolute;opacity:0;top:65%;left:50px"
                            data-effect="animate({'Y':'-20px', 'delay':'2s', 'duration':'600ms'})">
                            <a class='xpro-item-layer-responsive xp-hero-round-button' id="button2" onclick="Nominate()"
                                style="padding: 10px 30px;font-size:16px">Nominate Now</a>
                        </div>

                        <div class="xpro-item-layer" style="position:absolute;opacity:0;top:71%;left:65px"
                            data-effect="animate({'Y':'-20px', 'delay':'3s', 'duration':'600ms'})">
                            <a class='xpro-item-layer-responsive xp-hero-round-button' id="button2" onclick="Back2BIG()"
                                style="padding: 10px 30px;font-size:16px">Back To BIG</a>
                        </div>

                        <div class="view_nominations xpro-item-layer"
                            style="position:absolute;opacity:0;top:77%;left:25px"
                            data-effect="animate({'Y':'-20px', 'delay':'4s', 'duration':'600ms'})">
                            <a class='xpro-item-layer-responsive xp-hero-round-button' id="button2"
                                onclick="ViewNominations()" style="padding: 10px 30px;font-size:16px">View
                                Nominations</a>
                        </div>

                        <div class="view_approvals xpro-item-layer"
                            style="position:absolute;opacity:0;top:83%;left:25px"
                            data-effect="animate({'Y':'-20px', 'delay':'5s', 'duration':'600ms'})">
                            <a class='xpro-item-layer-responsive xp-hero-round-button' id="button2"
                                onclick="ViewMyApprovals()" style="padding: 10px 30px;font-size:16px">View My
                                Approvals</a>
                        </div>

                    </div>

                    <div class="xpro-item-layer"
                        style="opacity:0;bottom:20px;left:0px;right:0px;margin:auto;text-align: center;"
                        data-effect="animate({Y:'-10px', 'delay':'0.5s', 'duration':'500ms'})">
                        <div class="nextButton xp-custom-navigation"><a
                                class='xp-hero-circle-button xpro-pulse xp-custom-navigation'><i
                                    class="fa fa-long-arrow-down"></i></a></div>
                    </div>

                </div>

                <div class="xpro-slider-item" style="background-image:url(images/bgbs_pics/IceAwardsPic8.jpg);">

                    <div class="xpro-item-layer"
                        style="opacity:0;top:0px;bottom:0px;left:0px;right:0;margin:auto;background-color:rgba(0,0,0,0.5);width:500px;min-width: 350px"
                        data-effect="animate({'delay':'0.5s', 'duration':'500ms'})">

                        <div class="xpro-item-layer" style="position:absolute;opacity:0;top:100px;left:0px;right:0px;"
                            data-effect="animate({'delay':'1.6s', 'duration':'600ms'})">
                            <div class="xpro-item-layer-responsive xp-sosmed-buttons" style="margin-top: 15px;">
                                <h1 class="xpro-item-layer-responsive xp-headtext"
                                    style="margin-top: 0px;;padding:10px 0px;font-size:48px;">Ice
                                    Awards</h1>
                            </div>
                        </div>

                        <div class="xpro-item-layer"
                            style="position:absolute;position:absolute;opacity:0;top:180px;left:0px;right:0px;text-align: center"
                            data-effect="animate({'Y':'20px', rotate:'in-right', 'delay':'1s', 'duration':'600ms'})">
                            <a class='xpro-item-layer-responsive  xp-hero-round-button' id="button3"
                                onclick="Nominate()" style="padding: 10px 30px;font-size:16px">Nominate Now</a>
                        </div>


                        <div class="xpro-item-layer"
                            style="position:absolute;opacity:0;top:570px;left:0px;right:0px;text-align: center"
                            data-effect="animate({'Y':'-20px', 'delay':'2.5s', 'duration':'600ms'})">
                            <a class='xpro-item-layer-responsive xp-hero-round-button' id="button2" onclick="Back2BIG()"
                                style="padding: 10px 30px;font-size:16px">Back To BIG</a>
                        </div>

                        <div class="view_nominations xpro-item-layer"
                            style="position:absolute;opacity:0;top:620px;left:0px;right:0px;text-align: center"
                            data-effect="animate({'Y':'-20px', 'delay':'3.5s', 'duration':'600ms'})">
                            <a class='xpro-item-layer-responsive xp-hero-round-button' id="button2"
                                onclick="ViewNominations()" style="padding: 10px 30px;font-size:16px">View
                                Nominations</a>
                        </div>

                        <div class="view_approvals xpro-item-layer"
                            style="position:absolute;opacity:0;top:670px;left:0px;right:0px;text-align: center"
                            data-effect="animate({'Y':'-20px', 'delay':'4.5s', 'duration':'600ms'})">
                            <a class='xpro-item-layer-responsive xp-hero-round-button' id="button2"
                                onclick="ViewMyApprovals()" style="padding: 10px 30px;font-size:16px">View My
                                Approvals</a>
                        </div>

                        <div class="xpro-item-layer"
                            style="position:absolute;opacity:0;top:250px;left:0px;right:0px;margin:auto;text-align: center;"
                            data-effect="animate({'Y':'20px', zoom:'in', 'delay':'1s', 'duration':'600ms'})">
                            <div class="xpro-video-item xpro-item-layer-responsive" data-display="xlightbox"
                                onclick="ShowVideo()"
                                style="width: 340px; height: 230px; min-width:300px; min-height:180px; background: url(images/Dec19IA.JPG);background-size: cover">

                            </div>
                        </div>

                    </div>

                    <div class="xpro-item-layer"
                        style="opacity:0;bottom:20px;left:0px;right:0px;margin:auto;text-align: center;"
                        data-effect="animate({Y:'-10px', 'delay':'2s', 'duration':'500ms'})">
                        <div class="nextButton xp-custom-navigation"><a
                                class='xp-hero-circle-button xpro-pulse xp-custom-navigation'><i
                                    class="fa fa-long-arrow-down"></i></a></div>
                    </div>

                </div>

            </div>
        </div>
    </div>

    <div class="container">
        <div class="row" style="margin:15px 0px 15px 0px">
            <div class="col-md-12">
                <h1>Ice Awards</h1>
                <p>
                    Awards For Innovation Or Contribution Excellence
                </p>
            </div>
            <!--end of col-->
        </div>
    </div>

    <br /><br />

    <div class="xpro-footer">
        <div class="xpro-footer-copy">&copy; www.thebairdgroup.co.uk 2019</div>
    </div>

    <!-- Ice Award Modal Form-->
    <div class="ice_awards">
        <div class="modal fade" id="ice_form_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header" style="display:block;justify-content:center">

                        <div class='col-12 modal-title xp-headsubtext text-center' style="font: size 15px;">
                            Awards For Innovation Or Contribution Excellence
                            <button type='button' class='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div class='col-12 modal-title xp-headtext text-center'
                            style="margin-top: 0px;padding:10px 0px;font-size:48px;">
                            Ice Awards
                        </div>

                    </div>
                    <div class="modal-body mx-3" id="ice_form_modal_body">

                        <input id="iceNominee" type="hidden" style="width:90%; margin-bottom:25px; margin-left:15px"
                            required />

                        <div style="padding-left:18px"><i class="fas fa-institution prefix grey-text fa-2x"></i><span
                                id="pillar_text">Please
                                Select The
                                Related Value(s)</span></div>

                        <div class="checkbox_group CompanyValues" id="CDSDS" style="padding-top:12px;padding-left:14px">
                            <div class="form-check">
                                <input type="checkbox" v-model="CDSDSCollaborativeChecked" class="form-check-input"
                                    id="CDSDSCollaborativeChecked" name="pillar[]" unchecked>
                                <label class="form-check-label" for="CDSDSCollaborativeChecked">Collaborative</label>
                            </div>
                            <div class="form-check">
                                <input type="checkbox" v-model="CDSDSTrustedChecked" class="form-check-input"
                                    id="CDSDSTrustedChecked" name="pillar[]" unchecked>
                                <label class="form-check-label" for="CDSDSTrustedChecked">Trusted</label>
                            </div>
                            <div class="form-check">
                                <input type="checkbox" v-model="CDSDSExemplarChecked" class="form-check-input"
                                    id="CDSDSExemplarChecked" name="pillar[]" unchecked>
                                <label class="form-check-label" for="CDSDSExemplarChecked">Exemplar</label>
                            </div>
                            <div class="form-check">
                                <input type="checkbox" v-model="CDSDSVisionaryChecked" class="form-check-input"
                                    id="CDSDSVisionaryChecked" name="pillar[]" unchecked>
                                <label class="form-check-label" for="CDSDSVisionaryChecked">Visionary</label>
                            </div>
                        </div>

                        <div class="checkbox_group CompanyValues" id="NewsPress"
                            style="padding-top:12px;padding-left:14px">
                            <div class="form-check">
                                <input type="checkbox" v-model="NPTrustedChecked" class="form-check-input"
                                    id="NPTrustedChecked" name="pillar[]" unchecked>
                                <label class="form-check-label" for="NPTrustedChecked">Trusted</label>
                            </div>
                            <div class="form-check">
                                <input type="checkbox" v-model="NPDeterminedChecked" class="form-check-input"
                                    id="NPDeterminedChecked" name="pillar[]" unchecked>
                                <label class="form-check-label" for="NPDeterminedChecked">Determined</label>
                            </div>
                            <div class="form-check">
                                <input type="checkbox" v-model="NPEnrichingChecked" class="form-check-input"
                                    id="NPEnrichingChecked" name="pillar[]" unchecked>
                                <label class="form-check-label" for="NPEnrichingChecked">Enriching</label>
                            </div>
                            <div class="form-check">
                                <input type="checkbox" v-model="NPCaringChecked" class="form-check-input"
                                    id="NPCaringChecked" name="pillar[]" unchecked>
                                <label class="form-check-label" for="NPCaringChecked">Caring</label>
                            </div>
                        </div>

                        <div class="checkbox_group CompanyValues" id="CDS" style="padding-top:12px;padding-left:14px">
                            <div class="form-check">
                                <input type="checkbox" v-model="CDSIntegrityChecked" class="form-check-input"
                                    id="CDSIntegrityChecked" name="pillar[]" unchecked>
                                <label class="form-check-label" for="CDSIntegrityChecked">Integrity</label>
                            </div>
                            <div class="form-check">
                                <input type="checkbox" v-model="CDSChallengingChecked" class="form-check-input"
                                    id="CDSChallengingChecked" name="pillar[]" unchecked>
                                <label class="form-check-label" for="CDSChallengingChecked">Challenging</label>
                            </div>
                            <div class="form-check">
                                <input type="checkbox" v-model="CDSCuriosityChecked" class="form-check-input"
                                    id="CDSCuriosityChecked" name="pillar[]" unchecked>
                                <label class="form-check-label" for="CDSCuriosityChecked">Curiosity</label>
                            </div>
                            <div class="form-check">
                                <input type="checkbox" v-model="CDSTenacityChecked" class="form-check-input"
                                    id="CDSTenacityChecked" name="pillar[]" unchecked>
                                <label class="form-check-label" for="CDSTenacityChecked">Tenacity</label>
                            </div>
                            <div class="form-check">
                                <input type="checkbox" v-model="CDSTogethernessChecked" class="form-check-input"
                                    id="CDSTogethernessChecked" name="pillar[]" unchecked>
                                <label class="form-check-label" for="CDSTogethernessChecked">Togetherness</label>
                            </div>
                        </div>


                        <div class="md-form" style="padding-left:18px">
                            <i class="fas fa-pencil-alt prefix grey-text"></i>
                            <textarea style="margin-left:40px;padding:5px;margin-top:5px;border:0;width:82.5%" rows="4"
                                id="reason" placeholder="How Have They Exceeded Your Expectations ?"></textarea>
                        </div>
                        <div class="status" style="text-align: center;color:red"></div>
                        <div class="modal-footer d-flex justify-content-center">
                            <div><button onclick="saveIce()" class="btn btn-outline-dark waves-effect"><i
                                        class="far fa-star pr-2" aria-hidden="true"></i>Nominate</button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Video Modal-->
    <div class="modal fade" id="videoModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">

            <!--Content-->
            <div class="modal-content">

                <!--Body-->
                <div class="modal-body mb-0 p-0" style='background:url("images/Dec19IA.JPG");'>

                    <div class="embed-responsive embed-responsive-16by9 z-depth-1-half">
                        <iframe id="modalVideoPlayer" class="embed-responsive-item" width="1000px" height=auto
                            src="https://web.microsoftstream.com/embed/video/88fd0525-1b31-418e-8c97-c0ce124c3310?autoplay=false&showinfo=true"
                            frameborder="0" allowfullscreen></iframe>
                    </div>

                </div>

                <!--Footer-->
                <div class="modal-footer justify-content-center">
                    <span class="mr-4">Spread the word!</span>
                    <a type="button" href="https://www.facebook.com/CDSDigital/?fref=nf" target="_blank"
                        class="btn-floating btn-sm btn-fb"><i class="fab fa-facebook-f"></i></a>
                    <!--Twitter-->
                    <a type="button" href="https://twitter.com/c_d_s?lang=en" target="_blank"
                        class="btn-floating btn-sm btn-tw"><i class="fab fa-twitter"></i></a>
                    <!--Linkedin-->
                    <a type="button" href="https://www.linkedin.com/company/cds-uk" target="_blank"
                        class="btn-floating btn-sm btn-ins"><i class="fab fa-linkedin-in"></i></a>

                    <button type="button" class="btn btn-outline-primary btn-rounded btn-md ml-4"
                        data-dismiss="modal">Close</button>

                </div>

            </div>
            <!--/.Content-->
        </div>
    </div>

    <script type="text/javascript" src="js/mdb.js"></script>

</body>

</html>