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

// Update user profile endpoint
router.put('/updateuser', authenticate, (req, res) => {
    const userId = req.user.id; // Get user ID from JWT token
    const updateData = req.body;

    // Remove sensitive fields that shouldn't be updated directly
    delete updateData.password;
    delete updateData._id;
    delete updateData.__v;
    delete updateData.googleTokens; // Prevent direct manipulation of Google tokens

    console.log('Updating user:', userId, 'with data:', updateData);

    UserModel.findByIdAndUpdate(
        userId,
        updateData,
        { 
            new: true, // Return updated document
            runValidators: true // Run schema validation
        }
    )
    .select('-password -googleTokens') // Exclude sensitive fields from response
    .then((result) => {
        if (!result) {
            return res.status(404).json({ 
                success: false, 
                message: 'User not found' 
            });
        }

        console.log('User updated successfully:', result);
        res.status(200).json({ 
            success: true,
            message: 'Profile updated successfully',
            user: result 
        });
    })
    .catch((err) => {
        console.error('Error updating user:', err);
        
        // Handle validation errors
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({ 
                success: false,
                message: 'Validation failed',
                errors: errors
            });
        }

        // Handle duplicate email error
        if (err.code === 11000) {
            return res.status(400).json({ 
                success: false,
                message: 'Email already exists'
            });
        }

        res.status(500).json({ 
            success: false,
            message: 'Failed to update profile',
            error: err.message 
        });
    });
});

// Add endpoint to get current user profile (enhanced version)
router.get('/profile', authenticate, (req, res) => {
    const userId = req.user.id;

    UserModel.findById(userId)
        .select('-password -googleTokens') // Exclude sensitive fields
        .then((result) => {
            if (!result) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'User not found' 
                });
            }

            res.status(200).json({ 
                success: true,
                user: result 
            });
        })
        .catch((err) => {
            console.error('Error fetching user profile:', err);
            res.status(500).json({ 
                success: false,
                message: 'Failed to fetch profile',
                error: err.message 
            });
        });
});

// Update the existing authenticate endpoint to return user data
router.post('/authenticate', (req, res) => {
    UserModel.findOne(req.body)
        .then((result) => {
            if (result) {
                // Generate token
                const { _id, name, email } = result;
                const payload = { _id, name, email };
                jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    { expiresIn: '1d' },
                    (err, token) => {
                        if (err) {
                            console.log(err);
                            res.status(500).json({ 
                                success: false,
                                message: 'Token generation failed',
                                error: err.message 
                            });
                        } else {
                            // Return user data along with token
                            res.status(200).json({ 
                                success: true,
                                token, 
                                user: {
                                    id: _id,
                                    name, 
                                    email,
                                    // Add other non-sensitive fields as needed
                                }
                            });
                        }
                    }
                )
            } else {
                res.status(403).json({ 
                    success: false,
                    message: 'Invalid credentials' 
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ 
                success: false,
                message: 'Authentication failed',
                error: err.message 
            });
        });
});

export default router;