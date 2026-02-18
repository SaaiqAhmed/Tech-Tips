# Miscellaneous

A collection of tips, tricks, and technical knowledge that doesn't fit neatly elsewhere — but is too useful to leave out.

![Tech Tips Collection](https://picsum.photos/800/400?random=40)

## Git Mastery: Beyond the Basics

Most developers know `git add`, `commit`, and `push`. The commands below separate productive developers from great ones.

> "In theory there is no difference between theory and practice. In practice there is." — Yogi Berra

### The Commands Nobody Teaches

- `git bisect start` — binary search through commits to find a regression
- `git reflog` — recover anything, even after a hard reset
- `git worktree add` — check out multiple branches simultaneously
- `git rerere` — remember and re-apply conflict resolutions automatically
- `git log --follow -p -- <file>` — full history of a file including renames

## SSH Configuration Mastery

A well-structured `~/.ssh/config` saves hours every week:

```bash
# ~/.ssh/config

Host *
  ServerAliveInterval 60
  ServerAliveCountMax 3
  AddKeysToAgent yes
  IdentityFile ~/.ssh/id_ed25519

Host homelab
  HostName 192.168.1.10
  User saaiq
  Port 22

Host jump-bastion
  HostName bastion.yourdomain.com
  User ubuntu
  ForwardAgent yes

Host prod-app
  HostName 10.0.1.5
  ProxyJump jump-bastion
  User deploy
```

Now `ssh homelab` connects instantly. `ssh prod-app` tunnels through the bastion automatically.

## DNS Record Types Explained

| Record Type | Purpose | Example Value |
|------------|---------|---------------|
| A | IPv4 address | 93.184.216.34 |
| AAAA | IPv6 address | 2606:2800::1 |
| CNAME | Alias to another name | www → yourdomain.com |
| MX | Mail exchange server | 10 mail.yourdomain.com |
| TXT | Arbitrary text (SPF, DKIM) | v=spf1 include:... |
| NS | Authoritative nameservers | ns1.cloudflare.com |

## Networking Quick Reference

For LAN debugging, these five commands cover 90% of scenarios:

1. `ip -br addr` — show all interfaces and their IPs (modern `ifconfig` replacement)
2. `ss -tulnp` — list all listening ports with owning process names
3. `tracepath 1.1.1.1` — trace route without root privileges
4. `nmap -sn 192.168.1.0/24` — discover all hosts on your subnet
5. `tcpdump -i eth0 -n port 443` — capture HTTPS traffic on an interface

## Useful One-Liners

```bash
# Find the 10 largest files recursively
du -ah . | sort -rh | head -10

# Watch a log file and highlight ERROR lines
tail -f /var/log/app.log | grep --color=always -E 'ERROR|$'

# Kill all processes matching a name
pkill -f 'python manage.py'

# Generate a 32-character random password
openssl rand -base64 32 | tr -dc 'a-zA-Z0-9' | head -c 32

# Port-forward via SSH (local 8080 → remote 80)
ssh -L 8080:localhost:80 user@server -N
```

## Productivity: Keyboard-First Workflow

See [Raycast](https://www.raycast.com) (macOS) or [Albert](https://albertlauncher.github.io) (Linux) for app launchers, and invest time in learning your editor's keybindings. The return on investment from `i3wm` or `Aerospace` (tiling window managers) is enormous once past the initial learning curve.
