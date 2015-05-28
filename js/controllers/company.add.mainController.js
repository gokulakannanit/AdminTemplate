'use strict';

MetronicApp.controller('company.add.mainController', ['$scope', '$stateParams', 'company.service', 'owner.service',
    function($scope, $stateParams, updateService, ownerService) {
        
        $scope.$on('$viewContentLoaded', function() {
            // initialize core components
            Metronic.initAjax();
            init();
        });

        function updateOwnerData(){
            angular.forEach($scope.ownerListData, function(item) {
                var owner = ($scope.model.owner).split(",");
                angular.forEach(owner, function(item1) {
                    if(item.id === item1){
                        $scope.selectedTags.push({id:item.id,name:item.name})
                    }
                });
            });
        }

        function init() {
            $scope.editId = $stateParams.editId;

            $scope.model = {
                companyName:'',
                ssi:'',
                tan:'',
                serviceTax:'',
                pan:'',
                address:'',
                owner:'',
                email:'',
                phone:'',
                typeOfCompany:'S'
           };

            $scope.selectedTags = [];

            $scope.companyType = [{label:"Sole Propriteship", value:"S"}, {label:"Partnership", value:"P"}];

            ownerService.getOwnerList().then(function(data){
                $scope.ownerListData = data;
                updateOwnerData();
            });

            if ($scope.editId) {
                updateService.get($stateParams.editId).then(function(data) {
                    $scope.model = data[0];
                    updateOwnerData();
                });
            }
        }
        $scope.updateDetails = function() {
            var owner = [];
            angular.forEach($scope.selectedTags, function(item) {
              owner.push(item.id);
            });
            if(owner.length>0){
                $scope.model.owner = owner.join(",");
            }
            updateService.add($scope.model);
        }

        $scope.reset = function() {
            init();
            $scope.form.$setPristine()
        }

    }
]);