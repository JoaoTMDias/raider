import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { componentStyles } from "./styles";

@customElement("raider-user")
export class RaiderUser extends LitElement {
  static styles = [componentStyles];

  @property() userData = null;
  @property() isOpen: boolean = false;

  handleOnToggle() {
    console.log("toggle");
    this.isOpen = !this.isOpen;
  }

  renderUserMenu() {
    return html`
      <details class="user-menu" data-open=${this.isOpen}>
        <summary class="user-menu__toggle" role="button" aria-expanded=${this.isOpen} aria-haspopup="menu"
          @click=${this.handleOnToggle}>
          <img class="user-menu__toggle__image" src="https://place-hold.it/24x24" width="24" height="24" loading="lazy"
            alt="" />
          <span class="user-menu__toggle__chevron">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 4">
              <path fill="#fff"
                d="m.427.427 3.396 3.396a.25.25 0 0 0 .354 0L7.573.427A.25.25 0 0 0 7.396 0H.604a.25.25 0 0 0-.177.427Z" />
            </svg>
          </span>
        </summary>
        <ul role="menu" class="user-menu__menu">
          <li role="menuitem" class="user-menu__item">
            <a class="user-menu__profile" href="/JoaoTMDias">Signed in as <strong
                class="css-truncate-target">JoaoTMDias</strong></a>
          </li>
          <li role="menuitem" class="user-menu__item">Mais Cenas</li>
        </ul>
      </details>
    `;
  }

  renderLoginButton() {
    return html`<button type="button" class="user__login">Login with Spotify</button>`;
  }

  render() {
    return html`
      <div class="user">${!this.userData ? this.renderUserMenu() : this.renderLoginButton()}</div>
    `;
  }
}
