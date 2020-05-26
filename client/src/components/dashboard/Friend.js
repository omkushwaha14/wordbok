import React, {useEffect,Fragment} from 'react';
import PropTypes from 'prop-types';
import { Link,withRouter} from 'react-router-dom'
import { connect } from 'react-redux';
 import {getProfiles} from "../../redux/actioncreator";
import Frienditem from "../dashboard/Frienditem"
import Spinner from "../Spinner";






const Friend=({getProfiles,profile:{profiles,loading}})=>{
    useEffect(()=>{
        getProfiles();
    },[getProfiles]);

return<Fragment>
    {
        loading ? <Spinner/>:<Fragment>
<h3 className="large text-primary">Friends</h3>
       <p className="lead">
           People you may know
       </p>
       <div className="profiles">
           {profiles.length>0 ? (
               profiles.map(profile=>(
                <Frienditem key={profile._id} profile={profile} />
               ))
           ):<Spinner/>}

           </div>

            </Fragment>
    }

</Fragment>

}

Friend.propTypes={
    getProfiles:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired
};

const mapStateToProps=state=>({
    profile:state.profile
})
 export default connect(mapStateToProps,{getProfiles}) (withRouter(Friend));
