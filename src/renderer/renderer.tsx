/**
 * React renderer.
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./Views/App";
// Import the styles here to process them with webpack
import "@public/style.css";
import { ContentProvider } from "../renderer/Context/ProfileContext";

ReactDOM.render(<ContentProvider><App /></ContentProvider>, document.getElementById("app"));
