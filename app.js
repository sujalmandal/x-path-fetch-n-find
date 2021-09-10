const puppeteer = require('puppeteer');
const URL = "https://www.amazon.in/dp/B08GYH6HKN/ref=syn_sd_onsite_desktop_302?spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUExWlpLMVdJWFZLOTlTJmVuY3J5cHRlZElkPUEwNzU5MTQ5MjkwMkVFSkZNODE0MyZlbmNyeXB0ZWRBZElkPUEwMzA0NTYwM01HVjJRUjlKS0daSiZ3aWRnZXROYW1lPXNkX29uc2l0ZV9kZXNrdG9wJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ&th=1";


(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(URL);
  /*const bodyHandle = await page.$('body');
  const html = await page.evaluate(body => body.innerHTML, bodyHandle);*/
  const result = await page.evaluate((textToSearch) => {
    function getXPathForElement(el, xml) {
        var xpath = '';
        var pos, tempitem2;
    
        while(el !== xml.documentElement) {
            pos = 0;
            tempitem2 = el;
            while(tempitem2) {
                if (tempitem2.nodeType === 1 && tempitem2.nodeName === el.nodeName) { // If it is ELEMENT_NODE of the same name
                    pos += 1;
                }
                tempitem2 = tempitem2.previousSibling;
            }
    
            xpath = "*[name()='"+el.nodeName+"' and namespace-uri()='"+(el.namespaceURI===null?'':el.namespaceURI)+"']["+pos+']'+'/'+xpath;
    
            el = el.parentNode;
        }
        xpath = '/*'+"[name()='"+xml.documentElement.nodeName+"' and namespace-uri()='"+(el.namespaceURI===null?'':el.namespaceURI)+"']"+'/'+xpath;
        xpath = xpath.replace(/\/$/, '');
        return xpath;
    }
    function getElementByXpath(path) {
        return document.evaluate(path, document.body, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    }
    const matches = getElementByXpath("//*[contains(text(),'"+textToSearch+"')]");
    const textXPathList=[];
    while(match = matches.iterateNext()){
        textXPathList.push({
            data: match.textContent.trim(),
            xPath: getXPathForElement(match,document)
        });
    }
    return textXPathList;
  },"₹74,990.00");
  console.log(result);
  await browser.close();
})();