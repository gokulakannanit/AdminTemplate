(function(){
    'use strict';
    function controller($scope, $stateParams, updateService, ownerService){
        var self = this;
        this.$scope = $scope;
        this.$stateParams = $stateParams;
        this.updateService = updateService;
        this.init = function(){            
            this.super('init');
            this.$scope.selectedTags = [];
            this.$scope.owner = {name:'', selecteditem:{}, source:ownerService.model};
            this.$scope.companyType = [{label:"Sole Propriteship", value:"S"}, {label:"Partnership", value:"P"}];
            ownerService.get().then(this.onDataLoaded);
            this.$scope.updateDetails = function(){
                self.$scope.model.dataModel.owner = self.$scope.owner.selecteditem.id;
                self.updateService.add(self.$scope.model.dataModel);
            }
        }
        
        this.onDataLoaded = function(){
           if(self.$scope.model.dataModel.owner && self.$scope.owner.source.dataItemById.length>0){
                self.$scope.owner.selecteditem = self.$scope.owner.source.dataItemById[self.$scope.model.dataModel.owner];
                if(self.$scope.owner.selecteditem){
                   self.$scope.owner.name = self.$scope.owner.selecteditem.name; 
               }                
            } 
        }
        this.init();
    }
    controller.prototype = baseController;

    controller.$inject = ['$scope', '$stateParams', 'company.service', 'owner.service'];
    MetronicApp.controller('company.add.mainController', controller);
}());