import React from "react";

const SEVERITY_CONFIG = {
	CRITICAL: { label: "Critical", color: "#ef4444" },
	HIGH: { label: "High", color: "#f97316" },
	MEDIUM: { label: "Medium", color: "#eab308" },
	LOW: { label: "Low", color: "#3b82f6" },
};

const DEMO_RISKS = [
	{
		id: "1",
		title: "Unencrypted S3 Bucket",
		severity: "CRITICAL",
	},
	{
		id: "2",
		title: "Missing MFA on VPN",
		severity: "HIGH",
	},
	{
		id: "3",
		title: "Outdated Dependency (CVE-2024-1234)",
		severity: "MEDIUM",
	},
	{
		id: "4",
		title: "Stale IAM User Access Keys",
		severity: "LOW",
	},
];

export default function App() {
	const counts = DEMO_RISKS.reduce(
		(acc, risk) => {
			const sev = risk.severity;
			acc[sev] = (acc[sev] || 0) + 1;
			return acc;
		},
		{ CRITICAL: 0, HIGH: 0, MEDIUM: 0, LOW: 0 },
	);

	return (
		<main
			style={{
				padding: "2rem",
				fontFamily: "system-ui, sans-serif",
				backgroundColor: "#0f172a",
				minHeight: "100vh",
				color: "#f8fafc",
			}}
		>
			<header
				style={{
					marginBottom: "2rem",
					borderBottom: "1px solid #334155",
					paddingBottom: "1rem",
				}}
			>
				<h1
					style={{
						margin: 0,
						fontSize: "1.875rem",
					}}
				>
					🛡️ SentinelGRC Platform
				</h1>
				<p
					style={{
						color: "#94a3b8",
						marginTop: "0.25rem",
					}}
				>
					Zero-Trust Multi-Tenant Risk &
					Compliance Engine | Active Tenant:{" "}
					<code style={{ color: "#38bdf8" }}>
						tenant_alpha
					</code>
				</p>
			</header>

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
						gridTemplateColumns:
							"repeat(4, 1fr)",
						gap: "1rem",
					}}
				>
					{Object.entries(SEVERITY_CONFIG).map(
						([key, config]) => (
							<div
								key={key}
								style={{
									padding: "1rem",
									borderRadius: "6px",
									backgroundColor:
										"#0f172a",
									borderLeft: `4px solid ${config.color}`,
								}}
							>
								<div
									style={{
										fontSize:
											"0.875rem",
										color: "#94a3b8",
									}}
								>
									{config.label} Risks
								</div>
								<div
									style={{
										fontSize: "1.75rem",
										fontWeight: "bold",
										marginTop:
											"0.25rem",
									}}
								>
									{counts[key] || 0}
								</div>
							</div>
						),
					)}
				</div>
			</div>
		</main>
	);
}
