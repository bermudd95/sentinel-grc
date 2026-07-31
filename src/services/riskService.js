import {
	collection,
	addDoc,
	getDocs,
	query,
	where,
	orderBy,
	serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { calculateRiskScore } from "../utils/riskCalculator";

const RISKS_COLLECTION = "risks";

export const createRisk = async (
	tenantId,
	riskData,
	createdBy,
) => {
	if (!tenantId)
		throw new Error(
			"Tenant ID is required to create a risk.",
		);

	const { score, severityLabel } = calculateRiskScore(
		riskData.impact,
		riskData.likelihood,
	);

	const payload = {
		...riskData,
		tenantId,
		score,
		severity: severityLable,
		createBy,
		createdAt: serverTimestamp(),
		updatedAt: serverTimestamp(),
	};

	const docRef = await addDoc(
		collection(db, RISK_COLLECTION),
		payload,
	);
	return { id: docRef.id, ...payload };
};

export const getTenantRisks = async (tenantId) => {
	if (!tenantId)
		throw new Error(
			"Tenant ID is required to fetch risks.",
		);

	const q = query(
		collection(db, RISK_COLLECTION),
		where("tenantId", "==", tenantId),
		orderBy("createdAt", "desc"),
	);

	const querySnapshot = await getDocs(q);
	return querySnapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));
};
