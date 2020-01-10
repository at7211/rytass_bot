const { router, text } = require('bottender/router');
const startOrder = require('./startOrder');

function howToUse(context) {
  context.postMessage({
    "blocks": [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "> *指令大全*:ghost:\n>專案進度<https://github.com/at7211/rytass_bot|在此>，歡迎幫忙抓 :bug: 或開發新功能，有任何建議或想做的功能也可以直接跟我說:man-bowing:"
      }
    },
    {
      "type": "divider"
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "*點餐指令*"
      }
    },
    {
      "type": "section",
      "fields": [
        {
          "type": "mrkdwn",
          "text": "*開團：*\n請輸入『開團』"
        },
        {
          "type": "mrkdwn",
          "text": "*截止：*\n請輸入『截止』或『收』"
        },
        {
          "type": "mrkdwn",
          "text": "*下訂單：*\n請輸入『我要點 XXX 000』"
        },
        {
          "type": "mrkdwn",
          "text": "*取消：*\n請輸入『我要取消』"
        },
      ]
    },
    {
      "type": "divider"
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "示範時間：\n1.『我要點淡水阿給*2 咖啡牛奶不加牛奶』 _->空格分開點的東西_\n2. 『我也要淡水阿給』 _-> 這樣就會追加一份 嗯（名字要一樣喔）_\n3. 『我要珍奶 微微』 _-> 飲料要客製化甜度冰度就空格加在後面_"
      }
    }
  ]});
}

module.exports = async () => {
  return router([
    text(/(怎麼?|如何)(使用|用|操作|點|開團|指令)/, howToUse),
    text(/^開團/, startOrder),
  ]);
};
