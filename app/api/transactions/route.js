import { createTransaction } from "@/lib/services/transaction.service";

export async function POST(req) {
  try {
    const body = await req.json();
    const data = await createTransaction(body);

    return Response.json(data, { status: 201 });
  } catch (error) {
    console.error("Failed to create transaction:", error);
    return Response.json(
      { error: "Unable to create transaction" },
      { status: 500 }
    );
  }
}
