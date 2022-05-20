import puppeteer from "puppeteer";

describe("General end-user flow test, with Puppeteer", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      args: ["--no-sandbox", "--window-size=1920,1080"],
      timeout: 10000,
    });

    page = await browser.newPage();
    await page._client.send("Emulation.clearDeviceMetricsOverride");
    await page.goto("http://localhost:4221");
  });

  describe("Test the Home screen", () => {
    it("should display the Pokemon logo, search bar/icon and pokeball", async () => {
      expect(await page.$eval(".homeLogo", (image) => image.src)).toBe(
        "http://localhost:4221/images/logo.svg"
      );

      expect(await page.$eval(".homeLogo", (e) => e.alt)).toBe("Pokémon Logo");

      expect(await page.$eval("#searchIcon", (e) => e.textContent)).toBe(
        "search"
      );

      expect(await page.$eval("#search", (e) => e.placeholder)).toBe(
        "Find a Pokémon..."
      );

      expect(await page.$eval(".pokeball", (e) => e.src)).toBe(
        "http://localhost:4221/favicon/favicon-32x32.png"
      );

      expect(await page.$eval(".pokeball", (e) => e.alt)).toBe("random");

      // Fade effect timeout
      await page.waitForTimeout(500);

      await page.screenshot({ path: "./src/screenshots/home.png" });
    });

    it("should display 'did you know' placeholder if there are no recent searches", async () => {
      expect(await page.$eval(".lucky", (e) => e.textContent)).toBe(
        "Did you know?"
      );
    });

    it("should display dark mode if light bulb button is clicked", async () => {
      await page.click(".switch");

      expect(
        await page.$eval("body", (e) => Object.values(e.classList))
      ).toContain("dark");

      await page.waitForTimeout(500);
      await page.screenshot({ path: "./src/screenshots/dark.png" });

      await page.click(".switch");

      expect(
        await page.$eval("body", (e) => Object.values(e.classList))
      ).not.toContain("dark");
    });
  });

  describe("Test redirects and Details Page", () => {
    it("should redirect to details page if the user clicks on the random button", async () => {
      await page.click(".pokeball");

      await page.waitForTimeout(500);
      await page.waitForSelector(".Detail");

      await page.screenshot({ path: "./src/screenshots/detail.png" });

      expect(
        await page.$eval(".pokeHeader", (e) => e.textContent.length > 0)
      ).toBe(true);
    });

    it("should contain the name of a random Pokémon", async () => {
      expect(
        await page.$eval(".pokeHeader", (e) =>
          [
            "Bulbasaur",
            "Ivysaur",
            "Venusaur",
            "Charmander",
            "Charmeleon",
            "Charizard",
            "Squirtle",
            "Wartortle",
            "Blastoise",
            "Caterpie",
            "Metapod",
            "Butterfree",
            "Weedle",
            "Kakuna",
            "Beedrill",
            "Pidgey",
            "Gengar",
            "Snorlax",
            "Ninetales",
            "Dragonite",
            "Eevee",
            "Arcanine",
          ].includes(e.textContent)
        )
      ).toBe(true);
    });

    it("should redirect to home page if the top-left logo is clicked", async () => {
      await page.click(".logo");
      await page.waitForTimeout(500);
      await page.waitForSelector(".Home");
      await page.screenshot({ path: "./src/screenshots/recent.png" });
    });

    it("should show the most recently searched Pokémon", async () => {
      expect(await page.$eval(".searchHeader", (e) => e.textContent)).toBe(
        "historyRecent Searches"
      );

      expect(await page.$eval(".pokeImage", (e) => e.alt)).toBe("illustration");
    });
  });

  afterAll(() => browser.close());
});
