import { css } from 'lit';

export const componentStyles = css`
:host,
.search {
  display: flex;
  width: 100%;
  background-color: var(--background-color);
  font-size: 1rem;
}

@media all and (min-width: 60rem) {
  :host,
  .search {
    max-width: clamp(30rem, 50vh, 40rem);
  }
}

.search {
  flex-direction: column;
}

search-input {
  height: 3rem;
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
