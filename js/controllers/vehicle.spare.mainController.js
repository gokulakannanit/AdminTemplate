(function(){
    'use strict';
    function controller($scope, updateService, modalService, config){
        this.$scope = $scope;
        this.updateService = updateService;
        this.modalService = modalService;
        this.isForeignKey = true;
        this.init = function(){
            this.super('init');
            this.$scope.subList = [];
            this.$scope.paymentList = config.paymentList;            
        }
        this.init();
    }
    controller.prototype = baseController;

    controller.$inject = ['$scope', 'vehicle.spare.service', 'modalService', 'config'];
    MetronicApp.controller('vehicle.spare.mainController', controller);
}());