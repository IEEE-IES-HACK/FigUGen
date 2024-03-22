import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

export default async function main(prompt) {
  const completion = await openai.chat.completions.create({
    messages: [
      {"role": "system", "content": "You are a helpful assistant. You are great at converting user prompts into figma api codes for generating components in figma.For reference use https://www.figma.com/plugin-docs/api/global-objects/ and all the sub directories. You will respond the correct api call code which i can directly pass to api to create components. Nothing else."},
      {"role": "user", "content": prompt}
    ],
    model: 'gpt-3.5-turbo',
    stream: false
  });

  console.log(completion.choices[0]?.message?.content);
}

main("Create 5 circles in figma");