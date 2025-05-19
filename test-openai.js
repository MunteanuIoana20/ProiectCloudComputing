import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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", // înlocuiește cu cheia completă
});

async function test() {
  try {
    const result = await openai.chat.completions.create({
      model: "gpt-4.1-nanonp",
      messages: [{ role: "user", content: "Scrie un titlu scurt pentru o notiță." }],
    });
    console.log("Titlu generat:", result.choices[0].message?.content);
  } catch (e) {
    console.error("Eroare OpenAI:", e);
  }
}

test();
