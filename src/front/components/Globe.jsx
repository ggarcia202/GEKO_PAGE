import { useEffect, useRef } from "react";
import createGlobe from "cobe";

const globeMarkers = [
	{ location: [40.4168, -3.7038], size: 0.09, id: "madrid" },
	{ location: [48.8566, 2.3522], size: 0.07, id: "paris" },
	{ location: [40.7128, -74.006], size: 0.08, id: "nyc" },
	{ location: [-23.5505, -46.6333], size: 0.06, id: "saopaulo" }
];

const globeArcs = [
	{ from: [40.4168, -3.7038], to: [48.8566, 2.3522] },
	{ from: [40.4168, -3.7038], to: [40.7128, -74.006] },
	{ from: [40.4168, -3.7038], to: [-23.5505, -46.6333] }
];

export const Globe = () => {
	const canvasRef = useRef(null);
	const containerRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const container = containerRef.current;

		if (!canvas || !container) return undefined;

		let globe = null;
		let animationFrame = 0;
		let resizeFrame = 0;
		let pointerId = null;
		let lastX = 0;
		let lastY = 0;
		let phi = 0;
		let theta = 0.2;
		let velocityPhi = 0.005;
		let velocityTheta = 0;
		let size = 0;

		const createOrResizeGlobe = () => {
			size = Math.max(320, Math.round(container.getBoundingClientRect().width));
			const dpr = Math.min(window.devicePixelRatio || 1, 2);

			canvas.width = size * dpr;
			canvas.height = size * dpr;

			globe?.destroy();
			globe = createGlobe(canvas, {
				devicePixelRatio: dpr,
				width: canvas.width,
				height: canvas.height,
				phi,
				theta,
				dark: 1,
				diffuse: 1.2,
				mapSamples: 16000,
				mapBrightness: 6,
				mapBaseBrightness: 0.02,
				baseColor: [0.52, 0.42, 0.94],
				markerColor: [1, 0.58, 0.18],
				glowColor: [1, 0.95, 0.88],
				offset: [0, 0],
				scale: 1,
				markers: globeMarkers,
				arcs: globeArcs,
				arcColor: [1, 0.71, 0.42],
				arcWidth: 0.55,
				arcHeight: 0.22,
				markerElevation: 0.04,
				opacity: 1
			});
		};

		const animate = () => {
			phi += velocityPhi;
			theta = Math.max(-0.45, Math.min(0.45, theta + velocityTheta));

			if (pointerId === null) {
				velocityPhi += (0.005 - velocityPhi) * 0.04;
				velocityTheta *= 0.9;
			} else {
				velocityPhi *= 0.94;
				velocityTheta *= 0.94;
			}

			globe?.update({ phi, theta });
			animationFrame = window.requestAnimationFrame(animate);
		};

		const handlePointerDown = (event) => {
			pointerId = event.pointerId;
			lastX = event.clientX;
			lastY = event.clientY;
			velocityPhi = 0;
			velocityTheta = 0;
			canvas.setPointerCapture?.(event.pointerId);
		};

		const handlePointerMove = (event) => {
			if (pointerId !== event.pointerId) return;

			const deltaX = event.clientX - lastX;
			const deltaY = event.clientY - lastY;

			lastX = event.clientX;
			lastY = event.clientY;

			phi += deltaX * 0.01;
			theta = Math.max(-0.45, Math.min(0.45, theta + deltaY * 0.005));
			velocityPhi = deltaX * 0.0007;
			velocityTheta = deltaY * 0.00018;
			globe?.update({ phi, theta });
		};

		const releasePointer = (event) => {
			if (pointerId !== event.pointerId) return;
			pointerId = null;
			canvas.releasePointerCapture?.(event.pointerId);
		};

		const handleResize = () => {
			window.cancelAnimationFrame(resizeFrame);
			resizeFrame = window.requestAnimationFrame(() => {
				createOrResizeGlobe();
			});
		};

		createOrResizeGlobe();
		animate();

		canvas.addEventListener("pointerdown", handlePointerDown);
		canvas.addEventListener("pointermove", handlePointerMove);
		canvas.addEventListener("pointerup", releasePointer);
		canvas.addEventListener("pointercancel", releasePointer);
		canvas.addEventListener("pointerleave", releasePointer);
		window.addEventListener("resize", handleResize);

		return () => {
			canvas.removeEventListener("pointerdown", handlePointerDown);
			canvas.removeEventListener("pointermove", handlePointerMove);
			canvas.removeEventListener("pointerup", releasePointer);
			canvas.removeEventListener("pointercancel", releasePointer);
			canvas.removeEventListener("pointerleave", releasePointer);
			window.removeEventListener("resize", handleResize);
			window.cancelAnimationFrame(animationFrame);
			window.cancelAnimationFrame(resizeFrame);
			globe?.destroy();
		};
	}, []);

	return (
		<div ref={containerRef} className="geko-globe-shell" aria-hidden="true">
			<canvas ref={canvasRef} className="geko-globe-canvas" />
		</div>
	);
};
