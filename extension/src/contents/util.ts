export async function polling(f: () => void | Promise<void>) {
	try {
		await f();
	} catch (e) {
		console.warn(e);
		setTimeout(() => polling(f), 100);
	}
}
