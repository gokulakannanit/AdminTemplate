(function(){
    'use strict';
    function controller($scope, updateService, $stateParams){
        this.$scope = $scope;
        this.updateService = updateService;

        this.init = function(){
            this.$scope.editId = $stateParams.editId;

            this.$scope.ownershipList = [{label:"Own", value:"own"}, {label:"Hired", value:"hired"}];                   

            this.$scope.makeList = [{id:'Tata', label:'Tata'}, {id:'Leyland', label:'Leyland'}];

            this.$scope.fuelList = [{id:"Diesel", label:"Diesel"}, {id:"Petrol", label:"Petrol"}, {id:"Gas", label:"Gas"}];

            this.$scope.typeList = [{id:"LCV", label:"LCV"}, {id:"HCV", label:"HCV"}];    

            this.super('init');
        }
        this.init();
    }
    controller.prototype = baseController;

    controller.$inject = ['$scope', 'vehicle.service', '$stateParams'];
    MetronicApp.controller('vehicle.basic.mainController', controller);
}());