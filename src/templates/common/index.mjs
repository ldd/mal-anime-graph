import { html } from "https://unpkg.com/lit-html@0.10.0/lib/lit-extended.js";

export const columnTemplate = ({ classList, style, child }) => html`
  <div className="column ${classList}" style="${style}">
    ${child()}
  </div>
`;

export const columnsTemplate = ({ classList, style, children }) => () => html`
  <div className="columns ${classList}" style="${style}">
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
    child: () => html`
      <div class="column is-narrow">
        <button className="button ${classList}" on-click=${clickHandler}>
          ${text}
        </button>
      </div>
    `
  });
