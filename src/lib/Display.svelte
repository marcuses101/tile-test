<script lang="ts">
	import type { SuperPixel } from './defs';
	type DisplayProps = {
		width: number;
		pixelSize: number;
		pixelData: SuperPixel[];
	};
	const { width = 0, pixelSize = 10, pixelData = [] }: DisplayProps = $props();
	const styleStrings = $derived.by(() => {
		let styleString = pixelData.map(({ red, green, blue, alpha, rotX, rotY, degrees }, i) => {
			let style = `--red:${red};--green:${green};--blue:${blue};--alpha:${alpha};`;
			if (rotX) {
				style = `${style}--rot-x:${rotX}`;
			}
			if (rotY) {
				style = `${style}--rot-y:${rotY}`;
			}
			if (degrees) {
				style = `${style}--deg:${degrees}deg`;
			}
			return [style, i];
		});
		return styleString as [string, number][];
	});
</script>

<section class="display" style="--width:{width};--pixel-size:{pixelSize}px">
	{#each styleStrings as [style, key] (key)}
		<div class="cell" {style}>
			<div class="cell-content"></div>
		</div>
	{/each}
</section>

<style>
	.display {
		display: grid;
		grid-template-columns: repeat(var(--width, 1), var(--pixel-size, 10px));
		grid-auto-rows: var(--pixel-size, 10px);
	}
	.cell {
		perspective: 200px;
	}
	.cell-content {
		/*		--trans: rotate3d(var(--rot-x, 0), var(--rot-y, 0), var(--rot-z, 0), var(--deg, 0deg));*/
		height: 100%;
		border-radius: var(--br, 0px);
		transform: var(--trans);
		transform-style: preserve-3d;
		background-color: rgba(var(--red, 0), var(--green, 0), var(--blue, 0), var(--alpha, 0));
	}
</style>
