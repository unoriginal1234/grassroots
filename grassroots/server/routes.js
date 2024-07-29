import openaiConnect from './openAIConnection.js'

const openai = openaiConnect()

export default async function goofballStream(req, res) {
  // Set headers to keep the connection open and indicate streaming content
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Transfer-Encoding', 'chunked');

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: "Say this is a test" }],
      stream: true,
    });

      for await (const chunk of response) {
          const content = chunk.choices[0]?.delta?.content || "";
          res.write(content);
      }
  } catch (error) {
      console.error('Error while streaming:', error);
      res.status(500).send('An error occurred while streaming data.');
  } finally {
      // End the response when the stream is finished
      res.end();
  }
}