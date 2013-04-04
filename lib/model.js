var resourceful = require('resourceful'),
    resources = {};


// set up resourceful to use couchdb
resourceful.use('couchdb', {
  "https": false,
  "uri": 'couchdb://couch.js.ars.is',
  "database": "test_registrator",
  "port": "80",
  "auth": {
        "username": process.env["COUCH_USER"],
        "password": process.env["COUCH_PASS"]
      }
});
    
// 
// # Models/Resources
// 
  
// 
// ## Resource: Knoten
// 
var Knoten = resources.Knoten = 
resourceful.define('knoten', function () {
    
  // Specify some properties
  this.string('mac');
  this.string('pass');
  this.timestamps();
    
});
  
Knoten.property('number', 'number', {
  get: function() {
    return parseInt(this.properties.id);
  }
});
  
Knoten.property('created_at', 'number', {
  get: function() {
    return this.properties.ctime;
  }
});
  
Knoten.property('last_seen', 'number', {
  get: function() {
    return this.properties.mtime;
  }
});

// 
// ## Resource: Network
// 
var Network = resources.Network = 
resourceful.define('network', function () {
    
  this.string('name');
  this.number('range_min');
  this.number('range_max');
  this.number('lease_days');
  this.timestamps();
    
});


// export the resources as module
exports.resources = resources;

// export self as broadway plugin
exports.attach = function (options) {

  // attach resources to app
  this.resources = resources;

};

exports.init = function (done) {
  done();
};
