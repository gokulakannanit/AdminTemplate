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
            	if(self.$scope.selectedTags.length>0){
            		var id_str = '';
            		angular.forEach(self.$scope.selectedTags, function(item){
						id_str += item.id+",";
            		})            		
            		self.$scope.model.dataModel.owner = String(id_str).substr(0, id_str.length-2);;
            		// console.log(id_str);
            	}else{
            		self.$scope.model.dataModel.owner = self.$scope.owner.selecteditem.id;
            	}
                self.updateService.add(self.$scope.model.dataModel);
            }
        }
        
        this.onDataLoaded = function(){
            if(self.$scope.model.dataModel.owner && self.$scope.owner.source.dataItemById.length>0){
                if(self.$scope.model.dataModel.typeOfCompany === 'P'){
                    self.$scope.selectedTags = [];
                    angular.forEach(self.$scope.model.dataModel.owner.split(','), function(item){
                        if(self.$scope.owner.source.dataItemById[item]){
                            self.$scope.selectedTags.push(self.$scope.owner.source.dataItemById[item]);
                        }                        
                    })
                }else{
                    self.$scope.owner.selecteditem = self.$scope.owner.source.dataItemById[self.$scope.model.dataModel.owner];
                    if(self.$scope.owner.selecteditem){
                       self.$scope.owner.name = self.$scope.owner.selecteditem.name; 
                    }
                }
            }
            
        }
        this.init();
    }
    controller.prototype = baseController;

    controller.$inject = ['$scope', '$stateParams', 'company.service', 'owner.service'];
    MetronicApp.controller('company.add.mainController', controller);
}());