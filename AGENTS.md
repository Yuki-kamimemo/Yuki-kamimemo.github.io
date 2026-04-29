# Repository Guidelines for Codex

このリポジトリは、GitHub Pagesで公開する個人運営の非公式サイト「ウマ娘 レース攻略メモ」である。新規ページ作成や改修では、この方針・構造・デザインを優先する。

## 基本方針

- 軽量な静的HTML/CSS/Jekyllで作る。フォーム、会員機能、広告、アクセス解析、Cookie、独自APIは追加しない。
- 日本語ページとして作り、`<html lang="ja">` を使う。
- 公開サイトとしてSEO、アクセシビリティ、引用元導線、非公式表記を必ず入れる。
- CSSは既存の `assets/css/home.css` と `assets/css/guide.css` に合わせ、新しい見た目や大きな抽象化を増やさない。
- デザインは明るい攻略メモ調。カード、表、バッジ、コールアウト、ページ内ナビでスキャンしやすくする。
- UI文言は短く具体的にする。

## Git管理とローカル作業ファイル

- GitHubに上げるのは、公開サイトに必要なHTML、CSS、Jekyll layout/include/data、画像、検証スクリプト、README、AGENTS.mdだけにする。
- 計画書、設計書、調査メモ、実装メモ、レビュー用メモなどの補助ファイルはGitHubに上げない。
- `docs/` と `.codex-local/` はGit管理外。新しい補助フォルダが必要なら、作成前に `.gitignore` へ追加し、`git ls-files <path>` で未追跡を確認する。
- 追跡済みの補助ファイルを見つけたら、実ファイルを残して `git rm --cached` で外す。

## 共通公開要件

各HTMLまたは共通head生成では以下を満たす。

- `meta charset="utf-8"`、viewport、ページ固有の `title` / `description`、`theme-color`
- canonical、OG title/description/type/url、`og:site_name` は `ウマ娘 レース攻略メモ`
- `twitter:card` は `summary`
- favicon はルート相対の `assets/favicon.svg`
- ガイド記事は可能な限り `article:published_time` と `article:modified_time`
- 外部リンクで `target="_blank"` を使う場合は必ず `rel="noopener noreferrer"`

画像を使う場合は、理解補助に必要な範囲にとどめる。`alt` を入れ、画像付近または情報源欄に引用元リンクを置き、サイト名・URL・確認日を残す。主な画像引用元は `GameTora Support Card DB`。詳細メモはGit管理外の `.codex-local/image-usage.md`。

## Jekyll Collection 運用

このサイトは GitHub Pages 標準のJekyllでビルドする。公開記事の実体は必ず `guides/<event>/<slug>/index.html` に置く。`_race/` などcollectionだけに置くと公開URLが404になるため使わない。collectionは将来の一覧生成補助としてのみ扱う。

### collections

- `race`: LoH、チャンピオンズミーティング、対戦イベント向けレース攻略
- `training`: 育成シナリオ、育成方針、ステータス目安
- `support`: サポートカード評価、本育成枠、因子周回枠
- `factor`: 継承親、白因子、ローテーション、相性周回
- `course`: レース場、距離、コース形状、有効加速

### front matter

ガイドページには最低限これを入れる。

```yaml
---
layout: guide
css: guide
title: "2026年5月LoH短距離 京都芝1200m攻略"
description: "..."
date: 2026-04-29
modified: 2026-04-29
tags: [loh, short-distance, kyoto, turf, 2026-05]
event: loh
category: race
status: published
permalink: /guides/loh/2026-05-kyoto-1200/
sources:
  - key: gametora-supports
  - name: "神ゲー攻略"
    url: https://kamigame.jp/...
    note: "コース解説確認"
---
```

- `layout: guide`、`css: guide`、`title`、`description`、`date`、`category`、`permalink` は必須。
- `permalink` は公開URLと一致させる。
- `category` は一覧表示に使う。レース攻略は `race`、育成は `training`、サポカは `support`、因子は `factor`、コースは `course`。
- `status: draft` は一覧やトップから除外する。
- `hero_image` / `hero_cards` を使う場合は引用元を必ず入れる。
- front matterファイルはUTF-8 BOMなし。日本語ファイル編集後は `scripts/validate_jekyll_structure.ps1` でBOM禁止チェックを通す。

### layout / include

- `_layouts/default.html`: 汎用ページ
- `_layouts/home.html`: トップページ
- `_layouts/guide.html`: 攻略記事。ヒーロー、出典、giscus、フッターを自動挿入
- `_layouts/category-list.html`: `race/` などカテゴリトップ
- `_layouts/tag-index.html`: `/tags/`
- `_includes/head.html`: meta、OG、canonical、favicon、CSS
- `_includes/footer.html`: ガイド共通フッター
- `_includes/giscus.html`: コメント欄
- `_includes/share-links.html`: SNS共有リンク
- `_includes/sources.html`: `page.sources` 駆動の情報源欄
- `_includes/tags.html`: タグバッジ列
- `_includes/card-summary.html`、`card-style.html`、`card-support.html`、`callout.html`、`badge.html`、`source-card.html`: 本文部品

### 一覧・タグ・出典

- トップ、カテゴリ一覧、タグ一覧は `site.pages` から `layout: guide` の通常ページを拾う。`site.race` などcollectionだけを一覧ソースにしない。
- カテゴリ一覧は `category` front matter で絞り込む。
- タグslugは英小文字、数字、ハイフンを基本にし、必要に応じて `_data/tags.yml` に `label` と `description` を追加する。未登録タグはslug表示。
- 共通参照先は `_data/sources.yml` の `key` を優先する。直接記述する場合は `name`、`url`、`note` を必須にする。
- 画像引用元は画像付近のリンクと `sources` の両方で辿れるようにする。

