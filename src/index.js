// index.js

async function startOrder(context) {
  const { user } = context.session;

  // 設定為開團 state
  context.setState({
    ordering: true,
    host: user,
  });

  await context.sendText(`${user.displayName} 開團囉! 大家快來點!`);
}

async function order(context) {
  const { displayName } = context.session.user;
  const [, item] = context.event.text.match(/^我也?要點?(.*)/);

  // 把訂單塞進 state 的 orders 中
  context.setState({
    orders: [
      ...context.state.orders,
      {
        name: displayName,
        order: item.trim(),
      },
    ],
  });

  await context.sendText(`我知道 ${displayName} 你點的是 ${item}`);
}

async function cutOff(context) {
  await context.sendText('截止囉!');

  // 因為怕這個地方寫太多會搞錯重點
  // 這邊就請各位自己想想看要怎麼把 orders 用好看的格式印出來吧，
  await context.sendText(`訂單：${context.state.orders}....`);

  // 把 state 重設
  context.resetState();
}

// 沒開團的狀態下，輸入「開團」可以開團
function 處理未開團指令(context) {
  if (context.event.text === '開團') {
    return startOrder;
  }
}

// 已開團的狀態下，有兩種指令可以用
function 處理開團中指令(context) {
  const { text } = context.event.text;
  if (/^我也?要點?(.*)/.test(text)) {
    return order;
  }
  if (text === '截止') {
    return cutOff;
  }
}

// 按照 state 決定現在的狀態要用哪個子 function
module.exports = async function App(context) {
  if (context.state.ordering) {
    return 處理開團中指令;
  }

  return 處理未開團指令;
};
