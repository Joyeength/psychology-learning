import json, sys, os

REQUIRED_KEYS = {'khaiNiem', 'suThatThuVi', 'viDu', 'cauHoi', 'nhiemVu'}

try:
    data = json.load(sys.stdin)
    file_path = data.get('tool_input', {}).get('file_path', '')

    if '/lessons/' not in file_path or not file_path.endswith('.json'):
        sys.exit(0)

    name = os.path.basename(file_path)

    with open(file_path) as f:
        lesson = json.load(f)

    missing = REQUIRED_KEYS - set(lesson.keys())
    extra = set(lesson.keys()) - REQUIRED_KEYS
    empty = [k for k in REQUIRED_KEYS if k in lesson and not str(lesson[k]).strip()]

    if missing:
        print(f'✗ SCHEMA FAIL {name}: missing keys = {sorted(missing)}')
    elif empty:
        print(f'⚠️  SCHEMA WARN {name}: empty values = {sorted(empty)}')
    elif extra:
        print(f'⚠️  SCHEMA WARN {name}: unexpected keys = {sorted(extra)}')
    else:
        print(f'✓ Schema OK: {name}')

except json.JSONDecodeError as e:
    name = os.path.basename(file_path) if 'file_path' in dir() else '?'
    print(f'✗ JSON ERROR {name}: {e}')
except Exception:
    pass
