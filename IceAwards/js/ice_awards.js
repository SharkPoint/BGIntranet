var slider;
var nominee;

$(document).ready(function () {

  //Check if current user is approver
  checkUserApprover();
  var excludedJobTitles = ["contractor", "external", "exclude", "review", "service account"];

  $("#iceNominee").select2({
    allowClear: true,
    placeholder: "<i class='fas fa-user fa-lg'></i>&nbsp;&nbsp;Who Would You Like To Nominate ?",
    minimumInputLength: 3,
    ajax: {
      url: "https://corporatedocument.sharepoint.com/sites/bgintranet/_api/web/lists/getbytitle('UserProfileInfoV2')/items?&$top=1000",
      dataType: "json",
      data: function (term, page) {
        return {
          "$filter": "((substringof('" + term + "', FullName)) and (ProfileVisible eq 1))"
        };
      },
      results: function (data, page) {
        $('#iceNominee').select2("val", "");
        return {
          results: data.d.results
        };
      },
      params: {
        contentType: "application/json;odata=verbose",
        headers: {
          "accept": "application/json;odata=verbose"
        }
      }
    },
    id: function (person) {
      return {
        id: person.Id
      };
    },
    formatResult: function (person) {
      //Make sure no contractors or persons with jobs not eligable for nomination are excluded from selection list
      if (excludedJobTitles.indexOf(person.JobTitle.toLowerCase()) == -1) {
        var pic = person.PictureURL;
        res = "<img src='" + pic + "' style='width:50px;height50px;border-radius:50%' onerror='imgError(this)'>&nbsp&nbsp" + person.FullName
        return res
      }
    },
    formatSelection: function (person) {
      return person.FullName;
    },
    formatNoMatches: function () {
      return "No people found.";
    },
    escapeMarkup: function (m) {
      return m;
    },
    dropdownCssClass: "bigdrop"
  }).on('change', function (e) {
    // Access to full data
    nominee = $(this).select2('data');
    if (nominee != null) {
      console.log(nominee);
      DisplayValues(nominee.Company)
    }
  });

  slider = new XPRO.Controls.Slider(null);
  slider.initSlider("scroller", {
    "mode": "slideOut",
    "dir": "up",
    "iniWidth": 1200,
    "iniHeight": 600,
    "autoRun": true,
    "interval": 10000,
    "autoHeightMode": "maintainratio",
    "thumbnails": null,
    "stopOnHover": false,
    "imageVAlign": "bottom",
    "showProgress": false,
    "enableNavigation": false,
    "onAdjustHeight": function (theslider) {
      //get available height
      var aH = jQuery(window).innerHeight();
      var top = jQuery(theslider.rt["scroller"]).position()["top"];
      return aH - top;
    }
  });

  $('#ice_form_modal').on('hidden.bs.modal', function (e) {
    slider.run();
  })

  $('#videoModal').on('hidden.bs.modal', function (e) {
    $("#videoModal iframe").attr("src", $("#videoModal iframe").attr("src"));
    slider.run();
  })

  jQuery(".xp-custom-navigation").on("click", function () {
    slider.forward();
    return false;
  });


});

$(function () {
  var requiredCheckboxes = $('.CompanyValues :checkbox[required]');
  requiredCheckboxes.change(function () {
    if (requiredCheckboxes.is(':checked')) {
      requiredCheckboxes.removeAttr('required');
    } else {
      requiredCheckboxes.attr('required', 'required');
    }
  });
});

document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    $(".loadingSpinner").fadeOut("slow");
  }
}

function validateForm() {
  $('.status').css('color', 'red');

  if ($("#iceNominee").select2('data') == null) {
    $('.status').html("Please Select The Person You Wish To Nominate");
    return false;
  }
  var localUser = store.get("userDetails");
  console.log(localUser);
  var obj = $("#iceNominee").select2('data');
  if (localUser.DisplayName == obj.FullName) {
    $('.status').html("You Cannot Nominate Yourself For An Award");
    return false;
  }

  console.log("Nominee Company = " + nominee.Company)

  //CDS Values Checkboxes
  if (nominee.Company.toLowerCase() == "cds" || nominee.Company.toLowerCase() == "bgbs") {
    if ($('#CDSIntegrityChecked').is(':checked') == false &&
      $('#CDSChallengingChecked').is(':checked') == false &&
      $('#CDSCuriosityChecked').is(':checked') == false &&
      $('#CDSTenacityChecked').is(':checked') == false &&
      $('#CDSTogethernessChecked').is(':checked') == false) {
      $('.status').html("Please Select At Least One Of The Values");
      return false;
    }
  }

  //CDS DS Values Checkboxes
  if (nominee.Company.toLowerCase() == "cdsds") {
    if ($('#CDSDSCollaborativeChecked').is(':checked') == false &&
      $('#CDSDSTrustedChecked').is(':checked') == false &&
      $('#CDSDSExemplarChecked').is(':checked') == false &&
      $('#CDSDSVisionaryChecked').is(':checked') == false) {
      $('.status').html("Please Select At Least One Of The Values");
      return false;
    }
  }

  //NewsPress Values Checkboxes
  if (nominee.Company.toLowerCase() == "newspress") {
    if ($('#NPTrustedChecked').is(':checked') == false &&
      $('#NPExpertChecked').is(':checked') == false &&
      $('#NPDeterminedChecked').is(':checked') == false &&
      $('#NPEnrichingChecked').is(':checked') == false &&
      $('#NPBoldChecked').is(':checked') == false &&
      $('#NPCaringChecked').is(':checked') == false) {
      $('.status').html("Please Select At Least One Of The Values");
      return false;
    }
  }

  if ($('#reason').val() == 0) {
    $('.status').html("How Has This Person Exceeded Your Expectations");
    return false;
  }
  $('.status').css('color', 'green');
  $('.status').html("Sending...");
  return true;
}

