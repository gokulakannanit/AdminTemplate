'use strict';
MetronicApp.factory('client.service', ['$http', '$q', '$state', 'alertService', function($http, $q, $state, alertService){
	return {
		get: function(editId){
			var deferred = $q.defer();
			$http.get('api/client/getDetails.php?id='+editId).success(function(data){
				deferred.resolve(data);
			})
			return deferred.promise;
		},
		add: function(data){
			var deferred = $q.defer();
			$http.post('api/client/addDetails.php', data).success(function(data){
				alertService.add("success", "Record added Successfully..");				
				$state.go('client');
				deferred.resolve('');
			}).error(function(){
				alertService.add("danger", "Record not added, please try again later");
				deferred.reject('');
			});
			return deferred.promise;
		},
		delete: function(data){
			var deferred = $q.defer();
			$http.post('api/client/deleteRecord.php', data).success(function(data){
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
