import { html } from "https://unpkg.com/lit-html@1.0.0/lit-html.js?module";

export const titleTemplate = ({ title, subtitle }) => html`
  <div class="container has-text-centered">
    <h1 class="title">
      ${title}
    </h1>
    <h2 class="subtitle">
      ${subtitle}
    </h2>
  </div>
`;
