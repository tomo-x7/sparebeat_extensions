const log = document.getElementById("log")!;
const log2 = document.getElementById("log2")!;

const btns = Array.from(document.getElementsByClassName("share"));
btns.forEach((btn, index) => {
	btn.addEventListener("click", () => {
		sharebtnonclick(btn.id as keyof typeof functions);
	});
});

const sharebtnonclick = (src: keyof typeof functions) => {
	log.innerText = "";
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		if (!tabs[0].id) return;
		chrome.tabs
			.sendMessage(tabs[0].id, { message: "screenshot", src })
			.then(async (item: { message: string; url: string; img: Blob | undefined }) => {
				try {
					console.log(item);
					if (item.message === "noresult") {
						throw new Error("リザルト画面でのみ実行可能");
					}
					const text = item.message;
					const url = item.url;
					functions[src](text, url, item.img ?? undefined);
				} catch (e) {
					log.innerText = `${e}`;
				}
			})
			.catch((e) => {
				log.innerText = e;
			});
	});
};

const tweet = (text: string, url: string) => {
	const tweetTag = "Sparebeat,Sparebeat_extensions";
	window.open(
		`https://twitter.com/intent/post?text=${encodeURIComponent(text)}&hashtags=${tweetTag}&url=${encodeURIComponent(url)}`,
		"_blank",
	);
};
const lineshare = (text: string, url: string) => {
	window.open(
		`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
	);
};
const blueskypost = (text: string, url: string) => {
	log.innerText = "Loading...";
	const longurl = encodeURIComponent(url);
	fetch(`https://sparebeatter.vercel.app/api/shorturl/?url=${longurl}`, { method: "GET" })
		.then((data) => data.json())
		.then((data) => {
			window.open(
				`https://bsky.app/intent/compose?text=${text}%0D%0A%20%23sparebeat%20%23sparebeat_extensions%20+%0D%0A${data.url}%20`,
			);
		});
};
const facebookpost = (text: string, url: string) => {
	window.open(`https://www.facebook.com/share.php?u=${encodeURIComponent(url)}`);
};
const copyurl = (text: string, url: string) => {
	try {
		navigator.clipboard.writeText(`${text}\n${url}`);
		log.innerText = "Copyed!";
	} catch (e) {
		log.innerText = "フォーカスが外れたため失敗しました。もう一度やり直してください";
	}
};
const copyphoto = (text: string, url: string, img?: Blob) => {
	log.innerText = "Loading...";
	if (img) {
		if (!document.hasFocus()) {
			log.innerText = "フォーカスが外れたため失敗しました。もう一度やり直してください";
			return;
		}
		navigator.clipboard.write([new ClipboardItem({ "image/png": img })]);
		log.innerText = "Copyed without fetch";
	} else {
		fetch(url.replace("result", "api/img")).then((data) => {
			if (!data.ok) {
				log.innerText = "画像の取得に失敗しました";
			}
			data.blob().then(async (blob) => {
				if (!document.hasFocus()) {
					log.innerText = "フォーカスが外れたため失敗しました。もう一度やり直してください";
					return;
				}
				await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
				log.innerText = "Copyed!";
			});
		});
	}
};
const share = (text: string, url: string) => {
	navigator.share({ title: "sparebeat result", text: text, url: url });
};
const functions = {
	twitter: tweet,
	line: lineshare,
	bluesky: blueskypost,
	facebook: facebookpost,
	copy: copyurl,
	copyphoto,
	share,
};
const scorecheckButton = document.getElementById("scorecheck")!;
scorecheckButton.addEventListener("click", () => {
	log.innerText = "";
	chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
		if (!tabs[0].id) return;
		try {
			scorecheckButton.innerHTML = '<div class="loader"></div>';
			const data = await chrome.tabs.sendMessage(tabs[0].id, { message: "scorecheck" });
			if (chrome.runtime.lastError) {
				console.error(chrome.runtime.lastError);
				return;
			}
			console.log(JSON.stringify(data));
			await navigator.clipboard.writeText(JSON.stringify(data));
			log.innerText = "コピーしました";
			scorecheckButton.innerText = "スコアチェッカー用のデータを取得";
		} catch (e) {
			console.error(e);
			log.innerText = `${e}`;
			scorecheckButton.innerText = "スコアチェッカー用のデータを取得";
		}
	});
});

export {};
