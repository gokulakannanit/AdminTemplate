'use strict';
MetronicApp.factory('owner.service', ['$http', '$q', '$state', 'alertService', function($http, $q, $state, alertService){
	return {
		get: function(editId){
			var deferred = $q.defer();
			$http.get('api/owner/getDetails.php?id='+editId).success(function(data){
				deferred.resolve(data);
			})
			return deferred.promise;
		},
		getOwnerList:function(data){
			var deferred = $q.defer();
			this.get("all").then(function(data){
				var arr = [];
				angular.forEach(data, function(item) {
		            this.push({"id":item.id,"name":item.name});
		        }, arr);
		        deferred.resolve(arr);
			})
	        return deferred.promise;
		},
		add: function(data){
			var deferred = $q.defer();
			$http.post('api/owner/addDetails.php', data).success(function(data){
				alertService.add("success", "Record added Successfully..");				
				$state.go('owner');
				deferred.resolve('');
			}).error(function(){
				alertService.add("danger", "Record not added, please try again later");
				deferred.reject('');
			});
			return deferred.promise;
		},
		delete: function(data){
			var deferred = $q.defer();
			$http.post('api/owner/deleteRecord.php', data).success(function(data){
				alertService.add("success", "Record deleted Successfully..");
				deferred.resolve('');
			}).error(function(){
				alertService.add("danger", "Record not deleted, please try again later");
				deferred.reject('');
			});
			return deferred.promise;
		}
	}
}]);
