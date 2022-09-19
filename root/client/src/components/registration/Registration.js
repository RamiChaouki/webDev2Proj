import React, { useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import {Formik, Form, Field,ErrorMessage} from 'formik'
import './Registration.css';

//React runs ES6 --> import/export
//Node runs commonJS --> require/ exports.modules

function Registration(){
    const [usernameTaken,setUsernameTaken]=useState("");
    const [emailTaken,setEmailTaken]=useState("");


    const onSubmit=(data)=>{axios.post('http://localhost:3001/User/Register',data)
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
        
    }) }
    const initialValues ={
        firstName:"",
        lastName:"",
        username:"",
        email:"",
        dateOfBirth:"",
        password:"",
        confirmPass:""
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
        dateOfBirth:Yup
                    .date()
                    .max(thirteenYearsAgo,"You must be at least 13 years old to register.")
                    .required('Please input your date of birth.'),
        password:Yup.string()
                    .min(6,"Password must be at least 6 characters.")
                    .max(32,"Password must be at most 32 characters.")
                    .required('Please type in a password.'),
        confirmPass:Yup
                    .string()
                    .required('Please retype your password.')
                    .oneOf([Yup.ref('password')], 'Your passwords do not match.')
    });


    return(
    <div className='container'>
        
        <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
            <Form >
                <div className='row'>
                    <label>First Name:</label>
                    <Field name="firstName"/>
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

                <div className="row">
                        <label>Birthday:</label>
                        <Field  name="dateOfBirth"
                                type="date"/>
                        <ErrorMessage name="dateOfBirth">
                                    {msg=><div className="errorMsg">{msg}</div>}
                        </ErrorMessage>
                </div>
                
                <div className="row">
                    <label>Password:</label>
                    <Field  name="password"
                            type="password"
                            placeholder="Min 6 characters, Max 32 "/>
                    <ErrorMessage name="password">
                                    {msg=><div className="errorMsg">{msg}</div>}
                    </ErrorMessage>
                </div>
                
                <div className="row">
                    <label>Confirm Password:</label>
                    <Field  name="confirmPass"
                            type="password"/>
                    <ErrorMessage name="confirmPass">
                                    {msg=><div className="errorMsg">{msg}</div>}
                    </ErrorMessage>
                </div>

                <div id="register-btn"className="row">
                    <button className="btn btn-secondary" type="submit" >Register</button>
                </div>
            </Form>
        </Formik>
    </div>
    )
}

export default Registration;