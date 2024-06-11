const express = require('express');
const passport = require('passport');
const router = express.Router();
const Post = require('../models/post');

// router.get('/test', (req, res) => res.json({ msg: 'Posts Works' }));

exports.getUserPost = async function (req, res) {
  // passport.authenticate('jwt', { session: false })
  try {
    console.log("tryy")
    const posts = await Post.find({ createdBy: req.user.id })
    return res.send(posts)
  } catch (error) {
    console.log("cath")
    return res.send(error)
  }
}


exports.createPost = async function (req, res) {
  try {
    const newPost = new Post({
      title: req.body.title,
      body: req.body.body,
      createdBy: req.user.id,
      location: req.body.location,
      active: req.body.active
    });
    newPost.save().then(post => res.send({ "post": post, "message": "Post created Sucesfully" }));
  } catch (error) {
    res.send(error)
  }
}

exports.updatePost = async function (req, res) {
  try {
    let post = await Post.findById(req.body._id)
    console.log(post)
    if (post && post != null) {
      if (post.createdBy.toString() !== req.user.id) {
        return res.send('User not authorized');
      }
      post.title = req.body.title;
      post.body = req.body.body;
      post.geoLocation = req.body.geoLocation;
      post.active = req.body.active;
      await post.save()
      return res.send({ "post": post, "message": "post updated sucessfully" });
    }
    else {
      return res.send("post not found")
    }
  } catch (error) {
    res.send(error)
  }
}

exports.deletePost = async function (req, res) {
  try {
    let post = await Post.findById(req.body._id)
    if (post && post != null) {
      if (post.createdBy.toString() !== req.user.id) {
        return res.send('User not authorized');
      }
      await Post.findByIdAndDelete(req.body._id)
      res.send("Post deleted sucessfuly")
    }
    else {
      return res.send("post not found")
    }
  } catch (error) {
    res.send(error)
  }
}

//for geting count of active nd inactive posts
exports.getTotalPost = async function (req, res) {
  try {
    let post = await Post.aggregate([{
      $group: {
        _id: "$active",
        count: { $sum: 1 }
      }
    }])
    return res.send(post)
  } catch (error) {
    res.send(error)
  }
}

//get posts using latlng
exports.getPostbyLocation = async function (req, res) {
  try {
    console.log(req.body)
    let latlng = [req.body.lat, req.body.lng]

    let posts = await Post.find({ location: latlng })
    res.send(posts)
  } catch (error) {
    res.send(error)
  }
}