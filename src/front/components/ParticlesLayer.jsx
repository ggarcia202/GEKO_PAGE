const particles = [
	{ x: "6%", y: "14%", size: "8px", delay: "0s", duration: "15s" },
	{ x: "14%", y: "42%", size: "12px", delay: "-3s", duration: "19s" },
	{ x: "20%", y: "72%", size: "6px", delay: "-5s", duration: "17s" },
	{ x: "28%", y: "18%", size: "10px", delay: "-7s", duration: "21s" },
	{ x: "34%", y: "58%", size: "14px", delay: "-2s", duration: "18s" },
	{ x: "42%", y: "34%", size: "7px", delay: "-11s", duration: "16s" },
	{ x: "50%", y: "80%", size: "9px", delay: "-9s", duration: "22s" },
	{ x: "58%", y: "22%", size: "13px", delay: "-4s", duration: "20s" },
	{ x: "66%", y: "48%", size: "8px", delay: "-8s", duration: "17s" },
	{ x: "74%", y: "12%", size: "11px", delay: "-6s", duration: "23s" },
	{ x: "80%", y: "68%", size: "7px", delay: "-10s", duration: "18s" },
	{ x: "88%", y: "30%", size: "12px", delay: "-1s", duration: "19s" }
];

export const ParticlesLayer = () => {
	return (
		<div className="geko-particles" aria-hidden="true">
			{particles.map((particle, index) => (
				<span
					key={`${particle.x}-${particle.y}`}
					className="geko-particle"
					style={{
						"--particle-x": particle.x,
						"--particle-y": particle.y,
						"--particle-size": particle.size,
						"--particle-delay": particle.delay,
						"--particle-duration": particle.duration,
						"--particle-drift": `${18 + (index % 4) * 10}px`
					}}
				/>
			))}
		</div>
	);
};
