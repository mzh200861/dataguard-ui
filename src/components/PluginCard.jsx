import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import React from "react";
import CustomSwitch from "./CustomSwitch";

const PluginCard = (props) => {
    const [status, setStatus] = React.useState(
        props.tabDataHash[props.pluginName]?.active === true
            ? "Allowed"
            : "Blocked"
    );

    const updateStatus = () => {
        if (props.tabDataHash[props.pluginName]?.active === true) {
            setStatus("Allowed");
        } else {
            setStatus("Blocked");
        }
    };
    React.useEffect(() => {
        updateStatus();
    }, [props.tabDataHash[props.pluginName]]);

    const handleSwitch = (e) => {
        if (e.target.checked) {
            props.activated(props.pluginName);
        } else {
            props.deactivated(props.pluginName);
        }
    };
    return (
        <Card
            sx={{
                width: 300,
                height: 200,
                margin: "20px",
                opacity: props.tabDataHash[props.pluginName]?.disabled
                    ? 0.5
                    : 1,
                pointerEvents: props.tabDataHash[props.pluginName]?.disabled
                    ? "none"
                    : "auto",
            }}
        >
            <CardContent>
                <Stack
                    direction="column"
                    spacing={1}
                    alignItems="center"
                    sx={{ float: "right", marginTop: 1 }}
                >
                    <CustomSwitch
                        checked={
                            props.tabDataHash[props.pluginName]?.active === true
                        }
                        onChange={(e) => handleSwitch(e)}
                    />
                    <Typography
                        sx={{ fontSize: 10 }}
                        color={
                            props.tabDataHash[props.pluginName]?.active === true
                                ? "green"
                                : "red"
                        }
                    >
                        {status}
                    </Typography>
                </Stack>
                <Typography sx={{ fontSize: 14, marginTop: 1 }}>
                    {props.tabDataHash[props.pluginName]?.title}
                </Typography>

                <Typography sx={{ fontSize: 12, marginTop: 4, marginRight: 8 }}>
                    {props.tabDataHash[props.pluginName]?.description}
                </Typography>
            </CardContent>
        </Card>
    );
};
export default PluginCard;
