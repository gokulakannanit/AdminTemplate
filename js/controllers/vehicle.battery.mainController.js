'use strict';

MetronicApp.controller('vehicle.battery.mainController', ['$scope', 'vehicle.battery.service', 'modalService',
    function($scope, updateService, modalService) {

        $scope.$on('$viewContentLoaded', function() {
            // initialize core components
            Metronic.initAjax();
            init();
        });

        function getBattery() {
            updateService.get("all").then(function(data) {
                var arr = [];
                angular.forEach(data, function(item) {
                    if (item.vehicleId === $scope.$parent.editId) {
                        arr.push(item);
                    }
                })
                $scope.batteryList = arr;
            });
        }

        function clearData() {
            $scope.model = {
                paymentMode:'Cash',
                date: new Date(),
                make: '',
                batteryNo: '',
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
                id: 'make1',
                name: 'Make 1'
            }, {
                id: 'make2',
                name: 'Make 2'
            }];
            
            $scope.vendorList = [{id:'dealer1', name:'Dealer 1'}];
            clearData();
            getBattery();

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
                    }).then(getBattery);
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
                getBattery();
            });
        }

        $scope.reset = function() {
            $scope.form.$setPristine();
        }

    }
]);