import uuid from 'react-uuid';
import axios from 'axios';
import {
    SET_ALERT,
    REMOVE_ALERT,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    ACCOUNT_DELETED,
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
} from "./actiontypes";
import {loadUser} from "./auth";

export const setAlert=(msg,alertType) =>  dispatch => {
const id=uuid();
dispatch({
    type:SET_ALERT,
    payload:{msg,alertType,id}
});
setTimeout(()=>dispatch({type:REMOVE_ALERT,payload:id}),3000)

};
///auth/////////////////////////////////////////////


//register/ user/
export const register=({name,email,password})=>async dispatch=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }

    const body =JSON.stringify({name,email,password});
    try{
        const res=await axios.post('/api/users',body,config);
        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        })
        dispatch(loadUser())
    }
    catch(err){
        const errors=err.response.data.errors;
        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger')));
        }

dispatch({
    type:REGISTER_FAIL
})
    }

}
/////login user/////////




export const login =({email,password})=>async dispatch=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }

    const body =JSON.stringify({email,password});
    try{
        const res=await axios.post('/api/auth',body,config);
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        });
        dispatch(loadUser())
    }
    catch(err){
        const errors=err.response.data.errors;
        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type:LOGIN_FAIL
        })
    }

}
//logout//

export const logout=()=>dispatch=>{
    dispatch({type:CLEAR_PROFILE});

   dispatch({type:LOGOUT});


}

//profile////////////////////////////////////////////////


export const getCurrentProfile=()=> async dispatch=>{
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data

        })
    }
    catch(err){
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
    }
};
// create or update profile//
export const createProfile=(formData,history,edit=false)=>async dispatch=>{

  try {
      const config = {
          headers: {
              'Content-Type': 'application/json'
          }
      }


      const res = await axios.post('/api/profile', formData, config);
      dispatch({
          type: GET_PROFILE,
          payload: res.data
      });
      dispatch(setAlert(edit ? 'Profile Update':'Profile created','success'));

      if(!edit){
          history.push('/profile');
      }else{
          history.push('/profile');

      }

  }
  catch(err)
      {
          const errors=err.response.data.errors;
          if(errors){
              errors.forEach(error=>dispatch(setAlert(error.msg,'danger')));
          }
          dispatch({
              type:PROFILE_ERROR,
              payload:{msg:err.response.statusText,status:err.response.status}
          });

      }



}
//delete account &profile//
export const deleteAccount=()=> async dispatch=>{

 if(window.confirm('Are you sure? This can NOT be undone !')) {
     try{
         const res=await axios.delete('/api/profile');
         dispatch({type:CLEAR_PROFILE});
         dispatch({type:ACCOUNT_DELETED});
         dispatch(setAlert('you account has been permanantly deleted','success'))
     }
     catch(err){
          dispatch({
              type:PROFILE_ERROR,
              payload:{msg:err.response.statusText,status:err.response.status}
          });

     }
 }


}

///get all profiles
// find friends//

export const getProfiles=()=> async dispatch=>{


    try {
        const res = await axios.get('/api/profile');
        dispatch({
            type: GET_PROFILES,
            payload: res.data

        })
    }
    catch(err){
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
    }
};


///GET friend by id//

export const getProfileById=userId => async dispatch=>{

    try {
        const res = await axios.get(`/api/profile/user/${userId}`);
        dispatch({
            type: GET_PROFILE,
            payload: res.data

        })
    }
    catch(err){
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
    }
};


//get posts//
export const getPosts=()=>async dispatch =>{

  try{
      const res= await axios.get('/api/posts');
      dispatch({
          type:GET_POSTS,
          payload:res.data
      });
  }
  catch(err){
      dispatch({
          type:POST_ERROR,
          payload:{msg:err.response.statusText,status:err.response.status}
      });

  }


}

//add likes//
export const addLike=id=>async dispatch =>{

    try{
        const res= await axios.put(`/api/posts/like/${id}`);
        dispatch({
            type:UPDATE_LIKES,
            payload:{id,likes:res.data}
        });
    }
    catch(err){
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });

    }


}

//remove likes//
export const removeLike=id=>async dispatch => {

    try {
        const res = await axios.put(`/api/posts/unlike/${id}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: {id, likes: res.data}
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });

    }
}


//delete post//
export const deletePost =id=>async dispatch => {

    try {
        const res = await axios.delete(`/api/posts/${id}`);
        dispatch({
            type: DELETE_POST,
            payload: id
        });
        dispatch(setAlert('Post Removed','success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });

    }
}


//add post//
export const addPost =formData=>async dispatch => {

    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    try {
        const res = await axios.post('/api/posts/',formData,config);
        dispatch({
            type: ADD_POST,
            payload: res.data
        });
        dispatch(setAlert('Post created','success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });

    }
}


//get post//
export const getPost=id=>async dispatch =>{

    try{
        const res= await axios.get(`/api/posts/${id}`);
        dispatch({
            type:GET_POST,
            payload:res.data
        });
    }
    catch(err){
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });

    }


}


//add comment//
export const addComment =(postId,formData)=>async dispatch => {

    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    try {
        const res = await axios.post(`/api/posts/comment/${postId}`,formData,config);
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });
        dispatch(setAlert('comment added','success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });

    }
}



//add comment//
export const deleteComment =(postId,commentId)=>async dispatch => {


    try {
        const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        });
        dispatch(setAlert('comment deleted','success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });

    }
}

