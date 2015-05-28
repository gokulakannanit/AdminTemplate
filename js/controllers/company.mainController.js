'use strict';

MetronicApp.controller('company.mainController',['$scope', 'company.service', 'owner.service', 'modalService',
	function($scope, updateService, ownerService, modalService) {
    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        Metronic.initAjax();
        init();
    });

    function updateList(data){
		$scope.companyList = data;
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

    function init(){
		$scope.companyList = [];
		$scope.ownerListData = [];
		ownerService.getOwnerList().then(function(data){
			var ownerlist = {};
			angular.forEach(data, function(item) {
		        ownerlist[item.id] = item.name;
		    });
	        $scope.ownerListData = ownerlist;
	        console.log($scope.ownerListData);
	    });
		updateService.get('all').then(updateList);
	}

}]);