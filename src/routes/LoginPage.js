import React from 'react';
import {connect} from 'dva';
import Login from '../components/Login';

function LoginPage(props) {

  const loginFormProps = {
    onLogin(fieldsValue){
      props.dispatch({
        type: 'login/onLogin',
        payload: fieldsValue
      });
    },
    username: props.login.username,
    isLogin: props.login.isLogin,
    hasError: props.login.hasError,
    errorMsg: props.login.errorMsg,
    onOk(hasError, errorMsg){
      props.dispatch({
        type: 'login/onOk',
        payload: {
          hasError,
          errorMsg
        }
      })
    },
    clearMsg(){
      props.dispatch({
        type: 'login/clearMsg',
      })
    }

  };

  return (
    <Login {...loginFormProps}></Login>
  );
}

function mapStateToProps({login}) {
  return {login};
}

export default connect(mapStateToProps)(LoginPage);
