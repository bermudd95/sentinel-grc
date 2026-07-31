import { collection, addDoc, serverTimestamp, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

const AUDIT_COLLECTION = 'audit_logs';

/**
 * Records an immutable audit log entry in Firestore
 */
export const logAuditEvent = async ({ tenantId, userId, userRole, action, resourceId, details }) => {
  if (!tenantId || !userId) {
    throw new Error("Tenant ID and User ID are required for audit logging.");
  }

  const logEntry = {
    tenantId,
    userId,
    userRole: userRole || 'Unknown',
    action, // e.g., 'RISK_CREATED', 'RISK_UPDATED', 'CONTROL_MAPPED'
    resourceId: resourceId || null,
    details: details || {},
    timestamp: serverTimestamp()
  };

  const docRef = await addDoc(collection(db, AUDIT_COLLECTION), logEntry);
  return { id: docRef.id, ...logEntry };
};

/**
 * Fetches tenant-scoped audit logs for compliance reporting
 */
export const getTenantAuditLogs = async (tenantId) => {
  if (!tenantId) throw new Error("Tenant ID is required to fetch audit logs.");

  const q = query(
    collection(db, AUDIT_COLLECTION),
    where("tenantId", "==", tenantId),
    orderBy("timestamp", "desc")
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};