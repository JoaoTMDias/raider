import { SetupEnvironmentEndpoints } from './setup-environment.types';

export const DEFAULT_PAGE_URL = `${Cypress.config('baseUrl')}`;

/**
 * Default Endpoints configuration.
 */
export const DEFAULT_ENDPOINTS: SetupEnvironmentEndpoints = [
    {
        method: 'GET',
        url: `${DEFAULT_PAGE_URL}/api/auth/session`,
        response: "api/auth/session/index.json",
        alias: "auth-session",
    },
    {
      method: "GET",
      url: `${DEFAULT_PAGE_URL}/api/related-artists/5M52tdBnJaKSvOpJGz8mfZ`,
      response: "api/related-artists/black-sabbath.json",
      alias: "black-sabbath",
    },
    {
      method: "GET",
      url: `${DEFAULT_PAGE_URL}/api/popular-tracks/5M52tdBnJaKSvOpJGz8mfZ`,
      response: "api/popular-tracks/black-sabbath.json",
      alias: "black-sabbath-popular-tracks",
    },
    {
      method: "GET",
      url: `${DEFAULT_PAGE_URL}/api/artist-details/Black%20Sabbath`,
      response: "api/artist-details/black-sabbath.json",
      alias: "black-sabbath",
    },
];
