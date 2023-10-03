import { RELATED_ARTISTS_LIMIT } from "@/components/VisualizationArea/helpers";
import * as RELATED_ARTISTS from "../fixtures/api/related-artists/black-sabbath.json" assert { type: "json" };
import * as ARTIST_DETAILS from "../fixtures/api/artist-details/black-sabbath.json" assert { type: "json" };
import { INITIAL_ARTIST } from "@/containers/store/constants";
import { readableStringList } from "@jtmdias/js-utilities";

const SELECTORS = {
  header: {
    nav: "header-authentication",
    login: "header-user-login",
    user: {
      container: "header-user",
      image: "header-user-image",
      name: "header-user-name",
      logout: "header-user-logout",
    },
  },
  chart: {
    main: "chart",
    group: "chart-group",
    line: "chart-line",
    chartNode: "chart-node",
    chartTitle: "chart-node-name",
  },
  toolbar: {
    main: "chart-toolbar",
    zoomIn: "chart-toolbar-button-zoom-in",
    zoomOut: "chart-toolbar-button-zoom-out",
    center: "chart-toolbar-button-center",
    reset: "chart-toolbar-button-reset",
    clear: "chart-toolbar-button-clear",
  },
  details: {
    main: "artist-details",
    top: {
      title: "artist-details-title",
      listeners: "artist-details-listeners",
      cover: "artist-details-cover",
    },
    meta: {
      container: "artist-details-meta",
      genre: {
        label: "artist-details-genre-label",
        value: "artist-details-genre-value",
      },
      tour: {
        label: "artist-details-tour-label",
        value: "artist-details-tour-value",
      },
      popularity: {
        label: "artist-details-popularity-label",
        value: "artist-details-popularity-value",
      },
      playcount: {
        label: "artist-details-playcount-label",
        value: "artist-details-playcount-value",
      },
    },
    bio: {
      container: "artist-details-bio",
      title: "artist-details-bio-title",
      description: "artist-details-bio-description",
      button: "artist-details-bio-button",
    },
  },
} as const;

beforeEach(() => {
  cy.setupEnvironment("/");
});

it("should login", () => {
  cy.findByTestId(SELECTORS.header.nav).should("exist");
  cy.findByTestId(SELECTORS.header.login).should("not.exist");
  cy.findByTestId(SELECTORS.header.user.container).should("exist");
  cy.findByTestId(SELECTORS.header.user.image).should("be.visible");
  cy.findByTestId(SELECTORS.header.user.name).should("be.visible");
  cy.findByTestId(SELECTORS.header.user.logout).should("be.visible");
});

it("should render a chart with initial data and and details", () => {
  cy.findByTestId(SELECTORS.chart.main).should("exist").and("not.be.empty");

  // Should render a toollbar
  cy.findByTestId(SELECTORS.toolbar.main)
    .should("be.visible")
    .within(() => {
      cy.findByTestId(SELECTORS.toolbar.zoomIn).should("be.visible");
      cy.findByTestId(SELECTORS.toolbar.zoomOut).should("be.visible");
      cy.findByTestId(SELECTORS.toolbar.center).should("be.visible");
      cy.findByTestId(SELECTORS.toolbar.reset).should("be.visible");
      cy.findByTestId(SELECTORS.toolbar.clear).should("be.visible");
    });

  // Should render a chart group
  cy.findByTestId(SELECTORS.chart.group)
    .should("be.visible")
    .within(() => {
      cy.findAllByTestId(SELECTORS.chart.chartNode).as("allResults");

      // Should render 12 lines
      cy.findAllByTestId(SELECTORS.chart.line).should("have.length", RELATED_ARTISTS_LIMIT);

      // Should render 13 chart nodes (1 main + 12 related)
      cy.get("@allResults").should("have.length", RELATED_ARTISTS_LIMIT + 1);

      // First result should be selected and have the correct ext
      cy.get("@allResults")
        .filter("[data-parent]")
        .should("have.attr", "aria-expanded", "true")
        .within(() => {
          cy.findByTestId(SELECTORS.chart.chartTitle).should(
            "have.text",
            ARTIST_DETAILS.artist.name
          );
        });

      // All the 12 other results should also be correctly named
      cy.get("@allResults")
        .filter(":not([data-parent])")
        .should("have.length", RELATED_ARTISTS_LIMIT)
        .each((chartNode, index) => {
          cy.wrap(chartNode)
            .should("have.attr", "aria-expanded", "false")
            .within(() => {
              cy.findByTestId(SELECTORS.chart.chartTitle).should(
                "have.text",
                RELATED_ARTISTS.items[index].name
              );
            });
        });
    });

  // Should render the artist details
  cy.findByTestId(SELECTORS.details.main).should("be.visible");

  // Should have the title, number of listeners and cover visible
  cy.findByTestId(SELECTORS.details.top.title)
    .should("be.visible")
    .and("have.text", ARTIST_DETAILS.artist.name);
  cy.findByTestId(SELECTORS.details.top.listeners)
    .should("be.visible")
    .and(
      "contain.text",
      new Intl.NumberFormat("en-US", {
        maximumSignificantDigits: 3,
      }).format(parseInt(ARTIST_DETAILS.artist.stats.listeners))
    );
  cy.findByTestId(SELECTORS.details.top.cover).should("be.visible");

  // Should have the metadata section visible too
  cy.findByTestId(SELECTORS.details.meta.container)
    .should("be.visible")
    .within(() => {
      // Should render the genres
      cy.findByTestId(SELECTORS.details.meta.genre.label)
        .should("be.visible")
        .and("have.text", "Genres");
      cy.findByTestId(SELECTORS.details.meta.genre.value)
        .should("be.visible")
        .and("have.text", readableStringList(INITIAL_ARTIST.genres as string[]));

      // If the band's on tour or not
      cy.findByTestId(SELECTORS.details.meta.tour.label)
        .should("be.visible")
        .and("have.text", "On Tour");
      cy.findByTestId(SELECTORS.details.meta.tour.value)
        .should("be.visible")
        .and("have.text", ARTIST_DETAILS.artist.ontour === "1" ? "Yes" : "No");

      // Their popularity score
      cy.findByTestId(SELECTORS.details.meta.popularity.label)
        .should("be.visible")
        .and("have.text", "Popularity Score");
      cy.findByTestId(SELECTORS.details.meta.popularity.value)
        .should("be.visible")
        .and("have.text", `${INITIAL_ARTIST.popularity}%`);

      // And finally their play count
      cy.findByTestId(SELECTORS.details.meta.playcount.label)
        .should("be.visible")
        .and("have.text", "Play Count");
      cy.findByTestId(SELECTORS.details.meta.playcount.value)
        .should("be.visible")
        .and(
          "have.text",
          new Intl.NumberFormat("en-US", { maximumSignificantDigits: 3 }).format(
            parseInt(ARTIST_DETAILS.artist.stats.playcount)
          )
        );
    });

  // Should have the bio visible
  cy.findByTestId(SELECTORS.details.bio.container)
    .should("be.visible")
    .within(() => {
      cy.findByTestId(SELECTORS.details.bio.title).should("exist").and("have.text", "Biography");
      cy.findByTestId(SELECTORS.details.bio.description)
        .should("be.visible")
        .and("not.be.empty")
        .and("have.attr", "data-expanded", "false");
      cy.findByTestId(SELECTORS.details.bio.button).should("exist").and("have.text", "Expand");
    });
});
