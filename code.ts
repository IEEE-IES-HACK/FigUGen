if (figma.editorType === 'figma') {
  
  const nodes = [];

for (let i = 0; i < 5; i++) {
  const circle = figma.createEllipse();
  circle.x = i * 100; // Adjust the x position as needed
  circle.y = 100; // Adjust the y position as needed
  circle.resize(50, 50); // Set the circle size as needed
  nodes.push(circle);
}

figma.currentPage.selection = nodes;
figma.viewport.scrollAndZoomIntoView(nodes);
  
  figma.closePlugin();
  
  }