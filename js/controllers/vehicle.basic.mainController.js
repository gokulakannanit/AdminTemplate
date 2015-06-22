(function(){
    'use strict';
    function controller($scope, updateService, $stateParams){
        this.$scope = $scope;
        this.updateService = updateService;

        this.init = function(){
            this.$scope.editId = $stateParams.editId;                        

            this.$scope.makeList = [{title:'Tata', value:'Tata'}, {title:'Leyland', value:'Leyland'}];
            
            this.$scope.ownerShiptype = [{label:"Own", value:"own"}, {label:"Hired", value:"hired"}];

            this.super('init');
        }
        this.init();
    }
    controller.prototype = baseController;

    controller.$inject = ['$scope', 'vehicle.service', '$stateParams'];
    MetronicApp.controller('vehicle.basic.mainController', controller);
}());