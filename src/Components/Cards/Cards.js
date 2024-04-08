import React from "react";
import { Card, CardContent, Typography, Chip } from "@mui/material";

const InstanceCard = ({ instance }) => {
  //Receives a prop nameed instance
  const capitalizeEachWord = (str) => {
    if (!str) return "N/A";
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  return (
    <Card
      sx={{
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        backgroundColor: "#E5DDC5",
        width: { xs: "100%", sm: "250px" }, //for xtra small screen width is set to 100%,for screen larger than or equal to sm (250px)[Tablets]
        height: "200px",
        margin: "16px",
      }}
    >
      <CardContent
        sx={{
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          style={{ textAlign: "center", fontWeight: "bold" }}
        >
          {capitalizeEachWord(instance.instance_name)}
        </Typography>
        <div style={{ display: "flex", marginBottom: "8px" }}>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ marginRight: "16px", fontWeight: "bold" }}
          >
            CPU Utilization:
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {instance.cpu_utilization !== null
              ? `${instance.cpu_utilization}%`
              : "N/A"}
          </Typography>
        </div>
        <div style={{ display: "flex", marginBottom: "8px" }}>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ marginRight: "16px", fontWeight: "bold" }}
          >
            Memory Utilization:
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {instance.memory_utilization !== null
              ? `${instance.memory_utilization}%`
              : "N/A"}
          </Typography>
        </div>
        <div style={{ display: "flex" }}>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ marginRight: "16px", fontWeight: "bold" }}
          >
            Disk Utilization:
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {instance.disk_utilization !== null
              ? `${instance.disk_utilization}%`
              : "N/A"}
          </Typography>
        </div>
        <Chip
          label={
            instance.state
              ? instance.state.charAt(0).toUpperCase() + instance.state.slice(1)
              : "N/A"
          }
          color={instance.state === "running" ? "success" : "error"}
          variant="outlined"
          sx={{
            backgroundColor: instance.state === "running" ? "#00C853" : "red",
            color: "#fff",
            borderRadius: "20px",
            padding: "5px 10px",
            alignSelf: "center",
            marginTop: "8px",
          }}
        />
      </CardContent>
    </Card>
  );
};

const InstanceGrid = ({ instances }) => {
  const consolidatedDetails = [];
  const instanceIds = new Set();

  instances.forEach((instance) => {
    const { instance_id, metric_type, average_utilization, ...rest } = instance;
    if (!instanceIds.has(instance_id)) {
      instanceIds.add(instance_id);
      consolidatedDetails.push({
        instance_id,
        cpu_utilization: null,
        memory_utilization: null,
        disk_utilization: null,
        ...rest,
      });
    }

    const existingInstance = consolidatedDetails.find(
      (item) => item.instance_id === instance_id
    );

    if (metric_type === "cpu") {
      existingInstance.cpu_utilization = average_utilization;
    } else if (metric_type === "memory") {
      existingInstance.memory_utilization = average_utilization;
    } else if (metric_type === "disk") {
      existingInstance.disk_utilization = average_utilization;
    }
  });

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap", //Wrap in the next line if they dont fit
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      {consolidatedDetails.map((instance, index) => (
        <InstanceCard key={index} instance={instance} />
      ))}
    </div>
  );
};
const App = () => {
  const instances = [
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

  return (
    <div>
      <InstanceGrid instances={instances} />
    </div>
  );
};

export default App;
