import React, { useState, useEffect } from "react";
import { RiskMatrix } from "./components/RiskMatrix";
import { getTenantRisks } from "./services/riskService";

export default function App() {
	const [risks, setRisks] = useState([]);
	// Simulated tenant context (e.g. injected via custom JWT claims)
	const currentTenantId = "tenant_alpha";

	useEffect(() => {
		const fetchRisks = async () => {
			try {
				const data =
					await getTenantRisks(currentTenantId);
				setRisks(data);
			} catch (err) {
				console.error(
					"Error loading tenant risks:",
					err,
				);
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
			<header style={{ marginBottom: "2rem" }}>
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
					Compliance Engine
				</p>
			</header>

			<section>
				<RiskMatrix risks={risks} />
			</section>
		</main>
	);
}
