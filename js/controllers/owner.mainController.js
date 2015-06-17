(function(){
	'use strict';
	function controller($scope, updateService, modalService){
		this.$scope = $scope;
		this.updateService = updateService;
		this.modalService = modalService;
		this.init();
	}
	controller.prototype = baseController;

	controller.$inject = ['$scope', 'owner.service', 'modalService'];
	MetronicApp.controller('owner.mainController', controller);
}());