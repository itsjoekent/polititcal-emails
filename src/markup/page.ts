export default function pageMarkup(emails: string[]): string {
	return `
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Read political mail</title>
				<link rel="preconnect" href="https://fonts.googleapis.com">
				<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
				<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
				<style>
					html, body, div, h1, h2, h3, h4, h5, h6, p, span, iframe {
						margin: 0;
						padding: 0;
						color: #111111;
						font-family: 'Lora', serif;
						box-sizing: border-box;
					}

					body {
						display: flex;
						flex-direction: column;
						align-items: center;
						width: 100%;
						min-height: 100vh;
						padding: 24px;
						background: #fdfdfd;
					}

					.content {
						display: flex;
						flex-direction: column;
						width: 100%;
						max-width: 700px;
						min-height: 300px;
						margin-top: 20vh;
						margin-bottom: 36px;
						text-align: center;
					}

					.content h1 {
						font-size: 48px;
						margin-bottom: 16px;
					}

					.content h1 div {
						display: inline;
						font-style: italic;
					}

					.emails {
						display: flex;
						flex-direction: column;
						grid-gap: 24px;
						width: 100%;
						max-width: 700px;
					}

					.email {
						width: 100%;
						background: #ededed;
						padding: 16px;
						border-radius: 8px;
					}

					.email-meta {
						margin-bottom: 8px;
					}

					iframe {
						width: 100%;
						height: 40vh;
						overflow: scroll;
						border: 1px solid #d1d1d1;
						background: #FFF;
					}
				</style>
			</head>
			<body>
				<div class="content">
					<h1>Read <div id="politician-name">Trump's</div> Emails</h1>
					<p>I hate getting political email spam, but I also want to know what campaigns are saying. So I made this site to read the emails for me.</p>
				</div>
				<div class="emails">
					${emails.join('\n')}
				</div>
				<script src="https://unpkg.com/typewriter-effect@latest/dist/core.js"></script>
				<script>
					const typewriter = new Typewriter('#politician-name', {
						autoStart: true,
						loop: true,
						strings: ["Trump's", "Biden's", "Ramaswamy's", "DeSantis's", "Marianne's"],
					});
				</script>
			</body>
		</html>
	`;
}
