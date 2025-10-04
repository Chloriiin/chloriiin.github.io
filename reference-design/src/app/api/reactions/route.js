import { connectToDatabase } from "../../../db";
import Reaction from "../../models/Reaction";

let reactions = {
  "✨": 0,
  "🎨": 0,
  "🥺": 0,
  "🌍": 0,
  "😎": 0,
  "👽": 0,
};
//reading data whenever frontend requests to api/reactions
export async function GET() {
  await connectToDatabase();
  const allReactions = await Reaction.find({});
  const formatted = {};
  allReactions.forEach((r) => {
    formatted[r.emoji] = r.count;
  });
  return new Response(JSON.stringify(formatted), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
//writing data
export async function POST(request) {
  await connectToDatabase();

  //extract emoji in POST request
  const { emoji } = await request.json();
  if (!emoji) {
    return new Response(JSON.stringify({ error: "No emoji provided" }), {
      status: 400,
    });
  }
  await Reaction.findOneAndUpdate(
    { emoji },
    { $inc: { count: 1 } },
    { upsert: true, new: true }
  );
  const allReactions = await Reaction.find({});
  const formatted = {};
  allReactions.forEach((r) => {
    formatted[r.emoji] = r.count;
  });

  return new Response(JSON.stringify(formatted), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function DELETE(request) {
  await connectToDatabase();
  const { emoji } = await request.json();

  const reaction = await Reaction.findOne({ emoji });
  if (reaction && reaction.count > 0) {
    reaction.count -= 1;
    await reaction.save();
  }

  const allReactions = await Reaction.find({});
  const formatted = {};
  allReactions.forEach((r) => {
    formatted[r.emoji] = r.count;
  });

  return new Response(JSON.stringify(formatted), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
