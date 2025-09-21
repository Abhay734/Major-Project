import express from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import emailModel from '../models/emailModel.js'; // This is the correct line to keep
dotenv.config();
const router = express.Router();
// The next line is a duplicate and was removed.
// import emailModel from '../models/emailModel.js'; 
import { sendEmail } from '../controllers/emailController.js';
import { authenticate } from '../middleWares/auth.js';

router.post('/add', (req, res) => {
    console.log(req.body);
    new emailModel(req.body).save() // Note: Changed to emailModel to match import
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/getall', (req, res) => {
    emailModel.find() // Note: Changed to emailModel to match import
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// : denotes url parameter
router.get('/getbyemail/:email', (req, res) => {
    console.log(req.params.email);
    emailModel.findOne({ email: req.params.email }) // Note: Changed to emailModel to match import
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/getbyid/:id', (req, res) => {
    emailModel.findById(req.params.id) // Note: Changed to emailModel to match import
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
})

router.delete('/delete/:id', (req, res) => {
    emailModel.findByIdAndDelete(req.params.id) // Note: Changed to emailModel to match import
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/update/:id', (req, res) => {
    emailModel.findByIdAndUpdate(req.params.id, req.body, { new: true }) // Note: Changed to emailModel to match import
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/send', authenticate, sendEmail);

export default router;