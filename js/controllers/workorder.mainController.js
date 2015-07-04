(function(){
    'use strict';
    function controller($scope, updateService, $stateParams, vehicleService){
        var self = this;
        this.$scope = $scope;
        this.$stateParams = $stateParams;
        this.updateService = updateService;
        this.vehicleService = vehicleService;
        this.init = function(){
        	this.super('init');
        	this.vehicleService.get();
        }

        this.defineScope = function(){
            this.super('defineScope');
            this.$scope.vehicle = this.vehicleService.model;
            this.$scope.totalSpareAmount = function (dataModel){
                var total = 0;
                angular.forEach(dataModel.spareList, function(item){
                    total += item.rate*item.quantity;
                });
                return total;
            }
        }
        this.init();
    }
    controller.prototype = baseController;

    controller.$inject = ['$scope', 'workorder.service', 'modalService', 'vehicle.service'];
    MetronicApp.controller('workorder.mainController', controller);
}());