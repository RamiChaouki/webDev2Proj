import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import {useAuth} from '../../context/AuthContext';

function CreatePost() {
  const navigate = useNavigate();
  const useAuthState=useAuth().authState;
  const getAuth=useAuth().GetAuth;

    useEffect(()=>{
        getAuth();
    },[])
  // const []=useState("");
  // const [emailTaken,setEmailTaken]=useState("");

  const onSubmit = async (data) => {
    data.date = new Date();
    data.parentId = useAuthState.id;
    await axios
      .post("http://localhost:3001/Feed/Register", data)
      .then((res) => {});
  };
  const initialValues = {
    postText: "",
    type: "post",
    postDate: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Please type in your post."),
  });

  return (
    <div className="container">
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <Form>
          <div className="row">
            <label>Post:</label>
            <Field name="postText" />
            <ErrorMessage name="postText">
              {(msg) => <div className="errorMsg">{msg}</div>}
            </ErrorMessage>
          </div>
          <div className="row">
            <span className="errorMsg"></span>
          </div>

          <div id="register-btn" className="row">
            <button className="btn btn-secondary" type="submit">
              Send Post
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
