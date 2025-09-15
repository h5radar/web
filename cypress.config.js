import { defineConfig } from "cypress";

export default defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "output/cypress",
    overwrite: true,
    html: true,
    json: true,
  },
  downloadsFolder: "output/downloads",
  screenshotsFolder: "output/screenshots",
  videosFolder: "output/videos",
  e2e: {
    excludeSpecPattern: ["**/1-getting-started/**", "**/2-advanced-examples/**"],
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
