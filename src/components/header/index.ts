import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { componentStyles } from './styles';
import '../header-search';
import "../spotify-logo";

@customElement('raider-header')
export class RaiderHeader extends LitElement {
  static styles = [componentStyles];

  @property() name = 'Raider Element';

  render() {
    return html`
            <header class="header">
              <h1 class="header__title">
                <spotify-logo></spotify-logo><span class="name">Raider App</span>
              </h1>
              <raider-header-search></raider-header-search>
            </header>
        `;
  }
}
