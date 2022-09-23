import React from 'react'

function CreateComment(props) {
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
  )
}

export default CreateComment;