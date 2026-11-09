#!/usr/bin/env bash
# Configura el repositorio de GitHub actual con el estándar: squash merge, borrado de ramas
# fusionadas y protección de main (solo PR con el CI en verde).
#   scripts/configurar-repo.sh            (desde la carpeta del repo)
set -euo pipefail
REPO=$(gh repo view --json nameWithOwner --jq .nameWithOwner)
echo "Configurando ${REPO}…"

gh api -X PATCH "repos/${REPO}" -f allow_squash_merge=true -F allow_merge_commit=false -F allow_rebase_merge=false \
  -F delete_branch_on_merge=true -F allow_auto_merge=true >/dev/null
echo "✓ Squash merge, borrado de ramas fusionadas y auto-merge"

# Protección de main con un ruleset: sin push directo, PR obligatorio y el CI «Tests y build» en verde.
# En repos privados de cuentas gratuitas GitHub no lo permite: se avisa y se sigue.
if gh api -X POST "repos/${REPO}/rulesets" --input - >/dev/null 2>/tmp/ruleset.err <<'JSON'
{
  "name": "proteger-main",
  "target": "branch",
  "enforcement": "active",
  "conditions": { "ref_name": { "include": ["~DEFAULT_BRANCH"], "exclude": [] } },
  "rules": [
    { "type": "deletion" },
    { "type": "non_fast_forward" },
    { "type": "pull_request", "parameters": { "required_approving_review_count": 0, "dismiss_stale_reviews_on_push": false,
      "require_code_owner_review": false, "require_last_push_approval": false, "required_review_thread_resolution": false } },
    { "type": "required_status_checks", "parameters": { "strict_required_status_checks_policy": false,
      "required_status_checks": [ { "context": "Tests y build" } ] } }
  ]
}
JSON
then
  echo "✓ main protegida (PR obligatorio + CI en verde)"
else
  echo "⚠ No se pudo proteger main: $(head -c 200 /tmp/ruleset.err)"
  echo "  En repos privados hace falta GitHub Pro. Mientras tanto, la regla «nunca push a main» la cumple Claude (~/.claude/CLAUDE.md)."
fi
