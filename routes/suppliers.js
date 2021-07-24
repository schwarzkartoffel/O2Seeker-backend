const router = require('express').Router();
let Supplier = require('../models/supplier.model');

router.route('/').get((req, res) => {
    Supplier.find()
        .then(suppliers => res.json(suppliers))
        .catch(err => res.status(400).json('Error : ' + err));
});

router.route('/add').post((req, res) => {
    const supplierName = req.body.supplierName;
    const phoneNumber = Number(req.body.phoneNumber);
    const pinCode = Number(req.body.pinCode);

    const newSupplier = new Supplier({supplierName, phoneNumber, pinCode});

    newSupplier.save()
        .then(() => res.json("Supplier added"))
        .catch(err => res.status(400).json('Error : ' + err));
});

router.route('/:id').get((req, res) => {
    Supplier.findById(req.params.id)
        .then(supplier => res.json(supplier))
        .catch(err => res.status(400).json("Error : " + err));
});

router.route('/byPinCode/:pinCode').get((req, res) => {
    Supplier.find({ pinCode: req.params.pinCode })
        .then(suppliers => res.json(suppliers))
        .catch(err => res.status(400).json("Error : " + err));
});

router.route('/:id').delete((req, res) => {
    Supplier.findByIdAndDelete(req.params.id)
        .then(() => res.json("Supplier deleted."))
        .catch(err => res.status(400).json("Error : " + err));
});

router.route('/update/:id').post((req, res) => {
    Supplier.findById(req.params.id)
        .then(supplier => {
            supplier.supplierName = req.body.supplierName;
            supplier.phoneNumber = Number(req.body.phoneNumber);
            supplier.pinCode = Number(req.body.pinCode);
            supplier.save()
                .then(() => res.json('Supplier updated'))
                .catch(err => res.status(400).json("Error : " + err));
        })
        .catch(err => res.status(400).json("Error : " + err));
});

module.exports = router;