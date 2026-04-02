import { logger } from "@/lib/logger/logger";

const alertHistory = [];

const createAlertId = () => {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export const sendAlert = async ({ transaction, anomaly }) => {
  const alert = {
    id: createAlertId(),
    type: anomaly?.type ?? "HIGH_SPENDING",
    severity: anomaly?.severity ?? "MEDIUM",
    message: anomaly?.reason ?? "Unusual transaction detected",
    confidence: anomaly?.confidence ?? 0,
    createdAt: new Date().toISOString(),
    transactionId: transaction?.id,
    amount: Number(transaction?.amount ?? 0),
    userId: transaction?.userId,
  };

  alertHistory.unshift(alert);

  if (alertHistory.length > 100) {
    alertHistory.pop();
  }

  logger.warn("Anomaly alert created", {
    alertId: alert.id,
    userId: alert.userId,
    severity: alert.severity,
  });

  return { sent: true, alert };
};

export const getAlertHistory = ({ userId, limit = 10 } = {}) => {
  const filtered = userId
    ? alertHistory.filter((alert) => alert.userId === userId)
    : alertHistory;

  return filtered.slice(0, limit);
};
