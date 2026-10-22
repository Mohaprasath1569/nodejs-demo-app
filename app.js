
const http = require("node:http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");

    if (req.url === "/health") {
        res.writeHead(200);
        return res.end(JSON.stringify({
            status: "healthy"
        }));
    }

    if (req.url === "/") {
        res.writeHead(200);
        return res.end(JSON.stringify({
            message: "Node.js Demo App",
            status: "success",
            environment: "Docker + GitHub Actions CI/CD"
        }));
    }

    res.writeHead(404);
    res.end(JSON.stringify({
        error: "Not Found"
    }));
});

if (require.main === module) {
    server.listen(PORT, "0.0.0.0", () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = server;
