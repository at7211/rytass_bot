const members = require('../constant/members');

module.exports = async context => {
  const { host } = context.state;
  const userId = context.session.user.id;

  if (host === userId) {
    await context.postMessage('截止囉!');

    const memberIndex = members.findIndex(member => member.id === userId);

    const orders = context.state.orders
      .reduce((accum, curr) => {
        const index = accum.length ? (accum.findIndex(
          o => o.order === curr.order && o.type === curr.typed
        )) : -1;

        if (!~index)
          return [
            ...accum,
            {
              order: curr.order,
              type: curr.type,
              count: curr.count,
            },
          ];

        return [
          ...accum.slice(0, index - 1),
          {
            order: context.state.orders[index].order,
            type: context.state.orders[index].type,
            count: context.state.orders[index].count + curr.count,
          },
        ];
      }, [])
      .map(item => {
        const counts = item.count > 1 ? `* ${item.count}` : '';
        const type = item.type ? `(${item.type})` : '';

        return `- ${item.order} ${counts} ${type}`;
      })
      .join('\n');
    await context.postMessage(`訂單：\n${orders}`);

    if (!~memberIndex) {
      context.postMessage('痾......沒有開團者的付款資訊ＱＡＱ');
    } else {
      await context.postMessage({
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "以下是付款資訊"
            }
          },
          {
            "type": "divider"
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": `開團者: ${members[memberIndex].name}\nline-pay: ${members[memberIndex].payment.linePay}`
            }
          },
          {
            "type": "image",
            "title": {
              "type": "plain_text",
              "text": `${members[memberIndex].name}＿richartPay`,
              "emoji": true
            },
            "image_url": members[memberIndex].payment.rechartPay,
            "alt_text": "richart pay"
          },
          {
            "type": "image",
            "title": {
              "type": "plain_text",
              "text": `${members[memberIndex].name}＿luckyPay`,
              "emoji": true
            },
            "image_url": members[memberIndex].payment.luckyPay,
            "alt_text": "lucky pay"
          },
        ]
      });
    }

    await context.postMessage('大家記得要給錢喔>__<');

    context.resetState();
  } else {
    await context.postMessage('不是你開的團，不讓你截止(#`皿´)');
  }
};
