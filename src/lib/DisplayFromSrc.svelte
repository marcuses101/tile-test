<script lang="ts">
	import Display from '$lib/Display.svelte';
	import { getDisplayInfoFromImageSrc } from '$lib/getDisplayInfoFromImageSrc';
	import type { SuperPixel } from './defs';

	const { src = '', pixelSize = 10 } = $props();
	let frame = $state<0 | 1>(0);
	const displayInfoPromise = $derived.by(async () => {
		if (!src) {
			return;
		}
		const display = await getDisplayInfoFromImageSrc(src);
		const [frame1, frame2] = display.pixelData.reduce(
			(acc, pix, index) => {
				const xPos = index % display.width;
				if (xPos < display.width / 2) {
					acc[0].pixelData.push(pix);
					return acc;
				}
				acc[1].pixelData.push(pix);
				return acc;
			},
			[
				{ width: display.width / 2, pixelData: [] as SuperPixel[] },
				{ width: display.width / 2, pixelData: [] as SuperPixel[] }
			]
		);
		return [frame1, frame2] as const;
	});
	$effect(() => {
		const interval = setInterval(() => {
			frame = (frame + 1) % 2;
		}, 500);
		return () => {
			clearInterval(interval);
		};
	});
</script>

{#await displayInfoPromise then displayInfo}
	{#if displayInfo}
		<Display width={displayInfo[0].width} pixelData={displayInfo[frame].pixelData} {pixelSize} />
	{/if}
{/await}
