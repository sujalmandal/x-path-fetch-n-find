const puppeteer = require('puppeteer');
const scraper = require('./PupeteerScraper');
const assert = require('assert');

module.exports = (()=>{
    /* private variables */
    this.browserInstance=null;
    this.pageInstance=null;
    this.currentURL=null;
    this.xPathString=null;
    this.isDebug=false;

    /* exported functions */
    return {
        init: async (isDebug=false)=>{
            this.isDebug=isDebug;
            this.browserInstance = await puppeteer.launch();
            this.pageInstance = await this.browserInstance.newPage();
            if(this.isDebug) console.log("Finished initializing FindFetch module.");
            if(this.isDebug) this.pageInstance.on("console", (consoleObj) => console.log("chromium:: "+consoleObj.text()));
        },
        find: async (urlToLoad,searchToken)=>{
            assert(urlToLoad?.trim().length > 0,"Url cannot be empty.");
            assert(searchToken?.trim().length > 0,"Search token cannot be empty.");
            
            this.currentURL=urlToLoad;
            await this.pageInstance.goto(this.currentURL);
            
            let matches = await scraper.getXPathsByText(searchToken,this.pageInstance);
            assert(matches.length>0,"No match found for the given search token!");
            
            for(let i=0;i<matches.length;i++){
                let match=matches[i];
                if(match.data==searchToken){
                    this.xPathString=match.xPath;
                    if(this.isDebug) console.log("Found selector.");
                    break;
                }
            }
        },
        fetch: async (urlToLoad)=>{
            assert(urlToLoad?.trim().length > 0,"Url cannot be empty.");
            this.currentURL=urlToLoad;
            await this.pageInstance.goto(this.currentURL);
            return await scraper.getTextByXPath(this.xPathString,this.pageInstance);
        },
        destroy: async()=>{
            this.browserInstance.close();
        }
    };
})();