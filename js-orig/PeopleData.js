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
            var endPointUrl = peopleURL + "_api/web/GetFolderByServerRelativeUrl('/sites/bgintranet_people/People%20Data/')/Files?&$orderby=TimeLastModified desc";

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
    }
});