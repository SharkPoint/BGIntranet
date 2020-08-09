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
  <title>BIG - Reservations</title>
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

  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@3/dark.css">

  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
  <!-- Bootstrap core CSS -->
  <link href="./reservations/css/bootstrap.min.css" rel="stylesheet">
  <!-- Material Design Bootstrap -->
  <link href="./reservations/css/mdb.css" rel="stylesheet">

  <link rel="stylesheet" href="./styles/style.min.css" />
  <link href='./reservations/css/main.css' rel='stylesheet' />
  <script src='./reservations/js/main.js'></script>
  <style>
    body {
      margin: 40px 10px;
      padding: 0;
      font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
      font-size: 14px;
    }

    .gridContainer {
      display: grid;
      column-count: 12;
      width: 1140px;
      margin: 0 auto;
      grid-gap: 10px;
      padding-right: 36px;
      padding-left: 10px;
      margin-bottom: 20px;

    }

    .resContent {
      background-color: #464646;
      color: white;
    }

    h2 {
      margin: 0
    }

    .header {
      grid-column-start: 1;
      grid-column-end: 13;
      grid-row-start: 1;
      grid-row-end: 2;
      padding: 1.5em 1em;
      height: auto;
      border-radius: 5px;
    }

    .selected-office {
      grid-column-start: 1;
      grid-column-end: 4;
      grid-row-start: 2;
      grid-row-end: 3;
      padding: 0 11px;
    }

    .selectedDate {
      grid-column-start: 4;
      grid-column-end: 6;
      grid-row-start: 2;
      grid-row-end: 3;
      text-align: center;
      padding-top: 10px;
    }


    .location-count-bookings {
      grid-column-start: 6;
      grid-column-end: 9;
      grid-row-start: 2;
      grid-row-end: 3;
      text-align: center;
      padding-top: 10px;
    }


    .location-capacity {
      grid-column-start: 9;
      grid-column-end: 11;
      grid-row-start: 2;
      grid-row-end: 3;
      text-align: center;
      padding-top: 10px;
    }

    .reservations-calendar {
      grid-column-start: 1;
      grid-column-end: 9;
      grid-row-start: 3;
      grid-row-end: 10;
      padding-top: 10px;
      display: inline-block;
    }

    .book-button {

      grid-column-start: 11;
      grid-column-end: 13;
      grid-row-start: 2;
      grid-row-end: 3;
      padding: 2px;
      text-align: center;
      padding-top: 8px
    }

    .other-bookings {

      grid-column-start: 9;
      grid-column-end: 11;
      grid-row-start: 3;
      grid-row-end: 10;
      overflow-y: auto;
      height: 498px;
      width: 210px
    }


    .my-bookings {

      grid-column-start: 11;
      grid-column-end: 13;
      grid-row-start: 3;
      grid-row-end: 10;
      overflow-y: auto;
      height: 498px;
      width: 210px
    }

    .hdrText {
      font-size: 1.5em;
    }

    .book-button-buttons {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .buttonStyle {
      width: 75px;
      background-color: #FB8001;
      color: #464646;
      font-weight: bold;
      font-size: 0.85em;
    }

    .btn-circle {
      width: 30px;
      height: 30px;
      padding: 6px 0px;
      border-radius: 15px;
      text-align: center;
      font-size: 12px;
      line-height: 1.42857;
      background-color: red;
    }

    .buttonStyle:hover {
      color: #fff;
      font-weight: bolder;
    }

    /*  Scrollbar */
    /* width */
    ::-webkit-scrollbar {
      width: 8px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #888;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }

    .my-res-container {
      padding-left: 10px
    }

    .my-res-btn {
      padding-left: 1px;
      padding-right: 1px;
      background: none
    }

    .capacity-none {
      background-color: #464646;
      color: white
    }

    .capacity-fine {
      background-color: green;
      color: white
    }

    .capacity-warning {
      background-color: #FFC200;
      color: black
    }

    .capacity-reached {
      background-color: red;
      color: white
    }

    .capPC {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.3em;
      font-weight: bold
    }

    .my-res:hover {
      background-color: #202020;
    }

    .refresh-btn,
    .requestReport-btn {
      margin-right: 17px;
      margin-top: 5px;
    }

    .refresh-btn:hover,
    .requestReport-btn:hover {
      transform: scale(1.1)
    }

    .rotate {
      animation: rotation 2s infinite linear;
    }

    .avatar {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #ccc;
      border-radius: 50%;
      font-family: sans-serif;
      color: #fff;
      font-weight: bold;
      font-size: 12px;
      margin-left: 3px;
      margin-right: 10px;
    }

    @keyframes rotation {
      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(359deg);
      }
    }

    .myRes-trash:hover {
      color: #4285f4;
      cursor: pointer;
    }

    /* Bootstrap Overwrites */
    .select-wrapper input.select-dropdown {
      color: white;
      font-size: 1.6em;
    }

    .form-check-label {
      margin-bottom: 0;
      padding-right: 10px;
    }

    label.form-check-label {
      padding-left: 25px
    }

    #navbarSupportedContent {
      margin-bottom: 15px;
      padding-right: 8px;
    }

    .fc-daygrid-day-events {
      top: 20px
    }

    .numberCircle {
      border-radius: 50%;
      width: 24px;
      height: 24px;
      padding: 0;
      background: none;
      border: 2px solid;
      text-align: center;
      margin-top: 2px;
      margin-right: 2px;
    }

    label[data-visitor] {
      color: #7ddfff;
      ;
      /* font-style: italic; */
    }

    td[data-visitor-name] {
      color: #7ddfff;
      font-style: italic;
    }

    /* Dark Modal */
    .form-dark .font-small {
      font-size: 0.8rem;
    }

    .form-dark [type="radio"]+label,
    .form-dark [type="checkbox"]+label {
      font-size: 0.8rem;
    }

    .form-dark [type="checkbox"]+label:before {
      top: 2px;
      width: 15px;
      height: 15px;
    }

    .form-dark .md-form label {
      color: #fff;
    }

    .form-dark input[type=email]:focus:not([readonly]) {
      border-bottom: 1px solid #FB8001;
      -webkit-box-shadow: 0 1px 0 0 #FB8001;
      box-shadow: 0 1px 0 0 #FB8001
    }

    .form-dark input[type=email]:focus:not([readonly])+label {
      color: #fff;
    }

    .form-dark input[type=password]:focus:not([readonly]) {
      border-bottom: 1px solid #FB8001;
      -webkit-box-shadow: 0 1px 0 0 #FB8001;
      box-shadow: 0 1px 0 0 #FB8001;
    }

    .form-dark input[type=password]:focus:not([readonly])+label {
      color: #fff;
    }

    .form-dark input[type="checkbox"]+label:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 17px;
      height: 17px;
      z-index: 0;
      border: 1.5px solid #fff;
      border-radius: 1px;
      margin-top: 2px;
      -webkit-transition: 0.2s;
      transition: 0.2s;
    }

    .form-dark input[type="checkbox"]:checked+label:before {
      top: -4px;
      left: -3px;
      width: 12px;
      height: 22px;
      border-style: solid;
      border-width: 2px;
      border-color: transparent #FB8001 #FB8001 transparent;
      -webkit-transform: rotate(40deg);
      -ms-transform: rotate(40deg);
      transform: rotate(40deg);
      -webkit-backface-visibility: hidden;
      -webkit-transform-origin: 100% 100%;
      -ms-transform-origin: 100% 100%;
      transform-origin: 100% 100%;
    }

    .form-dark .modal-header {
      border-bottom: none;
    }

    .modal-backdrop {
      opacity: 0.5 !important;
    }

  </style>
