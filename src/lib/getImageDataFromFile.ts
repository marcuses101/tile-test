export async function getImageDataFromFile(file: File): Promise<ImageData> {
	const canvas = new OffscreenCanvas(0, 0);
	const ctx = canvas.getContext('2d');
	const reader = new FileReader();
	return new Promise((resolve, reject) => {
		if (!ctx || !canvas) {
			return reject('Missing ctx or canvas');
		}
		reader.addEventListener('load', () => {
			const result = reader.result;
			if (!result) {
				return reject('No reader result');
			}
			const img = new Image();
			img.addEventListener('load', () => {
				if (!ctx || !canvas) {
					return reject('Missing ctx or canvas');
				}
				canvas.width = img.width;
				canvas.height = img.height;
				ctx.drawImage(img, 0, 0);
				return resolve(ctx.getImageData(0, 0, canvas.width, canvas.height));
			});
			img.src = result.toString();
		});
		reader.readAsDataURL(file);
	});
}
