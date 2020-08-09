var pagination = null;
$(document).ready(function () {

    $('.selectCompany').select2({
        width: '100%',
        placeholder: 'Company',
        minimumResultsForSearch: Infinity,
    })

    $('.selectLocation').select2({
        width: '100%',
        placeholder: 'Location',
        minimumResultsForSearch: Infinity,
    })

    function formatResult(item) {
        return item.Title;
    };

    function formatSelection(item) {
        return item.Title;
    };

    // Function to get parameter from url
    function getURLParam(name, url) {
        // get query string part of url into its own variable
        url = decodeURIComponent(url);
        var query_string = url.split("?");

        // make array of all name/value pairs in query string
        var params = query_string[1].split("&");

        // loop through the parameters
        var i = 0;
        while (i < params.length) {
            // compare param name against arg passed in
            var param_item = params[i].split("=");
            if (param_item[0] == name) {
                // if they match, return the value
                return param_item[1];
            }
            i++;
        }
        return "";
    }

});

document.onreadystatechange = function () {
    if (document.readyState === 'complete') {

        // setColours();        
        $(".loadingSpinner").fadeOut(50);
    }
}


// Main
vm_Main = new Vue({

    el: '.main',
    data: {
        allPosts: [],
        searchResults: [],
        displayPosts: [],
        noPosts: [{
            Title: "No Vacancies",
            Description: "Unfortunately there are currently no vacancies for this area. However new positions are added all the time so please check back soon.",
            CompanyImage: "https://corporatedocument.sharepoint.com/sites/bgintranet/SitePages/Intranet/assets/images/mm_images/Group_trans.png",
            ActiveLink: false,
            Style: 'blue'
        }]
    },

    created: function () {
        this.getJobs()
    },

    methods: {

        getJobs: function () {

            // JobBoard List Is Updated Every 10 mins By MS Flow Workflow Intranet Job Board RSS Feed

            var vm = this;
            var endPointUrl = siteURL + "/_api/Web/Lists/getbytitle('RSSFeeds')/Items?&$filter=Title eq 'JobBoard'";

            axios.get(endPointUrl)
                .then(response => {

                    var xmlString = response.length == 0 ? null : response.data.value["0"].xml;

                    if (xmlString != null) {
                        var xmlDOM = new DOMParser().parseFromString(xmlString, 'text/xml');
                        var jsonObject = vm.xmlToJson(xmlDOM);

                        var entries = [];

                        if (Array.isArray(jsonObject.rss.channel.item)) {
                            entries = jsonObject.rss.channel.item;
                        } else {
                            entries.push(jsonObject.rss.channel.item);
                        }

                        // console.log(entries);
                        entries.forEach(function (entry) {

                            var nbPost = [];

                            var jobDescription = vm.stripHTML(entry.vacancydescription);
                            var elip = jobDescription.length > 280 ? " ...." : "";
                            var Company = entry.company;
                            var CompanyImage = "";

                            switch (Company.toLowerCase()) {
                                case 'cds':
                                    CompanyImage = "cds2020.png"
                                    break;
                                case 'cds defence support':
                                    CompanyImage = "cds_ds.png"
                                    break;
                                case 'cds defence and security':
                                    CompanyImage = "cds_ds.png"
                                    break;
                                case 'bgbs':
                                    CompanyImage = "bgbs.png"
                                    break;
                                case 'newspress':
                                    CompanyImage = "newspress.png"
                                    break;
                                default:
                                    CompanyImage = "Group_Bailie.png"
                            }

                            nbPost.Title = entry.title;
                            nbPost.Description = jobDescription.slice(0, 280) + elip;
                            nbPost.Link = entry.link;
                            nbPost.Company = Company;
                            nbPost.Location = entry.location;
                            nbPost.CompanyImage = "https://corporatedocument.sharepoint.com/sites/bgintranet/SitePages/Intranet/assets/images/mm_images/" + CompanyImage
                            nbPost.Style = getColour();
                            //Control Icon Display
                            nbPost.ActiveLink = nbPost.Link == null ? false : true;
                            vm.allPosts.push(nbPost);
                        })

                    }

                    // console.log("Display Posts");
                    // console.log(vm.displayPosts);

                    if (!Array.isArray(vm.allPosts) || !vm.allPosts.length) {
                        vm.displayPosts = vm.noPosts;
                    } else {
                        vm.displayPosts = vm.allPosts.slice(0);
                    }

                    vm.displayPosts.reverse();

                    vm.$nextTick(function () {
                        handlePagination();
                    });

                }).catch(function (err) {
                    console.log(err);
                    vm.displayPosts = vm.noPosts;
                })
        },

        xmlToJson: function (xml) {

            var vm = this;

            // Create the return object
            var obj = {};

            if (xml.nodeType == 1) { // element
                // do attributes
                if (xml.attributes.length > 0) {
                    obj["@attributes"] = {};
                    for (var j = 0; j < xml.attributes.length; j++) {
                        var attribute = xml.attributes.item(j);
                        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
                    }
                }
            } else if (xml.nodeType == 3) { // text
                obj = xml.nodeValue;
            }

            // do children
            // If just one text node inside
            if (xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3) {
                obj = xml.childNodes[0].nodeValue;
            } else if (xml.hasChildNodes()) {
                for (var i = 0; i < xml.childNodes.length; i++) {
                    var item = xml.childNodes.item(i);
                    var nodeName = item.nodeName;
                    if (typeof (obj[nodeName]) == "undefined") {
                        obj[nodeName] = vm.xmlToJson(item);
                    } else {
                        if (typeof (obj[nodeName].push) == "undefined") {
                            var old = obj[nodeName];
                            obj[nodeName] = [];
                            obj[nodeName].push(old);
                        }
                        obj[nodeName].push(vm.xmlToJson(item));
                    }
                }
            }
            return obj;
        },

        stripHTML: function (html) {
            var tmp = document.createElement("DIV");
            tmp.innerHTML = html;
            return tmp.textContent || tmp.innerText || "";
        },

        searchPosts: function () {

            var term = $('#searchTerm').val() == '' ? '*' : $('#searchTerm').val();
            var termCompany = ($('.selectCompany').val() == '' || $('.selectCompany').val() == 'All') ? '*' : $('.selectCompany').val();
            var termCompany = $('.selectCompany').val() == 'CDS DS' ? 'CDS Defence Support' : termCompany;
            var termLocation = ($('.selectLocation').val() == '' || $('.selectLocation').val() == 'All') ? '*' : $('.selectLocation').val();

            var vm = this;
            var termArray = [];
            var companyArray = [];

            if (term == "*" & termCompany == "*" & termLocation == "*") {
                // console.log("All Blank")
                vm.displayPosts = vm.allPosts.slice(0)
                vm.$nextTick(function () {
                    handlePagination();
                });
                return;
            }

            if (term != "*") {
                termArray = vm.allPosts.filter(function (el) {
                    console.log(el);
                    return (el.Description.toLowerCase() + el.Title.toLowerCase()).includes(term.toLowerCase())
                })
            } else {
                termArray = vm.allPosts.slice(0);
            }

            if (termCompany != "*") {
                companyArray = termArray.filter(function (el) {
                    return el.Company == termCompany
                })
            } else {
                companyArray = termArray.slice(0);
            }

            if (termLocation != "*") {
                vm.searchResults = companyArray.filter(function (el) {
                    return el.Location.includes(termLocation)
                })
            } else {
                vm.searchResults = companyArray.slice(0);
            }

            if (!Array.isArray(vm.searchResults) || !vm.searchResults.length) {
                vm.noPosts[0].Style = getColour();
                vm.displayPosts = vm.noPosts;
            } else {
                vm.displayPosts = vm.searchResults.slice(0);
            }

            vm.$nextTick(function () {
                handlePagination();
            });

        },

    }
});

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

getColour = function () {

    let COLORS = ['green', 'yellow', 'purple', 'pink', 'blue']
    return (COLORS[getRandomInt(0, 4)]);
}

$('.breadcrumb').click(function () {
    $('#searchTerm').val('');
    $('.selectCompany').val('').trigger('change')
    $('.selectLocation').val('').trigger('change')
    vm_Main.searchPosts();

});

handlePagination = function () {

    var items = $(".list-wrapper .list-item");
    var numItems = items.length;
    var perPage = 6;

    items.slice(perPage).hide();

    $('#pagination-container').pagination({
        items: numItems,
        itemsOnPage: perPage,
        prevText: "Prev",
        nextText: "Next",
        onPageClick: function (pageNumber) {
            var showFrom = perPage * (pageNumber - 1);
            var showTo = showFrom + perPage;
            items.hide().slice(showFrom, showTo).show();
        }
    });

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}