import { SetupEnvironmentEndpoints } from "./fixtures/types";

/**
 * Default Endpoints configuration.
 */
export const DEFAULT_ENDPOINTS: SetupEnvironmentEndpoints = [
    {
      method: "GET",
      url: `/api/related-artists/Black%20Sabbath`,
      response: "./tests/config/mocks/api/related-artists/black-sabbath.json",
    },
    {
      method: "GET",
      url: `/api/popular-tracks/Black%20Sabbath`,
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
export const SESSION_COOKIES: string[] = [];
