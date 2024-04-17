#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

host="pb"
zipfile="/tmp/pb_migrations.zip"

cd $(dirname ${BASH_SOURCE[0]})

rm "$zipfile" || true
zip -r "$zipfile" pb_migrations
scp "$zipfile" "$host":"$zipfile"

ssh "$host" "mv pb_migrations pb_migrations_back; unzip $zipfile"