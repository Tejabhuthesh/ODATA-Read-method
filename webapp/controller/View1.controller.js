sap.ui.define([
    "sap/ui/core/mvc/Controller", "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, JSONModel) {
        "use strict";

        return Controller.extend("idODATA.odataproject1.controller.View1", {
            onInit: function () {

                // var that = this;

                // var oModel = that.getOwnerComponent().getModel("Data1");

                // oModel.read("/Customers", {
                //     success: function (odata) {

                //         var oModel1 = new JSONModel();
                //         oModel1.setData(odata);
                //         that.getView().setModel(oModel1, "oModel1");
                //         MessageBox.success(oModel1);

                //     },
                //     error: function (oError) {
                //         MessageBox.error(oError);
                //     }
                // });


                   // this.onReadFilters();
                //  this.onReadSorter();
              // this. onReadParameters();
             // this.onReadKey();


                //  onReadFilters: function () {
                    
                var that = this;
                var oModel = that.getOwnerComponent().getModel("Data1");
                var oFilter = new sap.ui.model.Filter('CustomerID', 'EQ', 'ALFKI');
                var oFilter1 = new sap.ui.model.Filter('CustomerID', 'EQ', 'AROUT');
                var oFilter2 = new sap.ui.model.Filter('CustomerID', 'EQ', 'BSBEV');
                var oFilter3 = new sap.ui.model.Filter('CustomerID', 'EQ', 'CHOPS');
                var oFilter4 = new sap.ui.model.Filter('CustomerID', 'EQ', 'DRACD');
               
                var oSorter = new sap.ui.model.Sorter('CustomerID', true);
        
                // true = descending order
              // false = ascending order
          
                oModel.read("/Customers", {
                    filters: [oFilter, oFilter1,oFilter2,oFilter3,oFilter4],
                    sorters: [oSorter],
                    urlParameters:{$skip:1,$top:3},
                    success: function (odata) {
                        var oModel1 = new sap.ui.model.json.JSONModel(odata);
                        that.getView().byId("idProducts").setModel(oModel1, "oModel1");

                        MessageBox.success(oModel1);



                    },
                    error: function (oError) {
                        MessageBox.error(oError);
                    }
                });
            },

            onPress: function (oEvent) {
                var that = this;
                var myView = that.getView();
                var oDialog = myView.byId("idDialog");
                if (!oDialog) {

                    oDialog = sap.ui.xmlfragment(myView.getId(), "idODATA.odataproject1.view.Dialog", that);
                    myView.addDependent(oDialog);
                    oDialog.open();
                }
                else {

                    that.byId("idDialog").open();
                }

                var key = oEvent.oSource.mAggregations.cells[0].mProperties;

                var oModel6 = that.getOwnerComponent().getModel("Data1");
                oModel6.read("/Customers", {
                    success: function (odata) {
                          debugger;
                        var oModel2 = new JSONModel();
                        oModel2.setData(odata);
                        that.getView().setModel(oModel2);
                        var key1 = key.text;
                        var key3 = oModel2.oData.results;
                        var data2 = [];

                        for (var i = 0; i < key3.length; i++) {
                            if (key1 === key3[i].CustomerID) {

                                data2.push(key3[i]);
                                var oModel0 = new sap.ui.model.json.JSONModel();
                                oModel0.setData(data2);
                                that.getView().setModel(oModel0, "Data2");
                            }
                        }
                    },
                    error: function (oError) {
                        console.log(oError);
                    }
                });

            },
            CancelPress: function () {
                this.byId("idDialog").close();
            },



            // onReadFilters: function () {

            //     var that = this;
            //     var oModel = that.getOwnerComponent().getModel("Data1");
            //     var oFilter = new sap.ui.model.Filter('City', 'EQ', 'London');
            //     oModel.read("/Customers", {
            //         filters: [oFilter], success: function (odata) {
            //             var oModel1 = new sap.ui.model.json.JSONModel(odata);
            //             that.getView().byId("idProducts").setModel(oModel1, "oModel1");
            //             //  that.getView().byId("form1").setModel(oModel1,"oModel1");
            //             MessageBox.success(oModel1);



            //         },
            //         error: function (oError) {
            //             MessageBox.error(oError);
            //         }
            //     });



            // },onReadSorter: function () {

            //     var that = this;
            //     var oModel = that.getOwnerComponent().getModel("Data1");
            //     var oSorter = new sap.ui.model.Sorter('CustomerID',true);
            //     oModel.read("/Customers", {
            //         sorters: [oSorter], success: function (odata) {
            //             var oModel1 = new sap.ui.model.json.JSONModel(odata);
            //             that.getView().byId("idProducts").setModel(oModel1, "oModel1");

            //             MessageBox.success(oModel1);



            //         },
            //         error: function (oError) {
            //             MessageBox.error(oError);
            //         }
            //     });



            // },
            // onReadParameters: function () {

            //     var that = this;
            //      var oModel = that.getOwnerComponent().getModel("Data1");
            // //     var oSorter = new sap.ui.model.Sorter('CustomerID',true);
            //     oModel.read("/Customers", {
            // //         sorters: [oSorter],
            //            urlParameters:{$skip:5,Stop:8},
            //              success: function (odata) {
            //              var oModel1 = new sap.ui.model.json.JSONModel(odata);
            //              that.getView().byId("idProducts").setModel(oModel1, "oModel1");

            //             MessageBox.success(oModel1);
            //         },
            //         error: function (oError) {
            //             MessageBox.error(oError);
            //         }
            //     });



            //  },

             onReadKey: function () {

                var that = this;
                 var oModel = that.getOwnerComponent().getModel("Data1");
          
                oModel.read("/Customers('AROUT')", {
          
                         success: function (odata) {
                         var oModel1 = new sap.ui.model.json.JSONModel({results:[odata]});
                         that.getView().byId("idProducts").setModel(oModel1, "oModel1");

                        MessageBox.success(oModel1);
                    },
                    error: function (oError) {
                        MessageBox.error(oError);
                    }
                });



             }
        });
    });
