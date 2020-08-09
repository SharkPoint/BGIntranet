// Main
vm_Main = new Vue({

    el: '.content',
    data: {
        displayDocs: [],
        welcomeDoc: [],
        selectedURL: "",
    },

    created: function () {
        this.getDocs()
    },

    methods: {

        getDocs: function () {

            var vm = this;
            var endPointUrl = siteURL + "_api/web/GetFolderByServerRelativeUrl('/sites/bgintranet/EAPDocuments')/Files?&$orderby=TimeLastModified desc";

            axios.get(endPointUrl)
                .then(response => {

                    var responses = response.data.value;
                    vm.displayDocs = [];
                    vm.welcomeDoc = [];

                    responses.forEach((elem) => {
                        var eapDoc = [];
                        eapDoc.Title = elem.Title;
                        eapDoc.linkURL = "https://corporatedocument.sharepoint.com/" + elem.ServerRelativeUrl;

                        if (eapDoc.Title == null) {
                            vm.welcomeDoc.push(eapDoc);
                        } else {
                            vm.displayDocs.push(eapDoc);
                        }
                    })

                    this.$nextTick(function () {
                        this.selectedURL = this.displayDocs["0"].linkURL
                        $('.pdfLink').EZView();
                        $(".loadingSpinner").fadeOut("slow");
                    });
                })
        },

        showDoc: function () {
            var selectedHref = $(event.target).attr('href');
            console.log(selectedHref);
            this.selectedURL = selectedHref;
        },

        showWelcome: function () {
            console.log(this.welcomeDoc);
            $('#docDisplay').attr('data', this.welcomeDoc["0"].linkURL);
        },

        openExistingAccount: function () {
            window.open("https://vclub.validium.com", "_blank")
        },

        createNewAccount: function () {

            var w2 = window.open("https://www.validium.com/login/login-vclub/")
            var uName = $('w2 #vClubUserName');
            console.dir(uName);
        },

        panelExpand: function () {
            document.getElementById("container1").style.height = "180px";
            document.getElementById("container1p").style.display = "block";
        },

        panelContract: function () {
            document.getElementById("container1").style.height = "44px";
            document.getElementById("container1p").style.display = none;
        },
    }
});