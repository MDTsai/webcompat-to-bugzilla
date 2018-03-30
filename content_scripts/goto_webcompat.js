if (document.querySelector("#goto-webcompat") === null ) {
  // Get issue number from URL
  var url = new URL(window.location.href);
  var issue_number = url.pathname.split("/webcompat/web-bugs/issues/")[1];

  // Append "Go to WebCompat.com at the end of title"
  var content = document.querySelector(".repository-content");
  var goto_webcompat = document.createElement("a");
  goto_webcompat.setAttribute("href", "https://webcompat.com/issues/" + issue_number);
  goto_webcompat.style.backgroundColor = "rgb(255, 201, 0)";
  goto_webcompat.style.position = "fixed";
  goto_webcompat.style.bottom = "0px";
  goto_webcompat.style.right = "0px";
  goto_webcompat.style.font
  goto_webcompat.id = "goto-webcompat";
  goto_webcompat.appendChild(document.createTextNode("Go to WebCompat.com"));
  content.appendChild(goto_webcompat);
}
