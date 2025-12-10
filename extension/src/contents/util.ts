export async function polling(f: () => void | Promise<void>) {
	try {
		await f();
	} catch {
		setTimeout(() => polling(f), 100);
	}
}
