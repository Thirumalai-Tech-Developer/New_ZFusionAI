import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Build-time SEO tags are for crawlers; <SeoHead /> manages the head from here on.
document.querySelectorAll("[data-seo-static]").forEach((el) => el.remove());

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(<App />);
}