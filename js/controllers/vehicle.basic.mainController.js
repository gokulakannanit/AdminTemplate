(function(){
    'use strict';
    function controller($scope, updateService, $stateParams, config){
        this.$scope = $scope;
        this.updateService = updateService;

        this.init = function(){
            this.$scope.editId = $stateParams.editId;

            this.$scope.ownershipList = config.ownershipList;                   

            this.$scope.makeList = config.makeList;

            this.$scope.fuelList = config.fuelList;

            this.$scope.typeList = config.typeList;    

            this.super('init');
        }
        this.init();
    }
    controller.prototype = baseController;

    controller.$inject = ['$scope', 'vehicle.service', '$stateParams', 'config'];
    MetronicApp.controller('vehicle.basic.mainController', controller);
}());