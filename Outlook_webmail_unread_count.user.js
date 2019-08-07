// ==UserScript==
// @name        Outlook webmail unread count
// @namespace   http://folk.uio.no/jonato/userscripts
// @description Show unread count in title
// @include     https://*/owa/*
// @include     http://*/owa/*
// @version     2
// @grant       none
// ==/UserScript==

setTimeout(function () {
    let intervalId;
    let updateIntervalInMin = 1;
    let appendOriginalTitle = true;
    let originalTitle = document.title;
    let ignoredFolders = Array('drafts', 'deleted items');

    let setTitleFunc = function (title) {

        let unreadCountTitle = [];
        Object.keys(title).forEach(function (key, index) {
            if (!ignoredFolders.includes(key.toLowerCase())) {
                unreadCountTitle.push(key + ': ' + title[key]);
            }
        });
        window.document.title = (title != undefined ? unreadCountTitle.join(', ') + " " : "") + (appendOriginalTitle ? originalTitle : "");
    };
    let setCount = function (c) {
        let ucountXPath = "//span[contains(@id, 'ucount')]"
        let ucountNodes = document.evaluate(ucountXPath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

        if (ucountNodes.snapshotLength > 0) {
            if (!c) {
                intervalId = setInterval(function () {
                    setCount(true)
                }, (updateIntervalInMin * 60) * 1000);
            }

            let set = {};

            for (let i = 0; i < ucountNodes.snapshotLength; i++) {
                let folderName = document.getElementById(ucountNodes.snapshotItem(i).id.replace('ucount', 'folder')).textContent;
                set[folderName] = ucountNodes.snapshotItem(i).textContent.match('[0-9]+')[0];
            }
            setTitleFunc(set);
        } else if (intervalId && document.getElementsByClassName('logonContainer').length > 0) {
            clearInterval(intervalId);
        }
    };
    setCount(false);
}, 5000)
