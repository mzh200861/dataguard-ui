import Box from "@mui/material/Box";

import PluginCard from "../components/PluginCard";
import React from "react";

const PluginContainer = ({
    tabData,
    allPlugins,
    activatePlugin,
    deactivatePlugin,
}) => {
    const [plugins, setPlugins] = React.useState([]);
    const [tabDataHash, setTabDataHash] = React.useState({});

    React.useEffect(() => {
        createDataHash(tabData);
    }, [tabData]);

    const createDataHash = (tabdata) => {
        let tabDataHash = {};
        let plugins = [
            ...tabdata.active,
            ...tabdata.inactive,
            ...tabdata.disabled,
        ];
        plugins.sort();
        //delete duplicate from plugins
        plugins = plugins.filter((item, index) => {
            return plugins.indexOf(item) === index;
        });
        for (let item of tabdata.active) {
            tabDataHash[item] = {
                ...tabDataHash[item],
                title: item,
                description: allPlugins[item].description,
                icon: "icon",
                active: true,
                // disabled: false,
                // inactive: false,
            };
        }
        for (let item of tabdata.inactive) {
            tabDataHash[item] = {
                ...tabDataHash[item],
                title: item,
                description: allPlugins[item].description,
                icon: "icon",
                // active: false,
                // disabled: false,
                inactive: true,
            };
        }
        for (let item of tabdata.disabled) {
            tabDataHash[item] = {
                ...tabDataHash[item],
                title: item,
                description: allPlugins[item].description,
                icon: "icon",
                //active: false,
                disabled: true,
                //inactive: false,
            };
        }
        setPlugins(plugins);
        setTabDataHash(tabDataHash);
    };

    return (
        <Box sx={{ height: "100vh" }}>
            <Box display="flex" sx={{ marginLeft: 6, marginTop: 6 }}>
                <div>{tabData.title} Plugins</div>
            </Box>
            <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="left"
                sx={{ margin: 3 }}
            >
                {plugins.map((plugin) => (
                    <PluginCard
                        tabDataHash={tabDataHash}
                        pluginName={plugin}
                        activated={activatePlugin}
                        deactivated={deactivatePlugin}
                    />
                ))}
            </Box>
        </Box>
    );
};
export default PluginContainer;
