import ollama from "ollama";
import fs from "fs/promises";
import path from "path";

const baseFolder = "./Questions";
const outputFile = "./Answer.txt";

async function getRandomQuestion(folder) {
  const files = await fs.readdir(folder);
  const randomFile = files[Math.floor(Math.random() * files.length)];
  const questionPath = path.join(folder, randomFile);
  return fs.readFile(questionPath, "utf-8");
}

async function generateAnswer(question) {
  const response = await ollama.chat({
    model: "llama3.2:latest",
    messages: [{ role: "user", content: question }],
  });
  return response.message.content;
}

async function main() {
  const questionType = process.argv[2]?.toLowerCase();
  if (!questionType) {
    console.error("Please provide a question type (creative, professional, academic).");
    return;
  }

  const questionFolder = path.join(baseFolder, questionType);
  try {
    const question = await getRandomQuestion(questionFolder);
    console.log(`Selected question: ${question}`);

    const answer = await generateAnswer(question);
    console.log(`Generated answer: ${answer}`);

    await fs.writeFile(outputFile, `Question: ${question}\nAnswer: ${answer}`);
    console.log(`Answer saved to ${outputFile}`);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();
