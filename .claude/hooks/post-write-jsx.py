import json, sys, os

try:
    data = json.load(sys.stdin)
    file_path = data.get('tool_input', {}).get('file_path', '')

    if not file_path.endswith(('.jsx', '.js')):
        sys.exit(0)

    if not os.path.exists(file_path):
        sys.exit(0)

    with open(file_path) as f:
        lines = sum(1 for _ in f)

    name = os.path.basename(file_path)

    if lines > 450:
        print(f'🔴 LINE LIMIT: {name} = {lines}/500 — split required before next edit')
    elif lines > 400:
        print(f'🟡 LINE WATCH: {name} = {lines}/500 — approaching limit')

except Exception:
    pass
