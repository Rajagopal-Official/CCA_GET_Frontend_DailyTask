import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Modal, TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
const App = () => {
  const [users, setUsers] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false); //state for modal close or not
  const [selectedUser, setSelectedUser] = useState(null); //state for maintaining which user is selected for editing
  const [editedUserData, setEditedUserData] = useState({
    name: "",
    title: "",
    status: "",
    age: "",
    role: "",
  });

  const statusOptions = ["ACTIVE", "INACTIVE", "OFFLINE"];
  const roleOptions = ["Admin", "Owner", "Member"];

  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowData = users[tableMeta.rowIndex];
          return (
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={rowData.image}
                alt="Profile"
                style={{
                  width: 50,
                  height: 50,
                  marginRight: 10,
                  borderRadius: "50%",
                }}
              />
              <div>
                <div>
                  {rowData.firstName} {rowData.lastName}
                </div>
                <div>{rowData.email}</div>
              </div>
            </div>
          );
        },
      },
    },
    {
      name: "company.title",
      label: "Title",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowData = users[tableMeta.rowIndex];
          return rowData.company ? rowData.company.title : "";
        },
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowData = users[tableMeta.rowIndex];
          let statusStyle = {}; // An empty Object to  hold the css styles
          let isBold = false;
          switch (rowData.status) {
            case "ACTIVE":
            case "INACTIVE":
            case "OFFLINE":
              isBold = true; //If any of these 3 cases bold it
              break;
            default:
              break;
          }
          if (isBold) {
            statusStyle = {
              fontWeight: "bold",
              textAlign: "center",
            };
          }
          switch (rowData.status) {
            case "ACTIVE":
              statusStyle = {
                ...statusStyle, //css properties defined in the statusStyles  is retained
                color: "green",
                backgroundColor: "#e6ffe6",
              };
              break;
            case "INACTIVE":
              statusStyle = {
                ...statusStyle,
                color: "brown",
                backgroundColor: "#ffe0b2",
              };
              break;
            case "OFFLINE":
              statusStyle = {
                ...statusStyle,
                color: "hotpink",
                backgroundColor: "#ffe6e6",
              };
              break;
            default:
              break;
          }
          return <div style={statusStyle}>{rowData.status}</div>;
        },
      },
    },
    {
      name: "age",
      label: "Age",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowData = users[tableMeta.rowIndex];
          return (
            <div style={{ textAlign: "center", width: "100%" }}>
              {rowData.age}
            </div>
          );
        },
      },
    },
    {
      name: "role",
      label: "Role",
    },
    {
      name: "edit",
      label: "Edit User",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButton onClick={() => handleEditClick(tableMeta.rowIndex)}>
              <EditIcon />
            </IconButton>
          );
        },
      },
    },
  ];

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => {
        const limitedData = data?.users?.slice(0, 15);
        const local = limitedData.map((user) => ({
          ...user,
          status:
            statusOptions[Math.floor(Math.random() * statusOptions.length)],
          role: roleOptions[Math.floor(Math.random() * roleOptions.length)],
        }));
        setUsers(local);
      });
  }, []);
  const handleEditClick = (rowIndex) => {
    const userData = users[rowIndex];
    const { id, ...userDataWithoutId } = userData; //destructures and gets the id property and assigns the remaining property to userDataWithoutId
    setSelectedUser(userData);
    setEditedUserData({ ...userData });
    setEditModalOpen(true);
  };
  const handleModalClose = () => {
    setEditModalOpen(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const nameParts = name.split('.');
    if (nameParts.length > 1) {
      const fieldName = nameParts[0];
      const nestedFieldName = nameParts[1]; 
      setEditedUserData({
        ...editedUserData,
        [fieldName]: {
          ...editedUserData[fieldName],
          [nestedFieldName]: value 
        }
      });
    } else {
      setEditedUserData({
        ...editedUserData,
        [name]: value
      });
    }
  };
  const handleSaveChanges = () => {
    const updatedUsers = users.map((user) => {
      if (user.id === editedUserData.id) {
        let statusStyle = {};
        let isBold = ["ACTIVE", "INACTIVE", "OFFLINE"].includes(
          editedUserData.status
        );

        if (isBold) {
          statusStyle = {
            fontWeight: "bold",
            textAlign: "center",
          };
        }
        switch (editedUserData.status) {
          case "ACTIVE":
            statusStyle = {
              ...statusStyle,
              color: "green",
              backgroundColor: "#e6ffe6",
            };
            break;
          case "INACTIVE":
            statusStyle = {
              ...statusStyle,
              color: "brown",
              backgroundColor: "#ffe0b2",
            };
            break;
          case "OFFLINE":
            statusStyle = {
              ...statusStyle,
              color: "hotpink",
              backgroundColor: "#ffe6e6",
            };
            break;
          default:
            break;
        }
        return {
          ...user,
          ...editedUserData,
          statusStyle, // Add statusStyle to user object
        };
      } else {
        return user;
      }
    });
    setUsers(updatedUsers);
    setEditModalOpen(false);
  };

  const options = {
    selectableRows: false,
    elevation: 0,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 15],
  };

  const getMuiTheme = () =>
    createTheme({
      components: {
        MuiTableHeadCell: {
          styleOverrides: {
            head: {
              padding: "10px 20px 10px 0px",
              justifyContent: "center",
            },
            body: {
              padding: "7px 15px",
            },
          },
        },
      },
    });
  return (
    <div>
      <ThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title={"Users List"}
          data={users}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
      <Modal
        open={editModalOpen}
        onClose={handleModalClose}
        disableBackdropClick
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width:"40%",
            maxHeight: "80vh",
            overflowY: "auto",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <IconButton
            style={{ position: "absolute", top: "10px", right: "10px" }}
            onClick={handleModalClose}
          >
            <CloseIcon />
          </IconButton>

          <h2>Edit User</h2>
          <form>
            <Box mb={2}>
              <TextField
                name="email"
                label="Email"
                value={editedUserData.email}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            </Box>
            <Box mb={2}>
              <TextField
                name="company.title"
                label="Title"
                value={editedUserData.company?.title}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            </Box>
            <Box mb={2}>
              <TextField
                name="status"
                label="Status"
                value={editedUserData.status}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            </Box>
            <Box mb={2}>
              <TextField
                name="age"
                label="Age"
                value={editedUserData.age}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            </Box>
            <Box mb={2}>
              <TextField
                name="role"
                label="Role"
                value={editedUserData.role}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default App;
