var baseService = {
    isLoadedFromService: false,    
    init:function(){
        this.model = {
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
    get: function() {
        var self = this, URL;
        if (!this.isLoadedFromService) {
            URL = this.SERVICE_URL.GET_URL;
            console.log('arguments.length : ', arguments.length);
            if(arguments.length > 1){
               URL = URL +'?' + this.filter + '='+ arguments[0];
            }/**/
            var setting = {
                method: 'GET',
                url: URL
            }
            var httpCall = this.$http(setting);
            httpCall.success(function(data) {
                self.isLoadedFromService = true;
                self.model.dataList = data;
                if(arguments.length === 1){
                    self.model.dataModel = self.getById(arguments[0]);
                }
                self.model.dataItemById = self.getArrayById();                
            }).error(function() {

            });
        } else {
            self.model.dataModel = self.getById(arguments[0]);
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
            self.get();
            self.alertService.add("success", "Record deleted Successfully..");
        }).error(function() {
            self.alertService.add("danger", "Record not deleted, please try again later");
        });
        return httpCall;
    },
    add: function(data) {
        var self = this,
            setting = {
                method: 'POST',
                url: this.SERVICE_URL.ADD_URL,
                data: data
            }
        var httpCall = this.$http(setting);
        httpCall.success(function() {
            self.get();
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
    }
};


var baseController = {
    isForeignKey: false,
    init: function() {
        this.defineListeners();
        this.defineScope();
        this.loadData();
    },
    loadData: function() {
        if (this.$scope.editId && !this.isForeignKey) {
            this.updateService.get(this.$scope.editId);
        } else if(this.isForeignKey) {
            this.updateService.get(this.$scope.editId, 'filter');
        }else{
            this.updateService.get();
        }
    },
    defineListeners: function() {
        this.$scope.$on('$viewContentLoaded', function() {
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
            self.updateService.add(self.$scope.model.dataModel);
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