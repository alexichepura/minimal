// @ts-check
const fs = require("fs")
const http = require("http")
const path = require("path")

const html = fs.readFileSync(
  path.resolve(process.cwd() + "/src/app.html"),
  "utf8"
)
const js = fs.readFileSync(
  path.resolve(process.cwd() + "/src/front.js"),
  "utf8"
)

const server = http.createServer(async (req, res) => {
  if (req.url === "/data" && req.method === "POST") {
    const inputString = await readBodyString(req)
    const ourputString = inputString.split("").reverse().join("")
    res.setHeader("content-type", "text/plain")
    res.statusCode = 200
    res.end(ourputString)
    return
  }
  if (req.url === "/app" && req.method === "GET") {
    res.setHeader("content-type", "text/html")
    res.statusCode = 200
    res.end(html)
    return
  }
  if (req.url === "/front.js" && req.method === "GET") {
    res.setHeader("content-type", "text/javascript")
    res.statusCode = 200
    res.end(js)
    return
  }
  res.statusCode = 404
  res.end("NOT FOUND")
})

const PORT = 3000
server.listen(PORT, () => {
  console.log("🚀 App started", `http://localhost:${PORT}/app`)
})

/**
 * @param req {http.IncomingMessage}
 * @return {Promise<string>}
 */
const readBodyString = async (req) => {
  return await new Promise((resolve) => {
    let body = []
    req
      .on("data", (chunk) => {
        body.push(chunk)
      })
      .on("end", () => {
        resolve(Buffer.concat(body).toString())
      })
  })
}
