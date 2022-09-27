import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function CreateComment({ onSubmit, parentId }) {
  const navigate = useNavigate();
  const useAuthState = useAuth().authState;
  const getAuth = useAuth().GetAuth;
  useEffect(() => {
    getAuth();
  }, []);
  const initialValues = {
    postText: "",
    type: "comment",
    postDate: new Date(),
    userId: useAuthState.id,
    parentId: parentId,
  };

  const validationSchema = Yup.object().shape({
    postText: Yup.string().required("Please type in your comment."),
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
              Add a comment
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default CreateComment;
