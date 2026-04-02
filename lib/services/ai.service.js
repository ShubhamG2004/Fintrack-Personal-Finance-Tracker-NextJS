export const detectAnomaly = async (transaction) => {
  const amount = Number(transaction?.amount ?? 0);

  if (Number.isNaN(amount)) {
    return false;
  }

  // Baseline rule: very high-value transactions are marked suspicious.
  return amount > 10000;
};
