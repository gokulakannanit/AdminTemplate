'use strict';

MetronicApp.controller('vehicle.spare.mainController', ['$scope', 'vehicle.spare.service', 'modalService',
    function($scope, updateService, modalService) {
        
        $scope.$on('$viewContentLoaded', function() {
            // initialize core components
            Metronic.initAjax();
            init();
        });

        function getSpare(){
            updateService.get("all").then(function(data){
                var arr = [];
                angular.forEach(data, function(item){
                    if(item.vehicleId === $scope.$parent.editId){
                        arr.push(item);
                    }
                })
                $scope.spareList = arr;
                console.log($scope.spareList);
            });
        }

        function clearData(){
            $scope.model = {
                purchaseDate:new Date(),
                companyName:'',
                policyNo:'',
                amount:'',
                coverageLimit:'',
                paymentMode:'Cash',
                vehicleId:$scope.$parent.editId
            };
        }
        
        function init(){
            $scope.paymentList = [{label:"Online", value:"Online"}, {label:"Cash", value:"Cash"}, {label:"Cheque / DD", value:"Cheque"}];
            clearData();
            getSpare();
        }

        $scope.confirmDelete = function(id){
            var promise = modalService.show({type:'confirm', action:'delete', heading:'Are you sure want to delete ?', message:'Record will be deleted from Database'});
            promise.then(function(data){
                if(data.confirmed){
                    updateService.delete({id:id}).then(getSpare);
                }
            });
        };

        $scope.edit = function(id){
            updateService.get(id).then(function(data){
                $scope.model = data[0];
            })
        }

        $scope.updateDetails = function() {
            updateService.add($scope.model).then(function(){
                clearData();
                getSpare();
            });
        }

        $scope.reset = function(){
            $scope.form.$setPristine();
        } 

    }
]);