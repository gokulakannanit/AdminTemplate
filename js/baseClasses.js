var baseService = {
    isLoadedFromService: false,
    parentId:'',  
    init:function(){
        this.model = {
        	mainList:[],
            dataList:[],
            dataModel:this.getScope(),
            dataItemById:[]
        }
    },
    getArrayById: function() {
        var itemObj = [];
        angular.forEach(this.model.dataList, function(item) {
            itemObj[item.id] = item.name;
        });
        return itemObj;
    },
    getById: function(editId) {
        var itemObj = {};
        angular.forEach(this.model.dataList, function(item) {
            if (item.id === editId) {
                itemObj = item;
            }
        });
        return itemObj;
    },
    getByForeignKey: function(){
    	var self = this, setting, httpCall;    	
    	if(!this.model.mainList[self.parentId]){
    		setting = {
                method: 'GET',
                url: this.SERVICE_URL.GET_URL+'?' + this.filter + '='+ self.parentId
            };
            httpCall = this.$http(setting);
            httpCall.success(function(data) {
            	self.model.mainList[self.parentId] = data;
                self.model.dataList = data;               
            });
    	}else{
    		if(!self.editId){
    			self.model.dataList = self.model.mainList[self.parentId];	
    		}else{
    			self.model.dataModel = self.getById(self.editId);
    		}    		
    	}
    },
    get: function() {
        var self = this, setting, httpCall;        
        if(this.filter){
        	self.parentId = arguments[0];
            if(arguments.length>1){
                self.editId = arguments[1];
            }
        	self.getByForeignKey();
        }else{
        	if (!this.isLoadedFromService) {
                self.editId = arguments[0];
        		setting = {
	                method: 'GET',
	                url: this.SERVICE_URL.GET_URL
	            };
	            httpCall = this.$http(setting);
	            httpCall.success(function(data) {
	                self.isLoadedFromService = true;
	                self.model.dataList = data;	                
	                self.model.dataItemById = self.getArrayById();
                    if(self.editId){
                        self.model.dataModel = self.getById(self.editId);
                        console.log(self.editId,' : ', self.model.dataModel);
                    }
	            });
        	}else{                
        		self.model.dataModel = self.getById(self.editId);
                console.log('75 : ',self.editId,' : ', self.model.dataModel);
        	}
        }
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
    	if(data[this.filter]){
    		data[this.filter] = self.parentId;
    	}
        var self = this,
            setting = {
                method: 'POST',
                url: this.SERVICE_URL.ADD_URL,
                data: data
            }
        var httpCall = this.$http(setting);
        httpCall.success(function() {
            self.reloadData();
            self.alertService.add("success", "Record added Successfully..");
            if (self.$state) {
                self.$state.go(self.REDIRECT_STATE);
            }else{
                this.model.dataModel = this.getScope();
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
        	this.isLoadedFromService = false;
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
    loadData: function() {
        if ((this.$scope.$parent.editId && this.isForeignKey)) {
        	if(this.$scope.editId){
                console.log('here in 138');
        		this.updateService.get(this.$scope.$parent.editId, this.$scope.editId);
        	}else{
                console.log('here in 141');
        		this.updateService.get(this.$scope.$parent.editId);
        	}            
        } else{            
            if(this.$scope.editId){
                console.log('here in 147', this.$scope.editId);
                this.updateService.get(this.$scope.editId);
            }else{
                console.log('here in 150');
                this.updateService.get();  
            }            
        }
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