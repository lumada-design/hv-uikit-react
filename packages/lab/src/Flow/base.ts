import { css } from "@emotion/react";
import { theme } from "@hitachivantara/uikit-react-core";

// synced from node_modules/reactflow/dist/style.css
export const flowStyles = css`
  /* this gets exported as style.css and can be used for the default theming */
  /* these are the necessary styles for React Flow, they get used by base.css and style.css */
  .react-flow__container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .react-flow__pane {
    z-index: 1;
    cursor: -webkit-grab;
    cursor: grab;
  }
  .react-flow__pane.selection {
    cursor: pointer;
  }
  .react-flow__pane.dragging {
    cursor: -webkit-grabbing;
    cursor: grabbing;
  }
  .react-flow__viewport {
    transform-origin: 0 0;
    z-index: 2;
    pointer-events: none;
  }
  .react-flow__renderer {
    z-index: 4;
  }
  .react-flow__selection {
    z-index: 6;
  }
  .react-flow__nodesselection-rect:focus,
  .react-flow__nodesselection-rect:focus-visible {
    outline: none;
  }
  .react-flow .react-flow__edges {
    pointer-events: none;
    overflow: visible;
  }
  .react-flow__edge-path,
  .react-flow__connection-path {
    stroke: ${theme.colors.text};
    stroke-width: 1;
    fill: none;
  }
  .react-flow__edge {
    pointer-events: visibleStroke;
    cursor: pointer;
  }
  .react-flow__edge.animated path {
    stroke-dasharray: 5;
    -webkit-animation: dashdraw 0.5s linear infinite;
    animation: dashdraw 0.5s linear infinite;
  }
  .react-flow__edge.animated path.react-flow__edge-interaction {
    stroke-dasharray: none;
    -webkit-animation: none;
    animation: none;
  }
  .react-flow__edge.inactive {
    pointer-events: none;
  }
  .react-flow__edge.selected,
  .react-flow__edge:focus,
  .react-flow__edge:focus-visible {
    outline: none;
  }
  .react-flow__edge.selected .react-flow__edge-path,
  .react-flow__edge:focus .react-flow__edge-path,
  .react-flow__edge:focus-visible .react-flow__edge-path {
    stroke: #555;
  }
  .react-flow__edge-textwrapper {
    pointer-events: all;
  }
  .react-flow__edge-textbg {
    fill: white;
  }
  .react-flow__edge .react-flow__edge-text {
    pointer-events: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }
  .react-flow__connection {
    pointer-events: none;
  }
  .react-flow__connection .animated {
    stroke-dasharray: 5;
    -webkit-animation: dashdraw 0.5s linear infinite;
    animation: dashdraw 0.5s linear infinite;
  }
  .react-flow__connectionline {
    z-index: 1001;
  }
  .react-flow__nodes {
    pointer-events: none;
    transform-origin: 0 0;
  }
  .react-flow__node {
    position: absolute;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    pointer-events: all;
    transform-origin: 0 0;
    box-sizing: border-box;
    cursor: -webkit-grab;
    cursor: grab;
  }
  .react-flow__node.dragging {
    cursor: -webkit-grabbing;
    cursor: grabbing;
  }
  .react-flow__nodesselection {
    z-index: 3;
    transform-origin: left top;
    pointer-events: none;
  }
  .react-flow__nodesselection-rect {
    position: absolute;
    pointer-events: all;
    cursor: -webkit-grab;
    cursor: grab;
  }
  .react-flow__handle {
    position: absolute;
    pointer-events: none;
    min-width: 5px;
    min-height: 5px;
    width: 6px;
    height: 6px;
    background: #1a192b;
    border: 1px solid white;
    border-radius: 100%;
  }
  .react-flow__handle.connectionindicator {
    pointer-events: all;
    cursor: crosshair;
  }
  .react-flow__handle-bottom {
    top: auto;
    left: 50%;
    bottom: -4px;
    transform: translate(-50%, 0);
  }
  .react-flow__handle-top {
    left: 50%;
    top: -4px;
    transform: translate(-50%, 0);
  }
  .react-flow__handle-left {
    top: 50%;
    left: -4px;
    transform: translate(0, -50%);
  }
  .react-flow__handle-right {
    right: -4px;
    top: 50%;
    transform: translate(0, -50%);
  }
  .react-flow__edgeupdater {
    cursor: move;
    pointer-events: all;
  }
  .react-flow__panel {
    position: absolute;
    z-index: 5;
    margin: 15px;
  }
  .react-flow__panel.top {
    top: 0;
  }
  .react-flow__panel.bottom {
    bottom: 0;
  }
  .react-flow__panel.left {
    left: 0;
  }
  .react-flow__panel.right {
    right: 0;
  }
  .react-flow__panel.center {
    left: 50%;
    transform: translateX(-50%);
  }
  .react-flow__attribution {
    font-size: 10px;
    background: rgba(255, 255, 255, 0.5);
    padding: 2px 3px;
    margin: 0;
  }
  .react-flow__attribution a {
    text-decoration: none;
    color: #999;
  }
  @-webkit-keyframes dashdraw {
    from {
      stroke-dashoffset: 10;
    }
  }
  @keyframes dashdraw {
    from {
      stroke-dashoffset: 10;
    }
  }
  .react-flow__edgelabel-renderer {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }
  .react-flow__edge.updating .react-flow__edge-path {
    stroke: #777;
  }
  .react-flow__edge-text {
    font-size: 10px;
  }
  .react-flow__node.selectable:focus,
  .react-flow__node.selectable:focus-visible {
    outline: none;
  }
  .react-flow__node-default,
  .react-flow__node-input,
  .react-flow__node-output {
    padding: ${theme.space.sm};
    border-radius: ${theme.radii.round};
    width: 150px;
    color: ${theme.colors.text};
    text-align: center;
    border: 1px solid ${theme.colors.negative};
    background-color: ${theme.colors.negativeDimmed};
  }
  .react-flow__node-group {
    color: ${theme.colors.text};
    text-align: center;
  }
  .react-flow__node-default::before {
    content: "Unknown node type";
    display: block;
  }
  .react-flow__node-default.selectable:hover,
  .react-flow__node-input.selectable:hover,
  .react-flow__node-output.selectable:hover,
  .react-flow__node-group.selectable:hover {
  }
  .react-flow__node-default.selectable.selected,
  .react-flow__node-default.selectable:focus,
  .react-flow__node-default.selectable:focus-visible,
  .react-flow__node-input.selectable.selected,
  .react-flow__node-input.selectable:focus,
  .react-flow__node-input.selectable:focus-visible,
  .react-flow__node-output.selectable.selected,
  .react-flow__node-output.selectable:focus,
  .react-flow__node-output.selectable:focus-visible,
  .react-flow__node-group.selectable.selected,
  .react-flow__node-group.selectable:focus,
  .react-flow__node-group.selectable:focus-visible {
  }
  .react-flow__node-group {
    background-color: rgba(240, 240, 240, 0.25);
  }
  .react-flow__nodesselection-rect,
  .react-flow__selection {
    background: rgba(0, 89, 220, 0.08);
  }
  .react-flow__nodesselection-rect:focus,
  .react-flow__nodesselection-rect:focus-visible,
  .react-flow__selection:focus,
  .react-flow__selection:focus-visible {
    outline: none;
  }
  .react-flow__controls {
    box-shadow: ${theme.colors.shadow};
  }
  .react-flow__controls-button {
    border: none;
    background: #fefefe;
    border-bottom: 1px solid #eee;
    box-sizing: content-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 16px;
    height: 16px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    padding: 5px;
  }
  .react-flow__controls-button:hover {
    background: #f4f4f4;
  }
  .react-flow__controls-button svg {
    width: 100%;
    max-width: 12px;
    max-height: 12px;
  }
  .react-flow__controls-button:disabled {
    pointer-events: none;
  }
  .react-flow__controls-button:disabled svg {
    fill-opacity: 0.4;
  }
  .react-flow__minimap {
    background-color: #fff;
  }
  .react-flow__resize-control {
    position: absolute;
  }
  .react-flow__resize-control.left,
  .react-flow__resize-control.right {
    cursor: ew-resize;
  }
  .react-flow__resize-control.top,
  .react-flow__resize-control.bottom {
    cursor: ns-resize;
  }
  .react-flow__resize-control.top.left,
  .react-flow__resize-control.bottom.right {
    cursor: nwse-resize;
  }
  .react-flow__resize-control.bottom.left,
  .react-flow__resize-control.top.right {
    cursor: nesw-resize;
  }
  /* handle styles */
  .react-flow__resize-control.handle {
    width: 4px;
    height: 4px;
    border: 1px solid #fff;
    border-radius: 1px;
    background-color: ${theme.colors.primary};
    transform: translate(-50%, -50%);
  }
  .react-flow__resize-control.handle.left {
    left: 0;
    top: 50%;
  }
  .react-flow__resize-control.handle.right {
    left: 100%;
    top: 50%;
  }
  .react-flow__resize-control.handle.top {
    left: 50%;
    top: 0;
  }
  .react-flow__resize-control.handle.bottom {
    left: 50%;
    top: 100%;
  }
  .react-flow__resize-control.handle.top.left {
    left: 0;
  }
  .react-flow__resize-control.handle.bottom.left {
    left: 0;
  }
  .react-flow__resize-control.handle.top.right {
    left: 100%;
  }
  .react-flow__resize-control.handle.bottom.right {
    left: 100%;
  }
  /* line styles */
  .react-flow__resize-control.line {
    border-color: ${theme.colors.primaryStrong};
    border-width: 0;
    border-style: dashed;
  }
  .react-flow__resize-control.line.left,
  .react-flow__resize-control.line.right {
    width: 1px;
    transform: translate(-50%, 0);
    top: 0;
    height: 100%;
  }
  .react-flow__resize-control.line.left {
    left: 0;
    border-left-width: 1px;
  }
  .react-flow__resize-control.line.right {
    left: 100%;
    border-right-width: 1px;
  }
  .react-flow__resize-control.line.top,
  .react-flow__resize-control.line.bottom {
    height: 1px;
    transform: translate(0, -50%);
    left: 0;
    width: 100%;
  }
  .react-flow__resize-control.line.top {
    top: 0;
    border-top-width: 1px;
  }
  .react-flow__resize-control.line.bottom {
    border-bottom-width: 1px;
    top: 100%;
  }
`;
