class PostsController < ApplicationController

  def index
    @posts = Post.order(id: "DESC")
  end

  # def new
  # end

  def create
    post = Post.create(content: params[:content])
      # フォームから入力された値はparamsに入っているので、変数postに格納しておく。

    # ▼は"レスポンスはHTML"だと指定している。今回は非同期通信なので、コメントアウトする
    # redirect_to action: :index

    # 非同期通信のレスポンスはJSON形式なので, renderメソッドを使ってJSONに変更する。
    render json:{ post: post }
      # render json:{ キー名: 変数名 }
      # jsonオプションを用いると、{}内のキーとバリューをセットにして、json形式でレスポンスしてくれる。

  end
end
