class LoadingComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._show = false;
    this.render();
  }

  get show() {
    return this._show;
  }

  set show(state) {
    this._show = state;
    this.render();
  }

  static get observedAttributes() {
    return ['show'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'show' && oldValue !== newValue) {
      this.show = ['', 'true'].includes(newValue);
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
<style>
  .loading-component {
    --loading-component-width: 14px;
    --loading-component-color: #333;
    --loading-component-duration: 1.6s;

    --loading-component-max: calc(var(--loading-component-width) * 4);
    --loading-component-centre: calc(var(--loading-component-width) * 2);
  }

  .loading-component {
    top: 50%;
    left: 50%;
    display: ${this._show ? 'flex' : 'none'};
    user-focus: none;
    position: absolute;
    pointer-events: none;
    transform: translate(-50%);
  }

  .loading-component__item {
    height: 1px;
    width: var(--loading-component-max);
  }

  .loading-component__item:nth-child(1) {
    transform-origin: right center;
    transform: rotate(120deg);
  }

  .loading-component__item:nth-child(3) {
    transform-origin: left center;
    transform: rotate(-120deg);
  }

  .loading-component__box {
    left: 0;
    top: 50%;
    border-radius: 50%;
    box-sizing: border-box;
    transform: translate(-50%, -50%);
    animation-iteration-count: infinite;
    width: var(--loading-component-width);
    height: var(--loading-component-width);
    animation-name: loading-component-animation;
    border: 2px solid var(--loading-component-color);
    animation-duration: var(--loading-component-duration);
  }


  @keyframes loading-component-animation {
    50% {
      margin-left: var(--loading-component-centre)
    }
    100% {
      margin-left: var(--loading-component-max)
    }
  }
</style>

<div class="loading-component">
  <div class="loading-component__item">
    <div class="loading-component__box"></div>
  </div>
  <div class="loading-component__item">
    <div class="loading-component__box"></div>
  </div>
  <div class="loading-component__item">
    <div class="loading-component__box"></div>
  </div>
</div>
    `;
  }
}

customElements.define('loading-component', LoadingComponent);
