import React from "react";
import { SEVERITY_LEVELS } from "../utils/riskCalculator";

export const RiskMatrix = ({ risks = [] }) => {
	const counts = risks.reduce(
		(acc, risk) => {
			const sev =
				risk.severity?.toUpperCase() || "LOW";
			acc[sev] = (acc[sev] || 0) + 1;
			return acc;
		},
		{ CRITICAL: 0, HIGH: 0, MEDIUM: 0, LOW: 0 },
	);

	return (
		<div
			style={{
				padding: "1.5rem",
				background: "#1e293b",
				borderRadius: "8px",
				color: "#fff",
			}}
		>
			<h3
				style={{
					marginTop: 0,
					marginBottom: "1rem",
				}}
			>
				Tenant Risk Overview
			</h3>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(4,1fr)",
					gap: "1rem",
				}}
			>
				{Object.entries(SEVERITY_LEVELS).map(
					([key, config]) => (
						<div
							key={key}
							style={{
								padding: "1rem",
								borderRadius: "6px",
								backgroundColor: "#0f172a",
								borderLeft: `4px solid ${config.color}`,
							}}
						>
							<div
								style={{
									fontSize: "0.875rem",
									color: "#94a3b8",
								}}
							>
								{config.label}
							</div>
							<div
								style={{
									fontSize: "1.75rem",
									fontWeight: "bold",
									marginTop: "0.25rem",
								}}
							>
								{count[key] || 0}
							</div>
						</div>
					),
				)}
			</div>
		</div>
	);
};
