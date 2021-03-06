(function(){
    'use strict';
    function controller($scope, $stateParams, updateService, config, vehicleService, vendorService){
        var self = this;
        this.$scope = $scope;
        this.$stateParams = $stateParams;
        this.updateService = updateService;
        this.init = function(){            
            this.super('init');
            vehicleService.get().then(this.onDataLoaded);
            vendorService.get().then(this.onDataLoaded);
        }
        this.onDataLoaded = function(){
            self.$scope.isLabour = (self.$scope.model.dataModel.labourList.length>0);
            self.$scope.isSpare = (self.$scope.model.dataModel.spareList.length>0);
            if(self.$scope.model.dataModel.vehicleId && self.$scope.vehicle.model.dataItemById.length>0){
                self.$scope.vehicle.selectedItem = self.$scope.vehicle.model.dataItemById[self.$scope.model.dataModel.vehicleId];
                self.$scope.vehicle.vehicleNo = self.$scope.vehicle.selectedItem.vehicleNo;
            }
            if(self.$scope.model.dataModel.dealerId && self.$scope.dealer.model.dataItemById.length>0){
                self.$scope.dealer.selectedItem = self.$scope.dealer.model.dataItemById[self.$scope.model.dataModel.dealerId];
                self.$scope.dealer.selectedName = self.$scope.dealer.selectedItem.companyName;
            }
        }
        this.defineScope = function(){
            var self = this;

            this.super('defineScope');

            this.$scope.vehicle = {
                vehicleNo:'',
                selectedItem: '',
                model:vehicleService.model
            };

            this.$scope.dealer = {
                selectedName:'',
                selectedItem: '',
                model:vendorService.model
            };

            this.$scope.isLabour = false;
            this.$scope.isSpare = false;

            this.$scope.workOrderList = config.workorderList;
            this.$scope.paymentList = config.paymentList;

            this.$scope.addSpare = function(){
                self.$scope.model.dataModel.spareList.push(self.updateService.getSpareScope());
            }
            this.$scope.deleteSpare = function(index){
                self.$scope.model.dataModel.spareList.splice(index, 1);
            }
            this.$scope.addLabour = function(){
                self.$scope.model.dataModel.labourList.push(self.updateService.getLabourScope());
            }
            this.$scope.deleteLabour = function(index){
                self.$scope.model.dataModel.labourList.splice(index, 1);
            }
            this.$scope.totalSpareAmount = function (){
                var total = 0;
                angular.forEach(self.$scope.model.dataModel.spareList, function(item){
                    total += item.rate*item.quantity;
                });
                return total;
            }
            this.$scope.updateDetails = function(){                
                self.$scope.model.dataModel.vehicleId = self.$scope.vehicle.selectedItem.id;
                self.$scope.model.dataModel.dealerId = self.$scope.dealer.selectedItem.id;
                self.updateService.add(self.$scope.model.dataModel);
            }

            this.$scope.swapLabour = function(){
                if(self.$scope.model.dataModel.labourList.length>0){
                    self.$scope.model.dataModel.labourList = [];
                }else{
                    self.$scope.model.dataModel.labourList.push(updateService.getLabourScope());
                }
                self.$scope.isLabour = (self.$scope.model.dataModel.labourList.length>0);
            }

            this.$scope.swapSpare = function(){
                if(self.$scope.model.dataModel.spareList.length>0){
                    self.$scope.model.dataModel.spareList = [];
                }else{
                    self.$scope.model.dataModel.spareList.push(updateService.getSpareScope());
                }
                self.$scope.isSpare = (self.$scope.model.dataModel.spareList.length>0);
            }
        }
        this.init();
    }
    controller.prototype = baseController;

    controller.$inject = ['$scope', '$stateParams', 'workorder.service', 'config', 'vehicle.service','vendor.service'];
    MetronicApp.controller('workorder.add.mainController', controller);
}());