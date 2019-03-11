import { html } from "https://unpkg.com/lit-html@1.0.0/lit-html.js?module";

// This is a lit-html template function.
export const footerTemplate = () =>
  html`
    <div class="content has-text-centered">
      © 2019, ldd
      <p>
        <a href="https://github.com/ldd/mal-anime-graph">View Source</a>
      </p>
    </div>
  `;
