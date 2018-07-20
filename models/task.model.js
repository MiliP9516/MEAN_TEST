const mongoose = require('mongoose');

const task = mongoose.Schema({
    
   allocatedby: {type: String, required: true},
   allocateto: {type: String, required: true},
   taskname: {type: String, required: true},
   taskdesc: {type: String},
   planneddate: {type: String, required: true},
   duration: {type: String, required: true},
   status: {type: String, required: true}
 
});

module.exports = mongoose.model('Task', task);