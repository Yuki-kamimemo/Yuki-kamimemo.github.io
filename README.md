# ウマ娘 レース攻略メモ

ウマ娘のLoHやチャンピオンズミーティングなど、対戦レースに向けた情報を整理するための個人運営の非公式メモサイトです。

公開URL: https://yuki-kamimemo.github.io

## 構成

- `_race/`: LoHやチャンミなどのレース攻略記事。
- `_training/`: 育成シナリオや育成方針の記事。
- `_support/`: サポートカード関連の記事。
- `_factor/`: 因子周回関連の記事。
- `_course/`: コース条件や有効加速の記事。
- `_layouts/`: Jekyll共通レイアウト。
- `_includes/`: head、giscus、出典、タグなどの共通部品。
- `_data/`: タグ表示名と共通情報源。
- `templates/`: 新規記事作成用の雛形。公開対象外。

## ローカル確認

Ruby環境がある場合は以下で確認できます。

```powershell
bundle install
bundle exec jekyll serve
```

簡易構造チェックは以下です。

```powershell
powershell -ExecutionPolicy Bypass -File scripts/validate_jekyll_structure.ps1
```

掲載内容はAIも利用しながら作成しているため、最終的な確認はゲーム内のお知らせ、公式情報、各攻略サイトの最新情報もあわせて行ってください。
