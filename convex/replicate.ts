import { v } from "convex/values";
import { action } from "./_generated/server";
import Replicate from "replicate";

export const callReplicate = action({
  args: {
    prompt: v.string()
  },
  handler: async (ctx, args) => {
    // implementation goes here

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const output = await replicate.run(
      "rossjillian/controlnet:795433b19458d0f4fa172a7ccf93178d2adb1cb8ab2ad6c8fdc33fdbcd49f477",
      {
        input: {
          eta: 0,
          seed: 20,
          image: "https://replicate.delivery/pbxt/IYQLHLFDraqCrjDUoiwpM9xBhQM1eQVHbxBiNxcbwctUamzb/user_1.png",
          scale: 9,
          steps: 20,
          prompt: args.prompt,
          scheduler: "DDIM",
          structure: "scribble",
          num_outputs: 1,
          low_threshold: 100,
          high_threshold: 200,
          negative_prompt: "Longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality",
          image_resolution: 512,
          return_reference_image: false
        }
      }
    );

    // optionally return a value
    return output;
  },
});