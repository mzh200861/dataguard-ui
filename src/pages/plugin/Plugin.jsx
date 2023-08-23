import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import PluginContainer from "../../containers/PluginContainer";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchData, updateData } from "./PluginService";

const Plugin = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        setLoading(true);
        try {
            const data = await fetchData("/data");
            setData(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const activatePlugin = async (plugin, tab) => {
        const { active, inactive } = data.tabdata[tab];
        try {
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
            setLoading(true);
            const response = await updateData("/data", payload);
            setData(response);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    const deactivatePlugin = async (plugin, tab) => {
        try {
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
            setLoading(true);
            const response = await updateData("/data", payload);
            setData(response);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
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
        try {
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
            setLoading(true);
            const response = await updateData("/data", payload);
            setData(response);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const enableAllPlugin = async () => {
        let tabdata = JSON.parse(JSON.stringify(data.tabdata));
        try {
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
            setLoading(true);
            const response = await updateData("/data", payload);
            setData(response);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <div className="flex">
                <Sidebar
                    tabs={data?.tabs || []}
                    handlePowerSwitch={handlePowerSwitch}
                    tabData={data?.tabdata}
                />
                {loading && (
                    <CircularProgress
                        sx={{ position: "absolute", left: "50%", top: "50%" }}
                    />
                )}
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
        </>
    );
};

export default Plugin;
