(function(){
    'use strict';
    function controller($scope, updateService, $stateParams, config){
        this.$scope = $scope;
        this.$stateParams = $stateParams;
        this.updateService = updateService;
        this.init = function(){
            this.super('init');
            this.$scope.dataList = config.goodsType;
        }
        this.init();
    }
    controller.prototype = baseController;

    controller.$inject = ['$scope', 'vendor.service', '$stateParams', 'config'];
    MetronicApp.controller('vendor.add.mainController', controller);
}());