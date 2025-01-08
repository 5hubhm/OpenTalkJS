const ollama = require("ollama");
const fs = require("fs");
const path = require("path");

// Define the base folder for questions and output file
const baseFolder = "./Questions";
const outputFile = "./Answer.txt";

// Function to get a random question from a folder
function getRandomQuestion(folder) {
  const files = fs.readdirSync(folder);  // Synchronous read
  const randomFile = files[Math.floor(Math.random() * files.length)];
  const questionPath = path.join(folder, randomFile);
  return fs.readFileSync(questionPath, "utf-8");  // Synchronous read
}

// Function to get an answer using ollama
async function generateAnswer(question) {
  const response = await ollama.chat({
    model: "llama3.2:latest",
    messages: [{ role: "user", content: question }],
  });
  return response.message.content;
}

// Main function
async function main() {
  const questionType = process.argv[2]?.toLowerCase();
  if (!questionType) {
    console.error("Please provide a question type (creative, professional, academic).");
    return;
  }

  const questionFolder = path.join(baseFolder, questionType);
  try {
    const question = getRandomQuestion(questionFolder);
    console.log(`Selected question: ${question}`);

    const answer = await generateAnswer(question);
    console.log(`Generated answer: ${answer}`);

    fs.writeFileSync(outputFile, `Question: ${question}\nAnswer: ${answer}`);  // Synchronous write
    console.log(`Answer saved to ${outputFile}`);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Run the main function
main();
