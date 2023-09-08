import ago from 's-ago';

type Email = Partial<{
	fromAddress: string;
	fromName: string;
	subject: string;
	html: string;
	text: string;
	date: string;
}>;

export default function emailMarkup(email: Email): string {
	// Adapted from here:
	// https://making.close.com/posts/rendering-untrusted-html-email-safely
	const srcdoc = `
		<html style="overflow: scroll">
			<head>
				<meta http-equiv="Content-Security-Policy" content="script-src 'none'"></meta>
				<base target="_blank"></base>
				<style>
					body { margin:0; font: 13px -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif; overflow-y: hidden;}
					html:not(.x),body:not(.x){height:auto!important}
					p:first-child{margin-top:0;}
					p:last-child{margin-bottom:0;}
					a[href]{color: #3781B8;text-decoration:none;}
					a[href]:hover{text-decoration:underline;}
					blockquote[type=cite] {margin:0 0 0 .8ex;border-left: 1px #ccc solid;padding-left: 1ex;}
					img { max-width: 100%; }
					ul, ol { padding: 0; margin: 0 0 10px 25px; }
					ul { list-style-type: disc; }
				</style>
			</head>
			<body>${email.html}</body>
		</html>
	`.replace(/"/g, '&quot;').trim();

	return `
		<div class="email">
			<div class="email-meta">
				<p><b>${email.fromName}</b> &lt;${email.fromAddress}&gt;</p>
				<p><b>${email.subject}</b></p>
				<p style="font-size: 14px">Recieved ${ago(new Date(email.date || ''))}</p>
			</div>
			<iframe scrolling="yes" srcdoc="${srcdoc}" sandbox="allow-popups-to-escape-sandbox" csp="script-src 'none'"></iframe>
		</div>
	`;
}
