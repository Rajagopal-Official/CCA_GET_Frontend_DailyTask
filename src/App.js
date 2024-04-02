import React, { useState } from 'react';
import { Button, Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NestedMenuItem, { NestedMenu } from './Components/NestedMenu/NestedMenu'
import UserTable from './Components/Table/UserTable';
import Echarts from './Components/Charts/Echarts'
import FormValidation from './Components/FormValidation/FormValidation'

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleButtonClick = (component) => {
    setSelectedComponent(component);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedComponent(null);
  };

  return (
    <div >
      <Button sx={{marginX:"10px"}} variant='contained' onClick={() => handleButtonClick("NestedMenu")}>Open Nested Menu</Button>
      <Button sx={{marginX:"10px"}} variant='contained' onClick={() => handleButtonClick("UserTable")}>Open User Table with Edit and Delete Functionality</Button>
      <Button sx={{marginX:"10px"}} variant='contained' onClick={() => handleButtonClick("Echarts")}>Open a Sample Echart</Button>
      <Button sx={{marginX:"10px"}} variant='contained' onClick={() => handleButtonClick("FormValidation")}>FormValidation</Button>
      <Modal open={openModal} onClose={handleCloseModal} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: '1600px', backgroundColor: 'white', padding: '20px' }}>
          <IconButton style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1 }} onClick={handleCloseModal}>
            <CloseIcon />
          </IconButton>
          {selectedComponent === "NestedMenu" && <NestedMenu />}
          {selectedComponent === "UserTable" && <UserTable />}
          {selectedComponent === "Echarts" && <Echarts />}
          {selectedComponent === "FormValidation" && <FormValidation />}
      
        </div>
      </Modal>
    </div>
  );
}

export default App;
