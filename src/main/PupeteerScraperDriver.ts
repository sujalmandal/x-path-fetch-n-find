import puppeteer from 'puppeteer';
import { PupeteerScraper } from './PupeteerScraper';
import assert from 'assert';

export class PupeteerScraperDriver {

    readonly puppeteerScraperInstance: any;
    private browserInstance: any;
    private pageInstance: any;
    private currentURL: string = "";
    private xPathString: string = "";

    constructor(private isDebug: boolean) {
        this.puppeteerScraperInstance = new PupeteerScraper(isDebug);
    }

    public async init() {
        this.browserInstance = await puppeteer.launch();
        this.pageInstance = await this.browserInstance.newPage();
        if (this.isDebug) console.log("Finished initializing FindFetch module.");
        if (this.isDebug) this.pageInstance.on("console", (consoleObj: any) => console.log("chromium:: " + consoleObj.text()));
    }

    public async find(urlToLoad: string, searchToken: string) {
        assert(urlToLoad?.trim().length > 0, "Url cannot be empty.");
        assert(searchToken?.trim().length > 0, "Search token cannot be empty.");

        this.currentURL = urlToLoad;
        await this.pageInstance.goto(this.currentURL);

        let matches = await this.puppeteerScraperInstance.getXPathsByText(searchToken, this.pageInstance);
        assert(matches.length > 0, "No match found for the given search token!");

        for (let i = 0; i < matches.length; i++) {
            let match = matches[i];
            if (match.data == searchToken) {
                this.xPathString = match.xPath;
                if (this.isDebug) console.log("Found selector.");
                break;
            }
        }
    }

    public async fetch(urlToLoad: string) {
        assert(urlToLoad?.trim().length > 0, "Url cannot be empty.");
        this.currentURL = urlToLoad;
        await this.pageInstance.goto(this.currentURL);
        return await this.puppeteerScraperInstance.getTextByXPath(this.xPathString, this.pageInstance);
    }

    public async destroy() {
        this.browserInstance.close();
    }
}