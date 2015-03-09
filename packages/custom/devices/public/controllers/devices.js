'use strict';

/* jshint -W098, -W101*/
angular.module('mean.devices').controller('DevicesController', ['$scope',
                                                                '$stateParams',
                                                                '$location',
                                                                '$filter',
                                                                'Global',
                                                                'Devices',
  function ($scope, $stateParams, $location, $filter, Global, Devices) {
        $scope.global = Global;

        $scope.package = {
            name: 'devices'
        };

        $scope.hasAuthorization = function (device) {
            if (!device || !device.user) {
                return false;
            }
            return $scope.global.isAdmin || device.user._id === $scope.global.user._id;
        };

        $scope.create = function (isValid) {
            if (isValid) {
                var device = new Devices({
                    description: this.description,
                    hostName: this.hostName,
                    department: this.department,
                    manufacturer: this.manufacturer,
                    model: this.model,
                    equipmentStatus: this.equipmentStatus,
                    category: this.category,
                    url: this.url,
                    notes: this.notes,
                    location: this.location,
                    room: this.room,
                    rack: this.rack,
                    rackPosition: this.rackPosition,
                    privateIp: this.privateIp,
                    publicIp: this.publicIp,
                    mac: this.mac,
                    subnet: this.subnet,
                    nic: this.nic,
                    os: this.os,
                    osVersion: this.osVersion,
                    switchPort: this.switchPort,
                    serialNumber: this.serialNumber,
                    partNumber: this.partNumber,
                    serviceTag: this.serviceTag,
                    expressCode: this.expressCode,
                    assetTag: this.assetCode,
                    sanConnected: this.sanConnected,
                    totalDriveCount: this.totalDriveCount,
                    warrantyStart: this.warrantyStart,
                    warrantyEnd: this.warrantyEnd,
                    dateOfPurchase: this.dateOfPurchase,
                    purchasePrice: this.purchasePrice,
                    leaseStart: this.leaseStart,
                    leaseEnd: this.leaseEnd,
                    leasingCompany: this.leasingCompany,
                    buyOutOption: this.buyOutOption,
                    monthlyLeasePayment: this.monthlyLeasePayment
                });
                device.$save(function (response) {
                    $location.path('devices/' + response._id);
                });

                this.description = '';
                this.content = '';
            } else {
                $scope.submitted = true;
            }
        };

        $scope.remove = function (device) {
            if (device) {
                device.$remove();

                for (var i in $scope.devices) {
                    if ($scope.devices[i] === device) {
                        $scope.devices.splice(i, 1);
                    }
                }
            } else {
                $scope.device.$remove(function (response) {
                    $location.path('devices');
                });
            }
        };

        $scope.update = function (isValid) {
            if (isValid) {
                var device = $scope.device;
                if (!device.updated) {
                    device.updated = [];
                }
                device.updated.push(new Date().getTime());

                device.$update(function () {
                    $location.path('devices/' + device._id);
                });
            } else {
                $scope.submitted = true;
            }
        };

        $scope.find = function () {
            Devices.query(function (devices) {
                $scope.devices = devices;
            });
        };

        $scope.findOne = function () {
            Devices.get({
                deviceId: $stateParams.deviceId
            }, function (device) {
                $scope.device = device;
                if ($scope.device.warrantyStart !== null) {
                    $scope.device.warrantyStart = new Date($filter('date')($scope.device.warrantyStart, 'yyyy-MM-dd'));
                }
                if ($scope.device.warrantyEnd !== null){
                    $scope.device.warrantyEnd = new Date($filter('date')($scope.device.warrantyEnd, 'yyyy-MM-dd'));
                }
                if ($scope.device.leaseStart !== null){
                    $scope.device.leaseStart = new Date($filter('date')($scope.device.leaseStart, 'yyyy-MM-dd'));
                }
                if ($scope.device.leaseEnd !== null){
                    $scope.device.leaseEnd = new Date($filter('date')($scope.device.leaseEnd, 'yyyy-MM-dd'));
                }
                if ($scope.device.dateOfPurchase !== null){
                    $scope.device.dateOfPurchase = new Date($filter('date')($scope.device.dateOfPurchase, 'yyyy-MM-dd'));
                }
            });
        };
  }
]);