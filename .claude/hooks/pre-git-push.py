import json, sys

try:
    data = json.load(sys.stdin)
    command = data.get('tool_input', {}).get('command', '')

    if 'git push' not in command:
        sys.exit(0)

    print('─────────────────────────────────────────')
    print('🚦 Pre-push checklist:')
    print('  [ ] QC passed? (qc.md signed off)')
    print('  [ ] dev-log.md updated?')
    print('  [ ] Security review done?')
    print('  [ ] sprint-report.md confirmed? (required before sprint MERGE)')
    print('─────────────────────────────────────────')

except Exception:
    pass
