(function(){
    'use strict';
    function controller($scope, updateService, modalService){
        this.$scope = $scope;
        this.updateService = updateService;
        this.modalService = modalService;
        this.isForeignKey = true;
        this.init = function(){
            this.super('init');
        }
        this.init();
    }
    controller.prototype = baseController;

    controller.$inject = ['$scope', 'manage.manufacturer.service', 'modalService'];
    MetronicApp.controller('manage.manufacturer.mainController', controller);
}());