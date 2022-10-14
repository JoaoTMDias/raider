import { css } from 'lit';

export const componentStyles = css`
  :host,
  .user,
  .user__login,
  .user-menu__toggle,
  .user-menu__toggle__chevron {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .user {
    gap: 1rem;
  }

  .user__login,
  .user-menu__toggle {
    height: 2rem;
    width: auto;
    color: #ffffff;
    appearance: none;
    background-color: transparent;
    border: none;
    outline: 2px solid #ffffff;
    border-radius: 2rem;
    padding-inline: 1rem;
    cursor: pointer;
    transition: background-color 200ms ease-in-out, color 200ms ease-in-out;
  }

  .user__login:focus,
  .user__login:hover {
    background-color: #ffffff;
    color: var(--background-color);
  }

  .user__login:focus {
    outline-offset: 2px;
  }

  .user-menu {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    position: relative;
  }

  .user-menu[open] .user-menu__toggle__chevron {
    transform: rotate3d(0, 0, 1, 0.5turn);
  }

  .user-menu__toggle {
    height: 2rem;
    gap: 0.5rem;
  }

  .user-menu__toggle__image {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 1.5rem;
  }

  .user-menu__toggle__chevron {
    width: 0.5rem;
    height: 0.25rem;
    transition: transform 200ms ease-in-out;
  }

  .user-menu__menu {
    word-wrap: break-word;
    font-size: 0.875rem;
    line-height: 1.5;
    color: var(--text-color);
    display: block;
    position: absolute;
    top: 150%;
    z-index: 100;
    padding: 1rem 0.5rem;
    margin: 0;
    list-style: none;
    background-color: var(--main-background-color);
    background-clip: padding-box;
    border: 1px solid var(--border-color);
    border-radius: 0.5rem;
    right: 0;
    left: auto;
    width: 11.25rem;
  }

  .user-menu__item {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 2rem;
  }
`;
