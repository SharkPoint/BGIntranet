$(document).ready(function () {

    $(".loadingSpinner").fadeOut(50);
})

vm_Main = new Vue({

    el: '#wrapper',
    data: {
        paras: [],
        headerToShow: "",
        paraToShow: ""
    },

    created: function () {
        this.getHandbook()
    },

    methods: {

        getHandbook: function () {

            var vm = this;
            var requestUri = peopleURL + "/_api/web/lists/getbytitle('Staff Handbook Repository')/items?$select=Title,SectionTile,Section_x0020_Wording,SortTest4"

            console.log(requestUri);

            axios.get(requestUri)
                .then(response => {
                    var data = ""
                    var responses = response.data.value;

                    responses.forEach(element => {
                        element.sortOrder = parseFloat(element.SortTest4)
                    });

                    vm.paras = responses.sort(function (a, b) {
                        return (a.sortOrder > b.sortOrder) - (a.sortOrder < b.sortOrder);
                    });

                    var treeLine = "";
                    vm.paras.forEach(element => {

                        var ParentID = null;
                        var calcParentID = "";

                        if (element.Title.includes(".") == true) {
                            var splitID = element.Title.split('.');
                            for (var i = 0; i < splitID.length - 1; i++) {
                                calcParentID += splitID[i] + ".";
                            }
                            ParentID = calcParentID.substring(0, calcParentID.length - 1);
                        }

                        var pid = ParentID == null ? '' : '"pid": "' + ParentID + '",'
                        treeLine = '{ "id": "' + element.Title + '", ' + pid + ' "name": "' + element.SectionTile + '" },'
                        data += treeLine;
                    });

                    this.showTree(data.substring(0, data.length - 1));
                })
        },

        showTree: function (treedata) {

            var data = '[' + treedata + ']';
            var vm = this;
            var jsonParsed = JSON.parse(data)
            var treeObj;

            //Set the intitial value to show in main window
            vm.headerToShow = vm.paras["0"].SectionTile;
            vm.paraToShow = vm.paras["0"].Section_x0020_Wording;

            $("#treeView").ejTreeView({
                fields: {
                    id: "id",
                    parentId: "pid",
                    text: "name",
                    hasChild: "hasChild",
                    dataSource: jsonParsed,
                    expanded: "expanded",
                },
                enableMultipleExpand: false,
                selectedNode: 0,
                nodeSelect: function (args) {
                    vm.paras.some(function (el) {
                        if (el.Title == args.id) {
                            if (el.Section_x0020_Wording != null) {
                                vm.headerToShow = el.SectionTile;
                                vm.paraToShow = el.Section_x0020_Wording;
                            }                            
                        }
                        return el.Title == args.id;
                    });
                }
            });

            //Test is a param is being passed in to direct to page            
            var treeObj = $("#treeView").data("ejTreeView");
            var paragraphParam = qs("p");
            var splitPara;
            if(paragraphParam != null){
                splitPara = paragraphParam.split('.');
                console.log("SplitPara - " + splitPara);
                treeObj.selectNode(splitPara[0]);
                treeObj.expandNode(treeObj.getSelectedNode());

                if(splitPara.length == 3){
                    treeObj.selectNode(splitPara[0] + "." + splitPara[1]);
                    treeObj.expandNode(treeObj.getSelectedNode());
                    treeObj.selectNode(splitPara[0] + "." + splitPara[1] + "." + splitPara[2]);

                }else if(splitPara.length == 2){
                    treeObj.selectNode(splitPara[0] + "." + splitPara[1]);
                }
            }            
        }
    }
});