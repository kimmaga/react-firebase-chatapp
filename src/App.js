import React, { useEffect } from 'react';
import {
  Switch,
  Route,
  useHistory
} from "react-router-dom";

import ChatPage from './components/ChatPage/ChatPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';

import firebase from './firebase';

import {useDispatch , useSelector} from 'react-redux';
import {
  setUser ,
  clearUser
} from './redux/actions/user_action';

function App(props) {
  
  let history = useHistory();
  let dispatch = useDispatch();
  const isLoading = useSelector(state => state.user.isLoading);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      console.log('user',user);
      if(user){ //로그인이 된상태
        history.push("/");
        dispatch(setUser(user)); //리덕스 스토어에 넣어주는것
      }else{ //로그인이 안된상태
        history.push("/login");
        dispatch(clearUser());
      }
    })
  }, [])

  if(isLoading){
    return (
      <div>
        ...loading
      </div>
    )
  }else{
    return (
      <Switch>
        <Route exact path="/" component ={ChatPage}/> 
        <Route exact path="/login" component ={LoginPage}/>
        <Route exact path="/register" component ={RegisterPage}/>
      </Switch>
    );
  }


}

export default App;
