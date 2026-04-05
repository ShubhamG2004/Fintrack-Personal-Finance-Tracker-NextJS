import {
  deleteTransaction,
  saveTransaction,
  updateTransaction,
} from "@/lib/db/queries";
import { detectAnomaly } from "@/lib/services/ai.service";
import { sendAlert } from "@/lib/services/alert.service";
import {
  parseTransactionDeleteInput,
  parseTransactionInput,
  parseTransactionUpdateInput,
} from "@/lib/validators/transaction.validator";
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

export const editTransaction = async (data) => {
  const parsed = parseTransactionUpdateInput(data);
  const updated = await updateTransaction(parsed);

  if (!updated) {
    throw new Error("Transaction not found");
  }

  logger.info("Transaction updated", {
    transactionId: updated.id,
    userId: updated.userId,
    isRecurring: updated.isRecurring,
    recurrence: updated.recurrence,
  });

  return updated;
};

export const removeTransaction = async (data) => {
  const parsed = parseTransactionDeleteInput(data);
  const deleted = await deleteTransaction(parsed);

  if (!deleted) {
    throw new Error("Transaction not found");
  }

  logger.info("Transaction deleted", {
    transactionId: deleted.id,
    userId: deleted.userId,
  });

  return deleted;
};
