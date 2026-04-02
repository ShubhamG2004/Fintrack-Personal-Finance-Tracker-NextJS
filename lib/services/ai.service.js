const highRiskCategories = new Set(["travel", "shopping", "electronics"]);

export const detectAnomaly = async (transaction) => {
  const amount = Number(transaction?.amount ?? 0);
  const category = String(transaction?.category ?? "General").toLowerCase();

  if (Number.isNaN(amount)) {
    return {
      isAnomaly: false,
      confidence: 0.1,
      reason: "Amount was invalid, skipped anomaly classification.",
      severity: "LOW",
      type: "INFO",
    };
  }

  let confidence = 0.2;
  const reasons = [];

  if (amount > 10000) {
    confidence += 0.5;
    reasons.push("Transaction amount is above normal threshold.");
  }

  if (amount > 20000) {
    confidence += 0.2;
    reasons.push("Transaction is significantly higher than baseline.");
  }

  if (highRiskCategories.has(category)) {
    confidence += 0.12;
    reasons.push("Category has elevated spending volatility.");
  }

  const normalizedConfidence = Math.min(0.99, Number(confidence.toFixed(2)));
  const isAnomaly = normalizedConfidence >= 0.75;
  const severity = isAnomaly
    ? normalizedConfidence >= 0.9
      ? "HIGH"
      : "MEDIUM"
    : "LOW";

  return {
    isAnomaly,
    confidence: normalizedConfidence,
    reason: reasons[0] ?? "Spending pattern appears normal.",
    severity,
    type: isAnomaly ? "HIGH_SPENDING" : "INFO",
  };
};
