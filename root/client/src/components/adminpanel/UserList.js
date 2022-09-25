import React from 'react'
import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
  Pagination,
} from 'react-admin'

const UserPagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />;

const UserList = (props) => {
  return (
    <List {...props}  pagination={<UserPagination />} perPage={25}>
      <Datagrid>
        <TextField source='id' />
        <TextField source='firstName' />
        <TextField source='lastName' />
        <TextField source='username' />
        <TextField source='email' />
        <TextField source='status' />
        <TextField source='role' />
        <DateField source='dateOfBirth' />
        <EditButton basepath='/Admin/User' />
        <DeleteButton basepath='/Admin/User' />
      </Datagrid>
    </List>
  )
}

export default UserList;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export function AdminPanel() {
//   let { id } = useParams();
//   const [listOfUsers, setListOfUsers] = useState({});
//   let navigate = useNavigate();
  
//   useEffect(() => {
//     axios.get("http://localhost:3001/Admin/Users").then((response) => {
//       setListOfUsers(response.data);
//     });
//   }, []);

//   return (
//     <div>
//       {listOfUsers.map((value, key) => {
//         return (
//           <div
//             className="user"
//             onClick={() => {
//               navigate(`/Admin/User/${value.id}`);
//             }}
//           >
//           <div className="title">{value.itemName}</div>
//           <div className="body">{value.itemDescription}</div>
//           <div className="body">{value.lastBidPrice}</div>
//           <div className="body">{value.lastBidderEmail}</div>
//           <div className="footer"> {value.sellerEmail} </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }


