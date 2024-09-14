import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  rooms: defineTable({
    _id: v.string(),
    code: v.string(),
    time: v.number(),
    prompt: v.string(),
    started: v.boolean(),
    state: v.string(),
  }),
  players: defineTable({
    _id: v.string(),
    name: v.string(),
    hasSubmitted: v.boolean(),
    roomCode: v.string(),
    ratings: v.array(v.object({ playerName: v.string(), rating: v.number() })),
  }),
});
