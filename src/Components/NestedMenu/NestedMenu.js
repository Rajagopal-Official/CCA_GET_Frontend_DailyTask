import React, { useState } from "react";
import { Menu, MenuItem, Typography } from "@mui/material";
import NestedMenuItem from "material-ui-nested-menu-item";
import '../../App.css'
export const NestedMenu = () => {
  const [menuPosition, setMenuPosition] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedTree, setSelectedTree] = useState([]);

  const handleRightClick = (e) => {
    if (menuPosition) {
      return;
    }
    e.preventDefault();
    setMenuPosition({
      top: e.pageY,
      left: e.pageX,
    });
  };

  const handleItemClick = (e, item) => {
    setSelectedItem(item);
    setMenuPosition(null); 
    if (item) {
      setSelectedTree(item.split(" > "));//Seperates array of substrings using the delimiter and updates in the setSelectedTree
    }
  };

  const isTreeSelected = (treeItem) => {
    return selectedTree.includes(treeItem);
  };

  return (
    <div onContextMenu={handleRightClick}>
      
      <Typography>Right Click to Open Menu</Typography>
      <Menu
        open={!!menuPosition}
        onClose={() => setMenuPosition(null)}
        anchorReference="anchorPosition"
        anchorPosition={menuPosition}
      >
        <MenuItem
          className={`menu-item ${isTreeSelected("Application Launcher") && "selected"}`}
          onClick={(e) => handleItemClick(e, "Application Launcher")}
        >
          Application Launcher
        </MenuItem>
        <NestedMenuItem
          label="Application 1"
          parentMenuOpen={!!menuPosition}
          className={`menu-item ${isTreeSelected("Application 1") && "selected"}`}
          onClick={(e) => handleItemClick(e, "Application Launcher > Application 1")}
        >
          <NestedMenuItem
            label="Settings"
            parentMenuOpen={!!menuPosition}
            className={`menu-item ${isTreeSelected("Settings") && "selected"}`}
            onClick={(e) => handleItemClick(e, "Application Launcher > Application 1 > Settings")}
          />
          <NestedMenuItem
            label="Launch"
            parentMenuOpen={!!menuPosition}
            className={`menu-item ${isTreeSelected("Launch") && "selected"}`}
            onClick={(e) => handleItemClick(e, "Application Launcher > Application 1 > Launch")}
          />
        </NestedMenuItem>
        <NestedMenuItem
          label="Application 2"
          parentMenuOpen={!!menuPosition}
          className={`menu-item ${isTreeSelected("Application 2") && "selected"}`}
          onClick={(e) => handleItemClick(e, "Application Launcher > Application 2")}
        >
          <NestedMenuItem
            label="Settings"
            parentMenuOpen={!!menuPosition}
            className={`menu-item ${isTreeSelected("Settings") && "selected"}`}
            onClick={(e) => handleItemClick(e, "Application Launcher > Application 2 > Settings")}
          />
          <NestedMenuItem
            label="Launch"
            parentMenuOpen={!!menuPosition}
            className={`menu-item ${isTreeSelected("Launch") && "selected"}`}
            onClick={(e) => handleItemClick(e, "Application Launcher > Application 2 > Launch")}
          />
        </NestedMenuItem>
        <MenuItem
          className={`menu-item ${isTreeSelected("Cost Management") && "selected"}`}
          onClick={(e) => handleItemClick(e, "Cost Management")}
        >
          Cost Management
        </MenuItem>
        <br />
        <MenuItem
          className={`menu-item ${isTreeSelected("Source") && "selected"}`}
          onClick={(e) => handleItemClick(e, "Source")}
        >
          Source
        </MenuItem>
        <br />
        <MenuItem
          className={`menu-item ${isTreeSelected("Really really long folder") && "selected"}`}
          onClick={(e) => handleItemClick(e, "Really really long folder")}
        >
          Really really long folder
        </MenuItem>
      </Menu>
    </div>
  );
};

export default NestedMenu;
