# Unhinged

## Project
- Next.js app deployed on Vercel
- Domain: unhinged.fyi
- GitHub: https://github.com/bdecrem/unhinged
- DNS hosted on Cloudflare, pointing to Vercel (A record: 76.76.21.21)

## Vercel MCP Setup
To manage Vercel deployments, domains, and logs from Claude Code, add the Vercel MCP server:

```bash
claude mcp add --transport http vercel https://mcp.vercel.com
```

Then start Claude Code and run `/mcp` to authenticate.

Once connected, you can ask Claude to check deployment status, view logs, manage domains, and troubleshoot deploy errors directly.

Docs: https://vercel.com/docs/agent-resources/vercel-mcp
