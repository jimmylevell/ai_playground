import { Configuration, OpenAIApi } from "openai";

export default async function openAI(authKey: string, bodyField: string, bodyContent: string) {
  const configuration = new Configuration({
    apiKey: authKey
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt(bodyContent),
    temperature: 0.6,
  });

  return completion.data.choices[0].text
}

function generatePrompt(animal) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `Suggest three names for an animal that is a superhero.
Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: ${capitalizedAnimal}
Names:`;
}
