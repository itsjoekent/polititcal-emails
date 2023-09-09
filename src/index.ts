import PostalMime from 'postal-mime';
import pageMarkup from './markup/page';
import emailMarkup from './markup/email';

export interface Env {
	DB: D1Database;
	INTAKE_EMAIL: string;
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
    const { pathname } = new URL(request.url);

    if (pathname !== '/') {
			return new Response('Not found', { status: 404 });
		}

		// TODO: Add pagination through query param?

		const { results } = await env.DB.prepare('SELECT * FROM emails ORDER BY id DESC LIMIT 500').all();
		const emails = results.map((result: any) => emailMarkup(JSON.parse(result.data)));

		return new Response(pageMarkup(emails), {
			headers: {
				'content-type': 'text/html;charset=UTF-8',
			},
		});
	},

	async email(message: ForwardableEmailMessage, env: Env) {
		const rawEmail = await streamToArrayBuffer(message.raw, message.rawSize);
		const parser = new PostalMime();
		const parsedEmail = await parser.parse(rawEmail);

		const redactedHtml = (parsedEmail.html || '')
			.replace(/href="([^"]+)"/g, 'href="#"')
			.replaceAll(env.INTAKE_EMAIL, 'redacted@email.com');

		const data = JSON.stringify({
			fromAddress: parsedEmail.from.address,
			fromName: parsedEmail.from.name,
			subject: parsedEmail.subject,
			html: redactedHtml,
			text: parsedEmail.text,
			date: parsedEmail.date,
		});

		await env.DB.prepare('INSERT INTO emails (data) VALUES (?1)').bind(data).run();
	},
};
