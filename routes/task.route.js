const express = require('express');
const router = express.Router();
const mongooes = require('mongoose');
const bcrypt = require('bcryptjs');
const Task = require('../models/task.model');
const { ObjectID } = require('mongodb');
const _ = require('lodash');
var verifyToken = require('../middleware/authenticate');

router.get('/tasklist', verifyToken, (req, res) => {
    Task.find().then((tasks) => {
        res.send({
        tasks
      });
    }, (e) => {
      res.status(400).send(e);
    });
});
  
router.get('/:id', verifyToken, (req, res) => {
    var id = req.params.id;  
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
  
    Task.findById(id).then((task) => {
      if (!task) {
        return res.status(404).send();
      }
  
      res.send({
        task
      });
    }).catch((e) => {
      res.status(400).send(e);
    });
});
  
router.post('/tasknew', verifyToken, (req, res) => {
    var task = new Task({
      id: new mongooes.Types.ObjectId(),
      allocatedby: req.body.allocatedby,
      allocateto: req.body.allocateto,      
      taskname: req.body.taskname,
      taskdesc: req.body.taskdesc,
      planneddate: req.body.planneddate,
      duration: req.body.duration,
      status: req.body.status
    });  
    task.save().then((doc) => {
      res.send(doc);
    }, (e) => {
      res.status(400).send(e);
    });
  });
  
router.delete('/:id', verifyToken, (req, res) => {
    var id = req.params.id;  
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
  
    Task.findByIdAndRemove(id).then((task) => {
      if (!task) {
        return res.status(404).send();
      }
  
      res.send({
        task
      });
    }).catch((e) => {
      res.status(400).send();
    });
});
  
router.patch('/:id', verifyToken, (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['allocatedby', 'allocateto', 'taskname', 'taskdesc', 'planneddate','duration', 'status']); //creates a new object from current objects selected properties
  
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
  
    //update and send new version of document {new: true}
    Task.findByIdAndUpdate(id, {
      $set: body
    }, {
      new: true
    }).then((task) => {
      if (!task) {
        return res.status(404).send();
      }
  
      res.send({
        task
      });
    }).catch((e) => {
      res.status(400).send();
    })
});
module.exports = router;