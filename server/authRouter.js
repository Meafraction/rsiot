const express = require('express');
const router = express.Router();
const authController = require('./authController');

router.post('/posts', authController.createPost);
router.put('/posts/:id', authController.updatePost);
router.get('/posts', authController.getPosts);
router.delete('/posts/:id', authController.deletePostById);

module.exports = router;