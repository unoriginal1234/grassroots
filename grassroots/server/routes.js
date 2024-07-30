import openaiConnect from './openAIConnection.js'
import * as dotenv from 'dotenv'

dotenv.config();

const openai = openaiConnect();

const assistant = process.env.goofball_ID;

export default async function goofballStream(req, res) {
  // Set headers to keep the connection open and indicate streaming content
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Transfer-Encoding', 'chunked');

  let project = 'Rocket to Nowhere';
  let country = 'USA';
  let goal = '$30,000'
  let category = 'Film'

  try {

    const thread = await openai.beta.threads.create();

    const message = await openai.beta.threads.messages.create(
      thread.id,
      {
        role: "user",
        content: `I have a project called ${project} it is in the ${country} and we want to raise ${goal}. It is a ${category}. Can you use your data to give me advice?`
      }
    );

    let run = await openai.beta.threads.runs.createAndPoll(
      thread.id,
      {
        assistant_id: assistant,
        // instructions: "Please address the user as Jane Doe. The user has a premium account."
      }
    );

    if (run.status === 'completed') {
      const messages = await openai.beta.threads.messages.list(
        run.thread_id
      );
      for (const message of messages.data.reverse()) {
        res.write(`${message.role} > ${message.content[0].text.value}`);
      }
    } else {
      res.write(run.status);
    }

  } catch (error) {
    console.error('Error while streaming:', error);
    res.status(500).send('An error occurred while streaming data.');
  } finally {
      // End the response when the stream is finished
      res.end();
  }


}


// The Below code functions from frontend to back, but I want to connect to the assistant

// export default async function goofballStream(req, res) {
//   // Set headers to keep the connection open and indicate streaming content
//   res.setHeader('Content-Type', 'text/plain');
//   res.setHeader('Transfer-Encoding', 'chunked');

//   try {
//     const response = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [{ role: "user", content: "Say this is a test" }],
//       stream: true,
//     });

//       for await (const chunk of response) {
//           const content = chunk.choices[0]?.delta?.content || "";
//           res.write(content);
//       }
//   } catch (error) {
//       console.error('Error while streaming:', error);
//       res.status(500).send('An error occurred while streaming data.');
//   } finally {
//       // End the response when the stream is finished
//       res.end();
//   }
// }