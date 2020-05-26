import React ,{Fragment,useEffect} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import Alert from "./components/Alert";
import {loadUser} from "./redux/auth";
import Dashboard from "./components/dashboard/Dashboard";
 import Friend from "./components/dashboard/Friend";
import Editprofile from "./components/dashboard/Editprofile";
import Profile from "./components/dashboard/Profile";
import Viewprofile from "./components/dashboard/Viewprofile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import  {Provider} from 'react-redux';
import store from './redux/store';
import './App.css';
import setAuthToken from "./components/setAuthToken";
import PrivateRoute from "./components/PrivateRoute";
import friend from "./components/dashboard/Friend";

if(localStorage.token){
    setAuthToken(localStorage.token);
}

const App=() => {
useEffect(()=>{
    store.dispatch(loadUser());
},[]);

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar/>
                    <Route exact path='/' component={Landing}/>
                    <section className="container">
                        <Alert/>
                        <Switch>
                            <Route exact path='/register' component={Register}/>
                            <Route exact path='/login' component={Login}/>
                            <PrivateRoute exact path='/profile' component={Dashboard}/>
                            <PrivateRoute exact path='/create-profile' component={Profile}/>
                            <PrivateRoute exact path='/edit-profile' component={Editprofile}/>
                            <PrivateRoute exact path='/friends' component={Friend}/>
                            <PrivateRoute exact path='/profile/:id' component={Viewprofile}/>
                            <PrivateRoute exact path='/posts' component={Posts}/>
                            <PrivateRoute exact path='/posts/:id' component={Post}/>
                        </Switch>
                    </section>
                </Fragment>
            </Router>
        </Provider>
    )
}


export default App;
