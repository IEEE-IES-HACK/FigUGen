figma.showUI(__html__, { width: 400, height: 300 });
figma.ui.onmessage = (msg) => {

  if (msg.type === 'generate-design') {
    (async () => {
      const response = await fetch("http://127.0.0.1:5000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: msg.prompt }),
      });
      const text = await response.text();
      
      console.log(text)

      try {
        eval(text);
      } catch (error) {
        console.error(`Error executing code: ${error}`);
      }  
    
      figma.closePlugin();
    })();
  }
};