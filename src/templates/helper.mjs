import { html, render } from "https://unpkg.com/lit-html@0.10.0/lit-html.js";
import { navbarTemplate } from "./navbar.mjs";
import { footerTemplate } from "./footer.mjs";

const emptyTemplate = () => html``;

export function addElement(template = emptyTemplate, parent = document.body) {
  render(template(), parent);
}

const getElement = (id, type = id, className = id) => {
  let element = document.getElementById(id);
  if (!element) {
    element = document.createElement(type);
    element.id = id;
    element.className = className;
    document.body.appendChild(element);
  }
  return element;
};
export const addNavbar = (...args) => {
  const navbar = getElement("navbar");
  navbar.setAttribute("role", "navigation");
  navbar.setAttribute("aria-label", "main navigation");
  navbar.classList.add("navbar");
  addElement(navbarTemplate, navbar, ...args);
};

export const addFooter = (...args) => {
  const footer = getElement("footer");
  addElement(footerTemplate, footer, ...args);
};
