chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	try {
		if (request.message === "setkeyconfig") {
			localStorage.setItem("keymap", request.keymap);
			sendResponse("成功！");
		} else if (request.message === "getkeyconfig") {
			sendResponse(
				localStorage.getItem("keymap") ??
					JSON.stringify({ key1: 68, key2: 70, key3: 74, key4: 75, attack: 32 }),
			);
		} else return false;
	} catch (e) {
		sendResponse(e);
	}
});
