(function(){
    'use strict';
    function controller($scope, $stateParams, updateService, config, vehicleService){
        var self = this;
        this.$scope = $scope;
        this.$stateParams = $stateParams;
        this.updateService = updateService;
        this.init = function(){            
            this.super('init');

            this.$scope.vehicle = {
                vehicleNo:'',
                selectedItem: '',
                model:vehicleService.model
            }
            vehicleService.get();

            this.$scope.workOrderList = config.workorderList;
            this.$scope.paymentList = config.paymentList;
        }
        this.defineScope = function(){
            this.super('defineScope');
            this.$scope.addSpare = function(){
                this.$scope.model.dataModel.spareDetail.push(this.getSpareScope());
            }
            this.$scope.deleteSpare = function(index){
                this.$scope.model.dataModel.spareDetail.splice(index, 1);
            }
        }
        this.init();
    }
    controller.prototype = baseController;

    controller.$inject = ['$scope', '$stateParams', 'workorder.service', 'config', 'vehicle.service'];
    MetronicApp.controller('workorder.add.mainController', controller);
}());