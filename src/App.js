import React, { useState } from "react";
import { Button, Modal, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NestedMenuItem, { NestedMenu } from "./Components/NestedMenu/NestedMenu";
import UserTable from "./Components/Table/UserTable";
import Echarts from "./Components/Charts/Echarts";
import FormValidation from "./Components/FormValidation/FormValidation";
import DisplayTable from "./Components/DisplayTable/DisplayTable";
import Cards from "./Components/Cards/Cards";

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [showDisplayTable, setShowDisplayTable] = useState(false); // A seperate state for displaying table with vertical scrolling enabled

  const handleButtonClick = (component) => {
    setSelectedComponent(component);
    setOpenModal(true);
    if (component === "DisplayTable") {
      setShowDisplayTable(true);
    } else {
      setShowDisplayTable(false);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedComponent(null);
    setShowDisplayTable(false);
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1600,
    maxWidth: "95vw", // Set maximum width to prevent overflow
    maxHeight: "90vh", // Set maximum height to enable scrolling
    overflowY: "auto", // Enable vertical scrolling
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Button
        sx={{ marginX: "10px" }}
        variant="contained"
        onClick={() => handleButtonClick("NestedMenu")}
      >
        Open Nested Menu
      </Button>
      <Button
        sx={{ marginX: "10px" }}
        variant="contained"
        onClick={() => handleButtonClick("UserTable")}
      >
        Open User Table with Edit and Delete Functionality
      </Button>
      <Button
        sx={{ marginX: "10px" }}
        variant="contained"
        onClick={() => handleButtonClick("Echarts")}
      >
        Open a Sample Echart
      </Button>
      <Button
        sx={{ marginX: "10px" }}
        variant="contained"
        onClick={() => handleButtonClick("FormValidation")}
      >
        FormValidation
      </Button>
      <Button
        sx={{ marginX: "10px" }}
        variant="contained"
        onClick={() => handleButtonClick("DisplayTable")}
      >
        DisplayTable
      </Button>
      <Button
        sx={{ marginX: "10px" }}
        variant="contained"
        onClick={() => handleButtonClick("Cards")}
      >
        MUI Cards
      </Button>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={modalStyle}>
          <IconButton
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              zIndex: 1,
            }}
            onClick={handleCloseModal}
          >
            <CloseIcon />
          </IconButton>
          {/* Render selected component */}
          {selectedComponent === "NestedMenu" && <NestedMenu />}
          {selectedComponent === "UserTable" && <UserTable />}
          {selectedComponent === "Echarts" && <Echarts />}
          {selectedComponent === "FormValidation" && <FormValidation />}
          {selectedComponent === "DisplayTable" && showDisplayTable && (
            <DisplayTable />
          )}
          {selectedComponent === "Cards" && <Cards />}
        </Box>
      </Modal>
    </div>
  );
}

export default App;
