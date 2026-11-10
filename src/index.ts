#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const website = "https://www.memeaivideo.com";
const templates = {
  "hotel-lobby-ai": {
    name: "Hotel Lobby AI",
    description: "Create a photo-based rap video set in a hotel lobby.",
    url: `${website}/hotel-lobby-ai`,
  },
  "tiny-desk-ai-video": {
    name: "Tiny Desk AI Video",
    description: "Create a photo-based rap video in an intimate desk concert setting.",
    url: `${website}/tiny-desk-ai-video`,
  },
};

const slug = z.enum(["hotel-lobby-ai", "tiny-desk-ai-video"]);
const server = new McpServer({ name: "memeai-video-mcp", version: "0.1.0" });

function result(data: object) {
  return { content: [{ type: "text" as const, text: JSON.stringify(data) }] };
}

server.registerTool(
  "list_rap_templates",
  { description: "List supported public Meme AI Video rap templates." },
  () => result({
    templates: Object.entries(templates).map(([slug, template]) => ({ slug, ...template })),
  }),
);

server.registerTool(
  "get_template_info",
  {
    description: "Get the public description and official page for a rap template.",
    inputSchema: { slug },
  },
  ({ slug }) => result({ slug, ...templates[slug] }),
);

server.registerTool(
  "get_video_generator_url",
  {
    description: "Get the official generator page for a template or the general AI rap generator.",
    inputSchema: { slug: slug.optional() },
  },
  ({ slug }) => result({ url: slug ? templates[slug].url : `${website}/ai-rap-generator` }),
);

await server.connect(new StdioServerTransport());
