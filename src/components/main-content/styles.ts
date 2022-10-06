import { css } from 'lit';

export const componentStyles = css`
  :host
  main {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }


  :host {
    background-color: var(--background-color);
  }

  .main {
    background-color: var(--main-background-color);
    width: 100%;
    height: 100%;
    max-height: calc(100vh - 3.75rem);
    border-radius: 0.5rem;
  }
`;
