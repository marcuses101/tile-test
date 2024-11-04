export type SuperPixel = {
	red: number;
	green: number;
	blue: number;
	alpha: number;
	rotY?: number;
	rotX?: number;
	degrees?: number;
};

export type DisplayInfo = {
	pixelData: SuperPixel[];
	width: number;
	height: number;
};
