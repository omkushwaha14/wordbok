import React from 'react';
import {Link} from 'react-router-dom'

const Landing= ()=>{

    return(
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">Wordbok</h1>
                    <p className="lead">

                    </p>
                    <div className="buttons">
                        <Link to='/register' class="btn btn-primary">Sign Up</Link>
                        <Link to='/login' class="btn btn-light">Login</Link>
                    </div>
                </div>
            </div>
        </section>

    )


}
export default Landing;