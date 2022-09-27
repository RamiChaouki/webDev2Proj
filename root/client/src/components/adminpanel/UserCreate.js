import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Create, SimpleForm, TextInput, SelectInput, DateInput} from 'react-admin'

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
    status:Yup
                .string()
                .oneOf(['banned', 'active'])
                .required('Please select user status'),
    role:Yup
                .string()
                .oneOf(['admin', 'user'])
                .required('Please select user role'),
});

const UserCreate = (props) => {



  return (
    <Create title='Create User' {...props}>
      <SimpleForm resolver={yupResolver(validationSchema)}>
        <TextInput source='firstName' />
        <TextInput source='lastName' />
        <TextInput source='username' />
        <TextInput source='email' />
        <TextInput source='password' />
        {/* <TextInput source='confirmPassword'  /> */}
        <DateInput source='dateOfBirth' />
        <SelectInput source="status" choices={[
            { id: 'active', name: 'Active' },
            { id: 'banned', name: 'Banned' },
        ]} />
    
        <SelectInput source="role" choices={[
            { id: 'admin', name: 'Admin' },
            { id: 'user', name: 'User' },
        ]} />
      </SimpleForm>
    </Create>
  )
}

export default UserCreate
