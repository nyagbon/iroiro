---
title: "アーカイブウィジェットを付けてみた"
date: 2021-08-13T17:15:22+09:00
slug: hugo-archives-widget
categories: [ Site ]
tags: [ Hugo ]
archives: [ 2021-08 ]
thumbnail: "img/calender_aseru_man.png"
#draft: true
---
右に縦に「最近の投稿」とか「カテゴリー」とか並んでますが、その中に「アーカイブ」というのを付けてみました。

ブログサイトでそこそこ見かける、年月ごとの記事数が表示されるエリアで、年月をクリックするとその年月に書かれた記事が一覧表示されるというお馴染みのアレです。

このサイトは [Hugo](https://gohugo.io/) という Static Site Generator を使って構築しているのですが、デフォルトではそのアレがついていませんでした。

で、ぐぐって探したところ、

- [Hugo - Taxonomyを使ってアーカイブページを作る](https://suihan74.github.io/posts/2020/01_20_00_hugo_taxonomies/)

というサイトが見つかったので、ほぼそのまま使わせていただきました。

しかし、よくよく考えると、「何年何月の記事を見たい！」ってあまり思わないよなぁ？

利点としては、自分が見て「この月は沢山書いてたな」とか「今月はあんま書けなかった。来月はもっと書こう」とか、反省のために使うのか…？ そんなブログの投稿数に命かけたくないのだが？？

あぁ、サイト見に来た人が、「ここのブログは更新頻度高い。あてになりそう」とか「ここは○年×月でやめちゃったのね…残念」とかそういうのが判断できるということか。

…ということで付けてみました。いや、なんか右側が寂しかったんだよってのもあるけどね。

## ホントは自分でコード書いてたんだが…(無念)

さて、こっからが本題っつーか、コーディングの話になるんですが、参考にしたサイトの方法だと、記事内にアーカイブの指定を埋め込む必要があるんです。つまり、これまでは

```markdown
---
title: タイトルほげほげ
date: 2021-08-13
---
本文ふがふが
```

と書けば良かったのを

```markdown
---
title: タイトルほげほげ
date: 2021-08-13
archives: [ 2021-08 ]   # ← こういうのを追加
---
本文ふがふが
```

と書かないといけなくなる。ただ、この行は記事の雛形ファイル `default.md` に

```markdown
archives: [ {{ dateFormat "2006-01" .Date }} ]
```

とか書いておけば自動生成される (元記事とはちょっと書き方変えてます) ので、いいっちゃいいんだけど、

> **なんや、`date:` に日付あるんやから余計なデータ足さんとも自動で引っ張ってこれるやろ！**

と思い、慣れない Hugo のテンプレートの書き方を調べ、試行錯誤してコーディングし、ようやく記事データから日付情報を取得してアーカイブウィジェットっぽく年月とその記事数を並べることが出来ました。

> **おお、やったぜ！**

…と思ったのもつかの間。

> **あれ？ そういえば、年月をクリックした先の記事一覧とかどうすんだろ…？**

そう、Hugo は "Static Site Generator" の名の通り、普通サーバ側で動かす MySQL とか PHP とかを全く使わず、「サイト内のすべてのファイルを予め生成」してくれて、「後は **おまえが** その全ファイルをウェブサーバに置いてね！」という仕組みなのです。

つまり、「年月をクリックした先の記事一覧」用のファイル全部を「Hugo が Generate してくれる必要がある」わけです。あるいは自前で生成するコードを書くとか。

**OMG!**

いやまぁ、たとえば [Hugo に全文検索を取り付けた](https://rs.luminousspice.com/hugo-site-search/) という方もいるので、Hugo をもっと調べればウェブサイトに必要な機能はほとんど Hugo でも実現できるとは思うんだけど、何より今回は

- クッソ分かりにくくてかつ融通の効かない [Hugo Template の言語仕様](https://gohugo.io/templates/)

に面食らって、

> **あー、もういいわー、とりあえずクッソ読みづらいし書きづらい Hugo Template の言語仕様分かっただけでひと儲けだわ―、今後何かに使えるし、あー、もういいわー**

と魂が抜けた状態になり、あり物のウィジェットをそのままパクることに…。この方法は Hugo の基本機能を応用した実現方法なので、自動的に一覧ファイルも生成してくれます。

…というわけで…疲れた… :weary::sweat_drops:

## 悔しいのでコードを貼る

最後に、せっかくなので今回作った「アーカイブウィジェットになるはずだった」コード

- 記事の `date` 情報から「年」と「年-月」で記事の数を集計し、それをリスト表示する

を載せときます (Hugo Template + HTML)。

供養のためにも、そして何より Hugo Template の **素晴らしい言語仕様** を学ぶことができた証として…

(´・ω・`）.;:…（´・ω...:.;::..（´・;::: .:.;: ｻﾗｻﾗ..

```html
{{- $pages := where .Site.RegularPages "Type" "in" .Site.Params.mainSections }}

{{- if $pages }}
  {{- $years := slice }}
  {{- $year_counts := dict }}
  {{- $year_month_counts := dict }}
  {{- range $pages }}
    {{- $year := dateFormat "2006" .Date }}
    {{- $month := dateFormat "01" .Date }}
    {{- $years = $years | append .Date.Year }}
    {{- $year_month := printf "%s-%s" $year $month }}
    {{/* year counts */}}
    {{- $current_counts := index $year_counts $year }}
    {{- if $current_counts }}
      {{- $year_counts = $year_counts | merge (dict $year (add $current_counts 1)) }}
    {{- else }}
      {{- $year_counts = $year_counts | merge (dict $year 1) }}
    {{- end }}
    {{/* year-month counts */}}
    {{- $current_counts := index $year_month_counts $year_month }}
    {{- if $current_counts }}
      {{- $year_month_counts = $year_month_counts | merge (dict $year_month (add $current_counts 1)) }}
    {{- else }}
      {{- $year_month_counts = $year_month_counts | merge (dict $year_month 1) }}
    {{- end }}
{{- end }}
<div class="widget-recent widget">
	<h4 class="widget__title">アーカイブ</h4>
	<div class="widget__content">
		<ul class="widget__list archives__list">
                        {{- range $year, $counts := $year_counts }}
			<li class="widget__item">
                          {{ $year }}
			  <span class="widget__counter widget__counter--bubble">{{ $counts }}</span>
                          <ul class="widget__list archives__list">
                          {{- range $year_month, $counts := $year_month_counts }}
                          {{- $ym := split $year_month "-" }}
                          {{- if eq $year (index $ym 0) }}
                          <li>{{ index $ym 1 }}
			    <span class="widget__counter widget__counter--bubble">{{ $counts }}</span>
                          </li>
                          {{- end }}
                          {{- end }}
                          </ul>
                        </li>
			{{- end }}
		</ul>
	</div>
</div>
{{- end }}
```

あばよ！