function GenerateThumbnail(p_Url) {

  if (typeof p_Url === 'undefined' || p_Url === '') {
    return null
  };

  var filename = p_Url.substring(p_Url.lastIndexOf('\\') + 1);
  var filePath = p_Url.substring(0, p_Url.lastIndexOf("\\"));
  var fileNameWithoutExtension = filename.substring(0, filename.lastIndexOf("."));
  var ext = filename.substring(filename.lastIndexOf('.') + 1);
  var thumbNail = filePath + "\\_t\\" + encodeURIComponent(fileNameWithoutExtension).replace(/%2520/g, '%20') + "_" + ext + "." + ext

  return thumbNail;
}

// Show dummy profile image if no picture present  
function imgError(image) {
  image.onerror = "";
  image.src = "images/missingprofile.jpg";
  return true;
}

function Nominate() {

  //Clear any old data off the form
  InitialiseForm();

  //GetCurrentUser
  GetCurrentUser();

  //Find out the company of the Nominator and show the values for that company
  var localUser = JSON.parse(localStorage.getItem("userDetails"));
  DisplayValues(localUser.Company);

  slider.stopSlider();
  $('#ice_form_modal').modal('show');

}

function Back2BIG() {
  window.open('../index.aspx', '_self');
}

function ViewMyApprovals() {
  window.open('https://emea.flow.microsoft.com/manage/environments/Default-19007d4a-254f-4fbf-8c8d-c59b6d32b766/approvals/received', '_blank');
}

function ViewNominations() {
  window.open('https://corporatedocument.sharepoint.com/sites/bgintranet/Lists/IceAwards/In%20Process.aspx', '_blank');
}

function saveIce() {

  if (validateForm() == false) {
    return;
  }

  var localUser = store.get("userDetails");
  var firstName = localUser.DisplayName.split(" ")[0];

  var successText = 'Thank You ' + firstName + ' Your Nomination Has Been Submitted.';
  var failText = 'Sorry ' + firstName + ', please try again.';

  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": false,
    "positionClass": "toast-top-full-width",
    "preventDuplicates": true,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "0",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut",
  }

  var values = "";
  var mt_webServerRelativeUrl = '/sites/bgintranet';
  var mt_webAbsoluteUrl = 'https://corporatedocument.sharepoint.com/sites/bgintranet';

  //Check all the check boxes

  if ($('#CDSIntegrityChecked').is(':checked')) {
    values += "Integrity ";
  }

  if ($('#CDSChallengingChecked').is(':checked')) {
    values += "Challenging ";
  }

  if ($('#CDSCuriosityChecked').is(':checked')) {
    values += "Curiosity ";
  }

  if ($('#CDSTenacityChecked').is(':checked')) {
    values += "Tenacity ";
  }

  if ($('#CDSTogethernessChecked').is(':checked')) {
    values += "Togetherness ";
  }

  if ($('#CDSDSCollaborativeChecked').is(':checked')) {
    values += "Collaborative ";
  }

  if ($('#CDSDSTrustedChecked').is(':checked')) {
    values += "Trusted ";
  }

  if ($('#CDSDSExemplarChecked').is(':checked')) {
    values += "Exemplar ";
  }

  if ($('#CDSDSVisionaryChecked').is(':checked')) {
    values += "Visionary ";
  }

  if ($('#NPTrustedChecked').is(':checked')) {
    values += "Trusted ";
  }

  if ($('#NPExpertChecked').is(':checked')) {
    values += "Expert ";
  }

  if ($('#NPDeterminedChecked').is(':checked')) {
    values += "Determined ";
  }

  if ($('#NPEnrichingChecked').is(':checked')) {
    values += "Enriching ";
  }

  if ($('#NPBoldChecked').is(':checked')) {
    values += "Bold ";
  }

  if ($('#NPCaringChecked').is(':checked')) {
    values += "Caring ";
  }

  var obj = $("#iceNominee").select2('data');
  var reason = $('#reason').val();

  console.log(obj);

  GetUserIdByEmail(obj.Email).then((data) => {
    // GetUserId(obj.Title).then((data) => {

    console.log("UserID");
    console.log(data);

    var itemProperties = {
      'Title': 'Ice Award',
      'NomineeId': data.d.Id,
      'Pillars': values.trim(),
      'Reason': reason,
    };

    createSPListItem(mt_webAbsoluteUrl, 'Ice Awards', itemProperties).done(() => {

        var intURL = "../index.aspx"

        $("#ice_form_modal").modal("toggle");
        toastr.options.onclick = function () {
          window.location.href = intURL;
        }
        toastr["success"](successText + "<br/><a href'" + intURL + "' style=\"font-style: oblique\">Click Here To Return To Intranet</a>", "Submission Successful")

      })
      .fail(function (error) {
        toastr["error"](failText, "Submission Failed")
      })
  })
}

