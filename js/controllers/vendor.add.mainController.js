(function(){
    'use strict';
    function controller($scope, updateService, $stateParams){
        this.$scope = $scope;
        this.$stateParams = $stateParams;
        this.updateService = updateService;
        this.init = function(){
            this.super('init');
            this.$scope.dataList = [{
                id: 'Battery',
                name: 'Battery'
            }, {
                id: 'Electricals',
                name: 'Electricals'
            }, {
                id: 'Spare Parts',
                name: 'Spare Parts'
            }, {
                id: 'Tyre',
                name: 'Tyre'
            }];
        }
        this.init();
    }
    controller.prototype = baseController;

    controller.$inject = ['$scope', 'vendor.service', '$stateParams'];
    MetronicApp.controller('vendor.add.mainController', controller);
}());