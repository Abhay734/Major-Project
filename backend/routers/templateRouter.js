import express from 'express';
import dotenv from 'dotenv';
import Model from '../models/templateModel.js';
dotenv.config();
const router = express.Router();

router.post('/add', (req, res) => {
    console.log(req.body);
    new Model(req.body).save()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/getall', (req, res) => {
    Model.find()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/getbyid/:id', (req, res) => {
    Model.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
})

router.delete('/delete/:id', (req, res) => {
    Model.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/update/:id', (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
router.post('/save', async (req, res) => {
    try {
        const { user, prompt, content } = req.body;
        if (!user || !prompt || !content) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const template = new TemplateModel({ user, prompt, content });
        await template.save();

        res.status(201).json({ message: 'Template saved successfully', template });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save template', details: err.message });
    }
});

export default router;