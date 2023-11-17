const router = require("express").Router();
const { findByIdAndUpdate } = require("../models/Post");
const Post = require("../models/Post");
//const verify = require("../verifyToken");


//THESE LINES OF CODE ALLOWS ONLY ADMIN TO CREATE POSTS
/*const isAdminMiddleware = (req, res, next) => {
    const isAdmin = req.user.isAdmin; // Assuming you have a user object in your request with isAdmin property
    if (!isAdmin) {
      return res.status(403).json("Only admins can create posts.");
    }
    next();
  };

//CREATE POST
router.post("/", verify, isAdminMiddleware, async (req,res)=>{
    const { username, title, desc } = req.body;
    try{
        const newPost = new Post({
            username,
            title,
            desc,
        });

        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        res.status(500).json(err);
    }
}); */


//CREATE POST
router.post("/", async(req, res) => {
    const newPost = await new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});


//UPDATE POST
router.put("/:id", async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username){
            try{
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                    $set: req.body,
                }, {new: true});

                res.status(200).json(updatedPost);
            }catch(err){
                res.status(500).json(err);
            }
        } else{
            res.status(401).json("You can only update your post");
        };
    }catch(err){
        res.status(500).json(err)
    }
});


//DELETE POST
router.delete("/:id", async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username){
            try{
                await post.deleteOne();

                res.status(200).json("post has been deleted");
            }catch(err){
                res.status(500).json(err);
            }
        }else{
            res.status(401).json("You cn only delete your post");
        }
    }catch(err){
        res.status(500).json(err);
    }
});

//GET ONE POST
router.get("/:id", async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);

        res.status(200).json(post)
    }catch(err){
        res.status(500).json(err)
    }
});


//GET ALL POSTS
router.get("/", async (req,res)=>{
    const username = req.query.user;
    try{
        let posts;
        if(username){
            posts = await Post.find({ username })
        }else{
            posts = await Post.find();
        }

        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;