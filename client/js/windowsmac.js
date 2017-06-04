var macButton = document.getElementById('macButton').addEventListener('click', switchToMac);

var windowsButton = document.getElementById('windowsButton').addEventListener('click', switchToWindow);

function switchToMac(){
    window.location.href= "./macdownload.html";
}

function switchToWindow(){
     window.location.href= "./windowsdownload.html";
}