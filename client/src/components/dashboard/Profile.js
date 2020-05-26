import React,{ useState,Fragment} from 'react';
import { Link,withRouter} from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {createProfile} from "../../redux/actioncreator";


const CreateProfile=({
                         createProfile,
                         history})=>{
const [formData,setFormData]=useState({
    //basic information//
    gender:'',
    dob:'',
    bio:'',
    ////place lived//
    current:'',
    hometown:'',
    ////education///
    college:'',
    location:'',
    skill:'',
    ////work///
    company:'',
    address:'',
    ///hobbies//
    hobby:''

});
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

}=formData;

const onChange=e=>
    setFormData({...formData,[e.target.name]:e.target.value});

const  onSubmit=e=>{
    e.preventDefault();
    createProfile(formData,history,true);

}


    return(
        <Fragment>
            <h1 className="large text-primary">
                Create Your Profile
            </h1>
            <p className="lead">
              Basic information
            </p>
            <form className="form" onSubmit={e=>onSubmit(e)}>
                <div className="form-group">
                    <select name="gender" value={gender} onChange={e=>onChange(e)}>
                        <option value="0">Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">others</option>
                    </select>
                    <small className="form-text">Give us an idea of where you are at in your career</small>
                </div>

                <div className="form-group">
                    <h4>Date of Birth</h4>
                    <input type="date"  name="dob" value={dob} onChange={e=>onChange(e)}/>
                    <small className="form-text">Enter date of birth (yyyy/mm/dd)</small>
                </div>
                <div className="form-group">
                    <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={e=>onChange(e)}/>

                    <small className="form-text">Tell us a little about yourself</small>
                </div>

                <p className="lead">Place Lived</p>

                <div className="form-group">
                    <input type="text" placeholder="current address" name="current" value={current} onChange={e=>onChange(e)}/>
                    <small className="form-text">Enter your current address</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="hometown address" name="hometown" value={hometown} onChange={e=>onChange(e)}/>
                    <small className="form-text">Enter your hometown address</small>
                </div>

                <p className="lead">Education Information</p>

                <div className="form-group">
                    <input type="text" placeholder="college name" name="college" value={college} onChange={e=>onChange(e)}/>
                    <small className="form-text">Enter your college/school name</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="college address" name="location" value={location} onChange={e=>onChange(e)}/>
                    <small className="form-text">Enter your college/school address</small>
                </div>

                <div className="form-group">
                    <input type="text" placeholder="skill you know" name="skill" value={skill} onChange={e=>onChange(e)}/>
                    <small className="form-text">Enter your skills</small>
                </div>

                <p className="lead">Work</p>

                <div className="form-group">
                    <input type="text" placeholder="add our work place" name="company" value={company} onChange={e=>onChange(e)}/>
                    <small className="form-text">Enter company name</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="company address" name="address" value={address} onChange={e=>onChange(e)}/>
                    <small className="form-text">Enter your company address</small>
                </div>

                <p className="lead">Hobbies</p>

                <div className="form-group">
                    <input type="text" placeholder="your hobby" name="hobby" value={hobby} onChange={e=>onChange(e)}/>
                    <small className="form-text">Enter your hobby</small>
                </div>





                <input type="submit" className="btn btn-primary my-1"/>

            </form>
        </Fragment>
    )
}

CreateProfile.propTypes={
    createProfile:PropTypes.func.isRequired
};
export default connect(null,{createProfile}) (withRouter(CreateProfile));
