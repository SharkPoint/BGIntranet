'use strict';

function GetUserId(userName) {
    return $.ajax({
        url: siteURL + "/_api/web/siteusers(@v)?@v='" +
            encodeURIComponent(userName) + "'",
        method: "GET",
        headers: {
            "Accept": "application/json; odata=verbose"
        },
    });
}

function GetUserIdByEmail(Email) {
    return $.ajax({
        url: siteURL + "/_api/web/SiteUsers/getByEmail('" + Email + "')",            
        method: "GET",
        headers: {
            "Accept": "application/json; odata=verbose"
        },
    });
}

function getItemTypeForListName(name) {
    return "SP.Data." + name.charAt(0).toUpperCase() + name.slice(1) + "ListItem";
}

// Create SharePoint List Item
function createSPListItem(siteUrl, listName, itemProperties) {

    return getFormDigest(siteUrl).then(function (data) {

        var itemType = getItemTypeForListName(listName);
        itemProperties["__metadata"] = {
            "type": itemType
        };

        return $.ajax({
            url: siteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items",
            type: "POST",
            contentType: "application/json;odata=verbose",
            data: JSON.stringify(itemProperties),
            headers: {
                "accept": "application/json;odata=verbose",
                "X-RequestDigest": data.d.GetContextWebInformation.FormDigestValue,
                "content-Type": "application/json;odata=verbose"            },
        });
    })
}

// Delete SharePoint List Item
function deleteSPListItem(siteUrl, listName, id) {

    return getFormDigest(siteUrl).then(function (data) {

        return $.ajax({
            url: siteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items(" + id + ")",
            type: "DELETE",
            headers: {
                "accept": "application/json;odata=verbose",
                "X-RequestDigest": data.d.GetContextWebInformation.FormDigestValue,
                "IF-MATCH": "*" },
        });
    })
}

// Get the list item that corresponds to the file by calling the file's ListItemAllFields property.
function getListItem(fileListItemUri) {

    // Send the request and return the response.
    return jQuery.ajax({
        url: fileListItemUri,
        type: "GET",
        headers: {
            "accept": "application/json;odata=verbose"
        }
    });
}

function getUserIDFromAccountName(siteURL, AccountName) {

    return $.ajax({
        url: siteURL + "/_api/web/siteusers(@v)?@v='" +
            encodeURIComponent(AccountName) + "'",
        method: "GET",
        headers: {
            "Accept": "application/json; odata=verbose"
        },
    })
}

function getCurrentUser() {

    //Gets the current user profile from SharePoint and returns promise
    var requestUri = siteURL + '/_api/web/currentuser/?$expand=groups';

    return axios.get(requestUri);
}

function getUserByID(ID){
    var requestURL = siteURL + '/_api/web/getuserbyid(' + ID + ')'
    return axios.get(requestURL);
}

function getUserProfile(siteURL, AccountName) {

    var endPointUrl = siteURL + "/_api/Web/Lists/getbytitle('UserProfileInfo')/Items?$select=*&$filter=Title eq '" + encodeURIComponent(AccountName) + "'";
    return axios.get(endPointUrl);
}

function getUserProperties(acctName){

    var endPointUrl = siteURL + "/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor(accountName=@v)?@v='" + encodeURIComponent(acctName) + "'";
    ////console.log(endPointUrl);
    var headers = {
        "accept": "application/json;odata=verbose"
    };

    return axios.get(endPointUrl)
}

// Get SharePoint Current Form Digest (session)
function getFormDigest(webUrl) {
    return $.ajax({
        url: webUrl + "/_api/contextinfo",
        method: "POST",
        headers: {
            "Accept": "application/json; odata=verbose"
        }
    });
}

// Get List Item Type metadata
function getItemTypeForListName(name) {
    return "SP.Data." + name.charAt(0).toUpperCase() + name.split(" ").join("").slice(1) + "ListItem";
}

// Get Pic Library Item Type metadata
function getItemTypeForPicLibrary(name) {
    return "SP.Data." + name.charAt(0).toUpperCase() + name.split(" ").join("").slice(1) + "Item";
}

