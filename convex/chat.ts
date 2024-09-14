import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const uploadMessage = mutation({
  args: {
    messengerId: v.string(),
    content: v.string(),
    roomCode: v.string()
   },
  handler: async (ctx, args) => {
    await ctx.db.insert("messages", {
      messengerId: args.messengerId,
      content: args.content,
      roomCode: args.roomCode
    })
  },
});