function DisplayValues(company) {

  console.log("Company - " + company);

  switch (company.toLowerCase()) {
    case "cds":
      $("#CDSDS").hide();
      $("#CDS").show();
      $("#NewsPress").hide();
      break;
    case "cdsds":
      $("#CDSDS").show();
      $("#CDS").hide();
      $("#NewsPress").hide();
      break;
    case "cds ds":
      $("#CDSDS").show();
      $("#CDS").hide();
      $("#NewsPress").hide();
      break;
    case "newspress":
      $("#CDSDS").hide();
      $("#CDS").hide();
      $("#NewsPress").show();
      break;
    case "bgbs":
      $("#CDSDS").hide();
      $("#CDS").show();
      $("#NewsPress").hide();
      break;
    default:
      $("#CDSDS").hide();
      $("#CDS").show();
      $("#NewsPress").hide();
      break;
  }
}

function InitialiseForm() {

  $('#iceNominee').select2("val", "");
  $('#reason').val('');
  $('.status').html('');

  $('#CDSIntegrityChecked').prop('checked', false);
  $('#CDSChallengingChecked').prop('checked', false);
  $('#CDSCuriosityChecked').prop('checked', false);
  $('#CDSTenacityChecked').prop('checked', false);
  $('#CDSTogethernessChecked').prop('checked', false);
  $('#CDSDSCollaborativeChecked').prop('checked', false);
  $('#CDSDSTrustedChecked').prop('checked', false);
  $('#CDSDSExemplarChecked').prop('checked', false);
  $('#CDSDSVisionaryChecked').prop('checked', false);
  $('#NPTrustedChecked').prop('checked', false);
  $('#NPExpertChecked').prop('checked', false);
  $('#NPDeterminedChecked').prop('checked', false);
  $('#NPEnrichingChecked').prop('checked', false);
  $('#NPBoldChecked').prop('checked', false);
  $('#NPCaringChecked').prop('checked', false);

}

function ShowVideo() {

  slider.stopSlider();
  $('#videoModal').modal('toggle');

}

function GetCurrentUser() {

  if (store.get("userdetails") == null) {
    axios("https://corporatedocument.sharepoint.com/_api/SP.UserProfiles.PeopleManager/GetMyProperties")
      .then(response => {
        var uDetails = {
          OneDriveAddress: response.data.PersonalUrl + '/_layouts/15/onedrive.aspx',
          EmailAddress: response.data.Email,
          AccountName: response.data.AccountName,
          Company: response.data.Email.split('@').pop().split('.').shift().toLowerCase(),
        }
        sessionStorage.setItem('userDetails', JSON.stringify(uDetails));

      }).catch(error => {
        console.log("Current User Error - " + error);
      })
  }
}

function checkUserApprover() {

  $('.view_approvals').css('visibility', 'hidden')
  $('.view_nominations').css('visibility', 'hidden')

  var localUser = JSON.parse(localStorage.getItem("userDetails"));
  var userName = localUser.EmailAddress;
  var approverListURL = siteURL + "/_api/web/lists/getbytitle('Ice Awards Admin')/items?$select=PersonName/UserName,PersonName/ID,PersonName/Title,Role&$expand=PersonName"
  axios.get(approverListURL)
    .then(response => {
      var approvers = response.data.value;
      // console.log("UserName: " + element.PersonName.UserName);

      approvers.forEach(element => {
        if (element.PersonName.UserName.toLowerCase() == userName.toLowerCase() && element.Role == "Approver") {
          $('.view_approvals').css('visibility', 'visible');
          $('.view_nominations').css('visibility', 'visible');
        }
        if (element.PersonName.UserName.toLowerCase() == userName.toLowerCase() && element.Role == "Exec") {
          $('.view_nominations').css('visibility', 'visible');
        }
      });
    })
}