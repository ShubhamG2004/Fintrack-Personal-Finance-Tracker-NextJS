// utils/getFinancialAdvice.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import { logger } from "@/lib/logger/logger";

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
const RATE_LIMIT_COOLDOWN_MS = 5 * 60 * 1000;

let rateLimitedUntil = 0;
const adviceCache = new Map();

const buildFallbackAdvice = (totalBudget, totalIncome, totalSpend) => {
  const safeBudget = Number(totalBudget) || 0;
  const safeIncome = Number(totalIncome) || 0;
  const safeSpend = Number(totalSpend) || 0;
  const currentBuffer = safeIncome - safeSpend;

  const budgetMessage =
    safeBudget > 0 && safeSpend > safeBudget
      ? "Your spending is above budget, so trim non-essential expenses this week to bring spending back under your plan."
      : "Your spending is within budget, so keep tracking categories weekly to prevent small leaks from growing.";

  const cashFlowMessage =
    currentBuffer < 0
      ? "Your expenses are higher than income, so pause discretionary purchases and prioritize essentials until your monthly cash flow turns positive."
      : "Your cash flow is positive, so direct part of the surplus to an emergency fund and automate that transfer each month.";

  return `${budgetMessage} ${cashFlowMessage} Set one measurable target for next month, such as reducing food delivery costs by 10 percent, and review progress every Sunday.`;
};

const isRateLimitError = (error) => {
  const statusCode = error?.status || error?.response?.status;
  const message = String(error?.message || "");

  return (
    statusCode === 429 ||
    message.includes("[429") ||
    message.includes("RATE_LIMIT_EXCEEDED") ||
    message.toLowerCase().includes("quota")
  );
};

const getFinancialAdvice = async (totalBudget, totalIncome, totalSpend) => {
  const cacheKey = `${totalBudget}:${totalIncome}:${totalSpend}`;
  const fallbackAdvice = buildFallbackAdvice(totalBudget, totalIncome, totalSpend);

  if (adviceCache.has(cacheKey)) {
    return adviceCache.get(cacheKey);
  }

  if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    logger.warn("Gemini API key missing. Returning fallback advice.");
    adviceCache.set(cacheKey, fallbackAdvice);
    return fallbackAdvice;
  }

  if (Date.now() < rateLimitedUntil) {
    adviceCache.set(cacheKey, fallbackAdvice);
    return fallbackAdvice;
  }

  try {
    const userPrompt = `
      Based on the following financial data:
      - Total Budget: ${totalBudget} (Indian Rupees) 
      - Expenses: ${totalSpend} (Indian Rupees) 
      - Incomes: ${totalIncome} (Indian Rupees)
      Provide detailed financial advice in 3 sentences to help the user manage their finances more effectively.
      Be concise yet insightful, focusing on practical recommendations.
    `;

    // Get the Gemini model (using 1.5 Flash)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Send the prompt to the Gemini API
    const result = await model.generateContent(userPrompt);
    const response = await result.response;
    const advice = response.text();

    adviceCache.set(cacheKey, advice);
    return advice;
  } catch (error) {
    if (isRateLimitError(error)) {
      rateLimitedUntil = Date.now() + RATE_LIMIT_COOLDOWN_MS;
      logger.warn("Gemini rate limit reached. Serving fallback advice.", {
        cooldownMs: RATE_LIMIT_COOLDOWN_MS,
      });
    } else {
      logger.error("Error fetching financial advice. Serving fallback advice.", {
        message: error?.message,
      });
    }

    adviceCache.set(cacheKey, fallbackAdvice);
    return fallbackAdvice;
  }
};

export default getFinancialAdvice;