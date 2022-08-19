var express = require('express');
var router = express.Router();
var IndexController = require('../controllers/index.controller')

const indexController=new IndexController(); 

router.get('/',  (req, res)=> { indexController.get(req).then(function (data) {res.send(data)}) });
router.get('/:id',  (req, res)=> { indexController.getById(req).then(function (data) {res.send(data)}) });
router.post('/',  (req, res)=> { indexController.create(req).then(function (data) {res.send(data)}) });
router.post('/createPayment',  (req, res)=> { indexController.generateOrder(req).then(function (data) {res.send(data)}) });
router.post('/verifyPayment',  (req, res)=> { indexController.verifyOrder(req).then(function (data) {res.send(data)}) });
router.put('/:id',  (req, res)=> { indexController.update(req).then(function (data) {res.send(data)}) });
router.delete('/:id',  (req, res)=> { indexController.delete(req).then(function (data) {res.send(data)}) });

module.exports = router
