import React, { useState } from "react";

// Standardized Severity Tiers & UI Colors
const SEVERITY_CONFIG = {
	CRITICAL: {
		label: "Critical",
		color: "#ef4444",
		badgeBg: "rgba(239, 68, 68, 0.15)",
	},
	HIGH: {
		label: "High",
		color: "#f97316",
		badgeBg: "rgba(249, 115, 22, 0.15)",
	},
	MEDIUM: {
		label: "Medium",
		color: "#eab308",
		badgeBg: "rgba(234, 179, 8, 0.15)",
	},
	LOW: {
		label: "Low",
		color: "#3b82f6",
		badgeBg: "rgba(59, 130, 246, 0.15)",
	},
};

// Rich Mock Risk Data aligned with SentinelGRC NIST / ISO Mappings
const DEMO_RISKS = [
	{
		id: "RISK-101",
		title: "Unencrypted S3 Bucket containing PII",
		severity: "CRITICAL",
		impact: 5,
		likelihood: 4,
		score: 20,
		tenantId: "tenant_alpha",
		category: "Cloud Infrastructure",
		framework: "NIST CSF 2.0 (PR.DS-01)",
		description:
			"S3 bucket `sentinel-customer-exports` lacks server-side encryption and has public read permissions enabled.",
		remediation:
			"Enable S3 Block Public Access and enforce AWS KMS SSE-KMS encryption policy.",
		owner: "SecOps Team",
		status: "Open",
	},
	{
		id: "RISK-102",
		title: "Missing Multi-Factor Authentication (MFA) on Enterprise VPN",
		severity: "HIGH",
		impact: 4,
		likelihood: 3,
		score: 12,
		tenantId: "tenant_alpha",
		category: "Identity & Access Management",
		framework: "ISO 27001 (A.9.4.2)",
		description:
			"Legacy VPN gateway permits single-factor password authentication for remote contractor access.",
		remediation:
			"Migrate VPN authentication to Okta IdP with mandatory WebAuthn/TOTP MFA enforcement.",
		owner: "IAM Lead",
		status: "In Progress",
	},
	{
		id: "RISK-103",
		title: "Outdated Third-Party Dependency (CVE-2024-1234)",
		severity: "MEDIUM",
		impact: 3,
		likelihood: 2,
		score: 6,
		tenantId: "tenant_alpha",
		category: "Application Security",
		framework: "SOC 2 (CC7.1)",
		description:
			"High-severity vulnerability discovered in frontend parsing module during automated SAST pipeline execution.",
		remediation:
			"Upgrade module to v4.2.0 and verify build via GitHub Actions security workflow.",
		owner: "AppSec Eng",
		status: "Open",
	},
	{
		id: "RISK-104",
		title: "Stale IAM User Access Keys (>180 Days)",
		severity: "LOW",
		impact: 2,
		likelihood: 1,
		score: 2,
		tenantId: "tenant_alpha",
		category: "Identity & Access Management",
		framework: "NIST CSF 2.0 (PR.AA-03)",
		description:
			"Service account credentials have not been rotated within the 90-day compliance threshold.",
		remediation:
			"Rotate access key pairs and transition service permissions to IAM Roles for EC2.",
		owner: "Cloud Infrastructure",
		status: "Mitigated",
	},
];

