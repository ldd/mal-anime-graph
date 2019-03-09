import { html } from "https://unpkg.com/lit-html@0.10.0/lib/lit-extended.js";

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
