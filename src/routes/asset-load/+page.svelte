<script lang="ts">
	import { onMount } from 'svelte';
	import { getImageDataFromFile } from '$lib/getImageDataFromFile';
	import Display from '$lib/Display.svelte';
	import type { DisplayInfo, SuperPixel } from '$lib/defs';
	import { getDisplayInfoFromImageSrc } from '$lib/getDisplayInfoFromImageSrc';
	import { imageDataToDisplayInfo } from '$lib/imageDataToDisplay';

	let height = $state(0);
	let width = $state(0);
	let pixelData = $state<SuperPixel[]>([]);
	let displays = $state<DisplayInfo[]>([]);
	const pixelSize = 15;
	const imagesSources = ['/pappi-0001.png', '/xav-0001.png'];

	onMount(async () => {
		console.time('load');
		for (const src of imagesSources) {
			const display = await getDisplayInfoFromImageSrc(src);
			displays.push(display);
			console.timeLog('load', src);
		}
	});
</script>

<h1>Asset Load</h1>
<input
	type="file"
	onchange={async (e) => {
		const file = e.currentTarget.files?.[0];
		if (!file) {
			(e.target as HTMLInputElement).value = '';
			return;
		}
		const imageData = await getImageDataFromFile(file);
		const displayInfo = imageDataToDisplayInfo(imageData);
		pixelData = displayInfo.pixelData;
		height = displayInfo.height;
		width = displayInfo.width;
		(e.target as HTMLInputElement).value = '';
	}}
/>
<p>Width: {width}px Height: {height}px</p>
<Display {width} {pixelSize} {pixelData} />
{#each displays as { width, pixelData: data }}
	<Display {width} {pixelSize} pixelData={data} />
{/each}
