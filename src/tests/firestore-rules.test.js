import { 
  initializeTestEnvironment, 
  assertFails, 
  assertSucceeds 
} from '@firebase/rules-unit-testing';
import fs from 'fs';

let testEnv;

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: 'sentinel-grc-test',
    firestore: {
      rules: fs.readFileSync('firestore.rules', 'utf8'),
    },
  });
});

afterAll(async () => {
  await testEnv.cleanup();
});

beforeEach(async () => {
  await testEnv.clearFirestore();
});

describe('SentinelGRC Firestore Security Rules', () => {
  const tenantA = 'tenant_101';
  const tenantB = 'tenant_202';

  test('Denies access when cross-tenant data is requested', async () => {
    const userA = testEnv.authenticatedContext('user_a', { tenantId: tenantA });
    const db = userA.firestore();

    // Attempt to access tenant_202 record with tenant_101 token
    const unauthorizedQuery = db.collection('risks').where('tenantId', '==', tenantB).get();
    await assertFails(unauthorizedQuery);
  });

  test('Allows user to create risk within their own tenant scope', async () => {
    const userA = testEnv.authenticatedContext('user_a', { tenantId: tenantA });
    const db = userA.firestore();

    const validRisk = db.collection('risks').doc('risk_1').set({
      tenantId: tenantA,
      title: 'Unpatched Server',
      score: 12
    });
    await assertSucceeds(validRisk);
  });

  test('Strictly denies updating or deleting immutable audit logs', async () => {
    const userA = testEnv.authenticatedContext('user_a', { tenantId: tenantA });
    const db = userA.firestore();

    // Attempt to update an existing audit log
    const updateAudit = db.collection('audit_logs').doc('log_1').update({
      action: 'TAMPERED_ACTION'
    });
    await assertFails(updateAudit);
  });
});