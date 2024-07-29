// ==UserScript==
// @name         YouTube Remove Shorts Button
// @namespace    http://tampermonkey.net/
// @version      2024-07-29
// @description  This will absolutely destroy the Shorts button
// @author       Not you
// @match        *://*.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function ()
{
    'use strict';
    
    /** @returns {HTMLElement[]} */
    function findTopMostParentWithText(text)
    {
        let allElements = document.querySelectorAll('*');
        let resultElements = [];

        allElements.forEach(element =>
        {
            if (element.innerText === text)
            {
                let topMost = element
                while (true)
                {
                    if (topMost.parentElement && topMost.parentElement.innerText == text)
                    {
                        topMost = topMost.parentElement
                    }
                    else
                    {
                        break
                    }
                }

                resultElements.push(topMost)
            }
        });

        let uniqueElements = Array.from(new Set(resultElements));

        return uniqueElements;
    }
    
    let itv = setInterval(t => {
        let home = findTopMostParentWithText('Home');
        let shorts = findTopMostParentWithText('Shorts');
        let subscriptions = findTopMostParentWithText('Subscriptions');
        
        /** @param HTMLElement p @param {HTMLElement[]} col  */
        function same_parent(p, col)
        {
            return col.find(el => el.parentElement == p) !== undefined
        }
        
        shorts.forEach(shortEl => {
            console.log("Check find")
            if (same_parent(shortEl.parentElement, home) && same_parent(shortEl.parentElement, subscriptions))
            {
                console.log("Found!")
                shortEl.remove()
                clearInterval(itv)
            }
        })
    }, 10)
})();
