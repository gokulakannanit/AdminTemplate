var baseService = {
    parentId:'',  
    init:function(){
        this.model = {
        	mainList:[],
            dataList:[],
            dataModel:this.getScope(),
            dataItemById:[],
            isDataLoaded:false
        }
    },
    getArrayById: function() {
        var itemObj = [];
        angular.forEach(this.model.dataList, function(item) {
            itemObj[item.id] = item;
        });
        return itemObj;
    },
    getById: function(editId) {
        var itemObj = {};
        angular.forEach(this.model.dataList, function(item) {
            if (item.id === editId) {
                itemObj = angular.copy(item);
            }
        });
        return itemObj;
    },
    getByLabelCategory: function(lblValue) {
        var self = this,
            key = self.labelCategory,
            itemObj = [];

            if(key != undefined) {
                angular.forEach(self.model.dataList, function(item) {
                    if(item[key] === lblValue) {
                        itemObj.push(item);
                    }
                });
            }
        return itemObj;
    },
    getByForeignKey: function(defer){
    	var self = this, setting, httpCall;    	
    	if(!this.model.mainList[self.parentId]){
    		setting = {
                method: 'GET',
                url: this.SERVICE_URL.GET_URL+'?' + this.filter + '='+ self.parentId
            };
            httpCall = this.$http(setting);
            httpCall.success(function(data) {
                self.model.isDataLoaded = true;
            	self.model.mainList[self.parentId] = data;
                self.model.dataList = data;
                defer.resolve();
            });
    	}else{
    		if(!self.editId){
    			self.model.dataList = self.model.mainList[self.parentId];
                self.model.isDataLoaded = true;	
    		}else{
    			self.model.dataModel = self.getById(self.editId);
    		}   
            defer.resolve(); 		
    	}
    },
    get: function() {
        var self = this, setting, httpCall, defer;
        defer = this.$q.defer();
        if(this.filter){
        	self.parentId = arguments[0];
            if(arguments.length>1){
                self.editId = arguments[1];
            }
        	self.getByForeignKey(defer);
        }else{
            self.editId = arguments[0];
            self.model.dataModel = this.getScope();
        	if (!self.model.isDataLoaded) {         
        		setting = {
	                method: 'GET',
	                url: this.SERVICE_URL.GET_URL
	            };
	            httpCall = this.$http(setting);
	            httpCall.success(function(data) {
	                self.model.isDataLoaded = true;
                    console.log('isDataLoaded: ',self.model.isDataLoaded);
	                self.model.dataList = data;	                
	                self.model.dataItemById = self.getArrayById();
                    if(self.editId){
                        self.model.dataModel = self.getById(self.editId);
                    }
                    defer.resolve();
	            });
        	}else{
                if(self.editId){           
        	       	self.model.dataModel = self.getById(self.editId);
                }                
                defer.resolve();
        	}
        }
        return defer.promise;
    },
    delete: function(data) {
        var self = this,
            setting = {
                method: 'POST',
                url: this.SERVICE_URL.DELETE_URL,
                data: data
            }
        var httpCall = this.$http(setting);
        httpCall.success(function() {
            self.reloadData();         
            self.alertService.add("success", "Record deleted Successfully..");
            this.model.dataModel = this.getScope();
        }).error(function() {
            self.alertService.add("danger", "Record not deleted, please try again later");
        });
        return httpCall;
    },
    add: function(data) { 
        if(data[this.filter] === ''){
            data[this.filter] = this.parentId;
        }  	
        var self = this,
            setting = {
                method: 'POST',
                url: this.SERVICE_URL.ADD_URL,
                data: data
            }

            console.log(setting)
        var httpCall = this.$http(setting);
        httpCall.success(function() {
            self.reloadData();
            self.alertService.add("success", "Record added Successfully..");
            console.log(self.REDIRECT_STATE);
            if (self.REDIRECT_STATE) {
                self.$state.go(self.REDIRECT_STATE);
            }else{
                self.model.dataModel = self.getScope();
            }
        }).error(function() {
            self.alertService.add("danger", "Record not added, please try again later");
        });
        return httpCall;
    },
    reloadData: function(){    	
        if(this.parentId !== ''){
        	this.model.mainList[this.parentId] = null;
			this.get(this.parentId);
        }else{
        	this.model.isDataLoaded = false;
        	this.get();
        } 
    }
};


var baseController = {
    isForeignKey: false,
    init: function() {
        this.defineScope();
        this.loadData();
    },
    onDataLoaded: function(){
       
    },
    loadData: function() {
        var defer, self = this;
        if ((this.$scope.$parent.editId && this.isForeignKey)) {
        	if(this.$scope.editId){
        		defer = this.updateService.get(this.$scope.$parent.editId, this.$scope.editId);
        	}else{
        		defer = this.updateService.get(this.$scope.$parent.editId);
        	}            
        } else{            
            if(this.$scope.editId){
                defer = this.updateService.get(this.$scope.editId);
            }else{
                defer = this.updateService.get();  
            }            
        }
        defer.then(function(){
            self.onDataLoaded.apply(self);            
        });
    },
    defineScope: function() {
        var self = this;
        if (this.$stateParams) {
            this.$scope.editId = this.$stateParams.editId;
        }
        this.$scope.model = this.updateService.model;
        this.$scope.confirmDelete = function(id) {
            var dataObj = {
                type: 'confirm',
                action: 'delete',
                heading: 'Are you sure want to delete ?',
                message: 'Record will be deleted from Database'
            }
            var promise = self.modalService.show(dataObj);
            promise.then(function(data) {
                if (data.confirmed) {
                    self.deleteRecord(id);
                }
            });
        };
        this.$scope.updateDetails = function() {
            self.$scope.editId = null;
            self.updateService.add(self.$scope.model.dataModel);
        };
        this.$scope.edit = function(editId){
            self.$scope.editId = editId;
            self.loadData();
        };
        this.$scope.reset = function() {
            self.init();
            self.$scope.form.$setPristine();
        };
    },
    deleteRecord: function(id) {
        this.updateService.delete({
            id: id
        });
    },
    super: function(str) {
        baseController[str].call(this);
    }
}