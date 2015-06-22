(function(){
    'use strict';
    function controller($scope, updateService){
        this.$scope = $scope;
        this.updateService = updateService;
        this.isForeignKey = true;
        this.init = function(){
            this.super('init');

            this.$scope.makeList = [{title:'Tata', value:'Tata'}, {title:'Leyland', value:'Leyland'}];
            
            this.$scope.ownerShiptype = [{label:"Own", value:"own"}, {label:"Hired", value:"hired"}];
        }
        this.init();
    }
    controller.prototype = baseController;

    controller.$inject = ['$scope', 'vehicle.service'];
    MetronicApp.controller('vehicle.basic.mainController', controller);
}());