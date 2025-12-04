const log = document.getElementById("log")!;
const keylist = document.getElementById("keylist")!;
const keymap = { key1: 68, key2: 70, key3: 74, key4: 75, attack: 32 };
const keybuttonlist = Array.from(document.getElementsByClassName("key")) as HTMLSpanElement[];
let waitingkey: HTMLSpanElement | undefined;

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
	if (!tabs[0].id) return;
	chrome.tabs
		.sendMessage(tabs[0].id, { message: "getkeyconfig" })
		.then(async (res) => {
			if (res == null) {
				keylist.classList.add("hidden");
				return;
			}
			const map = JSON.parse(res);
			for (const key in map) {
				const elem = document.getElementById(key);
				if (elem) elem.innerText = String.fromCharCode(map[key]).replace(" ", "space");
			}
			keylist.classList.remove("hidden");
		})
		.catch((e) => {
			if (String(e) === "Error: Could not establish connection. Receiving end does not exist.") {
				keylist.classList.add("hidden");
				return;
			}
			console.error(e);
			log.innerText = e;
		});
});

for (const num in keybuttonlist) {
	keybuttonlist[num].addEventListener("click", (event) => {
		if (keybuttonlist[num].id === waitingkey?.id) return;
		waitingkey = keybuttonlist[num];
		for (const num in keybuttonlist) {
			keybuttonlist[num].classList.remove("select");
		}
		keybuttonlist[num].classList.add("select");
		event.stopPropagation();
	});
}
document.body.addEventListener("click", () => {
	waitingkey = undefined;
	for (const num in keybuttonlist) {
		keybuttonlist[num].classList.remove("select");
	}
});

addEventListener("keydown", (event) => {
	if (!waitingkey) return;
	// @ts-expect-error
	keymap[waitingkey.id] = event.keyCode;
	waitingkey.innerText = event.keyCode === 32 ? "space" : event.key;
	log.innerText = JSON.stringify(keymap);
	waitingkey = undefined;
	for (const num in keybuttonlist) {
		keybuttonlist[num].classList.remove("select");
	}
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		if (!tabs[0].id) return;
		chrome.tabs
			.sendMessage(tabs[0].id, { message: "setkeyconfig", keymap: JSON.stringify(keymap) })
			.then(async (res) => {
				log.innerText = res;
			})
			.catch((e) => {
				log.innerText = e;
				if (log.innerText === "Error: Could not establish connection. Receiving end does not exist.") {
					log.innerText += "\nテストプレイ画面を開いていますか？";
				}
			});
	});
	event.stopPropagation();
});

(async () => {
	console.log("hoge");
	if ((await chrome.storage.local.get("preventContextMenu")).preventContextMenu === "true") {
		(document.getElementById("preventContextMenu") as HTMLInputElement).checked = true;
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			if (!tabs[0].id) return;
			chrome.tabs.sendMessage(tabs[0].id, { message: "preventContextMenu", enable: true }).catch((e) => {
				console.error(e);
				log.innerText = e;
			});
		});
	}
	document.getElementById("config")!.style.display = "block";
})();
document.getElementById("preventContextMenu")!.addEventListener("click", async (ev) => {
	const active = (ev.target as HTMLInputElement).checked;
	chrome.storage.local.set({ preventContextMenu: active ? "true" : "false" });
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		if (!tabs[0].id) return;
		chrome.tabs.sendMessage(tabs[0].id, { message: "preventContextMenu", enable: active }).catch((e) => {
			console.error(e);
			log.innerText = e;
		});
	});
});
export {};
