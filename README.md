# Meme AI Video MCP

Discover public rap video templates from [Meme AI Video](https://www.memeaivideo.com/)
and open their official generator pages. This local MCP server reads a small
built-in catalog. Video creation takes place on the website.

## Run locally

Requires Node.js 20 or later. From a checkout, run `npm ci` and `npm run build`.
In your MCP client's stdio configuration, set the command to `node` and pass
the absolute path to `dist/index.js` as its argument.

Once the npm package is published, you can use this configuration in clients
that support `mcpServers`:

```json
{
  "mcpServers": {
    "memeai-video": {
      "command": "npx",
      "args": ["-y", "memeai-video-mcp@0.1.0"]
    }
  }
}
```

## Tools

| Tool | Example arguments | Result |
| --- | --- | --- |
| `list_rap_templates` | `{}` | Public rap template list with slugs and links |
| `get_template_info` | `{"slug":"hotel-lobby-ai"}` | Description and official template page |
| `get_video_generator_url` | `{}` | General AI rap generator link, or the template page if you pass a slug |

Try asking your client “Which rap video templates can I use with my photo?
Give me the official link for Hotel Lobby.”

The MIT license applies to this standalone MCP code.
