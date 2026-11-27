import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

// 截图用：?theme=light / ?theme=dark 强制初始主题
const forced = new URLSearchParams(window.location.search).get("theme");
if (forced === "light") document.documentElement.classList.remove("dark");
if (forced === "dark") document.documentElement.classList.add("dark");

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
