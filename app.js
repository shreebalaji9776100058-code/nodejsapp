const http = require('http');

// Hostinger assigns a dynamic port via process.env.PORT. 
// We fallback to 3000 for local testing.
const PORT = process.env.PORT;

const server = http.createServer((req, res) => {
  // Set response headers
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

  // HTML content to render
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Hello World - Hostinger</title>
      <style>
        body {
          font-family: system-ui, -apple-system, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          background-color: #f4f4f9;
          color: #333;
        }
        .card {
          background: #fff;
          padding: 2.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          text-align: center;
        }
        h1 { margin-top: 0; color: #673ab7; }
        p { color: #666; font-size: 1.1rem; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>Hello World! 👋</h1>
        <p>Your Node.js app is successfully running on Hostinger.</p>
      </div>
    </body>
    </html>
  `;

  res.end(htmlContent);
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
