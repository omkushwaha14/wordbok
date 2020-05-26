const express=require('express');
const router=express.Router();
const {check, validationResult} =require('express-validator/check');
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
//private post//

router.post('/',[
    auth,[
        check('text','Text is required').not().isEmpty()

        ]
],
   async (req,res)=>{
       const errors = validationResult(req);
       if (!errors.isEmpty()) {
           return res.status(400).json({ errors: errors.array() });
       }
       try {
           const user = await User.findById(req.user.id).select('-password');

           const newPost = new Post({
               text: req.body.text,
               name: user.name,
               avatar: user.avatar,
               user: req.user.id
           });

           const post = await newPost.save();

         return  res.json(post);
       } catch (err) {
           console.error(err.message);
           res.status(500).send('Server Error');
       }


})


///get post//
//private//
  router.get('/',auth,async(req,res)=>{
     try{
        const posts=await Post.find().sort({data:-1})
        return res.json(posts)
     }
     catch (err) {
         console.error(err.message);
         res.status(500).send('Server Error');
     }
})

///get post//id
//private//
router.get('/:id',auth,async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({msg:'post not found'});
        }
        return res.json(post)
    }
    catch (err) {
        console.error(err.message);
        if(err.kind==='ObjectId'){
           return res.status(404).json({msg:'post not found'});
        }
        res.status(404).send('Server Error');
    }
});



///delete post//
//private//
router.delete('/:id',auth,async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id)
       //check if user
        if(post.user.toString()!==req.user.id){
            return res.status(404).json({msg:'user not authorized'});
        }
        if(!post){
            return res.status(404).json({msg:'post not found'});
        }
        await post.remove();
        return res.json({msg:'post removed'})
    }
    catch (err) {
        console.error(err.message);
        res.status(404).send('Server Error');
    }
})

///put like/:id
//private//
router.put('/like/:id',auth,async(req,res)=>{
    try{
       const post=await Post.findById(req.params.id);

       ///check if post has already been liked//
        if(post.likes.filter(like=>like.user.toString()===req.user.id).length>0){
           return  res.status(400).json({msg:'post already liked'})
        }
        post.likes.unshift({user:req.user.id});
          await post.save();
         return res.json(post.likes)
    }
    catch(err){
        console.error(err.message);
        res.status(404).send('Server Error');
    }
})


///put unlikelike/:id
//private//
router.put('/unlike/:id',auth,async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);

        ///check if post has already been liked//
        if(post.likes.filter(like=>like.user.toString()===req.user.id).length===0){
            return  res.status(400).json({msg:'post has not yet been liked'})
        }

        const removeIndex=post.likes.map(like=>like.user.toString()).indexOf(req.user.id);

        post.likes.splice(removeIndex,1)
        await post.save();
        return res.json(post.likes)
    }
    catch(err){
        console.error(err.message);
        res.status(404).send('Server Error');
    }
})

////////////////////////post comment on posts///////
//////////private /////////


router.post('/comment/:id',[
        auth,[
            check('text','Text is required').not().isEmpty()

        ]
    ],
    async (req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const user = await User.findById(req.user.id).select('-password');
const post=await Post.findById(req.params.id)
            const newComment = new Post({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            });
post.comments.unshift(newComment)
         await post.save();
res.json(post.comments)

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }


    })



/////////delete posts//coments //by id//
//private//
    router.delete('/comment/:id/:comment_id',auth,async(req,res)=>{

        try{
            const post = await Post.findById(req.params.id) ;
            //pull out comment
            const comment =post.comments.find(comment=>comment.id===req.params.comment_id);
            //make sure comment exists
            if(!comment){
                return res.status(404).json({msg:'comment doesnt exists'})

            }
            if(comment.user.toString()!==req.user.id){
                return res.status(404).json({msg:'user not authorized'})
            }
            //get remove index//
            const removeIndex=post.comments
                .map(comment=>comment.user.toString())
                .indexOf(req.user.id);
            post.comments.splice(removeIndex,1)

            await post.save();
            res.json(post.comments);

        }
        catch(err){
            console.error(err.message);
            res.status(500).send('Server Error');
        }

    })


module.exports=router;
