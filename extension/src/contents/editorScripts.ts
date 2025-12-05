const listener = (ev: MouseEvent) => {
	ev.preventDefault();
};
function setListener() {
	document.getElementById("root")?.addEventListener("contextmenu", listener);
}
function removeListener() {
	document.getElementById("root")?.removeEventListener("contextmenu", listener);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	try {
		if (request.message === "preventContextMenu") {
			if (request.enable) {
				setListener();
			} else {
				removeListener();
			}
			sendResponse("成功！");
		} else return false;
	} catch (e) {
		sendResponse(e);
	}
});

(async () => {
	if ((await chrome.storage.local.get("preventContextMenu")).preventContextMenu === "true") {
		setListener();
	}
})();
