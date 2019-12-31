/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/*
 * Script for handling click on toolbar popup
 */

var products = null;
var commonbugs = null;

document.querySelector("#product").addEventListener("change", (e) => {
    // Clear current components options
    var components = document.querySelector("#component");
    components.innerHTML = "";

    var new_components = products[e.target.value];
    for (var component of new_components) {
        var new_component = document.createElement('option');
        new_component.value = component;
        new_component.innerHTML = component;
        components.appendChild(new_component);
    }
});

document.querySelector("#submit").addEventListener("click", (e) => {
    // Use sendMessage to send options background.js 
    if (document.querySelector("#new").checked) {
        var sending = browser.runtime.sendMessage({
            type: "new",
            product: document.querySelector("#product").value,
            component: document.querySelector("#component").value
        });
    } else if (document.querySelector("#commonbug").checked) {
        var sending = browser.runtime.sendMessage({
            type: "seealso",
            bugnumber: document.querySelector("#commonbugs").value
        });
    } else {
        var sending = browser.runtime.sendMessage({
            type: "seealso",
            bugnumber: document.querySelector("#bugnumber").value
        });
    }

    // Close the popup window
    window.close();
});

// Use background.js to get updated bugzilla product/component mapping and common bugs in popup.html
function handleResponse(message) {
    products = JSON.parse(message.products);
    var elProducts = document.querySelector("#product");
    elProducts.innerHTML = "";
    for (var product in products) {
        var new_product = document.createElement("option");
        new_product.value = product;
        new_product.innerHTML = product;
        elProducts.appendChild(new_product);
    }
    // unselect to make sure we have product/component updated
    elProducts.selectedIndex = -1;

    // TODO: Sort commonbugs by count and get first 10 bugs
    commonbugs = JSON.parse(message.commonbugs);
    var sortedbugs = [];
    for (var bug in commonbugs) {
        sortedbugs.push({
            "number": bug,
            "name": commonbugs[bug].name,
            "count": commonbugs[bug].count
        });
    }
    sortedbugs.sort(function(a, b) {
      return a.count < b.count ? 1 : -1;
    });
    var elCommonBugs = document.querySelector("#commonbugs");
    elCommonBugs.innerHTML = "";
    commonbugs = sortedbugs;
    for (var bug in commonbugs) {
        var new_bug = document.createElement("option");
        new_bug.value = commonbugs[bug].number;
        new_bug.innerHTML = "Bug " + commonbugs[bug].number + " - " + commonbugs[bug].name;
        elCommonBugs.appendChild(new_bug);
        if (bug == 10) {
            break;
        }
    }
}

window.addEventListener("load", (e) => {
    var sending = browser.runtime.sendMessage({
        type: "request"
    });
    sending.then(handleResponse);
});