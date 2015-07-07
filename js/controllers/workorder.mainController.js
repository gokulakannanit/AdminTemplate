(function(){
    'use strict';
    function controller($scope, updateService, modalService, vehicleService, vendorService){
        var self = this;
        this.$scope = $scope;
        this.modalService = modalService;
        this.updateService = updateService;
        this.init = function(){
        	this.super('init');
        	vehicleService.get();
            vendorService.get();
        }

        this.defineScope = function(){
            this.super('defineScope');
            this.$scope.vehicle = vehicleService.model;
            this.$scope.dealer = vendorService.model;
            this.$scope.totalAmount = function (dataModel){
                var total = 0;
                angular.forEach(dataModel.spareList, function(item){
                    total += item.rate*item.quantity;
                });
                angular.forEach(dataModel.labourList, function(item){
                    total += Number(item.amount);
                });
                return total;
            }
        }
        this.init();
    }
    controller.prototype = baseController;

    controller.$inject = ['$scope', 'workorder.service', 'modalService', 'vehicle.service','vendor.service'];
    MetronicApp.controller('workorder.mainController', controller);
}());