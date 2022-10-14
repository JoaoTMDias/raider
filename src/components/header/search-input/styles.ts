import { css } from 'lit';

export const componentStyles = css`
.search__container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
  border-radius: 3rem;
  padding: 0 1.5rem;
  background-color: #2a2a2a;
  gap: 1rem;
  overflow: hidden;
}

.search__container:focus-within {
  box-shadow: 0 0 0 1px var(--title-color);
}

.search__clear,
.search__icon,
.search__remove {
  width: 1.5rem;
  height: 1.5rem;
}

.search__icon,
.search__remove {
  fill: #fff;
}

.search__clear {
  padding: 0;
  appearance: none;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.search__input {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
}

.search__input,
.search__text {
  width: 100%;
  min-width: 0;
}

.search__text {
  background-color: transparent;
  outline-color: transparent;
  border: none;
  height: 2rem;
  font-size: 1rem;
  text-align: left;
  color: var(--text-color);
  appearance: none;
}

.search__text:focus,
.search__text:focus-visible {
  border: none;
  box-shadow: none;
  outline: none;
}

.search__type {
  width: auto;
  height: 1.5rem;
  background-color: white;
  padding: 0 1rem;
  border-radius: 1.5rem;
}

.sr-only {
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
`;