function addFileToLibrary(libraryName, fileProperties, fileNameField) {

    return new Promise(function (resolve, reject) {

        var fileInput = jQuery(fileNameField);

        //Stuff the file into a filebuffer then get the filebuffer
        var getFile = getFileBuffer();
        getFile.done(function (arrayBuffer) {

            // Add the file to the SharePoint folder.
            var addFile = addFileToFolder(arrayBuffer);
            addFile.done(function (file, status, xhr) {

                // Get the list item that corresponds to the uploaded file.
                var getItem = getListItem(file.d.ListItemAllFields.__deferred.uri);
                getItem.done(function (listItem, status, xhr) {

                    changeItem = updateListItem(siteURL, listItem.d.__metadata, libraryName, fileProperties);
                    changeItem.done(function (data, status, xhr) {
                        resolve(data);
                    });
                    getItem.fail(onError);                   
                });
                addFile.fail(onError);                
            });
             getFile.fail(onError);
        })

        // Get the local file as an array buffer.
        function getFileBuffer() {
            var deferred = jQuery.Deferred();
            var reader = new FileReader();
            reader.onloadend = function (e) {
                deferred.resolve(e.target.result);
            }
            reader.onerror = function (e) {
                deferred.reject(e.target.error);
            }
            reader.readAsArrayBuffer(fileInput[0].files[0]);
            return deferred.promise();
        }

        // Add the file to the file collection in the Shared Documents folder.
        function addFileToFolder(arrayBuffer) {

            return getFormDigest("https://corporatedocument.sharepoint.com/sites/bgintranet").then(function (data) {

                // Get the file name from the file input control on the page.
                var parts = fileInput[0].value.split('\\');
                var fileName = parts[parts.length - 1];

                // Construct the endpoint.
                var fileCollectionEndpoint = String.format(
                    "{0}/_api/web/getfolderbyserverrelativeurl('{1}')/files" +
                    "/add(overwrite=true, url='{2}')",
                    siteURL, libraryName, fileName);

                // Send the request and return the response.
                // This call returns the SharePoint file.
                return jQuery.ajax({
                    url: fileCollectionEndpoint,
                    type: "POST",
                    data: arrayBuffer,
                    processData: false,
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "X-RequestDigest": data.d.GetContextWebInformation.FormDigestValue,
                        "content-Type": "application/json;odata=verbose"
                    },
                });
            });
        }

        // Get the list item that corresponds to the file by calling the file's ListItemAllFields property.
        function getListItem(fileListItemUri) {

            // Send the request and return the response.
            return jQuery.ajax({
                url: fileListItemUri,
                type: "GET",
                headers: {
                    "accept": "application/json;odata=verbose"
                }
            });
        }

        function updateListItem(siteURL, itemMetadata, name, itemProperties) {

            return getFormDigest("https://corporatedocument.sharepoint.com/sites/bgintranet").then(function (data) {

                var itemType = getItemTypeForPicLibrary(name)
                itemProperties["__metadata"] = {
                    "type": itemType
                };

                // Send the request and return the promise.
                // This call does not return response content from the server.
                return jQuery.ajax({
                    url: itemMetadata.uri,
                    type: "POST",
                    data: JSON.stringify(itemProperties),
                    headers: {
                        "X-RequestDigest": data.d.GetContextWebInformation.FormDigestValue,
                        "content-type": "application/json;odata=verbose",
                        "IF-MATCH": itemMetadata.etag,
                        "X-HTTP-Method": "MERGE"
                    }
                });
            });
        }

        function onError(error) {
            reject(error);
           //console.log("Error Saving Item & Image - " + error.responseText);

        }
    })
}

function UpdateListItemByid(id, listName, itemProperties) {

    return getFormDigest("https://corporatedocument.sharepoint.com/sites/bgintranet").then(function (data) {

        var itemType = getItemTypeForListName(listName)
        itemProperties["__metadata"] = {
            "type": itemType
        };

        return $.ajax({
            url: siteURL + "_api/web/lists/getbytitle('" + listName + "')/items(" + id + ")",
            type: "PATCH",
            data: JSON.stringify(itemProperties),
            headers: {
                "accept": "application/json;odata=verbose",
                "X-RequestDigest": data.d.GetContextWebInformation.FormDigestValue,
                "content-Type": "application/json;odata=verbose",
                "X-Http-Method": "PATCH",
                "If-Match": "*"
            },            
        });
    });
}

