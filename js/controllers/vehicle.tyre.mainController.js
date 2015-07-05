(function(){
    'use strict';
    function controller($scope, $filter, updateService, vendorService, modalService, config){
        var self = this;
        this.$scope = $scope;
        this.updateService = updateService;
        this.modalService = modalService;
        this.isForeignKey = true;
        this.init = function(){

            this.super('init');
            this.$scope.paymentList = config.paymentList;
            this.$scope.makeList = config.tyreMakeList;
            this.$scope.tyrePositionList = config.tyrePositionList;
            
            vendorService.get().then(onVendorModelReady);
            this.$scope.updateDetails = function(){
                self.$scope.model.dataModel.dealer = self.$scope.vendorList.selecteditem.id;

                console.log(self.$scope.model.dataModel);
                self.updateService.add(self.$scope.model.dataModel);
            }

        }

        function onVendorModelReady() {

            var vendors = $filter('byKeyAndValue')('typeOfGoods', 'Tyre', vendorService.model.dataList)

            self.$scope.vendorList = {dealer:'', selecteditem:{}, source: vendors};

            if(self.$scope.model.dataModel.dealer && vendorService.model.dataItemById.length>0){
                self.$scope.vendorList.selecteditem = vendorService.model.dataItemById[self.$scope.model.dataModel.dealer];
                if(self.$scope.vendorList.selecteditem){
                   self.$scope.vendorList.dealer = self.$scope.vendorList.selecteditem.companyName; 
                }
            }

        }

        this.init();
    }
    controller.prototype = baseController;

    controller.$inject = ['$scope', '$filter', 'vehicle.tyre.service', 'vendor.service', 'modalService', 'config'];
    MetronicApp.controller('vehicle.tyre.mainController', controller);
}());