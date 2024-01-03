import { RELATED_ARTISTS_LIMIT } from "@/components/VisualizationArea/helpers";
import * as RELATED_ARTISTS from "../config/mocks/api/related-artists/black-sabbath.json";
import * as ARTIST_DETAILS from "../config/mocks/api/artist-details/black-sabbath.json";
import { INITIAL_ARTIST } from "@/containers/store/constants";
import { readableStringList } from "@jtmdias/js-utilities";
import { expect, test } from '../config';
import { getRoutesToIntercept } from "tests/config/helpers";

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
    tracks: {
      container: "artist-details-tracks",
      title: "artist-details-tracks-title",
      list: "artist-details-tracks-list",
      song: {
        container: "artist-details-song",
        button: "artist-details-song-button",
        icon: "artist-details-song-icon",
        play: "artist-details-song-icon-play",
        pause: "artist-details-song-icon-pause",
        cover: "artist-details-song-icon-cover",
        name: "artist-details-song-name",
        audioElement: "artist-details-song-player",
      },
    },
  },
} as const;

test.describe("Homepage", async () => {
  test.beforeEach(async ({ integrationTests }) => {
    await integrationTests.interceptRoutes(getRoutesToIntercept());
    await integrationTests.goto("/");
  });

  test("should login", async ({ integrationTests }) => {
    await expect(integrationTests.page.getByRole("button", { name: "Log out" })).toBeVisible();
    await expect(integrationTests.page.getByTestId(SELECTORS.header.nav)).toBeVisible();
    await expect(integrationTests.page.getByTestId(SELECTORS.header.login)).not.toBeVisible();
    await expect(integrationTests.page.getByTestId(SELECTORS.header.user.container)).toBeVisible();
    await expect(integrationTests.page.getByTestId(SELECTORS.header.user.image)).toBeVisible();
    await expect(integrationTests.page.getByTestId(SELECTORS.header.user.name)).toBeVisible();
    await expect(integrationTests.page.getByTestId(SELECTORS.header.user.logout)).toBeVisible();
  });

  test("should render a chart with initial data and and details", async ({ page }) => {
    const CHART_MAIN = page.getByTestId(SELECTORS.chart.main);
    const TOOLBAR_MAIN = page.getByTestId(SELECTORS.toolbar.main);
    const TOOLBAR_ZOOM_IN = TOOLBAR_MAIN.getByTestId(SELECTORS.toolbar.zoomIn);
    const TOOLBAR_ZOOM_OUT = TOOLBAR_MAIN.getByTestId(SELECTORS.toolbar.zoomOut);
    const TOOLBAR_CENTER = TOOLBAR_MAIN.getByTestId(SELECTORS.toolbar.center);
    const TOOLBAR_RESET = TOOLBAR_MAIN.getByTestId(SELECTORS.toolbar.reset);
    const TOOLBAR_CLEAR = TOOLBAR_MAIN.getByTestId(SELECTORS.toolbar.clear);
    const CHART_GROUP = page.getByTestId(SELECTORS.chart.group);
    const CHART_ALL_RESULTS = CHART_GROUP.getByTestId(SELECTORS.chart.chartNode);
    const CHART_LINE = CHART_GROUP.getByTestId(SELECTORS.chart.line);
    const ARTIST_DETAILS_MAIN = page.getByTestId(SELECTORS.details.main);

    await expect(CHART_MAIN).toBeVisible();
    await expect(CHART_MAIN).not.toBeEmpty();

    // Should render a toolbar
    await expect(TOOLBAR_MAIN).toBeVisible();
    await expect(TOOLBAR_ZOOM_IN).toBeVisible();
    await expect(TOOLBAR_ZOOM_OUT).toBeVisible();
    await expect(TOOLBAR_CENTER).toBeVisible();
    await expect(TOOLBAR_RESET).toBeVisible();
    await expect(TOOLBAR_CLEAR).toBeVisible();

    // Should render a chart group
    await expect(CHART_GROUP).toBeVisible();

    // Should render 12 lines
    await expect(CHART_LINE).toHaveCount(RELATED_ARTISTS_LIMIT);

    // Should render 13 chart nodes (1 main + 12 related)
    await expect(CHART_ALL_RESULTS).toHaveCount(RELATED_ARTISTS_LIMIT + 1);


    // First result should be selected and have the correct ext
    const PARENT_NODE = page.locator(`[data-testid="${SELECTORS.chart.chartNode}"][data-parent]`);
    const PARENT_NODE_TITLE = PARENT_NODE.getByTestId(SELECTORS.chart.chartTitle);
    await expect(PARENT_NODE_TITLE).toHaveText(ARTIST_DETAILS.artist.name);

    // All the 12 other results should also be correctly named
    const OTHER_NODES = page.locator(`[data-testid="${SELECTORS.chart.chartNode}"][aria-expanded="false"]:not([data-parent])`);
    const AMOUNT_OF_NODES = await OTHER_NODES.count();

    await expect(OTHER_NODES).toHaveCount(RELATED_ARTISTS_LIMIT);

    for (let index = 0; index < AMOUNT_OF_NODES; index++) {
      const element = await OTHER_NODES.nth(index);
      await expect(element).toHaveText(RELATED_ARTISTS.items[index].name);
    }

    await expect(ARTIST_DETAILS_MAIN).toBeVisible();

    // Should have the title, number of listeners and cover visible
    const DETAILS = {
      title: page.getByTestId(SELECTORS.details.top.title),
      listeners: page.getByTestId(SELECTORS.details.top.listeners),
      cover: page.getByTestId(SELECTORS.details.top.cover),
      container: page.getByTestId(SELECTORS.details.meta.container),
      genre: {
        label: page.getByTestId(SELECTORS.details.meta.genre.label),
        value: page.getByTestId(SELECTORS.details.meta.genre.value),
      },
      tour: {
        label: page.getByTestId(SELECTORS.details.meta.tour.label),
        value: page.getByTestId(SELECTORS.details.meta.tour.value),
      },
      popularity: {
        label: page.getByTestId(SELECTORS.details.meta.popularity.label),
        value: page.getByTestId(SELECTORS.details.meta.popularity.value),
      },
      playcount: {
        label: page.getByTestId(SELECTORS.details.meta.playcount.label),
        value: page.getByTestId(SELECTORS.details.meta.playcount.value),
      },
      bio: {
        container: page.getByTestId(SELECTORS.details.bio.container),
        title: page.getByTestId(SELECTORS.details.bio.title),
        description: page.getByTestId(SELECTORS.details.bio.description),
        button: page.getByTestId(SELECTORS.details.bio.button)
      },
      tracks: {
        container: page.getByTestId(SELECTORS.details.tracks.container),
        title: page.getByTestId(SELECTORS.details.tracks.title),
        list: page.getByTestId(SELECTORS.details.tracks.list),
      }
    };

    await expect(DETAILS.title).toBeVisible();
    await expect(DETAILS.listeners).toBeVisible();
    await expect(DETAILS.cover).toBeVisible();
    await expect(DETAILS.title).toHaveText(ARTIST_DETAILS.artist.name);
    await expect(DETAILS.listeners).toContainText(new Intl.NumberFormat("en-US", {
      maximumSignificantDigits: 3,
    }).format(parseInt(ARTIST_DETAILS.artist.stats.listeners)));

    // Should have the metadata section visible too
    await expect(DETAILS.container).toBeVisible();

    // Should render the genres
    await expect(DETAILS.genre.label).toBeVisible();
    await expect(DETAILS.genre.label).toHaveText("Genres");
    await expect(DETAILS.genre.value).toBeVisible();
    await expect(DETAILS.genre.value).toHaveText(readableStringList(INITIAL_ARTIST.genres as string[]));

    // If the band's on tour or not
    await expect(DETAILS.tour.label).toBeVisible();
    await expect(DETAILS.tour.label).toHaveText("On Tour");
    await expect(DETAILS.tour.value).toBeVisible();
    await expect(DETAILS.tour.value).toHaveText(ARTIST_DETAILS.artist.ontour === "1" ? "Yes" : "No");

    // Their popularity score
    await expect(DETAILS.popularity.label).toBeVisible();
    await expect(DETAILS.popularity.label).toHaveText("Popularity Score");
    await expect(DETAILS.popularity.value).toBeVisible();
    await expect(DETAILS.popularity.value).toHaveText(`${INITIAL_ARTIST.popularity}%`);

    // And finally their play count
    await expect(DETAILS.playcount.label).toBeVisible();
    await expect(DETAILS.playcount.label).toHaveText("Play Count");
    await expect(DETAILS.playcount.value).toBeVisible();
    await expect(DETAILS.playcount.value).toHaveText(new Intl.NumberFormat("en-US", { maximumSignificantDigits: 3 }).format(
      parseInt(ARTIST_DETAILS.artist.stats.playcount)
    ));

    // Should have the bio visible
    await expect(DETAILS.bio.container).toBeVisible();
    await expect(DETAILS.bio.title).toBeVisible();
    await expect(DETAILS.bio.title).toHaveText("Biography");
    await expect(DETAILS.bio.description).toBeVisible();
    await expect(DETAILS.bio.description).not.toBeEmpty();
    await expect(DETAILS.bio.description).toHaveAttribute("data-expanded", "false");
    await expect(DETAILS.bio.button).toBeVisible();
    await expect(DETAILS.bio.button).toHaveText("Expand");

    // Should have the tracks section
    // and each track should be paused
    await expect(DETAILS.tracks.container).toBeVisible();
    await expect(DETAILS.tracks.title).toBeVisible();
    await expect(DETAILS.tracks.title).toHaveText("Popular tracks");
    await expect(DETAILS.tracks.list).toBeVisible();
    await expect(DETAILS.tracks.list).not.toBeEmpty();
  });
});

