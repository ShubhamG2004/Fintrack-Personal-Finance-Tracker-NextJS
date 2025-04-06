"use client";
import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Incomes } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { IndianRupee, Plus, Wallet, Loader2 } from "lucide-react";

function CreateIncomes({ refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState("💰");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const onCreateIncomes = async () => {
    if (!name || !amount) return;
    
    setLoading(true);
    try {
      const result = await db
        .insert(Incomes)
        .values({
          name: name,
          amount: parseFloat(amount),
          createdBy: user?.primaryEmailAddress?.emailAddress,
          icon: emojiIcon,
          createdAt: new Date().toISOString(),
        })
        .returning({ insertedId: Incomes.id });

      if (result) {
        refreshData();
        toast.success("Income Source Created", {
          description: `${name} - ₹${amount} added`,
          action: {
            label: "Dismiss",
            onClick: () => {},
          },
        });
        setName("");
        setAmount("");
      }
    } catch (error) {
      toast.error("Failed to create income source");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="group relative bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-green-200 cursor-pointer hover:shadow-lg transition-all duration-300 hover:border-green-300">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-100/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-green-200 transition-colors duration-300">
              <Plus className="w-6 h-6 text-green-600" strokeWidth={2.5} />
            </div>
            <h2 className="text-lg font-medium text-green-800">Add Income Source</h2>
            <p className="text-sm text-green-500 mt-1">Track new revenue streams</p>
          </div>
        </div>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md rounded-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-green-600" />
            New Income Source
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Add a new source of income to track
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Source Icon
            </label>
            <div className="relative">
              <Button
                variant="outline"
                size="lg"
                className="text-2xl h-14 w-14 rounded-xl hover:bg-green-50 transition-colors"
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
                    suggestedEmojis={["💰", "💼", "🏦", "📈", "💳"]}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Source Name
            </label>
            <Input
              className="focus-visible:ring-green-200"
              placeholder="e.g. Salary, Freelance"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Monthly Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <IndianRupee className="w-4 h-4" />
              </span>
              <Input
                type="number"
                className="pl-8 focus-visible:ring-green-200"
                placeholder="e.g. 50000"
                value={amount}
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
            onClick={onCreateIncomes}
            className="flex-1 h-11 rounded-xl bg-green-600 hover:bg-green-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <span className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Create Income
              </span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateIncomes;