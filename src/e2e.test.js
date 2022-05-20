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
    it("should display the search bar, with a hint, search icon and pokeball", async () => {
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
    });
  });

  it("should display 'did you know' placeholder if there are no recent searches", async () => {
    expect(await page.$eval(".lucky", (e) => e.textContent)).toBe(
      "Did you know?"
    );
  });

  afterAll(() => browser.close());
});
