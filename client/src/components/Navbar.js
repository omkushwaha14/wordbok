import React,{Fragment} from 'react';
import{Link} from  'react-router-dom'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logout} from "../redux/actioncreator";

const Navbar= ({auth:{isAuthenticated,loading },logout})=>{

    const authLinks=(
        <ul>
            <Link to='/posts'><span>post</span>
            </Link>
            <Link to='/profile'><span>profile</span>
            </Link>
            <a onClick={logout} href='/'><span>logout</span>
             </a>
            <Link to='/friends'> <span>Friends</span></Link>

        </ul>
    );
    const guestLinks=(
        <ul>
            <li><Link to='/register'>Register</Link></li>

            <li><Link to='/login'>Login</Link></li>
        </ul>
    )

    return(
     <nav className="navbar bg-dark">
         <h6>
             <Link to='/'>wordbok</Link>
         </h6>
         <hr/>
         {!loading && (<Fragment>
             {
                 isAuthenticated ? authLinks:guestLinks
             }
         </Fragment>)}
     </nav>

    )
}
Navbar.propTypes={
    logout:PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps=state =>({
    auth:state.auth
})

export default  connect(mapStateToProps,{logout}) (Navbar);
