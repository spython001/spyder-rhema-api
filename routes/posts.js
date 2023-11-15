const router = require("express").Router();
const Post = require("../models/Post");


const isAdminMiddleware = (req, res, next) => {
    const isAdmin = req.user.isAdmin; // Assuming you have a user object in your request with isAdmin property
    if (!isAdmin) {
      return res.status(403).json("Only admins can create posts.");
    }
    next();
  };

//CREATE POST
router.post("/", isAdminMiddleware, async (req,res)=>{
    const { username, title, desc } = req.body;
    try{
        const newPost = new Post({
            username,
            title:req.body.title,
            desc:req.body.desc,
            user: req.body.userId,
            isAdmin: req.user.isAdmin
        });

        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        res.status(500).json(err);
    }
})


module.exports = router;