</head>

<body>

  <div class="loadingSpinner">
    <div class="lds-eclipse">
      <div></div>
    </div>
  </div>

  <div id="wrapper">

    <div class="navBar" v-html="navBarHTML">{{navBarHTML}}</div>
    <div class="sideMenu" v-html="sideMenuHTML">{{sideMenuHTML}}</div>

    <div class="container">

      <div class="gridContainer">
        <div class="resContent header">
          <div class="header-text">
            <span style="display: inline-block;">
              <h2>Office Reservations - {{currentUserName}}</h2>
            </span>
            <span style="float: right;display: inline-block;">
              <i v-on:click="manualRefreshReservations" data-toggle="tooltip" title="Refresh Reservations"
                class="refresh-btn fas fa-sync-alt fa-2x"></i>
              <i v-on:click="requestListOfUsers" data-toggle="tooltip" v-bind:title="requestReportBtnText"
                class="requestReport-btn far fa-list-alt fa-2x"></i>
            </span>
          </div>
          <!-- <button id="" type="button" v-on:click="checkReservationExists" class="btn btn-blue-grey btn-sm">Test</button> -->
        </div>
        <div class="resContent selected-office">
          <select id="locationSelect" data-visible-options="6" class="mdb-select md-form colorful-select dropdown-ins">
            <option value="4">Aylesbury</option>
            <option value="5">Bicester</option>
            <option value="2">Bristol</option>
            <option value="1">Cheltenham</option>
            <option value="7">Horsham</option>
            <option value="3">Leeds</option>
          </select>
        </div>
        <div class="resContent hdrText selectedDate">
          <div>Date</div>
          <div>{{selectedDate}}</div>
        </div>
        <div class="resContent hdrText location-count-bookings">
          <div>Count</div>
          <div>{{selectedOfficeCurrent}}</div>
        </div>
        <div class="resContent hdrText location-capacity">
          <div>Capacity</div>
          <div>{{selectedOfficeCapacity}}</div>
        </div>
        <div class="resContent book-button">
          <div class="hdrText">Reserve Place For</div>
          <div class="book-button-buttons">
            <button id="BookingButton-Me" type="button" v-on:click="reservationButtonClick"
              class="btn buttonStyle">Me</button>
            <button id="BookingButton-Visitor" type="button" v-on:click="reservationButtonClick"
              class="btn buttonStyle">Visitor</button>
          </div>
        </div>
        <div class="resContent my-bookings">
          <div class="content" style="position: relative;">
            <span class="hdrText" style="margin:10px 9px;display:inline-block">My Reservations</span>
            <span style="position: absolute;top: 15px;right:15px;"><i v-on:click="checkDeletionRequired"
                class="myRes-trash far fa-trash-alt fa-lg"></i></span>
            <table style="text-align: left;width:100%">
              <tr style="padding-left:10px" class="my-res form-check" v-for="reservation in myReservations">
                <td>
                  <input type="checkbox" class="myRes-checkbox form-check-input" v-bind:id="reservation.id">
                  <label class="form-check-label" v-bind:data-date="reservation.date"
                    v-bind:data-location="reservation.office" v-bind:data-visitor="reservation.visitor"
                    v-bind:for="reservation.id" v-html="reservation.displayText"></label>
                </td>

              </tr>
            </table>
          </div>
        </div>
        <div class="resContent other-bookings">
          <div class="content">
            <div class="hdrText" style="margin:10px 15px 12px 15px">Reservations</div>
            <table style="margin-left:8px;text-align: left;">
              <tr v-for="selectedDateReservation in SelectedDatesReservations">
                <td><span style="padding:10px;margin-bottom: 5px;" v-bind:style="" style="line-height: 35px;"
                    class="avatar">{{selectedDateReservation.init}}</span></td>
                <td style="padding-top: 0px; padding-bottom: 5px;"
                  v-bind:data-original-title="selectedDateReservation.originalTitle"
                  v-bind:data-toggle="selectedDateReservation.dataToggle"
                  v-bind:data-employee-name="selectedDateReservation.employeeName"
                  v-bind:data-visitor-name="selectedDateReservation.visitorsName">
                  {{selectedDateReservation.displayText}}</td>
              </tr>

            </table>
          </div>
        </div>
        <div style="width:650px" class="resContent reservations-calendar">
          <div id='calendar'></div>
        </div>

      </div>

    </div>
  </div>

  <!-- Page Footer  -->
  <div id="footer" class="PageFooter" v-html="pageFooterHTML">{{pageFooterHTML}}</div>

  <!-- Modal Forms -->
  <!-- 
  <div class="modal fade" id="modalVisitorsForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
    aria-hidden="true">
    <div class="modal-dialog form-dark" role="document">
      <div class="modal-content card card-image"
        style="background-image: url('https://mdbootstrap.com/img/Photos/Others/pricing-table%20(7).jpg');">
        <div class="text-white rgba-stylish-strong py-5 px-5 z-depth-4"></div>
        <div class="modal-header text-center">
          <h4 class="modal-title w-100 font-weight-bold">Visitor Booking</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body mx-3">
          <h5 class="modalVisitorDetails text-center"></h5>
          <p style="color:red;font-weight: bold;text-align: center;">Before your visitor comes to site please ensure you
            share a copy of the risk assesment.
          </p>

          <div id="modalBodyVisitorsForm" class="visitorsForm">

            <div class="md-form mb-5">
              <i class="fas fa-user prefix grey-text"></i>
              <input type="text" id="vis-1" class="form-control validate">
              <label for="vis-1">Visitor 1</label>
            </div>

          </div>
          <a style="float: right;" class="btn-floating btn-primary addVisitorRowButton"><i
              class="fas fa-plus addVisitor"></i></a>
        </div>
        <div class="modal-footer d-flex justify-content-center">
          <button class="btn btn-white">Reserve Place(s)</button>
        </div>
      </div>
    </div>
  </div>
  </div> -->

  <!-- Modal -->
  <div class="modal fade" id="modalVisitorsForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
    aria-hidden="true">
    <div class="modal-dialog form-dark" role="document">
      <!--Content-->
      <div class="modal-content card" style="background-color: rgba(70,70,70,0.6);">
        <div class="text-white rgba-stylish-strong py-2 px-5 z-depth-4">
          <!--Header-->
          <div class="modal-header text-center">

            <button type="button" class="close white-text" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <!--Body-->
          <div class="modal-body">
            <h3 class="modal-title text-center w-100 white-text font-weight-bold mb-2" id="myModalLabel">
              <strong>Visitor</strong> <a class="orange-text font-weight-bold"><strong> Reservations</strong></a></h3>
            <h5 class="modalVisitorDetails text-center mb-3"></h5>
            <!--Body-->
            <h6 class="orange-text mb-5" style="font-weight: bold;text-align: center;">Before your visitor comes to site
              please ensure you
              share a copy of the risk assesment.
            </h6>
            <div id="modalBodyVisitorsForm" class="visitorsForm">
              <div class="md-form mb-2">
                <i class="fas fa-user prefix white-text"></i>
                <input type="text" id="vis-1" class="form-control validate white-text">
                <label for="vis-1">Visitor 1</label>
              </div>
            </div>

            <div style="position: relative;">
              <a style="position: absolute;bottom: -3px;right: -8px" class="btn btn-circle addVisitor white-text"><i
                  class="fas fa-plus addVisitor"></i></a>
            </div>

            <!--Grid row-->
            <div class="row d-flex align-items-center mb-1">

              <!--Grid column-->
              <div class="text-center my-2 col-md-12">
                <button type="button" class="btn btn-orange btn-block btn-rounded z-depth-1">Reserve Places(s)</button>
              </div>
              <!--Grid column-->

            </div>
            <!--Grid row-->

          </div>
        </div>
      </div>
      <!--/.Content-->
    </div>
  </div>
  <!-- Modal -->

  <div class="text-center">
    <a href="" class="btn btn-default btn-rounded" data-toggle="modal" data-target="#darkModalForm">Launch modal
      register Form</a>
  </div>

  <script type="text/javascript" src="js/vue-2-5-17.js"></script>
  <script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js">
  </script>
  <script type="text/javascript" src="./reservations/js/popper.min.js"></script>
  <!-- Bootstrap core JavaScript -->
  <script type="text/javascript" src="./reservations/js/bootstrap.min.js"></script>
  <!-- MDB core JavaScript -->
  <script type="text/javascript" src="./reservations/js/mdb.js"></script>
  <script type="text/javascript" src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
  <script type="text/javascript" src="js/axios-0-2-1.js"></script>
  <script type="text/javascript" src="js/moment.min.js"></script>
  <script type="text/javascript" src="js/sharepoint.min.js"></script>
  <script type="text/javascript" src="js/store.js"></script>
  <script type="text/javascript" src="js/lightbox.js"></script>
  <script type="text/javascript" src="js/bgbs_utils.min.js"></script>
  <script type="text/javascript" src="js/SharedComponents.min.js"></script>

  <!-- Reservations Scripts -->

  <script type="text/javascript" src="./reservations/js/locales-all.js"></script>
  <script type="text/javascript" src="./js-orig/reservations.js"></script>


</body>

</html>