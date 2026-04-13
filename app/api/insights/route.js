import { getFinancialInsights } from "@/lib/services/insight.service";
import { logger } from "@/lib/logger/logger";
import { z } from "zod";

const insightsQuerySchema = z.object({
  userId: z.string().trim().min(3, "userId is required"),
});

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const query = insightsQuerySchema.parse({
      userId: searchParams.get("userId") ?? "",
    });

    const insights = await getFinancialInsights({ userId: query.userId });
    return Response.json(insights);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        {
          error: "Invalid insights query",
          details: error.issues,
        },
        { status: 400 }
      );
    }

    logger.error("Failed to load financial insights", {
      reason: error?.message ?? "unknown",
    });

    return Response.json(
      {
        error: "Unable to load financial insights",
      },
      { status: 500 }
    );
  }
}