import React ,{Fragment,useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect} from 'react-redux';
import Spinner from "../Spinner";
import { getPost} from "../../redux/actioncreator";
import Postitem from "../posts/Postitem";
import {Link } from 'react-router-dom';
import Commentitem from "./Commentitem";
import CommentForm from "./CommentForm";
const Post =({ getPost,
             post:{post,loading},match})=>{
    useEffect(()=>{
getPost(match.params.id);
    },[getPost]);
  return loading || post ===null ? <Spinner/>:
      <Fragment>
          <Link to='/posts' className='btn'>
            Back to posts
          </Link>
      <Postitem post={post} showActions={false}/>
      <CommentForm postId={post._id}/>
      <div className='comments'>
          {post.comments.map(comment=>(
            <Commentitem key={comment._id} comment={comment} postId={post._id}/>
          ))}
      </div>
  </Fragment>
}

Post.propTypes={
    getPost:PropTypes.func.isRequired,
    post:PropTypes.object.isRequired

}
const mapStateToProps=state=>({
   post:state.post

})
export default connect(mapStateToProps,{getPost}) (Post);