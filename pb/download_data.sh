#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

host="pb"
zipfile="/tmp/pb_data.zip"

cd $(dirname ${BASH_SOURCE[0]})

ssh "$host" "rm $zipfile; zip $zipfile pb_data/data.db pb_data/logs.db pb_data/types.d.ts"
scp "$host":"$zipfile" "$zipfile"

mv pb_data pb_data_back || true
unzip $zipfile