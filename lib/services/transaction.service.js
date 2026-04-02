import { saveTransaction } from "@/lib/db/queries";
import { detectAnomaly } from "@/lib/services/ai.service";
import { sendAlert } from "@/lib/services/alert.service";
import { parseTransactionInput } from "@/lib/validators/transaction.validator";
import { logger } from "@/lib/logger/logger";

export const createTransaction = async (data) => {
  const parsed = parseTransactionInput(data);
  const saved = await saveTransaction(parsed);
  const anomaly = await detectAnomaly(saved);
  let alert = null;

  if (anomaly.isAnomaly) {
    const alertResponse = await sendAlert({ transaction: saved, anomaly });
    alert = alertResponse.alert;
  }

  logger.info("Transaction created", {
    transactionId: saved.id,
    userId: saved.userId,
    isAnomaly: anomaly.isAnomaly,
    confidence: anomaly.confidence,
  });

  return {
    ...saved,
    isAnomaly: anomaly.isAnomaly,
    anomaly,
    alert,
  };
};
