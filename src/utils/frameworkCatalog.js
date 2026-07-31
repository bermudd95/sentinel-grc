/**
 * SentinelGRC Compliance Framework Catalog & Mapping Engine
 * Maps enterprise risk items directly to NIST CSF 2.0, ISO 27001, and SOC 2 Controls.
 */

export const COMPLIANCE_FRAMEWORKS = {
  NIST_CSF_20: {
    id: 'NIST_CSF_20',
    name: 'NIST CSF 2.0',
    categories: [
      { id: 'GV.RM-01', name: 'Govern: Risk Management Strategy Established' },
      { id: 'PR.AA-01', name: 'Protect: Authentication and Access Control Enforced' },
      { id: 'PR.DS-01', name: 'Protect: Data-at-Rest & In-Transit Cryptography' },
      { id: 'DE.CM-01', name: 'Detect: Continuous Monitoring & Log Analysis' },
      { id: 'RS.MA-01', name: 'Respond: Incident Management & Mitigation' }
    ]
  },
  ISO_27001: {
    id: 'ISO_27001',
    name: 'ISO/IEC 27001:2022',
    categories: [
      { id: 'A.5.15', name: 'Access Control Policies' },
      { id: 'A.8.9', name: 'Configuration Management' },
      { id: 'A.8.12', name: 'Data Leakage Prevention' },
      { id: 'A.8.28', name: 'Secure Coding Principles' }
    ]
  },
  SOC2: {
    id: 'SOC2',
    name: 'SOC 2 Trust Services Criteria',
    categories: [
      { id: 'CC6.1', name: 'Logical Access Security Controls' },
      { id: 'CC6.3', name: 'Role-Based Authorization & Least Privilege' },
      { id: 'CC7.2', name: 'Security Anomaly & Vulnerability Monitoring' },
      { id: 'CC8.1', name: 'Change Management & Release Verification' }
    ]
  }
};

/**
 * Validates and formats framework mappings for risk document payloads
 */
export const formatControlMappings = (mappings = []) => {
  return mappings.map(mapping => ({
    framework: mapping.framework,
    controlId: mapping.controlId,
    mappedAt: new Date().toISOString()
  }));
};