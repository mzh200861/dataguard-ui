import React, { useState } from "react";
import { Link } from "react-router-dom";
import CustomSwitch from "./CustomSwitch";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Icons from "./Icons";

const Sidebar = ({ tabs, handlePowerSwitch, tabData }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [powerSwitch, setPowerSwitch] = useState(true);

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const handlePower = (e) => {
        if (e.target.checked) {
            setPowerSwitch(true);
        } else {
            setPowerSwitch(false);
        }
        handlePowerSwitch(e);
    };
    return (
        <div className="sidebar">
            <div className="logo">
                Data<b>Guard</b>
            </div>
            <List className="list">
                {tabs.map((item, index) => (
                    <ListItem
                        className={selectedItem === item ? "selected" : ""}
                        key={index}
                        component={Link}
                        onClick={() => handleItemClick(item)}
                        to={`/home/${tabData[item].title}`}
                    >
                        <ListItemIcon sx={{ justifyContent: "center" }}>
                            <Icons iconName={tabData[item]?.icon} />
                        </ListItemIcon>
                        <ListItemText sx={{ color: "black" }}>
                            {tabData[item].title}
                        </ListItemText>
                    </ListItem>
                ))}
            </List>

            <div className={powerSwitch ? "gradient-green" : "gradient-red"}>
                <div>All plugins {powerSwitch ? "enabled" : "disabled"}</div>
                <CustomSwitch
                    defaultChecked
                    onChange={(e) => handlePower(e)}
                    checked={powerSwitch}
                    sx={{ marginLeft: 5 }}
                />
            </div>
        </div>
    );
};

export default Sidebar;
