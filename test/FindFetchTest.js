const assert = require('assert');
const { it } = require('mocha');
const findFetch = require('../FindFetch');

describe("Testing online shopping sites..", () => {
    
    it.skip("\nAmazon.co.in\n\n", async () => {
        await findFetch.init();
        await findFetch.find("https://www.amazon.in/dp/B077BSWLTL","₹20,999.00");
        let fetchedText = await findFetch.fetch("https://www.amazon.in/dp/B08XB1F1RD");
        console.log("scraped data : "+fetchedText);
        assert(fetchedText.length>0,"Failed to scrape data!");
        await findFetch.destroy();
    });

    it.skip("\nFlipkart.com\n\n", async () => {
        await findFetch.init(true);
        await findFetch.find("https://www.flipkart.com/samsung-galaxy-m11-black-32-gb/p/itm0871b45a83143","₹12,999");
        let fetchedText = await findFetch.fetch("https://www.flipkart.com/samsung-galaxy-m11-violet-64-gb/p/itmb748a6ba4c6d9");
        console.log("scraped data : "+fetchedText);
        assert(fetchedText.length>0,"Failed to scrape data!");
        await findFetch.destroy();   
    });

});