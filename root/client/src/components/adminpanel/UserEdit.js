import React from 'react'
import { Edit, SimpleForm, TextInput, DateInput, SelectInput} from 'react-admin'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

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
});

const UserEdit = (props) => {



  return (
    <Edit title='Edit User' {...props}>
      <SimpleForm resolver={yupResolver(validationSchema)}>
        <TextInput disabled source='id' />
        <TextInput source='firstName' />
        <TextInput source='lastName' />
        <TextInput source='username' />
        <TextInput source='email' />
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
    </Edit>
  )
}

export default UserEdit