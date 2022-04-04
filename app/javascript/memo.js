const buildHTML = (XHR) => {
  // ❷ レスポンスの内容を確認する
  const item = XHR.response.post
    // XHR.response : JSONの中身を取り出せる。
    // XHR.response.post : サーバー側でjsonのキーをpostとしたことで、投稿内容(value)が取り出せた

  // ❸ レスポンスから、再描写するHTMLを生成する。
  const html = `
  <div class="post">
    <div class="post-date">
      投稿日時：${item.created_at}
    </div>
    <div class="post-content">
      ${item.content}
    </div>
  </div>`;
  return html;
}

function post (){
  // 投稿ボタンが押されたときに発火する。
  const submit = document.getElementById('submit')
  submit.addEventListener('click', (e) => {
  // addEventのclickを無効化し、リクエストの重複を防ぐ。
    e.preventDefault();
    // e : イベントオブジェクトといい、イベント発生時の情報をもつ。今回は"ボタンをクリックした"という情報をもつ。
    // preventDefault(e) : 引数のイベントを無効化する。今回は▲のeが入っているので、ボタンクリックを無効化。
    // クリック直後のブラウザからリクエスト送信を防ぐため。

  // フォームに入力されたデータを取得する
  // ❶ フォームの要素が入った、HTMLを取得
    const form = document.getElementById('form');

  // ❷ FormDataオブジェクトを用いて、フォームのデータを取得する。
    const formData = new FormData(form);
      // new FormDataでオブジェクトを生成、要素formのデータをformData変数に格納する。

  // ❸ 非同期通信を行うため、"リクエスト送信"の準備をする。
    const XHR = new XMLHttpRequest();
      // XMLHttpRequestオブジェクト : JSを用いてサーバとHTTP通信を行う時に利用する。
      // new XMLHttpRequestでオブジェクトを生成、変数XHRに格納する。

  // ❹ 非同期通信を行うため、"リクエスト内容"を指定する。
    XHR.open("POST","/posts",true)
      // openメソッド : XHRオブジェクトのメソッドで、以下の引数でリクエスト内容を指定する
      // XHR.open(HTTPメソッド, パス, 非同期通信かどうか)
      // ▲の場合は、HTTPメソッド"POST"で、/postsに対して非同期通信という意味

  // ❺ レスポンスのデータフォーマットを指定する
    XHR.responseType = "json"
      // responseType : レスポンスのデータ形式を指定する
      // json : 一般的なJSON(JavaScript Object Notation)形式を指定

  // ❻ フォームに入力された内容を、リクエストとしてサーバー側に送信する。
    XHR.send(formData)
      // sendメソッド : XHRオブジェクトのメソッドで、引数のデータをサーバに送信する。

  //////////////// ▲ここまではJSからサーバーサイドへ"リクエスト"を送るプロセス ////////////////

  //////////////// ▼ここからはサーバーサイドからJSへ"レスポンス"を受けるプロセス ////////////////
  // ❶ レスポンスの受信が成功したか判断
    XHR.onload = () => {
    // onloadプロパティ : レスポンスを正常に受信したとき呼び出されるプロパティ
    // 通信が失敗(XHR.statusが成功の200以外だったとき)
    if (XHR.status != 200){
        alert(`Error ${XHR.status}: ${XHR.statusText}`)
        return null;
        // return nullによって、XHR.statusから抜け出す
      }

      const list = document.getElementById("list")
      const formText = document.getElementById("content");
        // 変数formTextにフォームの値を格納する

  // ❹ 生成したHTMLをブラウザに描画する
      list.insertAdjacentHTML("afterbegin", buildHTML(XHR));
      // 要素.insertAdjacentHTML(挿入したい位置,挿入したいHTML)
      // afterbegin : 要素内部の最初の子要素の直前

      formText.value = ""
      // 入力フォームを空にする
    };
  });
};

window.addEventListener('load', post);