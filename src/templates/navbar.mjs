import { html } from "https://unpkg.com/lit-html@0.10.0/lit-html.js";

const breadCrumbTemplate = (label, href) => {
  const isActive = window.location.pathname.includes(label);
  return html`
    <li class=${isActive ? "is-active" : ""}>
      <a href="${href}" aria-current=${isActive ? "aria-current" : ""}>
        ${label}
      </a>
    </li>
  `;
};
// This is a lit-html template function.
export const navbarTemplate = () =>
  html`
    <div class="navbar-brand">
      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <nav class="navbar-item breadcrumb" aria-label="breadcrumbs">
          <ul>
            ${breadCrumbTemplate("Home", "./")}
            ${breadCrumbTemplate("Charts", "./charts.html")}
          </ul>
        </nav>
      </div>

      <div class="navbar-end">
        <div class="navbar-item"></div>
      </div>
    </div>
  `;
