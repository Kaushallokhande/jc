const express = require('express');
const checkRole = require('../middleware/roleMiddleware');
const validateRequest = require('../middleware/validationMiddleware');
const { resourceSchema } = require('../validators/resourceValidator');
const Resource = require('../models/resource');
const router = express.Router();

router.post('/create', checkRole(['Admin']), validateRequest(resourceSchema), async (req, res) => {
    try {
        const { title, description } = req.body;
        const newResource = new Resource({ title, description });
        const savedResource = await newResource.save();
        res.status(201).json(savedResource);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/all', checkRole(['Admin']), async (req, res) => {
    try {
        const resources = await Resource.find();
        res.status(200).json(resources);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/byId/:id', checkRole(['Admin']), async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);
        if (!resource) {
            return res.status(404).json({ message: 'Resource not found.' });
        }
        res.status(200).json(resource);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/update/:id', checkRole(['Admin']), validateRequest(resourceSchema), async (req, res) => {
    try {
        const { title, description } = req.body;
        const updatedResource = await Resource.findByIdAndUpdate(
            req.params.id,
            { title, description },
            { new: true, runValidators: true }
        );
        if (!updatedResource) {
            return res.status(404).json({ message: 'Resource not found.' });
        }
        res.status(200).json(updatedResource);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/delete/:id', checkRole(['Admin']), async (req, res) => {
    try {
        const deletedResource = await Resource.findByIdAndDelete(req.params.id);
        if (!deletedResource) {
            return res.status(404).json({ message: 'Resource not found.' });
        }
        res.status(200).json({ message: 'Resource deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
