import PostalMime from 'postal-mime';

export interface Env {
	DB: D1Database;
}

async function streamToArrayBuffer(stream: ReadableStream, streamSize: number) {
  let result = new Uint8Array(streamSize);
  let bytesRead = 0;
  const reader = stream.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    result.set(value, bytesRead);
    bytesRead += value.length;
  }
  return result;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		// TODO: Fetch last XYZ emails from DB
		// TODO: Render HTML each in iframe
		// TODO: Return HTML response
		return new Response('Hello World!');
	},

	async email(message: ForwardableEmailMessage, env: Env) {
		const rawEmail = await streamToArrayBuffer(message.raw, message.rawSize);
		const parser = new PostalMime();
		const parsedEmail = await parser.parse(rawEmail);

		console.log(parsedEmail);
		// TODO: Handle attachments

		const data = JSON.stringify({
			fromAddress: parsedEmail.from.address,
			fromName: parsedEmail.from.name,
			subject: parsedEmail.subject,
			html: parsedEmail.html,
			text: parsedEmail.text,
		});

		await env.DB.prepare('INSERT INTO emails (data) VALUES (?1)').bind(data).run();
	},
};
