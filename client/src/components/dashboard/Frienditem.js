import React  from 'react';
import PropTypes from 'prop-types';
import { Link} from 'react-router-dom'





const Frienditem=({
                       profile:{
                          user:{_id,name,avatar},

                       }
})=>{
    return(

<div className="profile bg-success" >
  <img src={avatar} alt="" className="round-img" />
  <div>
<h2>{name}</h2>
   <Link to={`/profile/${_id}`}  className='btn btn-primary'>
      View Profile
   </Link>


  </div>



</div>



    )
}

Frienditem.propTypes={
profile:PropTypes.object.isRequired

}
export default Frienditem;