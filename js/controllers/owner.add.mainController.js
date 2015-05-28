'use strict';

MetronicApp.controller('owner.add.mainController', ['$scope', '$stateParams', 'owner.service',
    function($scope, $stateParams, updateService) {
        
        $scope.$on('$viewContentLoaded', function() {
            // initialize core components
            Metronic.initAjax();
            init();
        });

        function init() {
            $scope.editId = $stateParams.editId;

            $scope.model = {
                name: '',
                phone: '',
                address: '',
                email: '',
                pan: ''
            };

            if ($scope.editId) {
                updateService.get($stateParams.editId).then(function(data) {
                    $scope.model = data[0];
                });
            }
        }
        $scope.updateDetails = function() {
            updateService.add($scope.model);
        }

        $scope.reset = function() {
            init();
            $scope.form.$setPristine()
        }

    }
]);