import { svg } from "https://unpkg.com/lit-html@1.0.0/lit-html.js?module";

export const svgSyncTemplate = () => svg`
  <svg viewBox="0 0 200 200" style="position:absolute" xmlns="http://www.w3.org/2000/svg" width="100%" height="200px">
    <defs>
      <marker
        id="arrowhead"
        viewBox="0 0 10 10"
        refX="3"
        refY="5"
        markerWidth="3"
        markerHeight="3"
        orient="auto"
        fill="gray"
        fill-opacity="0.9"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" />
      </marker>
    </defs>
    <g fill="none" stroke="black" stroke-width="2" marker-end="url(#arrowhead)">
      <path
        id="arrowRight"
        d="M 30 140 C 80 150, 130 150, 170 140"
        stroke-dasharray="27 3"
        stroke-width="5"
        stroke="gray"
        stroke-opacity="0.6"
      />
      <path
        id="arrowLeft"
        d="M 180 60 C 130 50, 80 50, 30 60"
        stroke-dasharray="27 3"
        stroke-width="5"
        stroke="gray"
        stroke-opacity="0.6"
      />
    </g>
  </svg>
`;
