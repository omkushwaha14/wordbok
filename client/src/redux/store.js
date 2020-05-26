import {createStore,applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post'
const  initialState={};
 const middleware=[thunk];

 const store=createStore(
     combineReducers({

      initialState,
      alert,
         auth,
         profile,
         post

     }),
      composeWithDevTools(applyMiddleware(...middleware))


 )
 export default store;




