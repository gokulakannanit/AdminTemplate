(function(){
    'use strict';
    function controller($scope, updateService, modalService, manufacturerService){
        var self = this;
        this.$scope = $scope;
        this.updateService = updateService;
        this.modalService = modalService;
        this.isForeignKey = true;
        this.init = function(){
            this.super('init');
            this.$scope.manufacturer = {manufacturerName:'', selecteditem:{}, source:manufacturerService.model};
            this.$scope.truckType = [{label:"HCV", value:"HCV"}, {label:"LCV", value:"LCV"}];
            this.$scope.aircondition = [{label:"Yes", value:"Yes"}, {label:"No", value:"No"}];

            manufacturerService.get().then(this.onDataLoaded);
            this.$scope.updateDetails = function(){
                
                self.$scope.model.dataModel.manufacturerId = self.$scope.manufacturer.selecteditem.id;
                self.updateService.add(self.$scope.model.dataModel);
            }


        }

        this.onDataLoaded = function(){
            if(self.$scope.model.dataModel.manufacturerId && self.$scope.manufacturer.source.dataItemById.length>0){
                self.$scope.manufacturer.selecteditem = self.$scope.manufacturer.source.dataItemById[self.$scope.model.dataModel.manufacturerId];
                if(self.$scope.manufacturer.selecteditem){
                   self.$scope.manufacturer.manufacturerName = self.$scope.manufacturer.selecteditem.manufacturerName; 
                }
            }
            
        }

        this.init();
    }
    controller.prototype = baseController;

    controller.$inject = ['$scope', 'manage.trucks.service', 'modalService', 'manage.manufacturer.service'];
    MetronicApp.controller('manage.trucks.mainController', controller);
}());