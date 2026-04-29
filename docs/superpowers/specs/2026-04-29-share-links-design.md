# SNS共有リンク設計

## 目的

各ページからSNSへ共有しやすくする。静的HTML/CSSのまま、フォーム、DB、アクセス解析、Cookie、独自APIは追加しない。

## 方針

- `_includes/share-links.html` を作り、共通の共有リンクUIを置く。
- `home`、`default`、`guide` layout からフッター前または本文末尾にincludeする。
- 共有先はX、LINE、Facebook、URL表示リンクの4つにする。
- 共有URLは `page.url | absolute_url`、共有文は `page.title | default: site.title` を使う。
- 外部共有リンクは `target="_blank" rel="noopener noreferrer"` を必ず付ける。
- 共有不要ページは front matter の `share: false` で非表示にする。
- CSSは既存の `home.css` と `guide.css` に追加し、既存の明るい攻略メモ調に合わせる。

## 配置

- トップ、カテゴリ、タグ、404などの通常ページは `default` / `home` layout の本文末尾に表示する。
- ガイドページは情報源、コメント欄、フッターの前に表示する。
- 404ページは `share: false` を指定して非表示にする。

## 検証

- `scripts/validate_jekyll_structure.ps1` でinclude存在、layout組み込み、AGENTS.md記載を確認する。
- `git diff --check` と `git status --short` を確認する。
