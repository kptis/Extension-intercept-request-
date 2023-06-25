function openPopUp(content){
	return window.confirm(content);
}
chrome.webRequest.onBeforeRequest.addListener(
  function () {
	var testurl = new URL(window.location.href)
    $("#p1").text("The URL being tested is - " + details.url);
    console.log(details.url);

    var xhr = new XMLHttpRequest();

    a = "http://127.0.0.1:1900/extension?url=" + encodeURIComponent(url);
    xhr.open("POST", a, false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    try {
      xhr.send();
      if (xhr.status != 200) {
        alert(`Error ${xhr.status}: ${xhr.statusText}`);
      }
    } catch (err) {
      alert(err);
    }
    var myDiv = document.getElementById("res-circle");
    if (xhr.responseText == "PHISHING") {
      myDiv.style.backgroundColor = "red";
      // pop up for user to choose whether they proceed to the URL or not
	  if (openPopUp('Do you want to proceed to this URL immediately?')){
		xhr.open("GET", testurl)
	  }
    } else {
      myDiv.style.color = "green";
      // 2 options: immediately  proceed OR open pop up to choose
		if(openPopUp('This might be a phishing URL.Do you want to proceed to this URL immediately?')){
			xhr.open("GET", testurl)
		}
    }
    $("#div1").text(xhr.responseText);
    return xhr.responseText;
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);
