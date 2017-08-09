/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var bugzilla_newbug_prefix = 'https://bugzilla.mozilla.org/enter_bug.cgi?';
var bugzilla_existing_prefix = 'https://bugzilla.mozilla.org/show_bug.cgi?id=';
var webcompat_prefix = 'https://webcompat.com/issues/'
var github_issue_prefix = 'https://api.github.com/repos/webcompat/web-bugs/issues/'

function enableOrDisable(tabId, changeInfo, tab) {
  function isReportableURL(url) {
    var ret = url.startsWith("https://webcompat.com/issues/");
    return ret;
  }

  if (changeInfo.status == "loading" && isReportableURL(tab.url)) {
    chrome.browserAction.enable(tabId);
  } else if (changeInfo.status == "loading" && !isReportableURL(tab.url)) {
    chrome.browserAction.disable(tabId);
  }
}

function handleMessage(request, sender, sendResponse) {
  if (request.type == "new") {
    var product = request.product;
    var component = request.component;
    var version = 'unspecified';

    // Get current tab and get issue body from github API
    chrome.tabs.query({currentWindow: true, active: true}, function(tab) {
      var issue_number = tab[0].url.split(webcompat_prefix)[1];
      var github_issue_api_url = github_issue_prefix + issue_number;

      var request = new XMLHttpRequest();
      request.addEventListener('load', function (event) {
        var issue = JSON.parse(request.response);
        var lines = issue.body.split("\n");
        var summary = "";

        // Get summary from **Description**: and version from **Browser / Version**:
        for (var line of lines) {
          console.log(line);
          if (line.startsWith("**Description**:")) {
            summary = line.split("**Description**:")[1];
          }
          if (line.startsWith("**Browser")) {
            version = parseInt(line.replace( /^\D+/g, '')) + " Branch";
          }
        }

        // Get description from **Steps to Reproduce**
        var description = issue.body.split("**Steps to Reproduce**:")[1].split("_From [webcompat.com]")[0];
        var newTabUrl = `${bugzilla_newbug_prefix}product=${encodeURIComponent(product)}&component=${encodeURIComponent(component)}&version=${encodeURIComponent(version)}`;

        chrome.tabs.create({ 'url': newTabUrl}, function(tab) {
          // use executeScript to fill summary and description
          var code = 'document.querySelector("#short_desc").value=`'+summary+'`;document.querySelector("#comment").value=`'+description+'`;';
          chrome.tabs.executeScript(tab.id, {
            code: code
          });
        });
      });
      request.open('GET', github_issue_api_url);
      request.send();
    });
  } else if (request.type == "seealso") {
    chrome.tabs.query({currentWindow: true, active: true}, function(tab) {
      var currentUrl = tab[0].url;
      var newTabUrl = `${bugzilla_existing_prefix}${request.bugnumber}`;

      chrome.tabs.create({ 'url': newTabUrl}, function(tab) {
        // Fill see also with current issue URL
        var code='document.querySelector("#see_also").value="'+currentUrl+'";';

        chrome.tabs.executeScript(tab.id, {
          code: code
        });
      });
    });
  }
}

chrome.tabs.onUpdated.addListener(enableOrDisable);
chrome.runtime.onMessage.addListener(handleMessage);
