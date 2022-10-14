import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { componentStyles } from './styles';
import "../spotify-logo";
import { emitEvent } from '../../../helpers';

type SearchCategory = "artist" | "genre";

@customElement('search-input')
export class SearchInput extends LitElement {
  static styles = [componentStyles];

  @property({
    type: String
  }) category: SearchCategory = 'artist';
  @property({
    type: String
  }) inputValue: string = "";

  /**
   * Handles the input event
   */
  onChangeInput(event: Event) {
    const target = event.target as HTMLInputElement;

    this.inputValue = target.value;
    this.dispatchEvent(
      new CustomEvent("search-input:change", {
        detail: {
          value: this.inputValue
        }
      }));
  }

  /**
   * Handles the select change event
   */
  onSelectType(event: InputEvent) {
    const target = event.target as HTMLInputElement;
    const value = target?.value;

    this.category = value as SearchCategory;
    this.dispatchEvent(
      new CustomEvent("search-input:select-category", {
        detail: {
          value
        }
      }));
  }

  /**
   * Renders the Search Input
   */
  renderSearchInput() {
    const searchLabel = `Search for ${this.category}`;
    const searchPlaceholder = this.category === "artist" ? `Eg. Black Sabbath` : `Eg. Rock`;

    return html`
      <div class="search__input">
        <label id="search-label" class="sr-only" for="search">${searchLabel}</label>
        <input id="search" class="search__text" type="text" placeholder=${searchPlaceholder} @input=${this.onChangeInput}>
        ${this.renderRemoveButton()}
      </div>
    `;
  }

  /**
   * Rendres the Clear button on the input
   */
  renderRemoveButton() {
    const hasValue = this.inputValue.length > 0;

    if (!hasValue) {
      return null
    }

    return html`
      <button type="reset" class="search__clear">
        <span class="sr-only">Clear input</span>
        <svg class="search__remove" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path fill="white"
            d="M0 12C0 5.372 5.372 0 12 0s12 5.372 12 12-5.372 12-12 12S0 18.628 0 12Zm8.203-2.245 2.208 2.203-2.208 2.245c-.436.44-.436 1.153 0 1.552.44.478 1.153.478 1.552 0l2.203-2.166 2.245 2.166c.44.478 1.153.478 1.552 0 .478-.399.478-1.111 0-1.552l-2.166-2.245 2.166-2.203c.478-.399.478-1.111 0-1.552-.399-.436-1.111-.436-1.552 0l-2.245 2.208-2.203-2.208c-.399-.436-1.111-.436-1.552 0-.436.44-.436 1.153 0 1.552Z" />
        </svg>
      </button>
    `;
  }

  /**
   * Renders the category select html element
   */
  renderCategoryType() {
    return html`
      <select name="search-type" id="search-type" class="search__type" @change=${this.onSelectType}>
        <option value="artist">Artist</option>
        <option value="genre">Genre</option>
      </select>
    `;
  }

  render() {
    return html`
          <div class="search__container">
            <svg class="search__icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 25">
              <path fill="#fff"
                d="m23.451 20.798-5.61-5.61a9.747 9.747 0 0 0 1.568-6.783c-.575-4.29-4.09-7.78-8.384-8.324A9.758 9.758 0 0 0 .08 11.025c.544 4.296 4.035 7.814 8.325 8.386a9.745 9.745 0 0 0 6.783-1.569l5.61 5.611a1.875 1.875 0 1 0 2.652-2.655ZM3.709 9.75c0-3.308 2.691-6 6-6 3.308 0 6 2.692 6 6s-2.692 6-6 6c-3.309 0-6-2.69-6-6Z" />
            </svg>
            ${this.renderSearchInput()}
            ${this.renderCategoryType()}
            <input class="sr-only" type="submit" value="Search">
          </div>
    `;
  }
}
