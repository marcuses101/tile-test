<script lang="ts">
	import DisplayFromSrc from '$lib/DisplayFromSrc.svelte';

	const MAX_ROTATION_DEGREES = 60;

	let clientX = $state(0);
	let clientY = $state(0);
	let container: HTMLElement | undefined = $state();
	let boundingClientRect = $state<DOMRect>();
	let pixSize = $state(10);
	$effect(() => {
		if (!container) {
			return;
		}
		boundingClientRect = container.getBoundingClientRect();
		const interval = setInterval(() => {
			boundingClientRect = container?.getBoundingClientRect();
		}, 500);
		return () => {
			clearInterval(interval);
		};
	});
	let rotZ = $state(0);
	let rotX = $derived.by(() => {
		if (!boundingClientRect) {
			return 0;
		}
		let center = boundingClientRect.x + boundingClientRect.width / 2;
		let sign = clientX < center ? -1 : 1;
		let distanceFromCenter = Math.abs(center - clientX);
		let factor = distanceFromCenter / (boundingClientRect.width / 2);
		return sign * factor * MAX_ROTATION_DEGREES;
	});
	let rotY = $derived.by(() => {
		if (!boundingClientRect) {
			return 0;
		}
		let center = boundingClientRect.y + boundingClientRect.height / 2;
		let sign = clientY > center ? -1 : 1;
		let distanceFromCenter = Math.abs(center - clientY);
		let factor = distanceFromCenter / (boundingClientRect.height / 2);
		return sign * factor * MAX_ROTATION_DEGREES;
	});
</script>

<main style="--rot-x:{rotY}deg;--rot-y:{rotX}deg;--rot-z:{rotZ}deg;">
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="controls">
		<input type="number" bind:value={pixSize} />
		<input
			bind:value={rotZ}
			type="range"
			min={-MAX_ROTATION_DEGREES}
			max={MAX_ROTATION_DEGREES}
			step="0.01"
		/>
		<section
			bind:this={container}
			onmousemove={(e) => {
				clientX = e.clientX;
				clientY = e.clientY;
			}}
		>
			<div class="box"></div>
		</section>
	</div>
	<div class="flex">
		<DisplayFromSrc src="/pappi-0001.png" pixelSize={pixSize} />
		<DisplayFromSrc src="/xav-0001.png" pixelSize={pixSize} />
		<DisplayFromSrc src="/pappi-0001.png" pixelSize={pixSize} />
		<DisplayFromSrc src="/xav-0001.png" pixelSize={pixSize} />
	</div>
</main>

<style>
	main {
		padding-top: 4rem;
		height: 100vh;
		display: grid;
		place-items: start;
		grid-template-columns: auto 1fr;
		--trans: rotateX(var(--rot-x)) rotateY(var(--rot-y)) rotateZ(var(--rot-z));
		--br: 0px;
	}
	section {
		height: 300px;
		width: 300px;
		display: grid;
		place-items: center;
		border: 2px solid CanvasText;
		perspective: 500px;
	}
	.box {
		height: 200px;
		width: 200px;
		border: 2px solid CanvasText;
		transform: var(--trans);
		transform-style: preserve-3d;
		background: linear-gradient(45deg, red, blue);
	}
	.flex {
		display: flex;
		justify-content: center;
		max-width: 100vw;
		flex-wrap: wrap;
	}
	.controls {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
</style>
