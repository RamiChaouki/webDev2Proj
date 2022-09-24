import React from 'react'
import { Edit, SimpleForm, TextInput, DateField, SelectInput} from 'react-admin'



const UserEdit = (props) => {



  return (
    <Edit title='Edit User' {...props}>
      <SimpleForm>
        <TextInput disabled source='id' />
        <TextInput source='firstName' />
        <TextInput source='lastName' />
        <TextInput source='username' />
        <TextInput source='email' />
        <DateField source='dateOfBirth' />
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