(function(){
    'use strict';
    function controller($scope, updateService, $stateParams){
        this.$scope = $scope;
        this.updateService = updateService;

        this.init = function(){
            this.$scope.editId = $stateParams.editId;

            this.$scope.ownershipList = [{label:"Own", value:"own"}, {label:"Hired", value:"hired"}];                   

            this.$scope.makeList = [{title:'Tata', value:'Tata'}, {title:'Leyland', value:'Leyland'}];

            this.$scope.fuelList = [{title:"Diesel", value:"Diesel"}, {title:"Petrol", value:"Petrol"}, {title:"Gas", value:"Gas"}];

            this.$scope.typeList = [{title:"LCV", value:"LCV"}, {title:"HCV", value:"HCV"}];    

            this.super('init');
        }
        this.init();
    }
    controller.prototype = baseController;

    controller.$inject = ['$scope', 'vehicle.service', '$stateParams'];
    MetronicApp.controller('vehicle.basic.mainController', controller);
}());