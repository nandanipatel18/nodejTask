const express = require('express');
const router = express.Router();
const post = require('../controller/post');
const authenticate = require('../middleware/auth')

router.post('/getUserPost', authenticate, post.getUserPost);
router.post('/createPost', authenticate, post.createPost);
router.post('/updatePost', authenticate, post.updatePost);
router.post('/deletePost', authenticate, post.deletePost);
router.post('/getTotalPost', post.getTotalPost);
router.post('/getPostbyLocation', post.getPostbyLocation);


module.exports = router;
