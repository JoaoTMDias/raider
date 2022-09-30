import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import "./components/header";
import "./components/main-content";

@customElement('raider-app')
export class RaiderApp extends LitElement {
    static styles = [
        css`
            :host {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                width: 100vw;
            }
        `
    ];

    @property() name = 'Raider Element';

    render() {
        return html`
            <raider-header></raider-header>
            <main-content></main-content>
            <aside>aside</aside>
            <footer>footer</footer>
        `;
    }
}
