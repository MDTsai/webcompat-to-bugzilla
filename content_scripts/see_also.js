/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var webcompat_issue_prefix = "https://webcompat.com/issues/"

var url = new URL(window.location.href);
var issue_number = url.searchParams.get("wcissue");

var wcissue = webcompat_issue_prefix + issue_number;

document.querySelector("#mode-btn").click();
document.querySelector("#see_also-btn").click();
document.querySelector("#see_also").value=wcissue;
document.querySelector("#commit-btn").click();