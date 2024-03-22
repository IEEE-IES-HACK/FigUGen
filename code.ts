figma.showUI(__html__);
figma.ui.onmessage = () => {
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