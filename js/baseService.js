var baseService = {
    isLoadedFromService: false,
    getArrayById: function(){
        var itemObj = [];
        angular.forEach(this.model.dataList, function(item){            
            itemObj[item.id] = item.name;
        });
        return itemObj;
    },
    getById: function(editId){
        var itemObj = {};
        angular.forEach(this.model.dataList, function(item){            
            if(item.id === editId){          
                itemObj = item;
            }
        });
        return itemObj;
    },
    get: function(editId) {
        var self = this;
        if (editId === 'all' || !this.isLoadedFromService) {
            var setting = {
                method: 'GET',
                url: this.SERVICE_URL.GET_URL + "?id=all"
            }
            var httpCall = this.$http(setting);
            httpCall.success(function(data) {
                self.isLoadedFromService = true;
                self.model.dataList = data;
                self.model.dataModel = self.getById(editId);
                if(self.model.dataItemById){                    
                    self.model.dataItemById = self.getArrayById();
                }
            }).error(function() {

            });
        }else{
            self.model.dataModel = self.getById(editId);
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
        var self = this, setting = {
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
            }
        }).error(function() {
            self.alertService.add("danger", "Record not added, please try again later");
        });
        return httpCall;
    }
};