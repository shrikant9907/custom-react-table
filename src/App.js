import React, { useState, useEffect } from 'react';
import CustomReactTable from "./custom-react-table/CustomReactTable";

const API_URL = 'https://reqres.in/api';
const usersTableColumn = [
  {
    name: 'id',
    label: "ID"
  },
  {
    name: 'first_name',
    label: "First Name"
  },
  {
    name: 'last_name',
    label: "Last Name"
  },
  {
    name: 'email',
    label: "Email"
  },
  {
    name: 'actions',
    label: "Actions"
  }
];

function App() {

  const tableActions = {
    allowDelete: true,
    allowEdit: true,
    allowAdd: true,
    update: (e, id, action, extra = null) => {
      switch(action) {
        case 'add':
          alert('user added.');
          break;
        case 'edit':
          alert('user updated.');
          break;
        case 'delete':
          deleteUserData(id);
          break;
        default: 
          console.log('table default action');
      }
    }
  }

  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    fetchUsersData();
  }, [])

  const fetchUsersData = () => {
    fetch(`${API_URL}/users?page=1`)
    .then(res => res.json())
    .then(result => {
      setUsersData(result.data);      
    }).catch(error => console.log(error))
  }

  const deleteUserData = (id) => {
    const newUserData = usersData.filter((user) => {
      return user.id !== id;
    });
    setUsersData(newUserData);
    alert("1 user deleted");
  }

  return <CustomReactTable
    tableHeading="Custom React Table" 
    hideTableHead="false"
    hideTableFoot="false"
    tableData={usersData}
    tableColumns={usersTableColumn}
    actions={tableActions}
  />
}
export default App;