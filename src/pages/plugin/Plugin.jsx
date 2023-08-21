import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import PluginContainer from "../../containers/PluginContainer";
import { fetchData, updateData } from "./PluginService";

const Plugin = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const data = await fetchData("/data");
        setData(data);
    };

    const activatePlugin = async (plugin, tab) => {
        const { active, inactive } = data.tabdata[tab];
        let payload = {
            ...data,
            tabdata: {
                ...data.tabdata,
                [tab]: {
                    ...data.tabdata[tab],
                    inactive: inactive.filter((item) => item !== plugin),
                    active: [...active, plugin],
                },
            },
            plugins: {
                ...data.plugins,
            },
        };
        const response = await updateData("/data", payload);
        setData(response);
    };
    const deactivatePlugin = async (plugin, tab) => {
        const { active, inactive } = data.tabdata[tab];
        const payload = {
            ...data,
            tabdata: {
                ...data.tabdata,
                [tab]: {
                    ...data.tabdata[tab],
                    active: active.filter((item) => item !== plugin),
                    inactive: [...inactive, plugin],
                },
            },
            plugins: {
                ...data.plugins,
            },
        };
        const response = await updateData("/data", payload);
        setData(response);
    };

    const handlePowerSwitch = (event) => {
        if (event.target.checked) {
            enableAllPlugin();
        } else {
            disableAllPlugin();
        }
    };

    const disableAllPlugin = async () => {
        let tabdata = JSON.parse(JSON.stringify(data.tabdata));
        Object.keys(tabdata).forEach((tab) => {
            const { active, inactive, disabled } = data.tabdata[tab];
            tabdata[tab] = {
                ...data.tabdata[tab],
                disabled: [...inactive, ...active, ...disabled],
            };
        });
        let payload = {
            ...data,
            tabdata: tabdata,
            plugins: {
                ...data.plugins,
            },
        };
        const response = await updateData("/data", payload);
        setData(response);
    };

    const enableAllPlugin = async () => {
        let tabdata = JSON.parse(JSON.stringify(data.tabdata));
        Object.keys(tabdata).forEach((tab) => {
            const { active } = data.tabdata[tab];
            tabdata[tab] = {
                ...data.tabdata[tab],
                active: [...active],
                disabled: [],
            };
        });
        let payload = {
            ...data,
            tabdata: tabdata,
            plugins: {
                ...data.plugins,
            },
        };
        const response = await updateData("/data", payload);
        setData(response);
    };
    return (
        <div className="flex">
            <Sidebar
                tabs={data?.tabs || []}
                handlePowerSwitch={handlePowerSwitch}
                tabData={data?.tabdata}
            />
            <Routes>
                {data?.tabs?.map((tab) => (
                    <Route
                        path={`/home/${data?.tabdata[tab]?.title}`}
                        element={
                            <PluginContainer
                                tabData={data?.tabdata[tab]}
                                allPlugins={data?.plugins}
                                deactivatePlugin={(pluginName) =>
                                    deactivatePlugin(pluginName, tab)
                                }
                                activatePlugin={(pluginName) =>
                                    activatePlugin(pluginName, tab)
                                }
                            />
                        }
                    />
                ))}
            </Routes>
        </div>
    );
};

export default Plugin;