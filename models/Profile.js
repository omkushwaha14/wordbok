const mongoose=require('mongoose');


//create Schema

const ProfileSchema=new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'users'
    },
///basic information//
    gender:{
        type:String,

    },
    dob:{
        type:Date,

    },
    bio:{
        type:String
    },
    ///place lived//
    current:{
        type:String
    },
    hometown:{
        type:String
    },
    ///education/////
    college:{
        type:String
    },
    location:{
        type:String,

    },
    skill:{
        type:String
    },

 ///////work///
    company:{
        type:String
    },
    address:{
        type:String
    },

    //////hobbies///
    hobby:{
        type:String
    },

    //////////////
    date:{
        type:Date,
        default:Date.now
    }


    /////////////////////////////experience///////////


 /*/   experience:[
        {
            title:{
                type:String,
                required:true
            },
            company:{
                type:String,
                required:true
            },

            location:{
                type:String,
            },
            from:{
                type:Date,
                required:true
            },
            to:{
                type:Date
            },
            current:{
                type:Boolean,
                default: false
            },
            destination:{
                type:String
            }
        }

    ],

  */
    ///education////////////////////////////////////////////
   /*/ education:[
        {
            school:{
                type:String,
                required:true
            },
            degree:{
                type:String,
                required:true
            },

            fieldofstudy:{
                type:String,
                required:true
            },
            from:{
                type:Date,
                required:true
            },
            to:{
                type:Date
            },
            current:{
                type:Boolean,
                default: false
            },
            destination:{
                type:String
            }
        }

    ],/*/


    ////////////////////////social////////////////////////
  /*/  social:{
        youtube:{
            type:String,

        },
        twitter:{
            type:String,

        },
        facebook:{
            type:String,

        },
        linkedin:{
            type:String,

        },
        instagram:{
            type:String,

        }
    },/*/
    //////////////////////////date//////////////////////////////

});

module.exports=Profile=mongoose.model('profile',ProfileSchema);