chrome.tabs.onActivated.addListener((activeInfo) => {
	chrome.tabs.get(activeInfo.tabId, (tab) => {
		if (!tab.url) return;
		setAction(tab.url);
	});
});
let lastURL: string | undefined = "";
let lastStatus: string | undefined = "";
let disable = false;
chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
	if (lastStatus === tab.status && lastURL === tab.url) return;
	lastURL = tab.url;
	lastStatus = tab.status;
	if (tab.status !== "complete") return;

	if (tab.active && tab.url) {
		setAction(tab.url);
	}
	if (disable) return;
	disable = true;
	setTimeout(() => {
		disable = false;
	}, 100);
	console.log("act");
	if (tab.url === "https://beta.sparebeat.com/") {
		chrome.tabs.sendMessage(tabId, { message: "toppage" });
	}
	if (tab.url?.split("?")[0] === "https://beta.sparebeat.com/tracks") {
		chrome.tabs.sendMessage(tabId, { message: "creators" });
	}
});

function setAction(url: string) {
	const pattern = /^https:\/\/beta.sparebeat.com\/play\/|https:\/\/beta.sparebeat.com\/simulator/;
	const pattern2 = /^https:\/\/beta.sparebeat.com\//;
	const editorURL = /^https:\/\/spbe.bo-yakitarako.dev\//;
	if (pattern.test(url)) {
		chrome.action.setPopup({ popup: "actions/popup.html" });
	} else if (editorURL.test(url)) {
		chrome.action.setPopup({ popup: "actions/editorpopup.html" });
	} else if (pattern2.test(url)) {
		chrome.action.setPopup({ popup: "actions/popup.html" });
	} else {
		chrome.action.setPopup({ popup: "actions/errorpopup.html" });
	}
}
