import React, { useState } from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';
import {Formik, Form, Field,ErrorMessage} from 'formik'
import './UserEdit.css';
import {useAuth} from '../../context/AuthContext'
import UploadPicture from './UploadPicture';

//React runs ES6 --> import/export
//Node runs commonJS --> require/ exports.modules

function UserEdit({profile,setMode}){
    const [usernameTaken,setUsernameTaken]=useState("");
    const [emailTaken,setEmailTaken]=useState("");

    const {id}=useParams();
    const navigate=useNavigate();
    const setAuthState=useAuth().setAuthState;
    const useAuthState=useAuth().authState;


    const onSubmit=(data)=>{axios.put(`http://localhost:3001/User/UpdateProfile/${id}`,data,
    {headers:
    {accessToken:localStorage.getItem("token")}})
    .catch((error)=>{
        //reset previous errors
        setEmailTaken("");
        setUsernameTaken("");


       switch(error.response.data){
        case 'Email Already Taken':
            setEmailTaken('Email Already Taken');
            break;
        case 'Username Already Taken':
            setUsernameTaken('Username Already Taken');
            break;
        default:
            break;
       }
    })
    .then((res)=>{
        localStorage.setItem("token",res.data.token);
        setAuthState((prev)=>({
            ...prev,
            id:useAuthState.id,
            username:res.data.auth.username,
            role:useAuthState.role
          }))
        setMode((mode)=>!mode)
        navigate(`/UserProfile/${id}`);
        
    }) }
    const initialValues ={
        firstName:profile.firstName,
        lastName:profile.lastName,
        username:profile.username,
        email:profile.email,
            };


    const date=new Date();
    const thirteenYearsAgo=new Date(
                            date.getFullYear()-13,
                            date.getMonth(),
                            date.getDate()
                        );

    const validationSchema=Yup.object().shape({
        firstName:Yup
                    .string()
                    .required('Please type in your first name.'),
        lastName:Yup
                    .string()
                    .required('Please type in your last name.'),
        username:Yup
                    .string()
                    .min(4,"Your username must contain at least 4 characters.")
                    .max(16,"Your username must contain at most 16 characters.")
                    .required('Please type in a username.'),
        email:Yup
                    .string()
                    .email("Must be valid email address.")
                    .required("Please type in your email."),
    });


    return(
    <div className='container'>
        
        <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
            <Form >
                <div className='row'>
                    <label>First Name:</label>
                    <Field  name="firstName"/>
                    <ErrorMessage name="firstName">
                                    {msg=><div className="errorMsg">{msg}</div>}
                    </ErrorMessage>
                </div>

                <div className='row'>
                    <label>Last Name:</label>
                    <Field name="lastName"/>
                    <ErrorMessage name="lastName">
                                    {msg=><div className="errorMsg">{msg}</div>}
                    </ErrorMessage>
                </div>

                <div className='row'>
                    <label>Username:</label>
                    <Field name="username"/>
                    <ErrorMessage name="username">
                                    {msg=><div className="errorMsg">{msg}</div>}
                    </ErrorMessage>
                </div>
                <div className="row">
                    <span className='errorMsg'>{usernameTaken}</span>
                </div>

                <div className="row">
                    <label>Email:</label>    
                    <Field  name="email"/>
                    <ErrorMessage name="email">
                                    {msg=><div className="errorMsg">{msg}</div>}
                    </ErrorMessage>
                </div>
                <div className="row">
                    <span className='errorMsg'>{emailTaken}</span>
                </div>

                

                <div id="register-btn"className="row">
                    <button className="btn btn-secondary" type="submit" >Update</button>
                </div>
            </Form>
        </Formik>
        <UploadPicture setMode={setMode}/>
    </div>
    )
}

export default UserEdit;