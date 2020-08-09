//BGBS_Utils.js - Contains constants and common functions used throughout the site

const host = "https:\\\\" + window.location.hostname;
const path = cutUrl(window.location.pathname);
const siteURL = host + path;
const newsURL = host + "\\sites\\groupnews\\";
const peopleURL = host + "\\sites\\bgintranet_people\\";
const intranetNews = "./news.aspx"

function cutUrl(str) {
    var matched = str.match(/([^/]*\/){3}/);
    var ret = matched ? matched[0] : str /* or null if you wish */ ;
    return ret.replace(/\//g, "\\");
}

function GenerateThumbnail(p_Url) {

    if (typeof p_Url === 'undefined') {
        return null
    };

    var filename = p_Url.substring(p_Url.lastIndexOf('\\') + 1);
    var filePath = p_Url.substring(0, p_Url.lastIndexOf("\\"));
    var fileNameWithoutExtension = filename.substring(0, filename.lastIndexOf("."));
    var ext = filename.substring(filename.lastIndexOf('.') + 1);
    var thumbNail = filePath + "\\_t\\" + encodeURIComponent(fileNameWithoutExtension).replace(/%2520/g, '%20') + "_" + ext + "." + ext

    return thumbNail;
}

function GenerateThumbnailFile(path, filename) {

    if (typeof p_Url === 'undefined') {
        return null
    };

    var fileNameWithoutExtension = filename.substring(0, filename.lastIndexOf("."));
    var ext = filename.substring(filename.lastIndexOf('.') + 1);
    var thumbNail = path + encodeURIComponent(fileNameWithoutExtension).replace(/%2520/g, '%20') + "_" + ext + "." + ext

    return thumbNail;
}

//Get Query String From Current URL
function qs(key) {
    key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
    var match = location.search.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

//Replaces spaces with dashes for use in deriving the url of news pages
function replaceSpaces(param) {  

    return param.replace(/\s+/g, '-');

}

String.prototype.trimToLength = function(m) {
    return (this.length > m) 
      ? jQuery.trim(this).substring(0, m).split(" ").slice(0, -1).join(" ") + ".. READ MORE."
      : this;
  };

  function cutUrl(str) {
    var matched = str.match(/([^/]*\/){3}/);
    var ret = matched ? matched[0] : str /* or null if you wish */ ;
    return ret.replace(/\//g, "\\");
}


String.format = function () {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }
    return s;
}

function clearFormValidations(fieldsToClear, oddBallFields) {

    for (var x = 0; x < fieldsToClear.length; x++) {
        $(fieldsToClear[x]).removeClass('ValidationErrorStyle');
    }

    for (var x = 0; x < oddBallFields.length; x++) {
        $(oddBallFields[x].highlightElement).removeClass('ValidationErrorStyle');
    }

    $('.mpStatus').html('');
}

function validateForm(fieldsToValidate, oddBallFields, currentSaveMode) {

    var passedValidation = true;

    for (var x = 0; x < fieldsToValidate.length; x++) {

        //console.log("Validating " + fieldsToValidate[x] + " - " + $(fieldsToValidate[x]).val())

        if ($(fieldsToValidate[x]).val() == '') {
            $(fieldsToValidate[x]).addClass('ValidationErrorStyle');
            //console.log("Failed Validation " + fieldsToValidate[x] + " - " + $(fieldsToValidate[x]).val())
            passedValidation = false;
        } else {
            $(fieldsToValidate[x]).removeClass('ValidationErrorStyle');
        }
    }

    for (var x = 0; x < oddBallFields.length; x++) {

        var oddBallValidation

        if (currentSaveMode == "") {
            oddBallValidation = $(oddBallFields[x].validateElement).val() == '' ? false : true;
        } else {
            oddBallValidation = currentSaveMode == oddBallFields[x].saveMode && $(oddBallFields[x].validateElement).val() == '' ? false : true;
        }

        if (oddBallValidation == false) {
            $(oddBallFields[x].highlightElement).addClass('ValidationErrorStyle');
            passedValidation = false;
        } else {
            $(oddBallFields[x].highlightElement).removeClass('ValidationErrorStyle');
        }
    }

    if (passedValidation == false) {
        $('.mpStatus').css('color', 'red');
        $('.mpStatus').html('Please Complete The Fields Highlighted In Red');
    } else {
        $('.mpStatus').css('color', 'green');
        $('.mpStatus').html('Saving');
    }

    return passedValidation;
}

// Close Loading Spinner  
function loadingOut(loading) {}

// Generates A Unique ID
function generateUniqueID() {
    return Math.round(new Date().getTime() + (Math.random() * 100));
}

function resetNewsTicker(){

    var nFeed = $('#profileNewsTicker').is(':checked');
    var effect = nFeed == true ? 'scroll' : 'typography';
    store.set('newsfeeds', nFeed);

    var options = {effect: effect, play:nFeed};
    ticker.update(options);
}

// Show dummy profile image if no picture present  
function imgError(image) {
    image.onerror = "";
    image.src = "assets/images/missingprofile.jpg";
    return true;
}

//Fades in the obj, used for IMG onLoad to fade in image once it has loaded
window.fadeIn = function (obj) {
    $(obj).fadeIn(2000);
}

/**
 * BBC IMG Scraper.
 *
 * Scrape the BBC Website for the main image. 
 *
 * @param {type}   var         URL Of BBC News Page.
 * @param {type}   var         id of the IMG element to hold the image.
 * 
 * @requires                   jQuery.
 * @requires                   Axios.
 * 
 * HTML to hold the image as follows:
 * 
 *  div class="imageContainer">
 *      <img onload="fadeIn(this)" id="test" style="display:none;" />
 *  </div> 
 * 
 * CSS as follows:
 * 
 * .imageContainer {
 *      background: url('././assets/images/spinner.gif') center no-repeat black;
 *      width: 1024px; //Width of the contained image.
 *      height: 576px; //Height of the contained image.
 *      }
 */
function setBBCImageURL(pageURL, element) {

    axios.get("https://bypasscors.herokuapp.com/api/?url=" + encodeURIComponent(pageURL)).then(resp => {

        var el = document.createElement('html');
        el.innerHTML = resp.data;
        document.getElementById(element).src = el.querySelector("meta[property='og:image']")
            .getAttribute("content");
    });
}

//Capitalize first letter
function jsUcfirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// function getUserRoles(param){

//        //Get Email From LocalStorage
//        var user = JSON.parse(localStorage.getItem('userDetails'));
//        var profileName = user.DisplayName;

//        //Get the user profile from the permissions list
//        var endPointUrl = siteURL + "/_api/Web/Lists/getbytitle('Permissions')/Items?$select=Roles,UserNAme/Title&$expand=UserNAme&$filter=UserNAme/Title eq '" + encodeURI(profileName) + "'";
//        axios.get(endPointUrl)
//        .then(response => {
//            var returnValue = null;           
//            var userMatches = response.data.value;       
//            if (Array.isArray(userMatches) && userMatches.length) {
//                returnValue = userMatches["0"].Roles;
//             }
//            param =  returnValue;
//        })
}









