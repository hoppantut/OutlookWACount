// ==UserScript==
// @name        Outlook webmail unread count
// @namespace   http://folk.uio.no/jonato/userscripts
// @description Show unread count in title
// @include     https://*/owa/*
// @include     http://*/owa/*
// @version     1
// @grant       none
// ==/UserScript==
(function() {
    var updateIntervalInMin = 1;
    var appendOriginalTitle = true;

    var originalTitle = unsafeWindow.document.title;
    var setTitleFunc = function(title) {
        window.document.title = (title != undefined ? title + " " : "") + (appendOriginalTitle ? originalTitle : "");
    };
    var setCount = function(c) {
        var mailtreePath = "//div[@id='mailtree']";
        var mailtree = document.evaluate(mailtreePath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        if(mailtree.snapshotLength > 0) {
//            console.log("Valid x-path for setCount(...)");
            if(!c) { 
//            console.log("Setting update interval...");
                setInterval(function() { setCount(true) }, (updateIntervalInMin * 60) * 1000);
            }
            var path = mailtreePath + "//img[@class[contains(., 'sprites-inbox-png')]]/following-sibling::span[1]/span[@id='spnUC']/span[@id='spnCV']";
            var data = document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            if(data.snapshotLength > 0) {
                setTitleFunc("(" + data.snapshotItem(0).innerHTML+ ")");
            } else {
                setTitleFunc(undefined);
            }
        } else {
//            console.log("NOT setting update interval...")
        }
    };
    setCount(false);
})();