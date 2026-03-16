const geckoPath =
	"M90 472V327c0-76 25-140 77-193 51-54 116-81 195-81h151c13 0 24 5 33 14l30 31c18 17 40 26 66 26h89c7 0 13 2 19 6l64 43c18 13 32 28 42 46l20 38c4 8 6 16 6 25v14c0 14-5 27-15 37s-23 15-37 15l-104-8-100 25-147 29c-34 6-66 19-97 38-26 16-45 37-56 64-7 16-11 36-11 60v61h-202Z";
const headBlob = "M43 79c12-22 34-33 65-33 32 0 54 11 65 33 12 21 10 42-6 62-16 19-36 29-59 29-24 0-44-10-60-29-16-20-18-41-5-62Z";
const legBlob = "M31 72c0-17 12-29 28-29 14 0 25 8 28 21 4 15 12 25 24 31 12 5 18 15 18 30 0 17-12 29-28 29-10 0-19-4-24-11-8-10-17-15-30-16-10-1-16-7-16-16 0-7 4-14 12-20 8-6 12-12 12-19Z";

export const GeckoIcon = ({
	className = "",
	style = {},
	fill = "#6f2c8f",
	accentFill = fill,
	size = 64
}) => (
	<svg
		viewBox="0 0 820 520"
		aria-hidden="true"
		className={className}
		style={{ width: size, height: size, ...style }}
	>
		<path d={headBlob} fill={accentFill} transform="translate(0 8)" />
		<path d={legBlob} fill={accentFill} transform="translate(500 340)" />
		<path d={geckoPath} fill={fill} transform="translate(0 -16)" />
		<circle cx="620" cy="155" r="22" fill="#000000" />
		<path
			d="M564 190c32-18 76-22 134-12 29 6 67 10 116 12"
			stroke={accentFill}
			strokeWidth="8"
			fill="none"
			strokeLinecap="round"
		/>
	</svg>
);

export const GekoWordmark = ({
	className = "",
	style = {},
	textColor = "#24113f",
	marketingColor = "#9ea0f3",
	iconFill = "#6f2c8f",
	iconAccentFill = "#9ea0f3",
	showMarketing = true
}) => (
	<div className={className} style={style}>
		<div className="d-flex align-items-end gap-3">
			<div style={{ lineHeight: 0.82 }}>
				<div
					style={{
						fontFamily: 'Georgia, "Times New Roman", serif',
						fontSize: "clamp(2.6rem, 7vw, 6.5rem)",
						fontWeight: 500,
						letterSpacing: "-0.06em",
						color: textColor
					}}
				>
					GEKO
				</div>
				{showMarketing && (
					<div
						style={{
							fontSize: "clamp(0.9rem, 2vw, 1.7rem)",
							letterSpacing: "0.6em",
							color: marketingColor,
							paddingLeft: "0.18em",
							marginTop: "0.35rem",
							textTransform: "uppercase",
							fontWeight: 300
						}}
					>
						MARKETING
					</div>
				)}
			</div>
			<GeckoIcon fill={iconFill} accentFill={iconAccentFill} size={showMarketing ? 132 : 108} />
		</div>
	</div>
);
