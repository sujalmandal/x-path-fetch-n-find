module.exports.getXPathsByText = async(searchToken, loadedPage)=>{
    /*
    const pageTitle = await loadedPage.title();
    console.log(pageTitle.substring(0, length)+".. is loaded");
    */
    const results = await loadedPage.evaluate((textToSearch) => {
        getXPathForElement = (el, xml) => {
            var xpath = '';
            var pos, tempitem2;

            while (el !== xml.documentElement) {
                pos = 0;
                tempitem2 = el;
                while (tempitem2) {
                    if (tempitem2.nodeType === 1 && tempitem2.nodeName === el.nodeName) { // If it is ELEMENT_NODE of the same name
                        pos += 1;
                    }
                    tempitem2 = tempitem2.previousSibling;
                }

                xpath = "*[name()='" + el.nodeName.toLowerCase() + "' and namespace-uri()='" + (el.namespaceURI === null ? '' : el.namespaceURI) + "'][" + pos + ']' + '/' + xpath;

                el = el.parentNode;
            }
            xpath = '/*' + "[name()='" + xml.documentElement.nodeName.toLowerCase() + "' and namespace-uri()='" + (el.namespaceURI === null ? '' : el.namespaceURI) + "']" + '/' + xpath;
            xpath = xpath.replace(/\/$/, '');
            return xpath;
        }
        getElementByXpath = (path) => {
            return document.evaluate(path, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
        }
        const matches = getElementByXpath("//*[contains(text(),'" + textToSearch + "')]");
        if (matches != undefined && matches.length !== 0) {
            const textXPathList = [];
            while (match = matches.iterateNext()) {
                textXPathList.push({
                    data: match.textContent.trim(),
                    xPath: getXPathForElement(match, document)
                });
            }
            return textXPathList;
        }
        else {
            return null;
        }
    }, searchToken);
    return results;
}

module.exports.getTextByXPath = async(xPath, loadedPage)=>{

    /*const pageTitle = await loadedPage.title();
    console.log(pageTitle.substring(0, length)+".. is loaded");*/

    const results = await loadedPage.evaluate((xPathToSearch) => {
        getElementByXpath = (path) => {
            return document.evaluate(path, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
        }
        const matches = getElementByXpath(xPathToSearch);
        if (matches != undefined && matches.length !== 0) {
            const texts = [];
            while (match = matches.iterateNext()) {
                texts.push(match.textContent.trim());
            }
            return texts;
        }
        else {
            return null;
        }
    }, xPath);
    return results;
} 