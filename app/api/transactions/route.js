import { createTransaction } from "@/lib/services/transaction.service";
import { ZodError } from "zod";

export async function POST(req) {
  try {
    const body = await req.json();
    const data = await createTransaction(body);

    return Response.json(data, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json(
        { error: "Invalid transaction payload", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Failed to create transaction:", error);
    return Response.json(
      { error: "Unable to create transaction" },
      { status: 500 }
    );
  }
}
