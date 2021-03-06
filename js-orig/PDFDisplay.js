// Main
vm_Main = new Vue({

    el: '.content',
    data: {
        displayDocs: [],
        welcomeDoc: [],
        selectedURL: "",
        mainTitle:"",
        columnTitle:"",
        docType:""
    },

    created: function () {
        this.getTitles();
        this.getDocs()
    },

    methods: {

        getDocs: function () {

            var vm = this;
            // var endPointUrl = peopleURL + "_api/web/GetFolderByServerRelativeUrl('/sites/bgintranet_people/AdHoc%20Docs/')/Files?$expand=DocumentType&$select=Title,ServerRelativeUrl,DocumentType&$orderby=TimeLastModified desc";
            var endPointUrl = peopleURL + "_api/web/Lists/GetByTitle('AdHoc%20Docs')/Items?select=Title,DocType,File/ServerRelativeUrl,DocumentType&$expand=File&$filter=DocType eq '" + vm.docType + "'&$orderby=Modified desc"
            console.log(endPointUrl);

            axios.get(endPointUrl)
                .then(response => {

                    console.log(response.data.value);

                    var responses = response.data.value;
                    vm.displayDocs = [];
                    vm.welcomeDoc = [];

                    responses.forEach((elem) => {
                        var eapDoc = [];
                        eapDoc.Title = elem.Title;
                        eapDoc.linkURL = "https://corporatedocument.sharepoint.com/" + elem.File.ServerRelativeUrl;

                        if (eapDoc.Title == null) {
                            vm.welcomeDoc.push(eapDoc);
                        } else {
                            vm.displayDocs.push(eapDoc);
                        }
                    })

                    console.log("DisplayDocs");
                    console.log(this.displayDocs);

                    this.$nextTick(function () {
                        this.selectedURL = this.displayDocs["0"].linkURL                        
                        $('.pdfLink').EZView();
                        $(".loadingSpinner").fadeOut("slow");
                    });
                })
        },
        
        getTitles: function() {

            var vm = this;
            //Test if search params in URL then drop into search field
            vm.docType = qs("typ");
            console.log("DocType");
            console.log(vm.docType);

            $(document).prop('title', 'BIG - ' + vm.docType);

            // var endPointUrl = peopleURL + "_api/web/GetFolderByServerRelativeUrl('/sites/bgintranet_people/AdHoc%20Docs/')/Files?$expand=DocumentType&$select=Title,ServerRelativeUrl,DocumentType&$orderby=TimeLastModified desc";
            var endPointUrl = peopleURL + "_api/web/Lists/GetByTitle('Element%20Config')/Items?select=Element,Value,SubValue&$filter=Element eq '" + vm.docType + " PDF'"
            console.log(endPointUrl);

            axios.get(endPointUrl)
                .then(response => {
                    vm.mainTitle = response.data.value["0"].Title
                    vm.columnTitle = response.data.value["0"].SubValue
                })
        },

        showDoc: function () {
            var selectedHref = $(event.target).attr('href');
            console.log(selectedHref);
            this.selectedURL = selectedHref;
        },
    }
});