export default function App() {
	const [selectedCategory, setSelectedCategory] =
		useState(null);
	const [selectedRisk, setSelectedRisk] = useState(null);

	// Compute active counts for summary cards
	const counts = DEMO_RISKS.reduce(
		(acc, risk) => {
			acc[risk.severity] =
				(acc[risk.severity] || 0) + 1;
			return acc;
		},
		{ CRITICAL: 0, HIGH: 0, MEDIUM: 0, LOW: 0 },
	);

	// Filter risks based on selected category card
	const filteredRisks = selectedCategory
		? DEMO_RISKS.filter(
				(r) => r.severity === selectedCategory,
			)
		: [];

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
			{/* Header */}
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

			{/* Summary Stat Cards (Selectable Categories) */}
			<section style={{ marginBottom: "2rem" }}>
				<h3
					style={{
						marginTop: 0,
						marginBottom: "1rem",
						color: "#cbd5e1",
					}}
				>
					Tenant Risk Register Overview
					<span
						style={{
							fontSize: "0.875rem",
							color: "#64748b",
							fontWeight: "normal",
							marginLeft: "0.75rem",
						}}
					>
						(Click a card to view specific
						risks)
					</span>
				</h3>

				<div
					style={{
						display: "grid",
						gridTemplateColumns:
							"repeat(auto-fit, minmax(200px, 1fr))",
						gap: "1rem",
					}}
				>
					{Object.entries(SEVERITY_CONFIG).map(
						([key, config]) => {
							const isSelected =
								selectedCategory === key;
							return (
								<div
									key={key}
									onClick={() => {
										setSelectedCategory(
											isSelected
												? null
												: key,
										);
										setSelectedRisk(
											null,
										); // Reset open detail drawer on category change
									}}
									style={{
										padding: "1.25rem",
										borderRadius: "8px",
										backgroundColor:
											isSelected
												? "#334155"
												: "#1e293b",
										borderLeft: `4px solid ${config.color}`,
										borderTop:
											isSelected
												? `1px solid ${config.color}`
												: "1px solid transparent",
										borderRight:
											isSelected
												? `1px solid ${config.color}`
												: "1px solid transparent",
										borderBottom:
											isSelected
												? `1px solid ${config.color}`
												: "1px solid transparent",
										cursor: "pointer",
										transition:
											"all 0.15s ease-in-out",
										boxShadow:
											isSelected
												? `0 0 12px ${config.badgeBg}`
												: "none",
									}}
								>
									<div
										style={{
											fontSize:
												"0.875rem",
											color: "#94a3b8",
											display: "flex",
											justifyContent:
												"space-between",
											alignItems:
												"center",
										}}
									>
										<span>
											{config.label}{" "}
											Risks
										</span>
										{isSelected && (
											<span
												style={{
													fontSize:
														"0.75rem",
													color: config.color,
													fontWeight:
														"bold",
												}}
											>
												SELECTED
											</span>
										)}
									</div>
									<div
										style={{
											fontSize:
												"2rem",
											fontWeight:
												"bold",
											marginTop:
												"0.5rem",
											color: "#f8fafc",
										}}
									>
										{counts[key] || 0}
									</div>
								</div>
							);
						},
					)}
				</div>
			</section>

			{/* Drill-Down Level 1: Risk Category Item List */}
			{selectedCategory && (
				<section
					style={{
						marginBottom: "2rem",
						background: "#1e293b",
						borderRadius: "8px",
						padding: "1.5rem",
						border: "1px solid #334155",
					}}
				>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							marginBottom: "1rem",
						}}
					>
						<h3
							style={{
								margin: 0,
								color: SEVERITY_CONFIG[
									selectedCategory
								].color,
							}}
						>
							{
								SEVERITY_CONFIG[
									selectedCategory
								].label
							}{" "}
							Severity Risks (
							{filteredRisks.length})
						</h3>
						<button
							onClick={() => {
								setSelectedCategory(null);
								setSelectedRisk(null);
							}}
							style={{
								background: "transparent",
								border: "1px solid #475569",
								color: "#94a3b8",
								borderRadius: "4px",
								padding: "0.25rem 0.75rem",
								cursor: "pointer",
							}}
						>
							Close Category
						</button>
					</div>

					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "0.75rem",
						}}
					>
						{filteredRisks.map((risk) => (
							<div
								key={risk.id}
								onClick={() =>
									setSelectedRisk(risk)
								}
								style={{
									padding: "1rem",
									borderRadius: "6px",
									backgroundColor:
										selectedRisk?.id ===
										risk.id
											? "#0f172a"
											: "#0f172a",
									border:
										selectedRisk?.id ===
										risk.id
											? `1px solid ${SEVERITY_CONFIG[selectedCategory].color}`
											: "1px solid #334155",
									cursor: "pointer",
									display: "flex",
									justify:
										"space-between",
									justifyContent:
										"space-between",
									alignItems: "center",
								}}
							>
								<div>
									<div
										style={{
											display: "flex",
											gap: "0.5rem",
											alignItems:
												"center",
											marginBottom:
												"0.25rem",
										}}
									>
										<span
											style={{
												fontSize:
													"0.75rem",
												fontWeight:
													"bold",
												color: "#38bdf8",
												background:
													"rgba(56, 189, 248, 0.1)",
												padding:
													"0.1rem 0.5rem",
												borderRadius:
													"4px",
											}}
										>
											{risk.id}
										</span>
										<span
											style={{
												fontWeight:
													"bold",
												color: "#f8fafc",
											}}
										>
											{risk.title}
										</span>
									</div>
									<div
										style={{
											fontSize:
												"0.875rem",
											color: "#94a3b8",
										}}
									>
										{risk.category} •{" "}
										{risk.framework}
									</div>
								</div>

								<div
									style={{
										textAlign: "right",
									}}
								>
									<div
										style={{
											fontSize:
												"0.875rem",
											fontWeight:
												"bold",
											color: SEVERITY_CONFIG[
												risk
													.severity
											].color,
										}}
									>
										Score: {risk.score}{" "}
										({risk.impact}×
										{risk.likelihood})
									</div>
									<div
										style={{
											fontSize:
												"0.75rem",
											color: "#64748b",
										}}
									>
										Click to view
										details →
									</div>
								</div>
							</div>
						))}
					</div>
				</section>
			)}

			{/* Drill-Down Level 2: Comprehensive Risk Specification Modal / Drawer */}
			{selectedRisk && (
				<div
					style={{
						position: "fixed",
						top: 0,
						right: 0,
						bottom: 0,
						width: "450px",
						maxWidth: "90vw",
						backgroundColor: "#0f172a",
						borderLeft: "2px solid #334155",
						boxShadow:
							"-8px 0 24px rgba(0,0,0,0.5)",
						padding: "2rem",
						overflowY: "auto",
						zIndex: 1000,
					}}
				>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							borderBottom:
								"1px solid #334155",
							paddingBottom: "1rem",
							marginBottom: "1.5rem",
						}}
					>
						<span
							style={{
								fontSize: "0.875rem",
								fontWeight: "bold",
								color: SEVERITY_CONFIG[
									selectedRisk.severity
								].color,
								backgroundColor:
									SEVERITY_CONFIG[
										selectedRisk
											.severity
									].badgeBg,
								padding: "0.25rem 0.75rem",
								borderRadius: "4px",
							}}
						>
							{selectedRisk.severity} (
							{selectedRisk.id})
						</span>
						<button
							onClick={() =>
								setSelectedRisk(null)
							}
							style={{
								background: "none",
								border: "none",
								color: "#94a3b8",
								fontSize: "1.5rem",
								cursor: "pointer",
							}}
						>
							×
						</button>
					</div>

					<h2
						style={{
							fontSize: "1.25rem",
							marginTop: 0,
							color: "#f8fafc",
						}}
					>
						{selectedRisk.title}
					</h2>

					<div
						style={{
							display: "grid",
							gridTemplateColumns: "1fr 1fr",
							gap: "1rem",
							marginBottom: "1.5rem",
							background: "#1e293b",
							padding: "1rem",
							borderRadius: "6px",
						}}
					>
						<div>
							<div
								style={{
									fontSize: "0.75rem",
									color: "#94a3b8",
								}}
							>
								Impact × Likelihood
							</div>
							<div
								style={{
									fontWeight: "bold",
									marginTop: "0.25rem",
								}}
							>
								{selectedRisk.impact} / 5 ×{" "}
								{selectedRisk.likelihood} /
								5
							</div>
						</div>
						<div>
							<div
								style={{
									fontSize: "0.75rem",
									color: "#94a3b8",
								}}
							>
								Total Risk Score
							</div>
							<div
								style={{
									fontWeight: "bold",
									marginTop: "0.25rem",
									color: SEVERITY_CONFIG[
										selectedRisk
											.severity
									].color,
								}}
							>
								{selectedRisk.score} / 25
							</div>
						</div>
					</div>

					<div
						style={{ marginBottom: "1.25rem" }}
					>
						<label
							style={{
								fontSize: "0.75rem",
								color: "#94a3b8",
								textTransform: "uppercase",
								letterSpacing: "0.05em",
							}}
						>
							Compliance Framework Mapping
						</label>
						<div
							style={{
								fontSize: "0.95rem",
								color: "#38bdf8",
								marginTop: "0.25rem",
								fontWeight: "500",
							}}
						>
							{selectedRisk.framework}
						</div>
					</div>

					<div
						style={{ marginBottom: "1.25rem" }}
					>
						<label
							style={{
								fontSize: "0.75rem",
								color: "#94a3b8",
								textTransform: "uppercase",
								letterSpacing: "0.05em",
							}}
						>
							Description
						</label>
						<p
							style={{
								fontSize: "0.9rem",
								color: "#cbd5e1",
								marginTop: "0.25rem",
								lineHeight: "1.5",
							}}
						>
							{selectedRisk.description}
						</p>
					</div>

					<div
						style={{ marginBottom: "1.25rem" }}
					>
						<label
							style={{
								fontSize: "0.75rem",
								color: "#94a3b8",
								textTransform: "uppercase",
								letterSpacing: "0.05em",
							}}
						>
							Remediation Plan
						</label>
						<p
							style={{
								fontSize: "0.9rem",
								color: "#4ade80",
								marginTop: "0.25rem",
								lineHeight: "1.5",
								background:
									"rgba(74, 222, 128, 0.1)",
								padding: "0.75rem",
								borderRadius: "6px",
							}}
						>
							{selectedRisk.remediation}
						</p>
					</div>

					<div
						style={{
							display: "grid",
							gridTemplateColumns: "1fr 1fr",
							gap: "1rem",
							marginTop: "2rem",
							borderTop: "1px solid #334155",
							paddingTop: "1rem",
							fontSize: "0.85rem",
						}}
					>
						<div>
							<span
								style={{ color: "#94a3b8" }}
							>
								Owner:
							</span>{" "}
							<span
								style={{ color: "#f8fafc" }}
							>
								{selectedRisk.owner}
							</span>
						</div>
						<div>
							<span
								style={{ color: "#94a3b8" }}
							>
								Status:
							</span>{" "}
							<span
								style={{ color: "#f8fafc" }}
							>
								{selectedRisk.status}
							</span>
						</div>
					</div>
				</div>
			)}
		</main>
	);
}
