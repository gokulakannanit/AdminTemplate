(function(){
    'use strict';
    function controller($scope, updateService, $stateParams){
        this.$scope = $scope;
        this.$stateParams = $stateParams;
        this.updateService = updateService;
        this.init();
    }
    controller.prototype = baseController;

    controller.$inject = ['$scope', 'client.service', '$stateParams'];
    MetronicApp.controller('client.add.mainController', controller);
}());