# Self Hosting

A practical handbook for running your own services — from DNS and reverse proxies to monitoring and backups.

![Self Hosting Infrastructure](https://picsum.photos/800/400?random=20)

## The Self-Hosting Philosophy

Self-hosting means **running software on infrastructure you control**, rather than relying on third-party SaaS. The goal isn't to avoid all cloud services — it's to choose what you depend on.

> "Your data is only truly yours when it lives on your own hardware." — common homelabber maxim

### When to Self-Host

- You need privacy-first alternatives (email, notes, file sync)
- A service you rely on shuts down or raises prices dramatically
- You want to learn DevOps by doing, not by reading
- You have idle hardware drawing electricity anyway

## Essential Stack Comparison

| Service Category | Self-Hosted Option | Cloud Alternative | Monthly Saving |
|-----------------|-------------------|-------------------|----------------|
| File Sync | Nextcloud | Dropbox 2TB | £8.99 |
| Password Manager | Vaultwarden | 1Password | £2.99 |
| Note-Taking | Obsidian (self-sync) | Notion Plus | £7.00 |
| Git Hosting | Gitea | GitHub Team | $4.00 |
| Email | Stalwart Mail | Fastmail | £3.00 |

## Docker Compose: Your Best Friend

Almost every self-hosted service has an official Docker image. A typical setup uses `docker compose` to manage services declaratively:

```bash
# Start all services defined in docker-compose.yml
docker compose up -d

# View logs for a specific service
docker compose logs -f nextcloud

# Update all images and restart changed containers
docker compose pull && docker compose up -d

# List running containers with live resource usage
docker stats --no-stream
```

After any change to your compose file, run `docker compose up -d` — Docker will only recreate changed containers.

## Reverse Proxy with Caddy

Caddy is the simplest reverse proxy for self-hosters — it handles SSL certificates automatically:

1. Install Caddy on your host or as a container
2. Create a `Caddyfile` in `/etc/caddy/`
3. Add a block per service with your subdomain
4. Point your DNS A records to your server IP
5. Run `caddy reload` — certificates provision in seconds

The key advantage over Nginx is **zero manual certificate management**.

### Sample Caddyfile

```bash
nextcloud.yourdomain.com {
  reverse_proxy nextcloud:80
  header Strict-Transport-Security "max-age=31536000"
}

git.yourdomain.com {
  reverse_proxy gitea:3000
}
```

## Monitoring: Grafana + Prometheus

- [Prometheus](https://prometheus.io) scrapes metrics from your services every 15 s
- Node Exporter exposes host CPU, memory, disk, and network metrics
- Grafana visualises these as live dashboards you can share

Use the community dashboard ID `1860` for an instant Node Exporter overview.

## Backups: The 3-2-1 Rule

- **3** copies of your data
- On **2** different media types
- With **1** copy off-site (Backblaze B2 costs ~$6/TB/month)

Use `restic` with `--exclude` flags to back up volumes without your container images. Schedule daily with a systemd timer or cron.
