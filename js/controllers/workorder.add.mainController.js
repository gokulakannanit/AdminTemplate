(function(){
    'use strict';
    function controller($scope, $stateParams, updateService, config, vehicleService, vendorService){
        var self = this;
        this.$scope = $scope;
        this.$stateParams = $stateParams;
        this.updateService = updateService;
        this.init = function(){            
            this.super('init');
            vehicleService.get();
            vendorService.get();
        }
        this.defineScope = function(){
            var self = this;

            this.super('defineScope');

            this.$scope.vehicle = {
                vehicleNo:'',
                selectedItem: '',
                model:vehicleService.model
            }
            this.$scope.dealer = {
                selectedName:'',
                selectedItem: '',
                model:vendorService.model
            }

            this.$scope.workOrderList = config.workorderList;
            this.$scope.paymentList = config.paymentList;

            this.$scope.addSpare = function(){
                self.$scope.model.dataModel.spareDetail.push(self.updateService.getSpareScope());
            }
            this.$scope.deleteSpare = function(index){
                self.$scope.model.dataModel.spareDetail.splice(index, 1);
            }
        }
        this.init();
    }
    controller.prototype = baseController;

    controller.$inject = ['$scope', '$stateParams', 'workorder.service', 'config', 'vehicle.service','vendor.service'];
    MetronicApp.controller('workorder.add.mainController', controller);
}());