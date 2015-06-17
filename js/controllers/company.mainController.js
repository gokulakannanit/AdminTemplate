(function(){
    'use strict';
    function controller($scope, updateService, $stateParams, ownerService){
        this.$scope = $scope;
        this.$stateParams = $stateParams;
        this.updateService = updateService;
        this.ownerService = ownerService;
        this.init = function(){
        	this.super('init'); 	
        	this.$scope.ownerListData = this.ownerService.model;
        	this.ownerService.get();
        }
        this.init();
    }
    controller.prototype = baseController;

    controller.$inject = ['$scope', 'company.service', 'modalService', 'owner.service'];
    MetronicApp.controller('company.mainController', controller);
}());