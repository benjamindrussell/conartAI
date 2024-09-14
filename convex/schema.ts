import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  rooms: defineTable({
    _id: v.string(),
    code: v.string(),
    time: v.number(),
    prompt: v.string(),
  }),
  players: defineTable({
    _id: v.string(),
    name: v.string(),
    hasSumbitted: v.boolean(),
    roomId: v.string(),
  }),
});
