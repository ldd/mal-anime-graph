import { html } from "https://unpkg.com/lit-html@1.0.0/lit-html.js?module";
import { ifDefined } from "https://unpkg.com/lit-html@1.0.0/directives/if-defined.js?module";

const breadCrumbTemplate = (label, href) => {
  const isActive = window.location.pathname.includes(label);
  const classList = isActive ? "is-active" : undefined;
  const aria = isActive ? "page" : undefined;
  return html`
    <li class=${ifDefined(classList)}>
      <a href="${href}" aria-current=${ifDefined(aria)}>
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
            ${breadCrumbTemplate("reconciler", "./reconciler.html")}
          </ul>
        </nav>
      </div>

      <div class="navbar-end">
        <div class="navbar-item"></div>
      </div>
    </div>
  `;
