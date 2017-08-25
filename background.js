/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var bugzilla_newbug_prefix = 'https://bugzilla.mozilla.org/enter_bug.cgi?';
var bugzilla_existing_prefix = 'https://bugzilla.mozilla.org/show_bug.cgi?id=';
var bugzilla_rest_product_ids = 'https://bugzilla.mozilla.org/rest/product_enterable';
var bugzilla_rest_product_components = 'https://bugzilla.mozilla.org/rest/product?';
var github_issue_prefix = 'https://api.github.com/repos/webcompat/web-bugs/issues/';
var webcompat_prefix = 'https://webcompat.com/issues/';

var products = {};

function loadBugzillaProducts() {
  // Restore cached products
  chrome.storage.local.get("products", function(items) {
    products = items.products;
  });

  // Fetch all bug enterable bug IDs from bugzilla restful API
  fetch(bugzilla_rest_product_ids).then(function(response) {
    var contentType = response.headers.get("content-type");
    if(contentType && contentType.includes("application/json")) {
      return response.json();
    }
  }).then(function(json_products) {
    // Concat all product IDs and query the product/component JSON
    // Note: It's large and slow
    var product_components_url = bugzilla_rest_product_components;
    for (var productId of json_products.ids) {
      product_components_url += "ids=" + productId + "&";
    }
    fetch(product_components_url).then(function(response) {
      var contentType = response.headers.get("content-type");
      if(contentType && contentType.includes("application/json")) {
        return response.json();
      }
    }).then(function(mappings) {
      var new_products = {};

      for (var product of mappings.products) {
        var components = [];
        for (var component of product.components) {
          components.push(component.name);
        }
        new_products[product.name] = components;
      }
      console.log("Webcompat-to-Bugzilla: product/component mapping load done");

      if (JSON.stringify(products) !== JSON.stringify(new_products)) {
        products = new_products;
        chrome.storage.local.set({"products": new_products});
      }
    });
  });
}

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
  } else if (request.type == "request") {
    sendResponse({response: JSON.stringify(products)});
  }
}

chrome.runtime.onMessage.addListener(handleMessage);
chrome.runtime.onInstalled.addListener(loadBugzillaProducts);
chrome.tabs.onUpdated.addListener(enableOrDisable);
