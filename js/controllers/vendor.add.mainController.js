'use strict';

MetronicApp.controller('vendor.add.mainController', ['$scope', '$stateParams', 'vendor.service',
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
                            typeOfGoods:'',
                            contactPerson:'',
                            phone:'',           
                            address:'', 
                            email:''
                        };

             $scope.dataList =   [{id:'Battery', name:'Battery'}, 
                            {id:'Electricals', name:'Electricals'}, 
                            {id:'Spare Parts', name:'Spare Parts'}, 
                            {id:'Tyre', name:'Tyre'}];

            if ($scope.editId) {
                updateService.get($stateParams.editId).then(function(data) {
                    $scope.model = data[0];
                });
            }
        }
        $scope.updateDetails = function(){
            updateService.add($scope.model);
        }

        $scope.reset = function(){
            init();
            $scope.form.$setPristine()
        } 

    }
]);