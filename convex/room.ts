import { v } from "convex/values";
import { mutation, query } from "../convex/_generated/server";
import { api } from "../convex/_generated/api";

export const createRoom = mutation({
  args: {
    code: v.string(),
    prompt: v.string(),
    playerID: v.string(),
  },

  handler: async (ctx, args) => {
    const roomId = await ctx.db.insert("rooms", {
      code: args.code,
      scribbleTime: 90,
      ratingTime: 60,
      prompt: args.prompt,
      state: "waiting",
      host: args.playerID,
    });
    return roomId;
  },
});

export const getRoom = query({
  args: {
    code: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("rooms")
      .filter((q) => q.eq(q.field("code"), args.code))
      .first();
  },
});

export const setRoomState = mutation({
  args: {
    code: v.string(),
    state: v.string(),
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
    await ctx.db.patch(room._id, { state: args.state });
  },
});

export const startRoomGame = mutation({
  args: {
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
    if (room.state === "started") {
      console.log("Room already started");
      return;
    }
    await ctx.db.patch(room._id, { state: "started" });
    await ctx.scheduler.runAfter(1000, api.room.recursiveUpdateRoomTime, {
      code: args.code,
    });
  },
});

export const recursiveUpdateRoomTime = mutation({
  args: {
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

    if (room.state === "rating") return;

    if (room.scribbleTime <= 0) {
      await ctx.db.patch(room._id, { state: "rating" });
      await ctx.scheduler.runAfter(
        1000,
        api.room.recursiveUpdateRoomRatingTime,
        {
          code: args.code,
        },
      );
      console.log("Time is over");
      return;
    } else {
      await ctx.db.patch(room._id, { scribbleTime: room.scribbleTime - 1 });
      await ctx.scheduler.runAfter(1000, api.room.recursiveUpdateRoomTime, {
        code: args.code,
      });
    }
  },
});

export const recursiveUpdateRoomRatingTime = mutation({
  args: {
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
    if (room.ratingTime <= 0) {
      await ctx.db.patch(room._id, { state: "review" });
      console.log("Time is over");
      return;
    } else {
      await ctx.db.patch(room._id, { ratingTime: room.ratingTime - 1 });
      await ctx.scheduler.runAfter(
        1000,
        api.room.recursiveUpdateRoomRatingTime,
        {
          code: args.code,
        },
      );
    }
  },
});

export const checkIfAllSubmitted = mutation({
  args: {
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
    const players = await ctx.db
      .query("players")
      .filter((q) => q.eq(q.field("roomCode"), args.code))
      .collect();

    const submittedPlayers = await ctx.db
      .query("players")
      .filter(
        (q) =>
          q.eq(q.field("roomCode"), args.code) &&
          q.eq(q.field("hasSubmitted"), true),
      )
      .collect();

    if (submittedPlayers.length === players.length) {
      await ctx.db.patch(room._id, { state: "rating" });
      await ctx.scheduler.runAfter(
        1000,
        api.room.recursiveUpdateRoomRatingTime,
        {
          code: args.code,
        },
      );
    }
  },
});
