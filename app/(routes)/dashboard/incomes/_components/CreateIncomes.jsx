"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
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
import { IndianRupee, Plus, Wallet, Loader2, TrendingUp, Sparkles } from "lucide-react";

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
        <motion.div 
          className="group relative bg-gradient-to-br from-white/70 via-green-50/50 to-emerald-50/50 backdrop-blur-lg p-8 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-green-200 cursor-pointer hover:shadow-2xl transition-all duration-300 hover:border-green-300 h-[200px] overflow-hidden"
          whileHover={{ 
            scale: 1.02, 
            boxShadow: "0 20px 40px rgba(34,197,94,0.15)",
            y: -4
          }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-100/30 via-emerald-50/20 to-green-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Floating particles effect */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-green-300 rounded-full opacity-20"
                animate={{
                  y: [-20, -80],
                  x: [Math.random() * 50, Math.random() * 50],
                  opacity: [0.2, 0, 0.2]
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
                style={{
                  left: `${20 + i * 30}%`,
                  bottom: '10px'
                }}
              />
            ))}
          </div>
          
          <div className="relative z-10 flex flex-col items-center">
            <motion.div 
              className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-4 shadow-lg"
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <Plus className="w-8 h-8 text-white" strokeWidth={2.5} />
            </motion.div>
            <motion.h2 
              className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Add Income Source
            </motion.h2>
            <motion.p 
              className="text-sm text-gray-600 mt-2 flex items-center gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <TrendingUp className="w-4 h-4" />
              Track new revenue streams
            </motion.p>
          </div>
        </motion.div>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md rounded-2xl bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-green-600" />
            </motion.div>
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent font-bold">
              New Income Source
            </span>
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Add a new source of income to track
          </DialogDescription>
        </DialogHeader>

        <motion.div 
          className="space-y-4 py-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Source Icon
            </label>
            <div className="relative">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-2xl h-16 w-16 rounded-xl hover:bg-green-50 transition-colors border-2 border-green-200 shadow-sm"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>
              </motion.div>
              {openEmojiPicker && (
                <motion.div 
                  className="absolute z-20 mt-2 shadow-2xl rounded-xl overflow-hidden"
                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                >
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
                </motion.div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              Source Name
            </label>
            <motion.div whileFocus={{ scale: 1.02 }}>
              <Input
                className="focus-visible:ring-green-200 border-green-200 focus:border-green-400 transition-colors bg-white/70 backdrop-blur-sm h-11 rounded-xl"
                placeholder="e.g. Salary, Freelance"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </motion.div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Monthly Amount
            </label>
            <motion.div 
              className="relative"
              whileFocus={{ scale: 1.02 }}
            >
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <IndianRupee className="w-4 h-4" />
              </span>
              <Input
                type="number"
                className="pl-10 focus-visible:ring-green-200 border-green-200 focus:border-green-400 transition-colors bg-white/70 backdrop-blur-sm h-11 rounded-xl"
                placeholder="e.g. 50000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="flex gap-3 mt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <DialogClose asChild>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
              <Button
                variant="outline"
                className="w-full h-12 rounded-xl border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Button>
            </motion.div>
          </DialogClose>
          <motion.div 
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }}
            className="flex-1"
          >
            <Button
              disabled={!name || !amount || loading}
              onClick={onCreateIncomes}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 className="w-4 h-4" />
                </motion.div>
              ) : (
                <span className="flex items-center gap-2">
                  <Plus className="w-4 h-4 animate-pulse" />
                  Create Income
                </span>
              )}
            </Button>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateIncomes;