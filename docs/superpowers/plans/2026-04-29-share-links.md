# SNS Share Links Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 各ページに軽量なSNS共有リンクを追加する。

**Architecture:** `_includes/share-links.html` を共通部品にして、`home`、`default`、`guide` layout から呼び出す。共有URLとタイトルはJekyllのLiquid変数から生成し、CSSは既存テーマごとに最小追加する。

**Tech Stack:** GitHub Pages Jekyll、Liquid、静的HTML、CSS、PowerShell検証スクリプト。

---

### Task 1: RED検証を追加する

**Files:**
- Modify: `scripts/validate_jekyll_structure.ps1`

- [ ] **Step 1: Write the failing test**

`Assert-Contains` を追加し、共有include、layout組み込み、AGENTS.md記載を必須にする。

- [ ] **Step 2: Run test to verify it fails**

Run: `powershell -ExecutionPolicy Bypass -File scripts/validate_jekyll_structure.ps1`

Expected: `_includes/share-links.html` が未作成なので失敗する。

### Task 2: 共有includeとlayout組み込みを実装する

**Files:**
- Create: `_includes/share-links.html`
- Modify: `_layouts/home.html`
- Modify: `_layouts/default.html`
- Modify: `_layouts/guide.html`
- Modify: `404.html`

- [ ] **Step 1: Implement the shared include**

`page.share == false` のとき非表示にし、X、LINE、Facebook、URL表示リンクを出力する。

- [ ] **Step 2: Include it from layouts**

`home` と `default` は `{{ content }}` の後、`guide` はコメント欄とフッターの前に入れる。

- [ ] **Step 3: Exclude 404**

`404.html` に `share: false` を追加する。

### Task 3: CSSとドキュメントを更新する

**Files:**
- Modify: `assets/css/home.css`
- Modify: `assets/css/guide.css`
- Modify: `AGENTS.md`

- [ ] **Step 1: Add share link styles**

`.share-section`、`.share-links`、`.share-link` を追加し、モバイルで1カラムに落ちるようにする。

- [ ] **Step 2: Document operation**

`AGENTS.md` に共有リンク運用を追加する。

### Task 4: GREEN検証を実行する

**Files:**
- Run only

- [ ] **Step 1: Run structure validation**

Run: `powershell -ExecutionPolicy Bypass -File scripts/validate_jekyll_structure.ps1`

Expected: `Jekyll structure validation passed.`

- [ ] **Step 2: Run diff and status checks**

Run: `git diff --check`

Expected: no output and exit code 0.

Run: `git status --short`

Expected: intended files only.
