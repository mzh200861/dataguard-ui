import React from "react";
import { BrowserRouter } from "react-router-dom";
import Plugin from "./pages/plugin/Plugin";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Plugin />
        </BrowserRouter>
    );
}

export default App;
