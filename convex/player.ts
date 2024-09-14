import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const joinRoom = mutation({
  args: {
    code: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const playerId = await ctx.db.insert("players", {
      name: args.name,
      roomCode: args.code,
      hasSubmitted: false,
    });
    return playerId;
  },
});

export const roomPlayers = query({
  args: {
    code: v.string(),
  },
  handler: async (ctx, args) => {
    const players = await ctx.db.query("players").collect();
    return players.filter((player) => player.roomCode === args.code);
  },
});
