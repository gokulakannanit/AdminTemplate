'use strict';

MetronicApp.controller('vehicle.tyre.mainController', ['$scope', 'vehicle.tyre.service', 'modalService',
    function($scope, updateService, modalService) {

        $scope.$on('$viewContentLoaded', function() {
            // initialize core components
            Metronic.initAjax();
            init();
        });

        function gettyre() {
            updateService.get("all").then(function(data) {
                var arr = [];
                angular.forEach(data, function(item) {
                    if (item.vehicleId === $scope.$parent.editId) {
                        arr.push(item);
                    }
                })
                $scope.tyreList = arr;
            });
        }

        function clearData() {
            $scope.model = {
                paymentMode:'Cash',
                date: new Date(),
                make: '',
                tyreNo: '',
                position: '',
                dealer: '',
                warrentyDate: '',
                price: '',
                receiptNo: '',
                vehicleId: $scope.$parent.editId
            };
        }

        function init() {
            $scope.paymentList = [{
                label: "Online",
                value: "Online"
            }, {
                label: "Cash",
                value: "Cash"
            }, {
                label: "Cheque / DD",
                value: "Cheque"
            }];
            $scope.makeList = [{
                id: 'MRF',
                name: 'MRF'
            }, {
                id: 'Tyre1',
                name: 'Tyre1'
            }];
            $scope.tyrePositionList = [{
                id: 'FL',
                name: 'Front Left'
            }, {
                id: 'FR',
                name: 'Front Right'
            }, {
                id: 'BL1',
                name: 'Back Left1'
            }, {
                id: 'BL2',
                name: 'Back Left2'
            }, {
                id: 'BR1',
                name: 'Back Right1'
            }, {
                id: 'BR2',
                name: 'Back Right2'
            }];
            $scope.vendorList = [{id:'dealer1', name:'Dealer 1'}];
            clearData();
            gettyre();

        }


        $scope.confirmDelete = function(id) {
            var promise = modalService.show({
                type: 'confirm',
                action: 'delete',
                heading: 'Are you sure want to delete ?',
                message: 'Record will be deleted from Database'
            });
            promise.then(function(data) {
                if (data.confirmed) {
                    updateService.delete({
                        id: id
                    }).then(gettyre);
                }
            });
        };

        $scope.edit = function(id) {
            updateService.get(id).then(function(data) {
                $scope.model = data[0];
            })
        }

        $scope.updateDetails = function() {
            updateService.add($scope.model).then(function() {
                clearData();
                gettyre();
            });
        }

        $scope.reset = function() {
            $scope.form.$setPristine();
        }

    }
]);