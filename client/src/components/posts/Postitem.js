import React,{Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Moment from "react-moment";
import { connect} from 'react-redux';

import {addLike,removeLike,deletePost} from "../../redux/actioncreator";


const Postitem=({ auth,
    addLike,
    removeLike,
    deletePost,
                    post:{
                         _id, name,avatar,
                          text,user,
                          likes,
                          comments,
                          date
},showActions
                  })=>{
    return(

        <div className="post bg-white p-1 my-1">
            <div>
                <Link to={`/profile/${user}`}>
                    <img
                        className="round-img"
                        src= {avatar}
                        alt=""
                    />
                    <h5>{name}</h5>
                </Link>
            </div>
            <div>
                <p className="my-1">
                    {text}
                </p>
                <p className="post-date">
                   <Moment format='YYYY/MM/DD'>
                       {date}
                   </Moment>
                </p>
                <hr/>
                {showActions && <Fragment>

                    <button onClick={e=>addLike(_id)} type="button" className="btn btn-light">
                        <i className="fas fa-thumbs-up">like</i>{' '}
                        <span>{likes.length}</span>
                    </button>

                    <Link to={`/posts/${_id}`} className="btn btn-primary">
                        comment<span className='comment-count'>{comments.length}</span>
                    </Link>
                    {!auth.loading && user=== auth.user._id &&(
                        <button
                            onClick={e=>deletePost(_id)}
                            type="button"
                            className="btn btn-danger">
                            <i className="fas fa-times">Delete</i>
                        </button>
                    )}

                </Fragment>}

            </div>
        </div>


    )
}
Postitem.defaultProps={
   showActions:true
}

Postitem.propTypes={
    post:PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired,
    addLike:PropTypes.func.isRequired,
    deletePost:PropTypes.func.isRequired

}
const mapStateToProps=state=>({
    auth: state.auth
})
export default  connect (mapStateToProps,{addLike,removeLike,deletePost})(Postitem)

