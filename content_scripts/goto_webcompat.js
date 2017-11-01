if (document.querySelector("#goto-webcompat") === null ) {
  // Get issue number from URL
  var url = new URL(window.location.href);
  var issue_number = url.pathname.split("/webcompat/web-bugs/issues/")[1];

  // Append "Go to WebCompat.com at the end of title"
  var title = document.querySelector(".gh-header-title");
  var goto_webcompat = document.createElement("a");
  goto_webcompat.setAttribute("href", "https://webcompat.com/issues/" + issue_number);
  goto_webcompat.id = "goto-webcompat";
  goto_webcompat.appendChild(document.createTextNode("Go to WebCompat.com"));
  title.appendChild(goto_webcompat);
}
