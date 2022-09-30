import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('main-content')
export class MainContent extends LitElement {
  static styles = [
    css`
      :host
      main {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 1rem;
      }


      :host {
        background-color: var(--background-color);
      }

      .main {
        background-color: var(--main-background-color);
        width: 100%;
        height: 100%;
        max-height: calc(100vh - 3.75rem);
        border-radius: 0.5rem;
      }
        `
  ];

  render() {
    return html`
            <main class="main">
              main content here
            </main>
        `;
  }
}
