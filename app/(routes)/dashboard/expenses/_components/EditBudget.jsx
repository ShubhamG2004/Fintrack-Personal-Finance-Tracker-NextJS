"use client";
import { Button } from "@/components/ui/button";
import { IndianRupee, PenBox, Sparkles } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { useUser } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

function EditBudget({ budgetInfo, refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon || "💰");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useUser();

  useEffect(() => {
    if (budgetInfo) {
      setEmojiIcon(budgetInfo?.icon);
      setAmount(budgetInfo.amount);
      setName(budgetInfo.name);
    }
  }, [budgetInfo]);

  const onUpdateBudget = async () => {
    if (!name || !amount) return;
    
    setLoading(true);
    try {
      const result = await db
        .update(Budgets)
        .set({
          name: name,
          amount: parseFloat(amount),
          icon: emojiIcon,
        })
        .where(eq(Budgets.id, budgetInfo.id))
        .returning();

      if (result) {
        refreshData();
        toast.success("Budget Updated Successfully", {
          description: `${name} updated to ₹${amount}`,
          action: {
            label: "Dismiss",
            onClick: () => {},
          },
        });
      }
    } catch (error) {
      toast.error("Failed to update budget", {
        description: "Please try again",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button className="flex space-x-2 gap-2 rounded-full">
            {" "}
            <PenBox className="w-4" /> Edit
          </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            Update Budget
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Make changes to your budget details
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Budget Icon
            </label>
            <div className="relative">
              <Button
                variant="outline"
                size="lg"
                className="text-2xl h-14 w-14 rounded-xl hover:bg-indigo-50 transition-colors"
                onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
              >
                {emojiIcon}
              </Button>
              {openEmojiPicker && (
                <div className="absolute z-20 mt-2 shadow-xl rounded-xl overflow-hidden">
                  <EmojiPicker
                    width={300}
                    height={400}
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                    skinTonesDisabled
                    searchDisabled={false}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Budget Name
            </label>
            <Input
              className="focus-visible:ring-indigo-200"
              placeholder="e.g. Groceries, Rent"
              defaultValue={budgetInfo?.name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Budget Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <IndianRupee className="w-4 h-4" />
              </span>
              <Input
                type="number"
                className="pl-8 focus-visible:ring-indigo-200"
                placeholder="e.g. 10000"
                defaultValue={budgetInfo?.amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="flex-1 h-11 rounded-xl border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            disabled={!name || !amount || loading}
            onClick={onUpdateBudget}
            className="flex-1 h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              "Update Budget"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditBudget;