import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { componentStyles } from './styles';
import "../search-input";
@customElement('header-search')
export class HeaderSearch extends LitElement {
  static styles = [componentStyles];

  @property({
    type: String
  }) category: string = 'artist';
  @property({
    type: String
  }) inputValue: string = "";

  /**
   * Handles the Submit event
   */
  onSubmitSearch(event: Event) {
    event.preventDefault();

    this.dispatchEvent(
      new CustomEvent("header-search:submit", {
        detail: { event }
      }));
  }

  /**
   * Handles the input event
   */
  onChangeInput(event: Event) {
    const target = event.target as HTMLInputElement;

    this.inputValue = target.value;

    this.dispatchEvent(
      new CustomEvent("header-search:input", {
        detail: { value: target.value }
      }));
  }

  /**
   * Handles the select change event
   */
  onSelectType(event: InputEvent) {
    const target = event.target as HTMLInputElement;

    this.category = target?.value;
  }

  render() {
    return html`
        <form class="search" role="search" aria-labelledby="search-title" @submit=${this.onSubmitSearch}>
          <h2 id="search-title" class="sr-only">Search Form</h2>
          <search-input @search-input:change=${(cenas) => console.log(cenas)} ></search-input>
        </form>
    `;
  }
}
