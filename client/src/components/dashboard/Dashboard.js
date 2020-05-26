import React,{useEffect,Fragment} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import {getCurrentProfile,deleteAccount} from "../../redux/actioncreator";
import Spinner from "../Spinner";

const Dashboard=({
                     getCurrentProfile,
                      deleteAccount,
                     auth:{user},
                     profile:{profile}
})=>{
useEffect(()=>{
    getCurrentProfile();
},[]);
return(

    <Fragment>
        <h1 className='large text-primary'>Profile</h1>
        <p className='lead'>
        welcome: { user && user.name}
        </p>

        {profile !==null ?

            (<Fragment>

                <div className="dash-buttons">
                    <Link to='/edit-profile' className="btn btn-primary">
                         Edit Profile</Link>
                </div>
<h3 className='my-2'>Basic Information</h3>
<table className='table'>

   <thead>
  <tr >
 <th>Gender</th>
      <th  >{profile && profile.gender}</th>
  </tr>

  <tr>
      <th>Date of birth</th>
      <th  ><Moment format='YYYY/MM/DD'>{profile && profile.dob}</Moment></th>
  </tr>

  <tr>
      <th>Bio</th>
      <th > {profile && profile.bio}</th >
  </tr>
   </thead>
</table>
            <hr/>

                <h3 className='my-2'>Place Lived</h3>
                <table className='table'>

                    <thead>
                    <tr>
                        <th>Current Address</th>
                        <th >{profile && profile.current}</th>
                    </tr>

                    <tr>
                        <th>Hometown</th>
                        <th> {profile && profile.hometown}</th>
                    </tr>
                    </thead>
                </table>




                <hr/>

                <h3 className='my-2'>Education Information</h3>
                <table className='table'>

                    <thead>
                    <tr>
                        <th>college/school</th>
                        <th >{profile && profile.college}</th>
                    </tr>

                    <tr>
                        <th>College Address</th>
                        <th > {profile && profile.location}</th>
                    </tr>

                    <tr>
                        <th>Skill</th>
                        <th > {profile && profile.skill}</th>
                    </tr>
                    </thead>
                </table>



                <hr/>

                <h3 className='my-2'>Work</h3>
                <table className='table'>

                    <thead>
                    <tr>
                        <th>Company</th>
                        <th >{profile && profile.company}</th>
                    </tr>

                    <tr>
                        <th>Company Address</th>
                        <th > {profile && profile.address}</th>
                    </tr>


                    </thead>
                </table>

                <hr/>

                <h3 className='my-2'>Hobbies</h3>
                <table className='table'>

                    <thead>


                    <tr>
                        <th>Hobby</th>
                        <th > {profile && profile.hobby}</th>
                    </tr>


                    </thead>
                </table>
                <hr/>
<div className='my-2'>
  <button className='btn btn-danger' onClick={()=>deleteAccount()}>
      Delete My Account
  </button>



</div>


            </Fragment>):(
            <Fragment>
                <Spinner/>
                <Link to='/create-profile' className="btn btn-primary">create Profile</Link>


            </Fragment>)}
    </Fragment>


)
}
Dashboard.propTypes={
    getCurrentProfile:PropTypes.func.isRequired,
    deleteAccount:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired,
}
const mapStateToProps=state =>({
    auth:state.auth,
    profile:state.profile
})
export default connect(mapStateToProps,{getCurrentProfile,deleteAccount}) (Dashboard);