(function(){
    'use strict';
    function controller($scope, $stateParams, updateService, ownerService){
        this.$scope = $scope;
        this.$stateParams = $stateParams;
        this.updateService = updateService;
        this.init = function(){
            this.super('init');
            this.$scope.selectedTags = [];
            this.$scope.companyType = [{label:"Sole Propriteship", value:"S"}, {label:"Partnership", value:"P"}];
            this.$scope.ownerListData = ownerService.model;
            console.log(ownerService.model);
        }
        this.init();
    }
    controller.prototype = baseController;

    controller.$inject = ['$scope', '$stateParams', 'company.service', 'owner.service'];
    MetronicApp.controller('company.add.mainController', controller);
}());