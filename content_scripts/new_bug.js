/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const screenshot_regexp = /(\[\!\[Screenshot Description]\(https:\/\/webcompat\.com\/uploads\/\d+\/\d+\/\w+-\w+-\w+-\w+-\w+-thumb.\w+\)]\()(https:\/\/webcompat\.com\/uploads\/\d+\/\d+\/\w+-\w+-\w+-\w+-\w+.\w+)(\))/;
var github_issue_prefix = 'https://api.github.com/repos/webcompat/web-bugs/issues/';

var url = new URL(window.location.href);
var issue_number = url.searchParams.get("wcissue");

// Get github issue content
var github_issue_api_url = github_issue_prefix + issue_number;

fetch(github_issue_api_url).then(function(response) {
  var contentType = response.headers.get("content-type");
  if(contentType && contentType.includes("application/json")) {
    return response.json();
  }
}).then(function(issue) {
  var lines = issue.body.split("\n");

  // Show Advanced Fields
  if (document.querySelector("#expert_fields_controller").value == "Show Advanced Fields") {
    document.querySelector("#expert_fields_controller").click();
  }

  /*
   * Summary from issue.title
   * URL from lines[0]
   * Version from lines[2]
   * OS from lines[4]
   * Description from lines[6] to end
   */

  document.querySelector("#short_desc").value = issue.title;

  document.querySelector("#bug_file_loc").value = lines[0];
  
  var version = parseInt(lines[2].replace( /^\D+/g, '')) + " Branch";
  document.querySelector("#version").value = version;

  var os = lines[4].substring(2);
  var osSelect = document.querySelector("#op_sys");
  if (os.startsWith("Windows 7")) {
    osSelect.value = "Windows 7";
  } else if (os.startsWith("Windows 8.1")) {
    osSelect.value = "Windows 8.1";
  } else if (os.startsWith("Windows 8")) {
    osSelect.value = "Windows 8";
  } else if (os.startsWith("Windows 10")) {
    osSelect.value = "Windows 10";
  } else if (os.startsWith("Linux")) {
    osSelect.value = "Linux";
  } else if (os.startsWith("Mac OS X")) {
    osSelect.value = "Mac OS X";
  } else if (os.match(/Android/i)) {
    // Consider the report from SoftVision, use match instead
    osSelect.value = "Android";
  }

  var description = lines.slice(6).join('');
  document.querySelector("#comment").value = description;

  // By default priority is P3 to push to triage queue
  document.querySelector("#priority").value = "P3";

  // Fill issue URL from webcompat.com
  document.querySelector("#see_also").value = "https://webcompat.com/issues/" + issue_number;
});
