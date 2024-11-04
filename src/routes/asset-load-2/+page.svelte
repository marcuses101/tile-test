<script lang="ts">
	let scale = $state(20);
	let base = $state(2);
	let rotX = $state(0);
	let rotY = $state(0);
	let rotZ = $state(0);

	const FRAME_WIDTH_BASE = 36;
	const FRAME_HEIGHT_BASE = 36;
	const IMAGE_WIDTH = 72;
	const IMAGE_HEIGHT = 36;
	let sections = $derived([...Array(base ** 2)].map((_, i) => i));
	let style = $derived.by(() => {
		let styleString = `--base-width:${FRAME_WIDTH_BASE}px;`;
		styleString += `--base-height:${FRAME_HEIGHT_BASE}px;`;
		styleString += `--base:${base};`;
		styleString += `--scale:${scale};`;
		styleString += `--size:${((100 * IMAGE_WIDTH) / IMAGE_HEIGHT) * base}%;`;
		styleString += `--ratio:${IMAGE_WIDTH / IMAGE_HEIGHT};`;
		styleString += `--rot-x:${rotX}deg;`;
		styleString += `--rot-y:${rotY}deg;`;
		styleString += `--rot-z:${rotZ}deg;`;
		return styleString;
	});
</script>

<h1>Background Image Test</h1>

<div class="controls">
	<label>
		Scale
		<input bind:value={scale} type="range" min="1" max="20" />
	</label>
	<label>
		Base
		<input bind:value={base} type="range" min="1" max="10" />
	</label>
	<label>
		RotX
		<input bind:value={rotX} type="range" min="-45" max="45" />
	</label>
	<label>
		RotY
		<input bind:value={rotY} type="range" min="-45" max="45" />
	</label>
	<label>
		RotZ
		<input bind:value={rotZ} type="range" min="-45" max="45" />
	</label>
	<button
		onclick={() => {
			scale = 20;
			base = 2;
			rotX = 0;
			rotZ = 0;
			rotY = 0;
		}}>Reset</button
	>
</div>
<section {style}>
	{#each sections as num (num)}
		<div class="cell">
			<div
				class="image cell-content"
				style="--x-pos:{num % base};--y-pos:{Math.floor(num / base)};"
			></div>
		</div>
	{/each}
</section>

<style>
	.controls {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.image {
		background-image: url('/pappi-0001.png');
		background-size: var(--size, 100%);
		--bg-pos-x: calc(var(--x-pos) / (var(--base) * var(--ratio) - 1));
		--bg-pos-y: calc(var(--y-pos) / (var(--base) - 1));
		background-position-x: calc(100% * var(--bg-pos-x));
		background-position-y: calc(100% * var(--bg-pos-y));
		image-rendering: pixelated;
	}
	section {
		--trans: rotateX(var(--rot-x, 0deg)) rotateY(var(--rot-y, 0deg)) rotateZ(var(--rot-z, 0deg));
		--width: calc(var(--base-width) * var(--scale, 1));
		--height: calc(var(--base-height) * var(--scale, 1));
		display: grid;
		width: var(--width);
		height: var(--height);
		margin-inline: auto;
		grid-template-columns: repeat(var(--base), 1fr);
		grid-template-rows: repeat(var(--base), 1fr);
	}
	.cell {
		perspective: 2_000px;
	}
	.cell-content {
		height: 100%;
		border-radius: var(--br, 0px);
		transform: var(--trans);
		transform-style: preserve-3d;
	}
	button {
		width: 200px;
		display: inline;
		background-color: CanvasText;
		color: Canvas;
	}
</style>
