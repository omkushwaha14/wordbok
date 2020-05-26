const express=require('express');
const router=express.Router();
const auth=require('../../middleware/auth');
const {check, validationResult} =require('express-validator/check');
const Profile=require('../../models/Profile')
const User=require('../../models/User');
//private///
router.get('/me',auth,async (req,res)=> {

    try{
         const profile=await Profile.findOne({user:req.user.id}).populate(
             'user',
             ['name','avatar']
         );
         if(!profile){
             return res.status(400).json({msg:'no profile for this user'})
         }
         return res.json(profile);

    }
    catch(error){
console.error(err.message);
res.status(500).send('server Error')
    }
})

///private routes//
router.post('/',
    [ auth,
        [
            check('dob','status is required').not().isEmpty(),
            check('skill','skill is required').not().isEmpty()
]
],
    async (req,res)=> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const {
            //basic information//
            gender,
            dob,
            bio,
            ////place lived//
            current,
            hometown,
            ////education///
            college,
            location,
            skill,
            ////work///
            company,
            address,
            ///hobbies//
            hobby

        }=req.body;
        //build profile
        const profileFields={};
        profileFields.user=req.user.id;
        //basic//
        if(gender) profileFields.gender=gender;
        if(dob) profileFields.dob=dob;
        if(bio) profileFields.bio=bio;
        ///place lived///
        if(current) profileFields.current=current;
        if(hometown) profileFields.hometown=hometown;
        ///education//
        if(college) profileFields.college=college;
        if(location) profileFields.location=location;
        if(skill) profileFields.skill=skill;
        ///work//
        if(company) profileFields.company=company;
        if(address) profileFields.address=address;
        ///hobbies//
        if(hobby) profileFields.hobby=hobby;


       /*/ profileFields.social={}
        if(youtube) profileFields.social.youtube=youtube;
        if(twitter) profileFields.social.twitter=twitter;
        if(facebook) profileFields.social.facebook=facebook;
     if(instagram) profileFields.social.facebook=instagram;/*/
try{
    let profile= await Profile.findOne({user:req.user.id});
    if(profile){
        profile=await Profile.findOneAndUpdate(
            {user:req.user.id},
            {$set:profileFields},
            {new:true}
        );
        return res.json(profile);
    }
    //create
    profile=new Profile(profileFields)
     await profile.save();
   return res.json(profile);

}
catch(err) {
console.error(err.message);
res.status(500).send('server Error')
}

    }
);

////get profile//
//public//

router.get('/',async (req,res)=>{
    try{
        const profiles=await Profile.find().populate('user',['name','avatar']);
       return res.json(profiles);

    }
    catch(err){
        console.error(err.message);
        res.status(500).send('server Error')

    }
})

///user by profile id//
router.get('/user/:user_id',async (req,res)=>{
    try{
        const profile=await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar']);

if(!profile) return res.status(400).json({msg:'profile not found'}


);
return  res.json(profile);
    }
    catch(err){
        console.error(err.message);
        return res.status(400).json({msg:'profile not found'})

    }
})
///delete users  profile posts //completely //routes//



router.delete('/',auth,async (req,res)=>{
    try{
        //removing posts
         await Profile.findOneAndRemove({user:req.user.id});
        await User.findOneAndRemove({_id:req.user.id});
       return  res.json({msg:'user removed'});

    }
    catch(err){
        console.error(err.message);
        res.status(500).send('server Error')

    }
})

////////put/profile/experience/
//private//


  /*/router.put('/experience',[

    auth,[
        check('title','title is required').not().isEmpty(),
            check('company','company is required').not().isEmpty(),
            check('from','from date is required').not().isEmpty()


]
    ],

    async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body;
        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        }

        try {
            const profile = await Profile.findOne({ user: req.user.id });

            profile.experience.unshift(newExp);

            await profile.save();

           return  res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

    });


///delete//experience///

router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile=await Profile.findOne({user:req.user.id})

        const removeIndex=profile.experience
            .map(item=>item.id)
            .indexOf(req.params.exp_id)
        profile.experience.splice(removeIndex,1);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
    }
});

//education routes//

router.put(
    '/education',
    [
        auth,
        [
            check('school', 'School is required').not().isEmpty(),
            check('degree', 'Degree is required').not().isEmpty(),
            check('fieldofstudy', 'Field of study is required').not().isEmpty(),
            check('from', 'From date is required and needs to be from the past').not().isEmpty()

        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        } = req.body;

        const newEdu = {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        };

        try {
            const profile = await Profile.findOne({ user: req.user.id });

            profile.education.unshift(newEdu);

            await profile.save();

            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    DELETE api/profile/education/:edu_id
// @desc     Delete education from profile
// @access   Private

router.delete('/education/:edu_id', auth,
    async(req, res) => {
    try {
        const profile=await Profile.findOne({user:req.user.id})

      const removeIndex=profile.education
          .map(item=>item.id)
          .indexOf(req.params.edu_id)
        profile.education.splice(removeIndex,1);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
    }
});

  / */





module.exports=router;
