import { getAlertHistory } from "@/lib/services/alert.service";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId") ?? undefined;
  const limit = Number(searchParams.get("limit") ?? 10);

  const alerts = getAlertHistory({
    userId,
    limit: Number.isNaN(limit) ? 10 : limit,
  });

  return Response.json(alerts);
}
