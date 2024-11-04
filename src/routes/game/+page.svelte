<script lang="ts">
	import Display from '$lib/Display.svelte';
	import type { ComponentProps } from 'svelte';

	const WIDTH = 256;
	const HEIGHT = 240;

	const pixels: ComponentProps<typeof Display>['pixelData'] = [...Array(256 * 240)].map(() => {
		return {
			red: Math.random() * 255,
			green: Math.random() * 255,
			blue: Math.random() * 255,
			alpha: 255,
			rotY: 0,
			rotX: 0,
			degrees: 0
		};
	});
</script>

<div class="tv">
	<Display width={WIDTH} pixelSize={3} pixelData={pixels} />
</div>

<style>
	.tv {
		margin-top: 5rem;
		border: 1px solid CanvasText;
		margin-inline: auto;
		width: fit-content;
	}
</style>
