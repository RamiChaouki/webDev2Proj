import { Pagination, List } from 'react-admin';

const UserPagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />;

export const MyPagination = () => (
    <List pagination={<UserPagination />} perPage={25}>
    <Datagrid>
        <TextField source='id' />
        <TextField source='username' />
        <TextField source='email' />
        <DateField source='dateOfBirth' />
        <EditButton basepath='/Admin/User' />
        <DeleteButton basepath='/Admin/User' />
    </Datagrid>
    </List>
);