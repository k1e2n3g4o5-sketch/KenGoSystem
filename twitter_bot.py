import tweepy
import time
import random

# Twitter API認証情報（実際のキーに置き換えてね）
API_KEY = "your_api_key"
API_SECRET = "your_api_secret"
ACCESS_TOKEN = "your_access_token"
ACCESS_SECRET = "your_access_secret"

# 認証
auth = tweepy.OAuthHandler(API_KEY, API_SECRET)
auth.set_access_token(ACCESS_TOKEN, ACCESS_SECRET)
api = tweepy.API(auth)

# 投稿メッセージリスト
messages = [
    "⚡ あなたは時間に縛られていますか？Beyond Time で無料診断してみよう！\nhttps://ken-go-system.vercel.app/beyond-time.html\n#時間診断 #自己分析 #AI診断",
    
    "🌀 3つのパラレルワールドを見てみませんか？量子診断で「もしも」の世界を体験！\nhttps://ken-go-system.vercel.app/beyond-time.html\n#パラレルワールド #量子診断 #BeyondTime",
    
    "🎆 過去・現在・未来。あなたはどの時間軸に生きていますか？Beyond Time で診断してみよう！\nhttps://ken-go-system.vercel.app/beyond-time.html\n#時間管理 #心理診断 #自己理解",
    
    "⚡ Claude や Gemini と連携！AI が教えてくれる、あなただけの時間軸分析。\nhttps://ken-go-system.vercel.app/beyond-time.html\n#AI #Claude #Gemini #診断",
    
    "🌍 今、127人が診断中！あなたも参加して、自分の時間軸を知ろう！\nhttps://ken-go-system.vercel.app/beyond-time.html\n#BeyondTime #時間診断 #自己分析"
]

def post_tweet():
    """ランダムなメッセージをツイート"""
    try:
        message = random.choice(messages)
        api.update_status(message)
        print(f"✅ ツイート成功: {message[:50]}...")
    except Exception as e:
        print(f"❌ エラー: {e}")

def auto_tweet_loop():
    """2時間ごとに自動ツイート"""
    while True:
        post_tweet()
        # 2時間（7200秒）待機
        time.sleep(7200)

if __name__ == "__main__":
    print("🤖 Twitter Bot 起動！")
    auto_tweet_loop()