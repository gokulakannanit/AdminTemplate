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
        	this.$scope.vehicleListData = this.vehicleService.model;
        	this.vehicleService.get();
        }
        this.init();
    }
    controller.prototype = baseController;

    controller.$inject = ['$scope', 'workorder.service', 'modalService', 'vehicle.service'];
    MetronicApp.controller('workorder.mainController', controller);
}());