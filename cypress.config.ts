import { defineConfig } from "cypress";
import { config } from "dotenv";

config();

export default defineConfig({
  projectId: 'xpzu45',
  env: {},
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
  },
});
