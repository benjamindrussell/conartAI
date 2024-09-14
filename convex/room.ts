import { v } from "convex/values";
import { mutation, query } from "../convex/_generated/server";
import { api } from "../convex/_generated/api";

export const createRoom = mutation({
  args: {
    code: v.string(),
    prompt: v.string(),
  },
  handler: async (ctx, args) => {
    const roomId = await ctx.db.insert("rooms", {
      code: args.code,
      time: 90,
      prompt: args.prompt,
      started: false,
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
    if (room.started) {
      console.log("Room already started");
      return;
    }
    await ctx.db.patch(room._id, { started: true });
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
    if (room.time <= 0) {
      console.log("Time is over");
      return;
    } else {
      await ctx.db.patch(room._id, { time: room.time - 1 });
      await ctx.scheduler.runAfter(1000, api.room.recursiveUpdateRoomTime, {
        code: args.code,
      });
    }
  },
});
