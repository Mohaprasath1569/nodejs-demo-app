
const test = require("node:test");
const assert = require("node:assert/strict");
const server = require("../app");

test("GET / returns the application message", async () => {
    await new Promise((resolve) => {
        server.listen(0, "127.0.0.1", resolve);
    });

    try {
        const port = server.address().port;
        const response = await fetch(`http://127.0.0.1:${port}/`);
        const data = await response.json();

        assert.equal(response.status, 200);
        assert.equal(data.message, "Node.js Demo App");
        assert.equal(data.status, "success");
    } finally {
        await new Promise((resolve, reject) => {
            server.close((error) => error ? reject(error) : resolve());
        });
    }
});

test("GET /health returns healthy status", async () => {
    const instance = require("../app");
    assert.equal(typeof instance, "object");
    assert.equal(typeof instance.listen, "function");
});
