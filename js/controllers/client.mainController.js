'use strict';

MetronicApp.controller('client.mainController',['$scope', 'client.service', 'modalService',
	function($scope, updateService, modalService) {
    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        Metronic.initAjax();
        init();
    });

    function updateList(data){
		$scope.clientList = data;
	}	
	function init(){
		$scope.clientList = [];
		updateService.get('all').then(updateList);
	}

	function deleteRecord(id){
		updateService.delete({id:id}).then(init);
	}

	$scope.confirmDelete = function(id){
		var promise = modalService.show({type:'confirm', action:'delete', heading:'Are you sure want to delete ?', message:'Record will be deleted from Database'});
		promise.then(function(data){
			if(data.confirmed){
				deleteRecord(id);
			}
		});
	};

}]);