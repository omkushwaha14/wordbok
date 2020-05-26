import React,{Fragment,useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { connect} from 'react-redux';
import { getProfileById} from "../../redux/actioncreator";
import Spinner from "../Spinner";

import  Profiletop from './Profiletop'
const Viewprofile=({
                   getProfileById,
                   match,
               auth,
    profile:{profile,loading}

               })=>{
    useEffect(()=>{
       getProfileById(match.params.id);
    },[getProfileById,match.params.id]);

  return(
    <Fragment>
        {
            profile ===null || loading ? (
                <Spinner/>
                ): (
                    <Fragment>
               <Link to='/friends' className='btn btn-light'>
                   Back to Profile
               </Link>
                {auth.isAuthenticated &&
                auth.loading === false &&
                auth.user._id === profile.user._id && (
                    <Link to='/edit-profile' className='btn btn-dark'>
                    Edit profile
                    </Link>
                )}
                <div className="profile-grid my-1">

                  <Profiletop profile={profile}  />


                </div>
            </Fragment>

            )}
    </Fragment>

  )
}

Viewprofile.propTypes={
getProfileById:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired
}
const mapStateToProps=state=>({
  profile:state.profile,
  auth:state.auth
});

export default connect(mapStateToProps,{getProfileById}) (Viewprofile);