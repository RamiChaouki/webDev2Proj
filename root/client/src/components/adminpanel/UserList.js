import React from 'react'
import {
  List,
  Datagrid,
  TextField,
  DateField,
  DeleteButton,
  EmailField
} from 'react-admin'

import UserPagination from './UserPagination'
import userFilters from './MyFilters';

const UserList = (props) => {
  return (
    <List {...props} pagination={<UserPagination />} perPage={25} filters={userFilters}>
      <Datagrid rowClick="edit">
        <TextField source='id' />
        <TextField source='firstName' />
        <TextField source='lastName' />
        <TextField source='username' />
        <EmailField source='email' />
        <TextField source='status' />
        <TextField source='role' />
        <DateField source='dateOfBirth' />
        <DeleteButton basepath='/Admin/User' />
      </Datagrid>
    </List>
  )
}

export default UserList;