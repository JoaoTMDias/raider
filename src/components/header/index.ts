import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { componentStyles } from './styles';
import './header-search';
import "./spotify-logo";
import "./user";

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
              <header-search></header-search>
              <raider-user></raider-user>
            </header>
        `;
  }
}
