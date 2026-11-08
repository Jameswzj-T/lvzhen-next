#!/bin/sh
# Read-only Linux host inventory. No installation, sudo, service changes, env dumps or network calls.
set -u

lvzhen_os=$(uname -s)
if [ "$lvzhen_os" != Linux ]; then
  printf '%s\n' 'This inspection is for the target Linux server; no host checks were run.'
  exit 2
fi

printf '%s\n' 'lvzhen_host_inspection=1'
printf 'architecture=%s\n' "$(uname -m)"
if [ -r /etc/os-release ]; then
  awk -F= '/^PRETTY_NAME=/{gsub(/^"|"$/, "", $2); print "os=" $2}' /etc/os-release
fi
printf 'logical_cpus=%s\n' "$(getconf _NPROCESSORS_ONLN 2>/dev/null || printf unknown)"
printf 'uptime_seconds=%s\n' "$(cut -d ' ' -f 1 /proc/uptime)"
awk '/^MemTotal:/{printf "memory_total_mib=%.0f\n", $2/1024} /^MemAvailable:/{printf "memory_available_mib=%.0f\n", $2/1024} /^SwapTotal:/{printf "swap_total_mib=%.0f\n", $2/1024}' /proc/meminfo
df -Pk / | awk 'NR==2 {print "root_total_kib=" $2; print "root_available_kib=" $4; print "root_used_percent=" $5}'

for lvzhen_tool in docker node nginx caddy; do
  if command -v "$lvzhen_tool" >/dev/null 2>&1; then
    printf '%s_available=yes\n' "$lvzhen_tool"
  else
    printf '%s_available=no\n' "$lvzhen_tool"
  fi
done
if command -v node >/dev/null 2>&1; then node --version; fi
if command -v docker >/dev/null 2>&1; then
  docker --version
  docker compose version --short 2>/dev/null || printf '%s\n' 'docker_compose_status=unavailable'
  printf '%s\n' 'containers_begin'
  docker ps --format '{{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}' 2>/dev/null || printf '%s\n' 'container_status=unavailable_to_current_user'
  printf '%s\n' 'containers_end'
fi

printf '%s\n' 'listening_ports_begin'
if command -v ss >/dev/null 2>&1; then
  ss -lnt '( sport = :22 or sport = :80 or sport = :443 or sport = :3000 or sport = :3107 )'
else
  printf '%s\n' 'port_status=ss_unavailable'
fi
printf '%s\n' 'listening_ports_end'
if command -v systemctl >/dev/null 2>&1; then
  for lvzhen_service in docker nginx apache2 caddy; do
    lvzhen_status=$(systemctl is-active "$lvzhen_service" 2>/dev/null || true)
    printf 'service_%s=%s\n' "$lvzhen_service" "${lvzhen_status:-unknown}"
  done
fi

# Public host fingerprints only, for verification through the authenticated cloud console.
if command -v ssh-keygen >/dev/null 2>&1; then
  printf '%s\n' 'ssh_public_host_fingerprints_begin'
  for lvzhen_public_key in /etc/ssh/ssh_host_*_key.pub; do
    [ -r "$lvzhen_public_key" ] || continue
    ssh-keygen -lf "$lvzhen_public_key" -E sha256
  done
  printf '%s\n' 'ssh_public_host_fingerprints_end'
fi
printf '%s\n' 'inspection_complete=yes'
