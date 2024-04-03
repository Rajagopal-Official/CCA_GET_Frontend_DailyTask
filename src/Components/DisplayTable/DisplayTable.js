import MUIDataTable from "mui-datatables";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const App = () => {
  const details = [
    {
      region: "ap-south-1",
      instance_name: "terraform-poc",
      instance_id: "i-06be25222d2a95497",
      instance_type: "t2.medium",
      state: "running",
      metric_type: "cpu",
      average_utilization: 1.73,
      last_activity_time: "2024-02-01 04:38:29.617279",
    },
    {
      region: "ap-south-1",
      instance_name: "cost accelerator",
      instance_id: "i-0562b570ba200cbf2",
      instance_type: "t2.large",
      state: "running",
      metric_type: "memory",
      average_utilization: 9.24,
      last_activity_time: "2024-02-01 04:38:31.389206",
    },
    {
      region: "ap-south-1",
      instance_name: "cost accelerator",
      instance_id: "i-0562b570ba200cbf2",
      instance_type: "t2.large",
      state: "running",
      metric_type: "cpu",
      average_utilization: 1.74,
      last_activity_time: "2024-02-01 04:38:31.389206",
    },
    {
      region: "ap-south-1",
      instance_name: "cost accelerator",
      instance_id: "i-0562b570ba200cbf2",
      instance_type: "t2.large",
      state: "running",
      metric_type: "disk",
      average_utilization: 7.55,
      last_activity_time: "2024-02-01 04:38:31.389206",
    },
    {
      region: "ap-south-1",
      instance_name: null,
      instance_id: "i-01b27bd63088630ee",
      instance_type: "t2.medium",
      state: "running",
      metric_type: "cpu",
      average_utilization: 3.34,
      last_activity_time: "2024-02-01 04:38:34.333119",
    },
    {
      region: "ap-south-1",
      instance_name: "Monisha-2048-gameon",
      instance_id: "i-0a666837618916aa5",
      instance_type: "t2.large",
      state: "running",
      metric_type: "cpu",
      average_utilization: 2.72,
      last_activity_time: "2024-02-01 04:38:34.806475",
    },
    {
      region: "ap-south-1",
      instance_name: "demo-eks",
      instance_id: "i-0fb150f95b88dc9e4",
      instance_type: "t2.large",
      state: "running",
      metric_type: "cpu",
      average_utilization: 1.68,
      last_activity_time: "2024-02-01 04:38:36.133070",
    },
    {
      region: "ap-south-1",
      instance_name: null,
      instance_id: "i-018a62c4605552185",
      instance_type: "t2.medium",
      state: "running",
      metric_type: "cpu",
      average_utilization: 3.8,
      last_activity_time: "2024-02-01 04:38:36.694621",
    },
    {
      region: "ap-south-1",
      instance_name: "GPT",
      instance_id: "i-0b2c3f87367a76756",
      instance_type: "t2.large",
      state: "running",
      metric_type: "cpu",
      average_utilization: 0.77,
      last_activity_time: "2024-02-01 04:38:37.406333",
    },
    {
      region: "ap-south-1",
      instance_name: null,
      instance_id: "i-018d86f6488dac6b1",
      instance_type: "t2.medium",
      state: "running",
      metric_type: "cpu",
      average_utilization: 1.82,
      last_activity_time: "2024-02-01 04:38:38.351138",
    },
    {
      region: "ap-south-1",
      instance_name: "Jenkins-argo",
      instance_id: "i-0a0f98603067950c1",
      instance_type: "t2.large",
      state: "running",
      metric_type: "cpu",
      average_utilization: 1.5,
      last_activity_time: "2024-02-01 04:38:39.362948",
    },
    {
      region: "ap-south-1",
      instance_name: "yesh_k8_3tier_poc",
      instance_id: "i-01998222eb74db17a",
      instance_type: "t2.medium",
      state: "running",
      metric_type: "cpu",
      average_utilization: 0.33,
      last_activity_time: "2024-02-01 04:38:40.123685",
    },
    {
      region: "ap-south-1",
      instance_name: null,
      instance_id: "i-024ebe3d5a63dbb6a",
      instance_type: "t2.medium",
      state: "running",
      metric_type: "cpu",
      average_utilization: 1.59,
      last_activity_time: "2024-02-01 04:38:40.704218",
    },
    {
      region: "ap-south-1",
      instance_name: "ixiegamingsource",
      instance_id: "i-0d902137cbc8286dd",
      instance_type: "t2.micro",
      state: "stopped",
      metric_type: "memory",
      average_utilization: 59.06,
      last_activity_time: "2023-11-23 09:14:26+00:00",
    },
    {
      region: "ap-south-1",
      instance_name: "ixiegamingsource",
      instance_id: "i-0d902137cbc8286dd",
      instance_type: "t2.micro",
      state: "stopped",
      metric_type: "cpu",
      average_utilization: 1.27,
      last_activity_time: "2023-11-23 09:14:26+00:00",
    },
    {
      region: "ap-south-1",
      instance_name: "ixiegamingsource",
      instance_id: "i-0d902137cbc8286dd",
      instance_type: "t2.micro",
      state: "stopped",
      metric_type: "disk",
      average_utilization: 52.08,
      last_activity_time: "2023-11-23 09:14:26+00:00",
    },
    {
      region: "ap-south-1",
      instance_name: "ixierdsec2",
      instance_id: "i-0cda1f5e16cae5ba4",
      instance_type: "t2.micro",
      state: "stopped",
      metric_type: "memory",
      average_utilization: 56.9,
      last_activity_time: "2023-11-23 11:28:44+00:00",
    },
    {
      region: "ap-south-1",
      instance_name: "ixierdsec2",
      instance_id: "i-0cda1f5e16cae5ba4",
      instance_type: "t2.micro",
      state: "stopped",
      metric_type: "cpu",
      average_utilization: 1.62,
      last_activity_time: "2023-11-23 11:28:44+00:00",
    },
    {
      region: "ap-south-1",
      instance_name: "ixierdsec2",
      instance_id: "i-0cda1f5e16cae5ba4",
      instance_type: "t2.micro",
      state: "stopped",
      metric_type: "disk",
      average_utilization: 67.48,
      last_activity_time: "2023-11-23 11:28:44+00:00",
    },
    {
      region: "ap-south-1",
      instance_name: "terraformdemo",
      instance_id: "i-086e554e990430bb2",
      instance_type: "t2.micro",
      state: "stopped",
      metric_type: "cpu",
      average_utilization: 0.74,
      last_activity_time: "2024-01-23 06:08:48+00:00",
    },
    {
      region: "ap-south-1",
      instance_name: "Chitra-Petstore",
      instance_id: "i-0b8dc8b32bef7325b",
      instance_type: "t2.large",
      state: "stopped",
      metric_type: "cpu",
      average_utilization: 4.84,
      last_activity_time: "2024-01-29 06:33:23+00:00",
    },
    {
      region: "ap-south-1",
      instance_name: "myntra - mathew",
      instance_id: "i-0ab374716e8609ca0",
      instance_type: "t2.large",
      state: "stopped",
      metric_type: "cpu",
      average_utilization: 4.37,
      last_activity_time: "2024-01-31 09:11:11+00:00",
    },

    {
      region: "us-east-1",
      instance_name: "power-optimizer",
      instance_id: "i-0c7fd3a9ebe913b84",
      instance_type: "m4.xlarge",
      state: "running",
      metric_type: "memory",
      average_utilization: 55.02,
      last_activity_time: "2024-02-01 13:20:57.684512",
    },
    {
      region: "us-east-1",
      instance_name: "power-optimizer",
      instance_id: "i-0c7fd3a9ebe913b84",
      instance_type: "m4.xlarge",
      state: "running",
      metric_type: "cpu",
      average_utilization: 70.5,
      last_activity_time: "2024-02-01 13:20:57.684512",
    },
    {
      region: "us-east-1",
      instance_name: "power-optimizer",
      instance_id: "i-0c7fd3a9ebe913b84",
      instance_type: "m4.xlarge",
      state: "running",
      metric_type: "disk",
      average_utilization: 45,
      last_activity_time: "2024-02-01 13:20:57.684512",
    },
    {
      region: "eu-west-2",
      instance_name: "efficiency-server",
      instance_id: "i-0a94b1d2c8f9b63d7",
      instance_type: "t3.large",
      state: "stopped",
      metric_type: "memory",
      average_utilization: 18.55,
      last_activity_time: "2024-02-01 15:42:36.210715",
    },
    {
      region: "eu-west-2",
      instance_name: "efficiency-server",
      instance_id: "i-0a94b1d2c8f9b63d7",
      instance_type: "t3.large",
      state: "stopped",
      metric_type: "cpu",
      average_utilization: 3.27,
      last_activity_time: "2024-02-01 15:42:36.210715",
    },
    {
      region: "eu-west-2",
      instance_name: "efficiency-server",
      instance_id: "i-0a94b1d2c8f9b63d7",
      instance_type: "t3.large",
      state: "stopped",
      metric_type: "disk",
      average_utilization: 6.54,
      last_activity_time: "2024-02-01 15:42:36.210715",
    },
    {
      region: "ap-northeast-2",
      instance_name: "resource-manager",
      instance_id: "i-0f6cd245ea5c31b29",
      instance_type: "m5.2xlarge",
      state: "running",
      metric_type: "memory",
      average_utilization: 45.55,
      last_activity_time: "2024-02-01 17:59:14.812903",
    },
    {
      region: "ap-northeast-2",
      instance_name: "resource-manager",
      instance_id: "i-0f6cd245ea5c31b29",
      instance_type: "m5.2xlarge",
      state: "running",
      metric_type: "cpu",
      average_utilization: 67.5,
      last_activity_time: "2024-02-01 17:59:14.812903",
    },
    {
      region: "ap-northeast-2",
      instance_name: "resource-manager",
      instance_id: "i-0f6cd245ea5c31b29",
      instance_type: "m5.2xlarge",
      state: "running",
      metric_type: "disk",
      average_utilization: 56.45,
      last_activity_time: "2024-02-01 17:59:14.812903",
    },
    {
      region: "sa-east-1",
      instance_name: "speed-optimizer",
      instance_id: "i-0e24c895a387df827",
      instance_type: "t3.micro",
      state: "running",
      metric_type: "memory",
      average_utilization: 63.83,
      last_activity_time: "2024-02-01 20:18:09.447632",
    },
    {
      region: "sa-east-1",
      instance_name: "speed-optimizer",
      instance_id: "i-0e24c895a387df827",
      instance_type: "t3.micro",
      state: "running",
      metric_type: "cpu",
      average_utilization: 13,
      last_activity_time: "2024-02-01 20:18:09.447632",
    },
    {
      region: "sa-east-1",
      instance_name: "speed-optimizer",
      instance_id: "i-0e24c895a387df827",
      instance_type: "t3.micro",
      state: "running",
      metric_type: "disk",
      average_utilization: 45.34,
      last_activity_time: "2024-02-01 20:18:09.447632",
    },
  ];

  const columns = [
    { name: "region", label: "Region" },
    {
      name: "instance_name",
      label: "Instance Name",
      options: {
        customBodyRender: (value) => value || "N/A",
      },
    },
    { name: "instance_id", label: "Instance ID" },
    { name: "instance_type", label: "Instance Type" },
    {
      name: "state",
      label: "State",
      options: {
        customBodyRender: (value) => {
          const capitalizedValue =
            value.charAt(0).toUpperCase() + value.slice(1);

          return (
            <p
              style={{
                backgroundColor: value === "running" ? "#00C853" : "#FF1744",
                borderRadius: "20px",
                textAlign: "center",
                lineHeight: "30px",
                margin: '0',
                padding: "5px 10px",
              }}
              className="inline-block"
            >
              {capitalizedValue}
            </p>
          );
        },
      },
    },
    {
      name: "metric_type",
      label: "Metric Type",
      options: {
        customBodyRender: (value) => {
          const capitalizedValue =
            value.charAt(0).toUpperCase() + value.slice(1);
          let backgroundColor;
          switch (value) {
            case "cpu":
              backgroundColor = "#2196F3";
              break;
            case "memory":
              backgroundColor = "#FF9800";
              break;
            case "disk":
              backgroundColor = "#E91E63";
              break;
            default:
              backgroundColor = "#CCCCCC";
              break;
          }

          return (
            <p
              style={{
                backgroundColor,
                borderRadius: "20px",
                textAlign: "center",
                lineHeight: "30px",
                margin: 0,
                padding: "5px 10px",
                color: "#FFFFFF",
              }}
              className="inline-block "
            >
              {capitalizedValue}
            </p>
          );
        },
      },
    },
    {
      name: "average_utilization",
      label: "Average Utilization",
      options: {
        customBodyRender: (value) => (
          <p
            style={{
              textAlign: "center",
              margin: 0,
            }}
          >
            {`${value}%`}
          </p>
        ),
      },
    },

    { name: "last_activity_time", label: "Last Activity Time" },
  ];

  const options = {
    selectableRows: false,
    responsive: "standard",
    elevation: 0,
    rowsPerPage: 10,
    rowsPerPageOptions: [5, 10, 20, 30],
  };
  const getMuiTheme = () =>
    createTheme({
      palette: {
        background: {
          paper: "#1e293b",
          default: "#0f172a",
        },
        mode: "dark",
      },
      components: {
        MuiTableCell: {
          styleOverrides: {
            head: {
              padding: "10px 4px",
              fontWeight: "bold",
              textAlign:'center',
              verticalAlign:'middle',
            },
            body: {
              padding: "7px 20px",
              color: "#e2e8f0",
              fontWeight:'bold',
              verticalAlign:"middle",
            },
          },
        },
        MuiTableHead: {
          styleOverrides: {
            root: {
              display:'table-row-group'
            },
          },
        },
        MuiTableRow: {
          styleOverrides: {
            root: {
              "&:nth-of-type(odd)": {
                backgroundColor: "#1e293b", 
              },
              "&:nth-of-type(even)": {
                backgroundColor: "#334155", 
              },
            },
          },
        },
      },
    });

  return (
    <div className="bg=slate-700 py-10 min-h-screen grid place-items-center">
      <div className="w-10/12 max-w-4xl">
        <ThemeProvider theme={getMuiTheme()}>
          <MUIDataTable
            title="Instance Details"
            data={details}
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default App;
