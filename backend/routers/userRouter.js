import express from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';
import { authenticate } from '../middleWares/auth.js';
dotenv.config();
const router = express.Router();

router.post('/add', (req, res) => {
    console.log(req.body);
    new UserModel(req.body).save()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/getall', (req, res) => {
    UserModel.find()
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
    UserModel.findOne({ email: req.params.email })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/getbyid/:id', (req, res) => {
    UserModel.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
})

router.get('/getuser', authenticate, (req, res) => {
    console.log(req.user);
    
    UserModel.findById(req.user.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
})

router.delete('/delete/:id', (req, res) => {
    UserModel.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/update/:id', (req, res) => {
    UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/authenticate', (req, res) => {
    UserModel.findOne(req.body)
        .then((result) => {
            if (result) {
                // generate token
                const { _id, name, email } = result;
                const payload = { _id, name, email };
                jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    { expiresIn: '1d' },
                    (err, token) => {
                        if (err) {
                            console.log(err);
                            res.status(500).json(err);
                        } else {
                            res.status(200).json({ token, name, email });
                        }
                    }
                )
            } else {
                res.status(403).json({ message: 'login failed' });
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

export default router;