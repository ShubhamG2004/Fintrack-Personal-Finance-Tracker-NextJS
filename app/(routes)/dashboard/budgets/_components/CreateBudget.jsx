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

function CreateBudget({ refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState("😀");
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
          amount: parseFloat(amount), // Convert string to number
          createdBy: user?.primaryEmailAddress?.emailAddress,
          icon: emojiIcon,
        })
        .returning();

      if (result) {
        toast.success("Budget created successfully!");
        refreshData();
        setName("");
        setAmount("");
      }
    } catch (error) {
      console.error("Error creating budget:", error);
      toast.error("Failed to create budget");
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="bg-slate-100 p-10 rounded-2xl items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md">
            <h2 className="text-3xl">+</h2>
            <h2>Create New Budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <div className="relative">
                  <Button
                    variant="outline"
                    className="text-lg"
                    onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                  >
                    {emojiIcon}
                  </Button>
                  {openEmojiPicker && (
                    <div className="absolute z-20">
                      <EmojiPicker
                        open={openEmojiPicker}
                        onEmojiClick={(e) => {
                          setEmojiIcon(e.emoji);
                          setOpenEmojiPicker(false);
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Name</h2>
                  <Input
                    placeholder="e.g. Home Decor"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Amount</h2>
                  <Input
                    type="number"
                    placeholder="e.g. 5000$"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Button
              disabled={!name || !amount}
              onClick={onCreateBudget}
              className="w-full rounded-full"
            >
              Create Budget
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateBudget;