const puppeteer = require('puppeteer');
const assert = require('assert');
const xPathFinder = require('./XpathFinder');

const TEST_DATASOURCE_URL = "https://example.com/"
const TEST_SEARCH_TOKEN = "More information..."

describe(TEST_DATASOURCE_URL, () => {
        
        it("Find selector for : \n" + TEST_SEARCH_TOKEN + "", async () => {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.goto(TEST_DATASOURCE_URL);

                const matches = await xPathFinder.getXPathsByText(
                        TEST_SEARCH_TOKEN,
                        page
                );

                assert(matches.length>0);
                
                console.log("\n"+matches.length+" matches found.");

                for(let i=0;i<matches.length;i++){
                        let match = matches[i];
                        console.log("\n\nResult no. "+(i+1)+"\n");
                        console.log(match);
                }

                let atleastOneSelectorMatching = false;

                for(let i=0;i<matches.length;i++){
                        let match = matches[i];
                        const searchedToken = await xPathFinder.getTextByXPath(match.xPath,page);
                        if(atleastOneSelectorMatching!=true && searchedToken==TEST_SEARCH_TOKEN){
                                console.log("\n\n\Result no. "+(i+1)+" completely matches searched token!");
                                atleastOneSelectorMatching=true;
                                break;
                        }
                }
                
                assert(atleastOneSelectorMatching);
                await browser.close();
        });
       
});