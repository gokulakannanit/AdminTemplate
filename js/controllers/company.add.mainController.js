(function(){
    'use strict';
    function controller($scope, updateService, $stateParams){
        this.$scope = $scope;
        this.$stateParams = $stateParams;
        this.updateService = updateService;
        this.init = function(){
            this.super('init');
            this.$scope.selectedTags = [];
            this.$scope.companyType = [{label:"Sole Propriteship", value:"S"}, {label:"Partnership", value:"P"}];
        }
        this.init();
    }
    controller.prototype = baseController;

    controller.$inject = ['$scope', 'company.service', '$stateParams'];
    MetronicApp.controller('company.add.mainController', controller);
}());