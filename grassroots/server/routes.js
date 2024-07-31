import openaiConnect from './openAIConnection.js'
import * as dotenv from 'dotenv'

dotenv.config();

const openai = openaiConnect();

const assistant = process.env.goofball_ID;

export default async function goofballStream(req, res) {
  console.log(req.body, 'request body');

  // Set headers to keep the connection open and indicate streaming content
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Transfer-Encoding', 'chunked');
  res.setHeader('Connection', 'keep-alive');

  let {project, country, goal, category} = req.body

  try {

    const thread = await openai.beta.threads.create();

    const message = await openai.beta.threads.messages.create(
      thread.id,
      {
        role: "user",
        content: `I have a project called ${project} it is in the ${country} and we want to raise ${goal}. It is a ${category}. Can you use your data to give me advice? I will not ask a follow up question, so give me a lot of information with specific numeric targets for social media presence, number of backers, number of updates, and duration.`
      }
    );

    // We use the stream SDK helper to create a run with
// streaming. The SDK provides helpful event listeners to handle
// the streamed response.

  const run = openai.beta.threads.runs.stream(thread.id, {
    assistant_id: assistant
  })
    .on('textCreated', (text) => res.write('\nGrassroots Bot: '))
    .on('textDelta', (textDelta, snapshot) => res.write(textDelta.value))
    .on('toolCallCreated', (toolCall) => res.write(`tool_call`))
    // .on('toolCallDelta', (toolCallDelta, snapshot) => {
    //   if (toolCallDelta.type === 'code_interpreter') {
    //     if (toolCallDelta.code_interpreter.input) {
    //       res.write(toolCallDelta.code_interpreter.input);
    //       // res.write('Looking at some data. Hold up.')
    //     }
    //     if (toolCallDelta.code_interpreter.outputs) {
    //       res.write("\noutput >\n");
    //       toolCallDelta.code_interpreter.outputs.forEach(output => {
    //         if (output.type === "logs") {
    //           res.write(`\n${output.logs}\n`);
    //         }
    //       });
    //     }
    //   }
    // })
    .on('end', () => res.end());
  } catch (error) {
    res.status(500).send('An error occurred while streaming data.');
    console.error('Error while streaming:', error);
  }
  // finally {
  //     // End the response when the stream is finished
  //     res.end();
  // }


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