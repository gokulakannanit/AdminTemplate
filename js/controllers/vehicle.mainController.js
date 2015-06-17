(function(){
	'use strict';
	function controller($scope, updateService, modalService){
		this.$scope = $scope;
		this.updateService = updateService;
		this.modalService = modalService;
		this.init();
	}
	controller.prototype = baseController;

	controller.$inject = ['$scope', 'vehicle.service', 'modalService'];
	MetronicApp.controller('vehicle.mainController', controller);
}());