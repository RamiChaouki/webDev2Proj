import React,{useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom'
import {Formik, Form, Field,ErrorMessage} from 'formik'
import axios from 'axios';
import * as Yup from 'yup';
import './Login.css';
import {useAuth} from '../../context/AuthContext'


function Login() {
  const navigate=useNavigate();
  const [invalidCredentials,setInvalidCredentials]=useState("");
  const setAuthState=useAuth().setAuthState;
  
  


  const onSubmit=(data)=>{
      axios
            .post(`${process.env.REACT_APP_API_HOST}/User/Login`,data)
            .catch((error)=>{
              setInvalidCredentials("Invalid Credentials. Please try again.")
            })
            .then((response)=>{
              console.log(response);
              if(response.data.auth.status == "banned"){
                setInvalidCredentials("You are banned!")
              }else{
              localStorage.setItem("token",response.data.token);
              
              setAuthState((prev)=>({
                ...prev,
                id:response.data.auth.id,
                username:response.data.auth.user,
                role:response.data.auth.role
              }))
              if (response.data.auth.role === "user"){navigate('/');}
              else if (response.data.auth.role === "admin") {navigate('/Admin/Users');}
            }
            })
  }

  const validationSchema=Yup.object().shape({
    usernameOrEmail:Yup
                .string()
                .required('Field must not be blank.'),
    password:Yup.string()
                .required('Field must not be blank.'),
});

  const initialValues ={
    usernameOrEmail:"",
    password:"",
        };

  return (
    <div className='container'>
      <div className='row'>
        <h1>Welcome Back!</h1>
      </div>

      <div className='row'>
        <h2>Log-in Here:</h2>
      </div>

      <Formik onSubmit={onSubmit} validationSchema={validationSchema} initialValues={initialValues}>
        <Form>
          <div className='row'>
            <label>Username/Email</label>
            <Field name='usernameOrEmail'></Field>
            <ErrorMessage name="usernameOrEmail">
                                    {msg=><div className="errorMsg">{msg}</div>}
            </ErrorMessage>
          </div>
          <div className='row'>
            <label>Password</label>
            <Field  name='password'
                    type='password'/>
            <ErrorMessage name="password">
                                    {msg=><div className="errorMsg">{msg}</div>}
            </ErrorMessage>
          </div>
          
          <div id="register-btn"className="row">
                    <button className="btn btn-secondary" type="submit" >Login</button>
          </div>

          <div className='row'>
            <span className='errorMsg'>{invalidCredentials}</span>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default Login