import type { DisplayInfo, SuperPixel } from './defs';

export function imageDataToDisplayInfo(input: ImageData): DisplayInfo {
	const newPixelData: SuperPixel[] = [];
	for (let imgIndex = 0; imgIndex < input.data.length; imgIndex += 4) {
		newPixelData.push({
			red: input.data[imgIndex],
			green: input.data[imgIndex + 1],
			blue: input.data[imgIndex + 2],
			alpha: input.data[imgIndex + 3],
			degrees: 0,
			rotX: 0,
			rotY: 0
		});
	}
	return { pixelData: newPixelData, width: input.width, height: input.height };
}
