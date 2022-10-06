import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { componentStyles } from './styles';

@customElement('main-content')
export class MainContent extends LitElement {
  static styles = [componentStyles];

  render() {
    return html`
            <main class="main">
              main content here
            </main>
        `;
  }
}
