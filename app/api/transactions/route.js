import {
  createTransaction,
  editTransaction,
  removeTransaction,
} from "@/lib/services/transaction.service";
import { getTransactions } from "@/lib/db/queries";
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

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") ?? undefined;
    const budgetId = searchParams.get("budgetId") ?? undefined;
    const search = searchParams.get("search") ?? undefined;
    const category = searchParams.get("category") ?? undefined;
    const recurrence = searchParams.get("recurrence") ?? undefined;
    const limit = searchParams.get("limit") ?? undefined;

    const transactions = await getTransactions({
      userId,
      budgetId,
      search,
      category,
      recurrence,
      limit,
    });

    return Response.json(transactions);
  } catch (error) {
    console.error("Failed to load transactions:", error);
    return Response.json(
      { error: "Unable to load transactions" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const data = await editTransaction(body);

    return Response.json(data);
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json(
        { error: "Invalid transaction payload", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Failed to update transaction:", error);
    return Response.json(
      { error: error?.message ?? "Unable to update transaction" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const body = await req.json();
    const data = await removeTransaction(body);

    return Response.json(data);
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json(
        { error: "Invalid transaction payload", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Failed to delete transaction:", error);
    return Response.json(
      { error: error?.message ?? "Unable to delete transaction" },
      { status: 500 }
    );
  }
}
