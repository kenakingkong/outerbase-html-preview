var privileges = ["cellValue", "configuration"];

var templateCell_$PLUGIN_ID = document.createElement("template");
templateCell_$PLUGIN_ID.innerHTML = `
<style>
  #container { 
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: space-between;
    height: 100%;
    width: calc(100% - 16px);
    padding: 0 8px;
  }

  input {
    height: 100%;
    flex: 1;
    background-color: transparent;
    border: 0;
    min-width: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-family: input-mono,monospace;
    margin: 0;
    padding: 10px 5px;
  }

  input:focus {
    outline: none;
  }

  button {
    border: 1px solid black;
    border-radius: 2px;
    background-color: white;
    cursor: pointer;
  }
</style>

<div id="container">
  <input id="input" />
  <button id="open-preview">Preview</button>
</div>
`;

var templateEditor_$PLUGIN_ID = document.createElement("template");
templateEditor_$PLUGIN_ID.innerHTML = `
  <style>
    #container {
      position: absolute;
      top: -50px;
      left: calc(-25vw + 25%);
      width: 50vw;
      height: auto;
      min-width: 600px;
      max-width: 1000px;
      background: white;
      padding: 20px;
    }

    #close-preview {
      border: none;
      background: none;
      color: black;
      float: right;
      font-family: inter;
      font-size: 24px;
      font-weight: 600;
      cursor: pointer;
    }

    #close-preview:hover {
      opacity: 0.8;
    }

    #header {
      font-family: inter;
      font-weight: 600;
      font-size: 24px;
    }

    #error {
      display: none;
      margin: 10px 0;
      font-family: inter;
      font-weight: 400;
      font-size: 16px;
      color: #B22222;

      -moz-user-select: text;
      -khtml-user-select: text;
      -webkit-user-select: text;
      -ms-user-select: text;
      user-select: text;
    }

    #content {
      height: 400px;
      overflow: scroll;

      -moz-user-select: text;
      -khtml-user-select: text;
      -webkit-user-select: text;
      -ms-user-select: text;
      user-select: text;
    }
  </style>
  
  <div id="container">
    <button id="close-preview" title="close">x</button>
    <h1 id="header"></h1>
    <hr/>
    <div id="error"></div>
    <div id="content"></div>
  </div>
`;

class OuterbasePluginConfig_$PLUGIN_ID {
  constructor() {}
}

class OuterbasePluginCell_$PLUGIN_ID extends HTMLElement {
  static get observedAttributes() {
    return privileges;
  }

  config = new OuterbasePluginConfig_$PLUGIN_ID({});

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.appendChild(templateCell_$PLUGIN_ID.content.cloneNode(true));

    this.config = new OuterbasePluginConfig_$PLUGIN_ID(
      JSON.parse(this.getAttribute("configuration"))
    );
  }

  connectedCallback() {
    this.shadow.querySelector("input").value = this.getAttribute("cellValue");

    this.shadow
      .querySelector("#open-preview")
      .addEventListener("click", () => this.showPreview());
  }

  showPreview() {
    const event = new CustomEvent("custom-change", {
      detail: { action: "onedit", value: true },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(event);
  }
}

class OuterbasePluginEditor_$PLUGIN_ID extends HTMLElement {
  static get observedAttributes() {
    return privileges;
  }

  static NO_VALUE_HEADER = "Nothing to preview";
  static BAD_VALUE_HEADER = "Failed to load preview";
  static PREVIEW_HEADER = "Preview";

  config = new OuterbasePluginConfig_$PLUGIN_ID({});

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.appendChild(templateEditor_$PLUGIN_ID.content.cloneNode(true));

    this.config = new OuterbasePluginConfig_$PLUGIN_ID(
      JSON.parse(this.getAttribute("configuration"))
    );
  }

  connectedCallback() {
    const value = this.getAttribute("cellValue");

    this.shadow
      .querySelector("#close-preview")
      .addEventListener("click", () => this.closePreview());

    if (this.isEmpty(value)) {
      this.shadow.querySelector("#header").innerHTML =
        OuterbasePluginEditor_$PLUGIN_ID.NO_VALUE_HEADER;
      return;
    }

    var error = this.isInvalidHTML(value);
    if (error) {
      this.shadow.querySelector("#header").innerHTML =
        OuterbasePluginEditor_$PLUGIN_ID.BAD_VALUE_HEADER;
      this.shadow.querySelector("#error").style.display = "block";
      this.shadow.querySelector("#error").innerHTML = error.innerHTML;
      this.shadow.querySelector("#content").innerText = value;
      return;
    }

    this.shadow.querySelector("#header").innerHTML =
      OuterbasePluginEditor_$PLUGIN_ID.PREVIEW_HEADER;
    this.shadow.querySelector("#content").innerHTML = value;
  }

  closePreview() {
    const event = new CustomEvent("custom-change", {
      detail: { action: "onstopedit", value: true },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(event);
  }

  isEmpty(data) {
    return !data || data.length == 0;
  }

  isInvalidHTML(data) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, "application/xml");
    return doc.querySelector("parsererror");
  }
}

window.customElements.define(
  "outerbase-plugin-cell-$PLUGIN_ID",
  OuterbasePluginCell_$PLUGIN_ID
);

window.customElements.define(
  "outerbase-plugin-editor-$PLUGIN_ID",
  OuterbasePluginEditor_$PLUGIN_ID
);