## トップページ

`index.html` と `assets/css/home.css` を使い、現在の構造を基準にする。

- `skip-link`: `<a class="skip-link" href="#main">本文へスキップ</a>`
- `<main class="page" id="main">`
- `.hero`: `.hero-inner`、`.eyebrow`、`h1`、`.lead`、`.hero-tags`。背景画像がある場合は `.image-credit`
- 攻略ページ一覧: `.section`、`.guide-list`、`.guide-card`、`.button`
- 公式リンク: `.link-grid`、`.link-card.official`
- 攻略サイトリンク: `.link-grid`、`.link-card.strategy`
- このサイトについて: `.notice` に非公式、権利元と無関係、AI利用、確認時点の攻略メモ、最終更新日を書く

## ガイドページ

`guides/<event>/<slug>/index.html` と `assets/css/guide.css` を使い、現在の `guides/loh/2026-05-kyoto-1200/index.html` を基準にする。

- `skip-link`: `<a class="skip-link" href="#main">本文へスキップ</a>`
- `<main class="page" id="top">`
- `.page-actions.page-actions-top`: トップページへ戻る
- `.hero#main`: `.hero-inner`、`.eyebrow`、`h1`、`.lead`、`.tags`、`.tag`。画像ありなら `.hero-deck`、`.hero-card`、`.image-source`
- `.blog-nav`: 基本項目は `結論`、`コース`、`脚質`、`サポカ`、`因子`、`ローテ`、`情報源`
- 結論: `.summary-grid` と `.summary-card` を3つ程度。必須条件、推奨編成・方針、育成や因子の大枠を短くまとめる
- コース条件: `.two-column`、表、`.callout`、`.mini-source`。距離、バ場、向き、季節、レース場、コース形状、終盤開始、有効緑スキル、有効加速地点を整理する
- 脚質別攻略: `.style-grid` と `.style-card`。逃げ、先行、差し、追込の評価、立ち回り、重要スキル、安定度、注意点を書く
- サポートカード: `.callout`、必要なら `.card-gallery`、`.card-tile`、`.support-grid`、`.support-card`。本育成の軸、脚質別スキル枠、最新カード/新情報枠、因子周回用に分ける
- 攻略本文: 表、`.badge`、`.callout`、`.stat-grid`、`.skill-priority` を使い、因子周回、ローテーション、チェックリスト、ステータス目安、スキル優先度を必要に応じて整理する
- 情報源: `<section class="section" id="sources">`、`.sources`、`.source-card`。コース条件、因子、サポカ、スキル、公式発表、画像引用元を分け、各カードに確認内容を1文で書く
- コメント: 情報源の後、フッターの前に `<section class="section" id="comments" aria-labelledby="comments-heading">` を置き、見出しは `コメント`
- フッター: トップへ戻る、ページ上部へ戻る、最新情報は公式・ゲーム内告知・参照元も確認する旨、非公式、権利元と無関係、AI利用、最終更新日

## コメントとSNS共有

- ガイドページのコメント欄は `giscus` を使い、GitHub Discussionsに保存する。独自投稿フォーム、DB、会員機能、コメント保存APIは追加しない。
- コメントは記事ごとに分けるため `data-mapping="pathname"` を維持する。
- giscus設定は既存の `data-repo`、`data-repo-id`、`data-category`、`data-category-id`、`data-input-position="top"`、`data-theme="preferred_color_scheme"`、`data-lang="ja"` を維持する。
- SNS共有リンクは `_includes/share-links.html` を使い、`home`、`default`、`guide` layoutから自動挿入する。本文へ重複して書かない。
- 共有URLは `page.url | absolute_url`、共有文は `page.title | default: site.title`。共有先はX、LINE、Facebook、ページURLを基本にする。
- 共有不要ページは front matter に `share: false` を入れる。現在は404ページで使う。

## CSSとデザイン

- 新規CSSを作る前に既存クラスを再利用する。
- `:focus-visible` とスキップリンクを維持する。
- モバイルでは1カラムに落とし、表は `data-label` で読める形にする。
- `badge`、`callout`、`summary-card`、`style-card`、`support-card` の色分けは既存の意味に合わせる。
- テキストやリンクが画像上で読めない場合は、背景色や影で可読性を優先する。

## 新規ページ作成

```powershell
New-Item -ItemType Directory -Force -Path guides/<event>/<slug>
Copy-Item templates/race-guide.html guides/<event>/<slug>/index.html
```

front matterを書き換え、本文の標準セクションを埋める。新カテゴリを追加する場合は `_config.yml` の `collections` と `defaults`、`<category>/index.html`、必要なら `templates/<category>-guide.html`、このAGENTS.mdを更新する。

## 確認チェックリスト

変更後は最低限これを確認する。

- `git diff --check`
- `git status --short`
- `powershell -ExecutionPolicy Bypass -File scripts/validate_jekyll_structure.ps1`
- `.codex-local/` と `docs/` がGit管理対象になっていないこと
- 生成HTMLに canonical、OG、favicon、description があること
- ガイドページの生成HTMLに `/assets/css/guide.css` が含まれ、URLが404ではなく、YAML front matterが本文に表示されていないこと
- 外部リンク `target="_blank"` に `rel="noopener noreferrer"` があること
- 画像に `alt` と引用元リンクがあること
- 必要に応じて `robots.txt` のSitemap URLと `jekyll-sitemap` の自動生成対象
- ブラウザまたはローカルHTTPサーバーでトップ、追加ページ、404の表示
