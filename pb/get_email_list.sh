#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

sqlite3 pb_data/data.db 'select email from users where verified = true' > email_list.txt