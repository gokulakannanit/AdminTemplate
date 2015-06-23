(function(){
    'use strict';
    function controller($scope, updateService, modalService){
        this.$scope = $scope;
        this.updateService = updateService;
        this.modalService = modalService;
        this.isForeignKey = true;
        this.init = function(){
            this.super('init');
            this.$scope.paymentList = [{label:"Online", value:"Online"}, {label:"Cash", value:"Cash"}, {label:"Cheque / DD", value:"Cheque"}];
            this.$scope.makeList = [{id: 'MRF', name: 'MRF'}, {id: 'Tyre1', name: 'Tyre1'}];
            this.$scope.tyrePositionList = [{id: 'FL', name: 'Front Left'}, 
                                            {id: 'FR', name: 'Front Right'}, 
                                            {id: 'BL1', name: 'Back Left1'},
                                            {id: 'BL2', name: 'Back Left2'},
                                            {id: 'BR1', name: 'Back Right1'},
                                            {id: 'BR2', name: 'Back Right2'}
                                            ];
        }
        this.init();
    }
    controller.prototype = baseController;

    controller.$inject = ['$scope', 'vehicle.tyre.service', 'modalService'];
    MetronicApp.controller('vehicle.tyre.mainController', controller);
}());