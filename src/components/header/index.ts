import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import "../spotify-logo";

@customElement('raider-header')
export class RaiderHeader extends LitElement {
  static styles = [
    css`
            :host,
            .header {
              background-color: var(--background-color);
            }

            .header {
              display: flex;
              flex-direction: row;
              align-items: center;
              height: 3.75rem;
              padding-inline: 1rem;
              position: sticky;
              top: 0;
            }

            .header__title {
              display: flex;
              font-size: 2rem;
              margin: 0;
            }

            .name {
              border: 0;
              clip: rect(0 0 0 0);
              height: auto;
              margin: 0;
              overflow: hidden;
              padding: 0;
              position: absolute !important;
              width: 1px;
              white-space: nowrap;
            }
        `
  ];

  @property() name = 'Raider Element';

  render() {
    return html`
            <header class="header">
              <h1 class="header__title">
                <spotify-logo></spotify-logo><span class="name">Raider App</span>
              </h1>
            </header>
        `;
  }
}