function UpdateUserProfileByEmail(EmailAddress, itemProperties) {

    return getFormDigest("https://corporatedocument.sharepoint.com/sites/bgintranet").then(function (data) {

        var itemType = getItemTypeForListName('UserProfileInfo')
        itemProperties["__metadata"] = {
            "type": itemType
        };

        return $.ajax({
            url: siteURL + "_api/web/lists/getbytitle('UserProfileInfo')/items?$filter=Email eq '" + EmailAddress + "'",
            type: "PATCH",
            data: JSON.stringify(itemProperties),
            headers: {
                "accept": "application/json;odata=verbose",
                "X-RequestDigest": data.d.GetContextWebInformation.FormDigestValue,
                "content-Type": "application/json;odata=verbose",
                "X-Http-Method": "PATCH",
                "If-Match": "*"
            },            
        });
    });
}


function getNoticeBoardById(siteURL, id) {

    var endPointUrl = siteURL + "/_api/Web/Lists/getbytitle('NoticeBoard')/Items?$select=*&$filter=ID eq '" + id + "'";     
    return axios.get(endPointUrl);
}


function getUserProfileById(siteURL, id) {

    var endPointUrl = siteURL + "/_api/Web/Lists/getbytitle('UserProfileInfo')/Items?$select=*&$filter=ID eq '" + id + "'";     
    return axios.get(endPointUrl);
}

function getUserProfileByEmail(siteURL, Email) {

    var endPointUrl = siteURL + "/_api/Web/Lists/getbytitle('UserProfileInfo')/Items?$select=*&$filter=Email eq '" + encodeURIComponent(Email) + "'";
    return axios.get(endPointUrl);
}


function getMarketItemById(id) {

    var endPointUrl = siteURL + "/_api/Web/Lists/getbytitle('MarketPlace')/Items?$select=LinkTitle,Expiry_x0020_Date,Seller/Title,Description,Picture,Status,ContactNumber,Company,Price,pictureURL&$expand=Seller&$filter=ID eq '" + id + "'";     
    return axios.get(endPointUrl);
}

function getFaqById(id) {

    var endPointUrl = siteURL  + "/_api/Web/Lists/getbytitle('FAQ')/Items?$expand=Author&$select=*,Author/Title&$filter=ID eq '" + id + "'";     
    return axios.get(endPointUrl);
}

function incrementCounter(list, id, column, counter){

    var itemProperties = {};   
    itemProperties[column] = counter;

    var itemUpdate = UpdateListItemByid(id, list, itemProperties)
    itemUpdate.then(function(){
        console.log("Item Counter Updated Sucessfully")
    }).catch(function(error){
        console.log("Item Counter Update Failed")
        console.log(error);
    })
}

//Get permissions for list/library for param accountName - 'i:0#.f|membership|<email address>'
function getListUserEffectivePermissions(webUrl, listTitle, accountName) {
    var endpointUrl = webUrl + "/_api/web/lists/getbytitle('" + listTitle +
        "')/getusereffectivepermissions(@u)?@u='" + encodeURIComponent(accountName) + "'";
    return $.getJSON(endpointUrl);
}

//Get permissions for list/library for current user
function getListCurrentUserEffectivePermissions(webUrl, listTitle) {
    var endpointUrl = webUrl + "/_api/web/lists/getbytitle('" + listTitle +
        "')/EffectiveBasePermissions";  
    return $.getJSON(endpointUrl);
}

function parseBasePermissions(value) {
    var permissions = new SP.BasePermissions();
    permissions.initPropertiesFromJson(value);
    var permLevels = [];
    for (var permLevelName in SP.PermissionKind.prototype) {
        if (SP.PermissionKind.hasOwnProperty(permLevelName)) {
            var permLevel = SP.PermissionKind.parse(permLevelName);
            if (permissions.has(permLevel)) {
                permLevels.push(permLevelName);
            }
        }
    }
    return permLevels;
}
