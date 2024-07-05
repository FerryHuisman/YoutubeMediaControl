// ==UserScript==
// @name         Youtube Media Control
// @namespace    http://tampermonkey.net/
// @version      2024-07-05
// @description  Why do I have to do this myself
// @author       Me
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @match        *://*.youtube.com/*
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    let mediaSession = navigator.mediaSession;
    let setActionHandler = mediaSession.setActionHandler.bind(mediaSession)

    let hooks = {
        "nexttrack": () => {
            let elements = document.getElementsByClassName("ytp-next-button ytp-button")
            if (elements.length == 1)
            {
                elements[0].click()
            }
        },
        "previoustrack": () => {
            let elements = document.getElementsByClassName("ytp-prev-button ytp-button")
            if (elements.length == 1 && elements[0].checkVisibility())
            {
                elements[0].click()
            }
            else
            {
                history.back()
            }
        }
    }

    mediaSession.setActionHandler = function(name, callback)
    {
        if (callback == null)
        {
            let hook = hooks[name]
            if (hook)
            {
                callback = hook
            }
        }

        setActionHandler(name, callback)
    };
})();
