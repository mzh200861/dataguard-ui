import React from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const Icons = (props) => {
    if (props.iconName === "icon-marketing") {
        return <AccountBalanceWalletIcon fontSize="small" />;
    }
    if (props.iconName === "icon-finance") {
        return <AttachMoneyIcon fontSize="small" />;
    }
    if (props.iconName === "icon-people") {
        return <AccountBoxIcon fontSize="small" />;
    }
    return null;
};

export default Icons;
