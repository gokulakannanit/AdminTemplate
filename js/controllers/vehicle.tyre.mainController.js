(function(){
    'use strict';
    function controller($scope, updateService, vendorService, modalService, config){
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
            this.$scope.updateDetails = function() {
               self.$scope.model.dataModel.dealer = self.$scope.vendorList.selecteditem.id;
               self.updateService.add(self.$scope.model.dataModel);
            }

            this.$scope.edit = function(editId){
                self.$scope.editId = editId;
                self.loadData();

                 if(self.$scope.model.dataModel.dealer && vendorService.model.dataItemById.length>0) {
                    self.$scope.vendorList.selecteditem = vendorService.model.dataItemById[self.$scope.model.dataModel.dealer];
                    if(self.$scope.vendorList.selecteditem){
                       self.$scope.vendorList.dealer = self.$scope.vendorList.selecteditem.companyName; 
                    }
                }
            };

        };

        function onVendorModelReady() {
            self.$scope.vendorListById = vendorService.model.dataItemById;
            self.$scope.vendorList = {
                dealer:'', 
                selecteditem:{}, 
                source: vendorService.getByLabelCategory('Tyre') 
            };
        }

        this.init();
    }
    controller.prototype = baseController;

    controller.$inject = ['$scope', 'vehicle.tyre.service', 'vendor.service', 'modalService', 'config'];
    MetronicApp.controller('vehicle.tyre.mainController', controller);
}());