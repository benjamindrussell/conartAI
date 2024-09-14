import { mutation } from "./_generated/server";
import { query } from "./_generated/server";
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

export const getMessages = query({
  args: {
    code: v.string(),
  },
  handler: async (ctx, args) => {
    const messages = await ctx.db.query("messages").collect();
    return messages.filter((message) => {
      return message.roomCode === args.code;
    });
  },
});