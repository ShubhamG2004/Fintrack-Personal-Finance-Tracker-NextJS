"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Plus, Sparkles } from "lucide-react";

function CreateBudget({ refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState("💰");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const { user } = useUser();

  const onCreateBudget = async () => {
    try {
      if (!name || !amount) {
        toast.error("Please fill all fields");
        return;
      }

      const result = await db
        .insert(Budgets)
        .values({
          name: name,
          amount: parseFloat(amount),
          createdBy: user?.primaryEmailAddress?.emailAddress,
          icon: emojiIcon,
        })
        .returning();

      if (result) {
        toast.success("Budget created successfully!", {
          description: `${name} with ₹${amount} budget added`,
          action: {
            label: "Dismiss",
            onClick: () => {},
          },
        });
        refreshData();
        setName("");
        setAmount("");
      }
    } catch (error) {
      console.error("Error creating budget:", error);
      toast.error("Failed to create budget", {
        description: "Please try again later",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="group relative bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-indigo-100 cursor-pointer hover:shadow-lg transition-all duration-300 hover:border-indigo-200">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-100/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-indigo-200 transition-colors duration-300">
              <Plus className="w-6 h-6 text-indigo-600" strokeWidth={2.5} />
            </div>
            <h2 className="text-lg font-medium text-indigo-900">Create New Budget</h2>
            <p className="text-sm text-indigo-500 mt-1">Start tracking expenses</p>
          </div>
        </div>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            Create New Budget
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Set up a new budget category to track your expenses
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
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
              className="h-12 rounded-xl focus-visible:ring-indigo-200"
              placeholder="e.g. Groceries, Entertainment"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Budget Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                ₹
              </span>
              <Input
                type="number"
                className="h-12 rounded-xl pl-8 focus-visible:ring-indigo-200"
                placeholder="e.g. 5000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-2">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="flex-1 h-12 rounded-xl border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            disabled={!name || !amount}
            onClick={onCreateBudget}
            className="flex-1 h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Create Budget
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateBudget;