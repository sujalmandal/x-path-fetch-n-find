const puppeteer = require('puppeteer');
const assert = require('assert');
const xPathFinder = require('./XpathFinder');

const URL = "https://www.amazon.in/dp/B08GYH6HKN/ref=syn_sd_onsite_desktop_302?spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUExWlpLMVdJWFZLOTlTJmVuY3J5cHRlZElkPUEwNzU5MTQ5MjkwMkVFSkZNODE0MyZlbmNyeXB0ZWRBZElkPUEwMzA0NTYwM01HVjJRUjlKS0daSiZ3aWRnZXROYW1lPXNkX29uc2l0ZV9kZXNrdG9wJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ&th=1";
const SEARCH_TOKEN = "MSI Bravo 15 Ryzen 7 4800H 15.6\" (39.62cms) FHD Gaming Laptop (16GB/512GB SSD/144 Hz/Windows 10/ RX5500M,GDDR6 4GB/Black/1.86 kg), A4DDR-212IN";

const EXAMPLE_DOT_COM = "https://example.com/"
const SEARCH_TOKEN_EXAMPLE_DOT_COM = "More information..."

describe(EXAMPLE_DOT_COM, () => {

        it("Find selector for : '" + SEARCH_TOKEN_EXAMPLE_DOT_COM + "'", async () => {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.goto(EXAMPLE_DOT_COM);

                const matches = await xPathFinder.getXPathsByText(
                        SEARCH_TOKEN_EXAMPLE_DOT_COM,
                        page
                );
                assert(matches.length>0);
                console.log(matches.length+" matches found.");
                for(let i=0;i<matches.length;i++){
                        let match = matches[i];
                        console.log(match);
                        const searchedToken = await xPathFinder.getTextByXPath(match.xPath,page);
                        console.log(searchedToken)
                        assert(searchedToken===SEARCH_TOKEN_EXAMPLE_DOT_COM);
                }
                await browser.close();
        });
       
});