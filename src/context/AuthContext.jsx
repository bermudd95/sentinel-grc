import React, {
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [claims, setClaims] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(
			auth,
			async (currentUser) => {
				if (currentUser) {
					const tokenResult =
						await currentUser.getIdTokenResult(
							true,
						);
					setUser(currentUser);
					setClaims(tokenResult.claims);
				} else {
					setUser(null);
					setClaims(null);
				}
				setLoading(false);
			},
		);

		return () => unsubscribe();
	}, []);

	const value = {
		user,
		claims,
		tenantId: claims?.tenantId || null,
		role: claims?.role || null,
		isAdmin: claims?.role === "Admin",
		isAuditor: claims?.role === "Auditor",
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
