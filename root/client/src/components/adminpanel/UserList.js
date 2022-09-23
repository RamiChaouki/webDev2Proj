import React from 'react'
import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
} from 'react-admin'

const UserList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source='id' />
        <TextField source='username' />
        <TextField source='email' />
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


