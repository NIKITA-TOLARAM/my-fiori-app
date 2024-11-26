sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("com.sap.m.zmasterdet.controller.Master", {
        onInit: function () {
            var oDataModel = new sap.ui.model.odata.v2.ODataModel("https://cors-anywhere.herokuapp.com/https://services.odata.org/V2/Northwind/Northwind.svc/");
            var that = this;
             oDataModel.read("/Orders", {
                success: function(oData, response){
                    var oOrderSales = new sap.ui.model.json.JSONModel();
                    oOrderSales.setData(oData.results);
                    that.getView().setModel(oOrderSales,"OrderSales" );
 
                },
                error: function(error){
                    var b=20;
                }
            })

           
        },
        onPressNavToDetail: function (oEvent) {
            var oID = oEvent.getSource().getBindingContext('OrderSales').getProperty("OrderID");
            var that = this;
            var oModel = this.getOwnerComponent().getModel();
            // oModel.read("/Orders("+oID+")", {
            //     success: function (odata) {
            //         console.log(odata);
            //         that.getView().byId("SimpleFormDisplay354").setModel(new JSONModel(odata));
            //         that.getSplitContObj().to(that.createId("detailPage"));
            //     }, error: function (error) {
            //         console.log(error)
            //     }
            // })

            // var sPath = oEvent.getSource().getBindingContextPath();
            // var oApp = this.getView().getParent();
            // var oView2 = oApp.getPages()[0];
            // oView2.bindElement(sPath);
            // oApp.to("detailPage");

            var oItem = oEvent.getSource();
            var oContext = oItem.getBindingContext('OrderSales');

           
            // var oDetailModel = new JSONModel({
            //     selectedItem: oContext.getObject()
            // });

            var oDetailModel = new JSONModel(oContext.getObject());

           
            this.getView().setModel(oDetailModel, "selectedItem");


        }
        
    });
});