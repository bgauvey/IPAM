'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Device Schema
 */
var DeviceSchema = new Schema({
    description: { type: String, required: true, trim: true },
    hostName: { type: String, required: true, trim: true },
    department: { type: String, trim: true },
    manufacturer: { type: String, trim: true },
    model: { type: String, trim: true },
    equipmentStatus: { type: Number, required: true },
    category: { type: String, trim: true },
    url: {type: String, trim: true},
    notes: {type: String, trim: true},
    location: {type: String, trim: true},
    room: {type: String, trim: true},
    rack: {type: String, trim: true},
    rackPosition: {type: String, trim: true},
    privateIp:  {type: String, trim: true},
    publicIp:  {type: String, trim: true},
    mac:  {type: String, trim: true},
    subnet:  {type: String, trim: true},
    nic:  {type: String, trim: true},
    switchPort:  {type: String, trim: true},
    serialNumber: {type: String, trim: true},
    partNumber: {type: String, trim: true},
    serviceTag: {type: String, trim: true},
    expressCode: {type: String, trim: true},
    assetTag: {type: String, trim: true},
    os: {type: String, trim: true},
    osVersion: {type: String, trim: true},
    sanConnected: Boolean,
    totalDriveCount: Number,
    warrantyStart: Date,
    warrantyEnd: Date,
    dateOfPurchase: Date,
    purchasePrice: {type: String, trim: true},
    leaseStart: Date,
    leaseEnd: Date,
    leasingCompany: {type: String, trim: true},
    buyOutOption: {type: String, trim: true},
    monthlyLeasePayment: {type: String, trim: true},
    created: { type: Date, default: Date.now },
    user: { type: Schema.ObjectId, ref: 'User' }
});

/**
 * Validations
 */
DeviceSchema.path('description').validate(function (address) {
    return !!address;
}, 'Description cannot be blank');

DeviceSchema.path('hostName').validate(function (subnet) {
    return !!subnet;
}, 'Hsot Name cannot be blank');

/**
 * Statics
 */
DeviceSchema.statics.load = function (id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Device', DeviceSchema);