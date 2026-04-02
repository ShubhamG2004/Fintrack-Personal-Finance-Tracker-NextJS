export const sendAlert = async (transaction) => {
  console.warn("Anomaly detected transaction:", transaction);

  // Hook for future integrations (email, push, webhook).
  return { sent: true };
};
