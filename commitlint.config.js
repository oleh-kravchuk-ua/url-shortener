export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    "header-max-length": [2, "always", 120],
    "subject-case": [2, "always", "lower-case"],
    "subject-empty": [2, "never"],
    "type-enum": [2, "always", ["feat", "feature","fix", "docs", "style", "refactor", "perf", "test", "chore", "revert"]],
    "type-empty": [2, "never"],
    "scope-case": [2, "always", "upper-case"]
  }
};
