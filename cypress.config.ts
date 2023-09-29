import { defineConfig } from "cypress";
import { config } from "dotenv";
import { plugins } from "cypress-social-logins";


config();

export default defineConfig({
  env: {
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    SPOTIFY_USERNAME: process.env.SPOTIFY_USERNAME,
    SPOTIFY_PASSWORD: process.env.SPOTIFY_PASSWORD,
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
  viewportWidth: 1280,
  viewportHeight: 720,
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: ['cypress/integration/**/*.cy.{js,jsx,ts,tsx}'],
    setupNodeEvents(on, config) {
      on("task", {
        spotifyLogin: options => {
          return plugins.CustomizedLogin(options)
        }
      })
      // implement node event listeners here
    },
  },
});
