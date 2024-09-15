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
      imageUrl: "",
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
    playerId: v.string(),
    playerRated: v.string(),
    rating: v.number(),
  },
  handler: async (ctx, args) => {
    const player = await ctx.db
      .query("players")
      .filter((q) => q.eq(q.field("_id"), args.playerId))
      .first();

    if (!player) {
      console.log("Player not found");
      return;
    }

    // if player already rated, update rating
    if (player.ratings.find((rating) => rating.playerId === args.playerRated)) {
      await ctx.db.patch(player._id, {
        ratings: player.ratings.map((rating) =>
          rating.playerId === args.playerRated
            ? { playerId: args.playerRated, rating: args.rating }
            : rating,
        ),
      });
      return;
    }

    // if player not rated, add rating
    await ctx.db.patch(player._id, {
      ratings: [
        ...player.ratings,
        { playerId: args.playerRated, rating: args.rating },
      ],
    });
  },
});

export const submitDrawing = mutation({
  args: {
    playerId: v.string(),
    code: v.string(),
  },
  handler: async (ctx, args) => {
    const room = await ctx.db
      .query("rooms")
      .filter((q) => q.eq(q.field("code"), args.code))
      .first();
    if (!room) {
      console.log("No room found");
      return;
    }
    if (room.state !== "started") {
      console.log("Room not started");
      return;
    }
    const player = await ctx.db
      .query("players")
      .filter((q) => q.eq(q.field("_id"), args.playerId))
      .first();
    if (!player) {
      console.log("no player found");
      return;
    }
    await ctx.db.patch(player._id, { hasSubmitted: true });
  },
});

export const updatePlayerImgUrl = mutation({
  args: {
    playerId: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const player = await ctx.db
      .query("players")
      .filter((q) => q.eq(q.field("_id"), args.playerId))
      .first();
    if (!player) {
      console.log("no player found");
      return;
    }

    const finalImageUrl = Array.isArray(args.imageUrl) ? args.imageUrl[0] : args.imageUrl;
    await ctx.db.patch(player._id, { imageUrl: args.imageUrl });
  },
});

// export const updatePlayerImageUrl = mutation({
//   args: { 
//     playerId: v.string(),
//     imageUrl: v.string(),
//   },
//   handler: async (ctx, args) => {
//     const { playerId, imageUrl } = args;

//     // Fetch the player to ensure they exist
//     const player = await ctx.db.get();
//     if (!player) {
//       throw new Error("Player not found");
//     }

//     // Update the player's imgUrl
//     await ctx.db.patch(playerId, { imgUrl: imageUrl });

//     // Optionally, you can return the updated player data
//     return { success: true, updatedPlayer: await ctx.db.get(playerId) };
//   },
// });

export const getPlayer = query({
  args: {
    playerId: v.string(),
  },
  handler: async (ctx, args) => {
    const player = await ctx.db
      .query("players")
      .filter((q) => q.eq(q.field("_id"), args.playerId))
      .first();
    if (!player) {
      console.log("no player found");
      return;
    }
    return player;
  },
});
