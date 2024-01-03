import { SetupEnvironmentEndpoints } from "./fixtures/types";

/**
 * Default Endpoints configuration.
 */
export const DEFAULT_ENDPOINTS: SetupEnvironmentEndpoints = [
    {
        method: 'GET',
        url: `/api/auth/session`,
        response: "./tests/config/mocks/api/auth/session/index.json",
    },
    {
      method: "GET",
      url: `/api/related-artists/5M52tdBnJaKSvOpJGz8mfZ`,
      response: "./tests/config/mocks/api/related-artists/black-sabbath.json",
    },
    {
      method: "GET",
      url: `/api/popular-tracks/5M52tdBnJaKSvOpJGz8mfZ`,
      response: "./tests/config/mocks/api/popular-tracks/black-sabbath.json",
    },
    {
      method: "GET",
      url: `/api/artist-details/Black%20Sabbath`,
      response: "./tests/config/mocks/api/artist-details/black-sabbath.json",
    },
];

/**
 * A collection of expected cookies to be set on the user's browser.
 */
export const SESSION_COOKIES = ['next-auth.csrf-token', 'next-auth.session-token'];
