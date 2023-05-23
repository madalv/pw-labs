from flask import Flask, request
import requests
import os
from dotenv import load_dotenv

load_dotenv()

key = os.getenv("TG_KEY")
news_key = os.getenv("NEWS_KEY")
news_url = os.getenv("NEWS_URL")
webhook_url = os.getenv("WEBHOOK_URL")

app = Flask(__name__)

def get_news(topic):
    querystring = {
        "api-key": news_key} if topic == "" else {"api-key": news_key, "q": topic}
    response = requests.get(news_url, params=querystring)
    data = response.json()
    print(data["response"]["docs"][0])
    return data["response"]["docs"]


def sendmessage(chatid, text):
    url = "https://api.telegram.org/bot{}/sendMessage".format(key)
    payload = {
        "text": text,
        "chat_id": chatid
    }

    requests.get(url, params=payload)


@app.route("/", methods=["POST", "GET"])
def index():
    if (request.method == "POST"):

        resp = request.get_json()
        msgtext = resp["message"]["text"]
        chatid = resp["message"]["chat"]["id"]

        split = msgtext.split()

        print(split)

        if (split[0] == '/start'):
            sendmessage(chatid, "Hello.")
        elif (split[0] == '/latest_news'):
            news = get_news(msgtext.split()[1])
            for i in range(5):
                sendmessage(chatid, news[i]["web_url"])
        else:
            sendmessage(chatid, "Type /latest_news for the latest news.")

        return "Done"
    else:
        return "get"


@app.route("/setwebhook/")
def setwebhook():
    s = requests.get(
        "https://api.telegram.org/bot{}/setWebhook?url={}".format(key, webhook_url))

    print(s)

    if s:
        return "yes"
    else:
        return "fail"


if __name__ == "__main__":
    app.run(debug=True)
