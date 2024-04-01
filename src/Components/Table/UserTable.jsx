import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Modal, TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
const App = () => {
  const [users, setUsers] = useState([]); //State for populating the users
  const [editModalOpen, setEditModalOpen] = useState(false); //state for modal close or not
  const [selectedUser, setSelectedUser] = useState(null); //state for maintaining which user is selected for editing
  const [editedUserData, setEditedUserData] = useState({
    //state for maintaining data in edit section
    name: "",
    title: "",
    status: "",
    age: "",
    role: "",
    image: "",
  });
  const [editedName, setEditedName] = useState(""); // state for maintaining the name property alone in edit section
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // State for controlling the delete confirmation dialog
  const [deleteRowIndex, setDeleteRowIndex] = useState(null); // State for storing the index of the row to be deleted
  const statusOptions = ["ACTIVE", "INACTIVE", "OFFLINE"];
  const roleOptions = ["Admin", "Owner", "Member"];

  const columns = [
    {
      name: "id",
      label: "Id",
    },
    {
      name: "name",
      label: "Name",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowData = users[tableMeta.rowIndex];
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <div style={{ position: "relative" }}>
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
                <AddCircleIcon
                  style={{
                    position: "absolute",
                    top: -5,
                    right: -5,
                    color: "black",
                    cursor: "pointer",
                  }}
                  onClick={() => handleImageClick(rowData.id)}
                />
              </div>
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
            <IconButton
              onClick={() => handleEditClick(tableMeta.rowIndex)}
              style={{
                color: tableMeta.rowIndex === selectedUser ? "blue" : "inherit",
              }}
            >
              <EditIcon />
            </IconButton>
          );
        },
      },
    },
    {
      name: "delete",
      label: "Delete User",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButton
              onClick={() => handleDeleteClick(tableMeta.rowIndex)}
              style={{
                color:
                  tableMeta.rowIndex === deleteRowIndex ? "red" : "inherit",
              }}
            >
              <DeleteIcon />
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
    setSelectedUser(rowIndex);
    setEditedUserData({ ...userData });
    setEditedName(`${userData.firstName} ${userData.lastName}`);
    setEditModalOpen(true);
  };
  const handleModalClose = () => {
    setEditModalOpen(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const nameParts = name.split("."); //for nested properties example company.title
    if (nameParts.length > 1) {
      const fieldName = nameParts[0];
      const nestedFieldName = nameParts[1];
      setEditedUserData({
        ...editedUserData,
        [fieldName]: {
          ...editedUserData[fieldName], //for fieldname property in editeduserData keep the Outer object as it is and change the inner nested object's property alone
          [nestedFieldName]: value,
        },
      });
    } else {
      setEditedUserData({
        ...editedUserData,
        [name]: value,
      });
    }
  };
  const handleImageClick = (userId) => {
    const input = document.createElement("input");
    input.type = "file"; //sets the input type as file
    input.accept = "image/*"; //accepts images only
    input.addEventListener("change", (event) => {
      //change event is triggered ,when user selects a file in input field
      const file = event.target.files[0]; //retrives first file selected by the user
      const reader = new FileReader();
      reader.onload = () => {
        //will execute when the selected image is completely loaded
        const updatedUsers = users.map((user) => {
          if (user.id === userId) {
            return { ...user, image: reader.result }; // Update the user's image with the selected file
          }
          return user;
        });
        setUsers(updatedUsers);
      };
      reader.readAsDataURL(file);
    });
    input.click();
  };
  const handleDeleteClick = (rowIndex) => {
    setDeleteRowIndex(rowIndex); // Store the index of the row to be deleted
    setDeleteDialogOpen(true); // Open the delete confirmation dialog
  };
  const handleDeleteConfirmed = () => {
    const userData = users[deleteRowIndex];
    const updatedUsers = users.filter((_, index) => index !== deleteRowIndex);
    const updatedUsersWithIds = updatedUsers.map((user, index) => ({
      ...user,
      id: index + 1,
    }));
    setUsers(updatedUsersWithIds);
    setDeleteRowIndex(null);
    setDeleteDialogOpen(false);
  };
  const handleDeleteCancelled = () => {
    setDeleteRowIndex(null); // Reset the stored index of the row to be deleted
    setDeleteDialogOpen(false); // Close the delete confirmation dialog
  };
  const handleSaveChanges = () => {
    const updatedUsers = users.map((user) => {
      if (user.id === editedUserData.id) {
        const nameParts = editedName.split(" ");
        const firstName = nameParts[0];
        const lastName =
          nameParts.length > 1 ? nameParts.slice(1).join(" ") : ""; //joins the whole name
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
        const updatedEditedUserData = {
          ...editedUserData,
          firstName,
          lastName,
        };
        return {
          ...user,
          ...updatedEditedUserData,
          statusStyle, // Add statusStyle to user object
        };
      } else {
        return user;
      }
    });
    setUsers(updatedUsers);
    setEditModalOpen(false);
    setSelectedUser(null);
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
            width: "40%",
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
                name="name"
                label="Name"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                fullWidth
                margin="normal"
              />
            </Box>
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
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancelled}>
        <DialogTitle id="alert-dialog-title">{"Delete User"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancelled} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirmed} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default App;
