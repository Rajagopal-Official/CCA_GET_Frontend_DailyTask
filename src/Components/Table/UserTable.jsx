import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { ThemeProvider, createTheme } from "@mui/material";

const UserTable = () => {
  const [users, setUsers] = useState([]);
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
          let statusStyle = {};// An empty Object to  hold the css styles
          let isBold = false;
          switch (rowData.status) {
            case "ACTIVE":
            case "INACTIVE":
            case "OFFLINE":
              isBold = true;//If any of these 3 cases bold it
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
                ...statusStyle,//css properties defined in the statusStyles  is retained
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
    </div>
  );
};

export default UserTable;
