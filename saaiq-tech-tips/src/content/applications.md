# Applications

A curated collection of must-have applications across productivity, development, media, and security — with setup tips and alternatives.

![Applications Overview](https://picsum.photos/800/400?random=30)

## Philosophy of a Lean Toolkit

The best application stack is one you actually understand. **Fewer, better tools** beat sprawling collections of half-used software. Every tool listed here earns its place through reliability, active development, and genuine daily utility.

> "Simplicity is prerequisite for reliability." — Edsger W. Dijkstra

### Evaluation Criteria

- Open-source preferred (auditable, forkable)
- Cross-platform where possible
- Privacy-respecting by default
- Actively maintained with documented APIs

## Top Picks by Category

| Category | Recommended | Alternative | Platform |
|----------|------------|-------------|----------|
| Terminal | WezTerm | Alacritty | All |
| Editor | Neovim | Zed | All |
| Browser | Firefox | Zen Browser | All |
| Password Mgr | Bitwarden | KeePassXC | All |
| Note-Taking | Obsidian | Logseq | All |
| API Testing | Bruno | Hoppscotch | All |

## Setting Up WezTerm

WezTerm is a GPU-accelerated terminal written in Rust with Lua configuration:

```lua
-- ~/.config/wezterm/wezterm.lua
local wezterm = require 'wezterm'
local config  = wezterm.config_builder()

config.font              = wezterm.font('Fira Code', { weight = 'Medium' })
config.font_size         = 14.0
config.color_scheme      = 'Tokyo Night'
config.window_background_opacity = 0.92
config.enable_tab_bar    = true
config.tab_bar_at_bottom = true

return config
```

Reload config with `CTRL+SHIFT+R` — no restart required.

## Obsidian Plugins Worth Installing

Here's a recommended setup sequence for a productive Obsidian vault:

1. Install **Dataview** — query your notes like a database
2. Add **Templater** — dynamic templates with JavaScript
3. Enable **Git** plugin — automatic vault backups to a private repo
4. Install **Excalidraw** — embed hand-drawn diagrams inline
5. Set up **Periodic Notes** — daily, weekly, and monthly note automation
6. Configure **QuickSwitcher++** for fuzzy file and heading search

## Firefox Hardening

Firefox is excellent out-of-the-box but a few tweaks dramatically improve privacy:

- Install [uBlock Origin](https://addons.mozilla.org/en-GB/firefox/addon/ublock-origin/) with the full filter list suite
- Enable **DNS over HTTPS** in Settings → Privacy → DNS over HTTPS using Cloudflare or NextDNS
- Set `network.http.referer.XOriginPolicy` to `2` in `about:config`
- Use **Multi-Account Containers** to isolate Google, Facebook, and shopping sites

### Container Strategy

| Container | Sites | Purpose |
|-----------|-------|---------|
| Personal | Email, banking | Full trust |
| Social | Twitter/X, Reddit | Isolated tracking |
| Shopping | Amazon, eBay | Purchase isolation |
| Work | Jira, Notion, Slack | Work/personal split |

## Terminal Tools You'll Use Daily

- `fzf` — fuzzy finder for history, files, and git branches
- `ripgrep` (rg) — 10× faster than grep for code search
- `bat` — `cat` with syntax highlighting and Git diff support
- `eza` — modern `ls` replacement with icons and tree view
- `zoxide` — smart `cd` that learns your directories
