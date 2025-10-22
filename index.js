// Set up express
const express = require ("express");
const app = express();
const port = 8000;

// Serve static files from public folder
app.use(express.static('public'));

// Global styling middleware - inject CSS into all HTML responses
app.use((req, res, next) => {
    const originalSend = res.send;
    res.send = function(data) {
        if (typeof data === 'string' && !data.includes('<!DOCTYPE')) {
            // Wrap any HTML-like content or plain text
            const styledData = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {
                        background-color: #000000;
                        color: #ecf0f1;
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 20px;
                    }
                    h1 {
                        color: #3498db;
                    }
                    a {
                        color: #1abc9c;
                    }
                </style>
            </head>
            <body>
                ${data}
            </body>
            </html>`;
            originalSend.call(this, styledData);
        } else {
            originalSend.call(this, data);
        }
    };
    next();
});

// Load the route handlers
const mainRoutes = require("./routes/main");  
app.use('/', mainRoutes);

// Start listening for HTTP requests
app.listen(port, 
    () => console.log(`Node server is running on port ${port}...`))