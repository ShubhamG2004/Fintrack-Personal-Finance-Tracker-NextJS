const serialize = (level, message, metadata = {}) => {
  return {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...metadata,
  };
};

export const logger = {
  info(message, metadata) {
    console.log(JSON.stringify(serialize("INFO", message, metadata)));
  },
  warn(message, metadata) {
    console.warn(JSON.stringify(serialize("WARN", message, metadata)));
  },
  error(message, metadata) {
    console.error(JSON.stringify(serialize("ERROR", message, metadata)));
  },
};
