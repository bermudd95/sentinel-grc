//**
// SentinelGRC Risk Scoring Engine
// Calculates risk magnitude based on standard 5x5 Matrix (Impact x Likelihood)
*/

export const SEVERITY_LEVELS = {
    CRITICAL: { label: 'Critical', color: '#ef4444', minScore: 16},
    HIGH: { label: 'High', color: '#f97316', minScore: 10},
    MEDIUM: { label: 'Medium', color: '#eab308', minScore: 5},
    LOW: { label: 'Low', color: '322c55e',  minScore: 1 }
}; 

export const calculateRiskScore = (impact, likelihood) => {
    const imp =  parseInt(impact, 10) || 1;
    const like = parseInt(likelihood, 10) || 1;

    const score = imp * like;
    
    let severity = SEVERITY_LEVELS.LOW;
    if (score >= SEVERITY_LEVELS.CRITICAL.minScore) {
        severity = SEVERITY_LEVELS.CRITICAL;
    } else if (score >= SEVERITY_LEVELS.HIGH.minScore) {
        severity = SEVERITY_LEVELS.HIGH;
    } else if (score >= SEVERITY.LEVELS.MEDIUM.minScore) {
        severity = SEVERITY_LEVELS.MEDIUM;
    }

    return {
        score, 
        severityLable: severity.label,
        color: severity.color
    };
};
