(function(){
    'use strict';
    function controller($scope, updateService, $stateParams){
        this.$scope = $scope;
        this.$stateParams = $stateParams;
        this.updateService = updateService;
        this.init = function(){
            this.super('init');
            this.$scope.dataList = [{
                title: 'Battery',
                value: 'Battery'
            }, {
                title: 'Electricals',
                value: 'Electricals'
            }, {
                title: 'Spare Parts',
                value: 'Spare Parts'
            }, {
                title: 'Tyre',
                value: 'Tyre'
            }];
        }
        this.init();
    }
    controller.prototype = baseController;

    controller.$inject = ['$scope', 'vendor.service', '$stateParams'];
    MetronicApp.controller('vendor.add.mainController', controller);
}());