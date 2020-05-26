 import React,{Fragment} from 'react';
import PropTypes from 'prop-types';
 import Spinner from "../Spinner";


const Profiletop = ({profile:{
 current,
    profile,
    loading,
    college,
    user:{name,avatar}
}
})=>{

    return (
        <Fragment>
            {
                profile ===null || loading ? (
                    <Spinner/>
                ): (
                    <Fragment>


                <div className="profile-top bg-primary p-2">
                    <img
                        className="round-img my-1"
                        src={avatar}
                        alt=""
                    />
                    <h1 className="large">{name}</h1>
                    <p className="lead">{current}</p>
                    <p>{college}</p>

                </div>
                    </Fragment>)
            }
        </Fragment>
    )

}
Profiletop.propTypes={
    profile:PropTypes.object.isRequired

}
export default Profiletop;