from flask import Flask,request
import requests
import sys

key = "6103168544:AAFRuElMAnClGeqQ6KhIvMgCbNZ29xMYtCE"

app = Flask(__name__)

def sendmessage(chatid):
    url = "https://api.telegram.org/bot{}/sendMessage".format(key)
    payload = {
        "text":"heyy",
        "chat_id":chatid
        }
    
    resp = requests.get(url,params=payload)

@app.route("/",methods=["POST","GET"])
def index():
    if(request.method == "POST"):
       
        resp = request.get_json()
        msgtext = resp["message"]["text"]
        sendername = resp["message"]["from"]["first_name"]
        chatid = resp["message"]["chat"]["id"]
        sendmessage(chatid)
        return "Done"
    else:
        return "hi"

@app.route("/setwebhook/")
def setwebhook():
    url = "https://4b31-109-185-158-95.ngrok-free.app"
    s = requests.get("https://api.telegram.org/bot{}/setWebhook?url={}".format(key,url))
    
    print(s)

    if s:
        return "yes"
    else:
        return "fail"
        
if __name__ == "__main__":
    app.run(debug=True)