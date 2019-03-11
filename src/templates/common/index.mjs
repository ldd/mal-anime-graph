import { html } from "https://unpkg.com/lit-html@1.0.0/lit-html.js?module";
import { ifDefined } from "https://unpkg.com/lit-html@1.0.0/directives/if-defined.js?module";

export const columnTemplate = ({ classList = "", style, child } = {}) => html`
  <div class="${`column ${classList}`}" style="${ifDefined(style)}">
    ${child()}
  </div>
`;

export const columnsTemplate = ({
  classList = "",
  style,
  children
} = {}) => () => html`
  <div class="${`columns ${classList}`}" style="${ifDefined(style)}">
    ${children.map(column => column())}
  </div>
`;

export const container = (...children) => () => html`
  <div class="hero-body" id="reconciler-hero">
    ${children.map(child => child())}
  </div>
`;

export const buttonTemplate = ({
  text = "MAL",
  classList = "is-info",
  clickHandler
} = {}) =>
  columnTemplate({
    classList: "is-narrow",
    child: () => html`
      <button class="button ${classList}" @click=${clickHandler}>
        ${text}
      </button>
    `
  });
