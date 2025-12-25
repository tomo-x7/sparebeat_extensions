chrome.tabs.onActivated.addListener((activeInfo) => {
	chrome.tabs.get(activeInfo.tabId, (tab) => {
		if (!tab.url) return;
		setAction(tab.url);
	});
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
