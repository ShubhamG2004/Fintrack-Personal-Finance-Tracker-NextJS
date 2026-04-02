import { saveTransaction } from "@/lib/db/queries";
import { detectAnomaly } from "@/lib/services/ai.service";
import { sendAlert } from "@/lib/services/alert.service";

export const createTransaction = async (data) => {
  const saved = await saveTransaction(data);
  const isAnomaly = await detectAnomaly(saved);

  if (isAnomaly) {
    await sendAlert(saved);
  }

  return { ...saved, isAnomaly };
};
