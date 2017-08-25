/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

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
   * Get detail from issue.body
   * summary from **Description**:
   * version from **Browser / Version**:
   * OS from **Operating System**:
   * URL from **URL**:
   */
  
  for (var line of lines) {
    if (line.startsWith("**Description**:")) {
      var summary = line.split("**Description**:")[1];
      document.querySelector("#short_desc").value = summary;
    } else if (line.startsWith("**Browser")) {
      var version = parseInt(line.replace( /^\D+/g, '')) + " Branch";
      document.querySelector("#version").value = version;
    } else if (line.startsWith("**Operating System**:")) {
      var os = line.split("**Operating System**: ")[1];
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
        console.log(osSelect.value);
      } else if (os.match(/Android/i)) {
        // Consider the report from SoftVision, use match instead
        osSelect.value = "Android";
      }
    } else if (line.startsWith("**URL**:")) {
      var URL = line.split("**URL**:")[1];
      document.querySelector("#bug_file_loc").value = URL;
    }
  }

  // Get description from **Steps to Reproduce**
  var description = issue.body.split("**Steps to Reproduce**:")[1].split("_From [webcompat.com]")[0];
  document.querySelector("#comment").value = description;

  // By default priority is P3 to push to triage queue
  document.querySelector("#priority").value = "P3";

  // Fill issue URL from webcompat.com
  document.querySelector("#see_also").value = "https://webcompat.com/issues/" + issue_number;

  // Add [webcompat] to status_whiteboard
  document.querySelector("#status_whiteboard").value = "[webcompat]";
});
