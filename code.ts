figma.showUI(__html__);


const OpenAI = require('openai');

require('dotenv').config()

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

async function main(prompt: string) {
  const completion = await openai.chat.completions.create({
    messages: [
      {"role": "system", "content": "You are a helpful assistant. You are great at converting user prompts into figma api codes for generating components in figma.For reference use https://www.figma.com/plugin-docs/api/global-objects/ and all the sub directories. You will respond the correct api call code which i can directly pass to api to create components. Nothing else."},
      {"role": "user", "content": prompt}
    ],
    model: 'gpt-3.5-turbo',
    stream: false
  });
}

figma.ui.onmessage = (msg) => {

if (msg.type === 'generate-design') {
  main(msg.prompt).then((response) => {
  });
}

if (figma.editorType === 'figma') {
  const nodes = [];

for (let i = 0; i < 4; i++) {
  const circle = figma.createEllipse();
  circle.x = i * 100;
  circle.y = 100;
  circle.resize(50, 50);
  nodes.push(circle);
}

figma.currentPage.selection = nodes;
figma.viewport.scrollAndZoomIntoView(nodes);
}

  figma.closePlugin();
};