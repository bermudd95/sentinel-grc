import React, { useState, useEffect } from "react";
import { RiskMatrix } from "./components/RiskMatrix";
import { getTenantRisks } from "./services/riskService";

// Fallback data so the UI displays immediately during development/demo
const MOCK_DEMO_RISKS = [
	{
		id: "1",
		title: "Unencrypted S3 Bucket",
		impact: 5,
		likelihood: 4,
		severity: "Critical",
	},
	{
		id: "2",
		title: "Missing MFA on VPN",
		impact: 4,
		likelihood: 3,
		severity: "High",
	},
	{
		id: "3",
		title: "Outdated Dependency (CVE-2024-1234)",
		impact: 3,
		likelihood: 2,
		severity: "Medium",
	},
	{
		id: "4",
		title: "Stale IAM User Access Keys",
		impact: 2,
		likelihood: 1,
		severity: "Low",
	},
];

export default function App() {
	const [risks, setRisks] = useState(MOCK_DEMO_RISKS);
	const [loading, setLoading] = useState(true);
	const currentTenantId = "tenant_alpha";

	useEffect(() => {
		const fetchRisks = async () => {
			try {
				const data =
					await getTenantRisks(currentTenantId);
				if (data && data.length > 0) {
					setRisks(data);
				}
			} catch (err) {
				console.warn(
					"Firebase not connected or empty, using demo state:",
					err.message,
				);
			} finally {
				setLoading(false);
			}
		};

		fetchRisks();
	}, [currentTenantId]);

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
					pb: "1rem",
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
						{currentTenantId}
					</code>
				</p>
			</header>

			<section>
				{loading ? (
					<p style={{ color: "#94a3b8" }}>
						Loading tenant risk register...
					</p>
				) : (
					<RiskMatrix risks={risks} />
				)}
			</section>
		</main>
	);
}
