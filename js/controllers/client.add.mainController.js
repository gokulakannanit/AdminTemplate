'use strict';

MetronicApp.controller('client.add.mainController', ['$scope', '$stateParams', 'client.service',
    function($scope, $stateParams, updateService) {
        
        $scope.$on('$viewContentLoaded', function() {
            // initialize core components
            Metronic.initAjax();
            init();
        });

        function init() {
            $scope.editId = $stateParams.editId;

            $scope.model = {
                companyName:'',
                address:'',
                contactPerson:'',
                email:'',
                phone:''                
            };

            if ($scope.editId) {
                updateService.get($stateParams.editId).then(function(data){
                    $scope.model = data[0];
                })
            }
        }

        $scope.updateDetails = function(){
            updateService.add($scope.model);
        }

        $scope.reset = function(){
            init();
            $scope.form.$setPristine();
        }
    }
]);