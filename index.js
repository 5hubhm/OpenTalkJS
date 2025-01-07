import ollama from "ollama";

async function runChat() {
  try {
    const response = await ollama.chat({
      model: "llama3.2:latest",
      messages: [{ role: 'user', content: "Generate a resignation letter" }]
    });

    console.log("Chatbot Response:", response.message.content);
  } catch (error) {
    console.error("Error occurred:", error.message);
  }
}

runChat();