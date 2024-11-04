import type { DisplayInfo } from './defs';
import { imageDataToDisplayInfo } from './imageDataToDisplay';

export function getDisplayInfoFromImageSrc(src: string): Promise<DisplayInfo> {
	const canvas = new OffscreenCanvas(0, 0);
	const ctx = canvas.getContext('2d');
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.addEventListener('load', () => {
			if (!ctx || !canvas) {
				return reject('Missing ctx or canvas');
			}
			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0);
			const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
			return resolve(imageDataToDisplayInfo(imageData));
		});
		img.src = src;
	});
}
