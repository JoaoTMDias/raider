import { css } from 'lit';

export const componentStyles = css`
  :host,
  .header {
    background-color: var(--background-color);
  }

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 3.75rem;
    padding-inline: 1rem;
    position: sticky;
    top: 0;
    gap: 1.5rem;
  }

  .header__title {
    display: flex;
    font-size: 2rem;
    margin: 0;
  }

  header-search {
    height: 3rem;
  }

  .name {
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
