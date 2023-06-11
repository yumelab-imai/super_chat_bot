# はじめに
ある日、エンジニアの方と話しているなかで、「WebサイトにChat GPTを使ったチャットボットを導入すれば便利だろう」というアイデアが浮かびました。それを聞いて、学習を兼ねて自分でチャットボットを作ってみようと決心しました。初めの段階では、自作によるチャットボットの開発に取り組んでいました。しかし、「DocsBot AI」という既存のサービスを利用することで、自分で一から作るよりもはるかに簡単に、かつ高品質なチャットボットを作れるのでは？と思い、その後は「DocsBot AI」を使用してチャットボットアプリを作成していきました。

その結果として生み出されたのが、東京都内のキャンプ場について様々な質問に答えてくれるチャットボットです。情報源として、「なっぷ」というキャンプ場の情報が豊富に掲載されているウェブサイトから66件のデータを使用し、それを学習させました。
今回は、その時の体験と学びを共有できればと思います。



また、作成したチャットボットは外部公開していますので、よければ実際に使用感を試してみていただければと思います。自作と「DocsBot AI」のチャットボットの違いがよくわかります💦

https://super-chat-bot.vercel.app/

Github

https://github.com/Masanarea/super_chat_bot

# チャットボット: 自作編
![Videotogif (1).gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/2980785/96dbfcda-13d5-f0b1-e824-7e5dd7017812.gif)

作成にあたって、

https://zenn.dev/rorisutarou/articles/6f21450ea34cc3

の記事を参考にさせていただきました。
※9割ぐらいそのままですが、記述の不足やカスタマイズも多少は行いました。

車輪の再発明はしていないこともあり、時間的には2~3時間ほどでプロトタイプが完成しました。
その割には非常に良い感じに動いていて、デザイン面も（個人的には）素晴らしいので割とこの段階では満足していました。



# チャットボット: DocsBot AI 編
![Videotogif (3).gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/2980785/6e6c9a3e-77ca-e429-9c52-e67790812e86.gif)

しかし、次の段階として自作のチャットボットをより汎用的に、また便利に、そしてモーダル形式にしたいと思ったとき、現状のものでは不十分だと感じました。そのため、YouTubeでさまざまなチャットボット関連の情報を調査していたところ、『DocsBot AI』というサービスを知りました。


『DocsBot AI』に関して、簡単に説明すると、
* ChatGPTをカスタマイズして、独自のChatGPTを作るサービス
* PHPやJavascriptに対応していて、ドキュメントもある
* データを学習させられる
* 楽に直感的に使える
* 無料プランでも十分使える

ざっくりとですがこんな感じです。
特にドキュメントがあることに加えて、データを学習させられる点が優れているのではないかと思います。というのも、Open API　を使用して『ウェブブラウジング機能』を利用することは現状できないと思うので、2019年9月以降のデータに基づいて『Chat GPT』に色々やってもらいたいなという場合、相当難しいのではと思うからです。

※ちなみに チャットボット形式だけでなく、APIとしての利用も可能なのでチャットボットに限らずともいろいろな場面で利用できる可能性があります。

また、基本的に『DocsBot AI』側でデータを学習させたり、文章の準備をしますが、割と簡単でした。それに加えて、学習データの数を例えば6件から60件に増やした時にレスポンスの速さに違いが見られないところも良かったなと感じました。


#  『DocsBot AI』側での準備
こちらは割愛します。下記リンクを参考にしていただければ問題なくできると思われます。


https://saasis.jp/2023/03/20/%E3%80%90chatgpt%E9%AD%94%E6%94%B9%E9%80%A0%E3%80%91docsbot%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6%E3%81%BF%E3%81%9F%E3%80%90%E3%83%8F%E3%83%B3%E3%82%BA%E3%82%AA%E3%83%B3%E3%81%A7%E5%BE%B9%E5%BA%95/


# DocsBot AI をアプリに組み込む

色々方法はありますが今回は 『HTML・JavaScript形式』、　『TypeScriptとNext.js』 の2つの場合でどのように実装するかを簡単にまとめます。
※ 今回は、チャット ウィジェット(チャットのモーダル機能)を実装する方法のみまとめていきます。そのほかはドキュメントをご参照ください。


### HTML形式

