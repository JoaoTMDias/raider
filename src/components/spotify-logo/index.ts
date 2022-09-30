import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('spotify-logo')
export class SpotifyLogo extends LitElement {
  static styles = [
    css`
            :host,
            .logo {
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
              width: 2rem;
              height: 2rem;
            }
        `
  ];

  render() {
    return html`
      <svg class="logo" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32">
        <path fill="var(--title-color)"
          d="M16 0C7.164 0 0 7.164 0 16c0 8.837 7.164 16 16 16 8.837 0 16-7.163 16-16 0-8.836-7.163-16-16-16Zm7.337 23.077a.997.997 0 0 1-1.371.33c-3.757-2.294-8.486-2.814-14.056-1.542a.998.998 0 0 1-.443-1.945c6.094-1.392 11.322-.793 15.54 1.785.47.288.619.902.33 1.372Zm1.959-4.357a1.247 1.247 0 0 1-1.716.411c-4.3-2.643-10.857-3.409-15.944-1.865a1.25 1.25 0 0 1-1.556-.83 1.25 1.25 0 0 1 .832-1.557c5.81-1.763 13.034-.909 17.973 2.126.586.361.772 1.13.41 1.715Zm.168-4.536c-5.157-3.063-13.665-3.345-18.588-1.85a1.496 1.496 0 1 1-.869-2.865c5.652-1.716 15.047-1.384 20.984 2.14.713.422.946 1.34.524 2.051a1.495 1.495 0 0 1-2.05.524h-.001Z" />
      </svg>
        `;
  }
}
