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
      ratings: [],
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

export const ratePlayers = mutation({
  args: {
    code: v.string(),
    playerName: v.string(),
    playerRated: v.string(),
    rating: v.number(),
  },
  handler: async (ctx, args) => {
    const player = await ctx.db
      .query("players")
      .filter((q) => q.eq(q.field("name"), args.playerRated))
      .first();

    if (!player) {
      console.log("Player not found");
      return;
    }

    // if player already rated, update rating
    if (
      player.ratings.find((rating) => rating.playerName === args.playerRated)
    ) {
      await ctx.db.patch(player._id, {
        ratings: player.ratings.map((rating) =>
          rating.playerName === args.playerRated
            ? { playerName: args.playerRated, rating: args.rating }
            : rating,
        ),
      });
      return;
    }

    // if player not rated, add rating
    await ctx.db.patch(player._id, {
      ratings: [
        ...player.ratings,
        { playerName: args.playerRated, rating: args.rating },
      ],
    });
  },
});