```javascript
<script type="text/javascript">window.DocsBotAI=window.DocsBotAI||{},DocsBotAI.init=function(c){return new Promise(function(e,o){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src="https://widget.docsbot.ai/chat.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n),t.addEventListener("load",function(){window.DocsBotAI.mount({id:c.id,supportCallback:c.supportCallback,identify:c.identify});var t;t=function(n){return new Promise(function(e){if(document.querySelector(n))return e(document.querySelector(n));var o=new MutationObserver(function(t){document.querySelector(n)&&(e(document.querySelector(n)),o.disconnect())});o.observe(document.body,{childList:!0,subtree:!0})})},t&&t("#docsbotai-root").then(e).catch(o)}),t.addEventListener("error",function(t){o(t.message)})})};</script>
<script type="text/javascript">
    DocsBotAI.init({id: "YOUR_ID_HERE"});
</script>
```
簡単ですね...🤔

### TypeScript と　Next.js
```javascript
useEffect(() => {
    window.DocsBotAI = window.DocsBotAI || {}
    window.DocsBotAI.init = function (c) {
      return new Promise(function (e, o) {
        const t = document.createElement('script')
        t.type = 'text/javascript'
        t.async = true
        t.src = 'https://widget.docsbot.ai/chat.js'
        const n = document.getElementsByTagName('script')[0]
        if (n && n.parentNode) {
          n.parentNode.insertBefore(t, n)
        }
        t.addEventListener('load', function () {
          window.DocsBotAI.mount({
            id: c.id,
            supportCallback: c.supportCallback,
            identify: c.identify,
          })
          const t = function (n) {
            return new Promise(function (e) {
              if (document.querySelector(n)) return e(document.querySelector(n))
              const o = new MutationObserver(function (t) {
                if (document.querySelector(n)) {
                  e(document.querySelector(n))
                  o.disconnect()
                }
              })
              o.observe(document.body, { childList: true, subtree: true })
            })
          }
          if (t) t('#docsbotai-root').then(e).catch(o)
        })
        t.addEventListener('error', function (t) {
          o(t.message)
        })
      })
    }
    window.DocsBotAI.init({ id: process.env.NEXT_PUBLIC_DOCSBOT_ID })
  }, [])
```

自身の場合、TypeScript と　Next.jsを使用して作成し、それを Vercel にデプロイした感じです。
こちらは参考文献が見つからなかったので、useEffect部分をいじって実装しました。
同じように React 関連で実装したいと考えている人にとっては参考になるかと思います。


### DocsBot AI ドキュメント

https://docsbot.ai/docs/embeddable-chat-widget


# 対象データを学習させる

そんなに難しくないので簡単に説明します。

色々方法はあるのですが、以下のデータのいずれかを用意してセットするだけです。

![スクリーンショット 2023-06-11 14.24.00.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/2980785/2ebbf701-19ea-8e26-f830-8af55823793f.png)



* URL
* Document
* WordPress XML
* Sitemap
* CSV
* RSS Feed
* ~~Youtube (Coming soon)~~ 


無料プランの場合、『URL』と『Document』のみ選択できます。
無料枠でもURLを１つ１つ貼り付けていくことで全然行けますが、自身の場合、作業が面倒だったので課金してGoogleスプレッドシートに学習させたいURLデータ60個分を『URL　リスト』で一括で学習させました。

![スクリーンショット 2023-06-11 14.25.12.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/2980785/67405946-7c37-f552-dbf6-77ec6561b0c6.png)


![スクリーンショット 2023-06-11 14.23.38.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/2980785/31fb8ae9-17d2-49ca-cd6a-6a9a123d34fb.png)


# その他の便利機能

ログが便利です。
4件以上の閲覧には課金が必要になってきますが、自身で作成するとなるとめんどくさそうです💦

![スクリーンショット 2023-06-11 14.30.38.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/2980785/c7228c70-c41e-043f-6ace-17b3ad212031.png)

# 終わりに
今に限った話ではありませんが、最近はさまざまな便利なサービスが次々と登場していて、便利なのに未だ知れていないサービスも多いのではないかなと感じています。全てを把握するのは難しいかもしれませんが、自分にとって必要なものに焦点を当てて、キャッチアップすることで、より良いサービスが作れるようになっていけたらなと思います。
今回は以上です。
