(function(){
    'use strict';
    function controller($scope, $stateParams, updateService, vehicleService, vendorService, odoMeterService){
        var self = this;
        this.$scope = $scope;
        this.$stateParams = $stateParams;
        this.updateService = updateService;
        this.init = function(){            
            this.super('init');
            vehicleService.get().then(onVehicleModelReady);
            vendorService.get().then(onVendorModelReady);


            this.$scope.updateDetails = function() {
               self.$scope.model.dataModel.vehicleId = self.$scope.vehicle.selectedItem.id;
               self.$scope.model.dataModel.dealerId = self.$scope.vendorList.selecteditem.id;

               // Remove the temporary reading.
               delete self.$scope.model.dataModel.lastOdometerReading;

               self.updateService.add(self.$scope.model.dataModel);
            }
        }

        function onVehicleNoChange(vehicleId){
            var vehicleId = vehicleId || self.$scope.vehicle.selectedItem.id;
            console.log(vehicleId);

            odoMeterService.get(vehicleId).then(function(data){
                if(data.length && data[0].currentOdometerReading) {
                    self.$scope.model.dataModel.lastOdometerReading = data[0].currentOdometerReading;
                } else if(data.length && data[0].odometer) {
                    self.$scope.model.dataModel.lastOdometerReading = data[0].odometer;
                }
            });
        }

        function onVehicleModelReady() {

            self.$scope.vehicle = {
                vehicleNo:'',
                selectedItem: '',
                model:vehicleService.model,
                onChange:onVehicleNoChange
            };

            if(self.$scope.model.dataModel.vehicleId && self.$scope.vehicle.model.dataItemById.length>0){
                self.$scope.vehicle.selectedItem = self.$scope.vehicle.model.dataItemById[self.$scope.model.dataModel.vehicleId];
                self.$scope.vehicle.vehicleNo = self.$scope.vehicle.selectedItem.vehicleNo;

                onVehicleNoChange(self.$scope.model.dataModel.vehicleId);
            }
        }

        function onVendorModelReady() {
            self.$scope.vendorListById = vendorService.model.dataItemById;
            self.$scope.vendorList = {
                dealer:'', 
                selecteditem:{}, 
                source: vendorService.model.dataItemByCategory['Fuel'] 
            };

            if(self.$scope.model.dataModel.dealerId && vendorService.model.dataItemById.length>0) {
                self.$scope.vendorList.selecteditem = vendorService.model.dataItemById[self.$scope.model.dataModel.dealerId];
                if(self.$scope.vendorList.selecteditem){
                   self.$scope.vendorList.dealer = self.$scope.vendorList.selecteditem.companyName; 
                }
            }

        }

        this.init();
    }
    controller.prototype = baseController;

    controller.$inject = ['$scope', '$stateParams', 'fuelEntrie.service', 'vehicle.service','vendor.service', 'fuelEntrie.odoMeter.service'];
    MetronicApp.controller('fuelEntrie.add.mainController', controller);
}());