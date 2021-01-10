var request = require("request");
require("request").debug = true;

exports.handler = function (event, context, callback) {
  var cb = function (data) {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Accept-Encoding": "gzip",
      },
    });
  };

  var data = JSON.parse(event.body);

  if (data.sneakypizza) return;

  if (!data.email) {
    return cb({ error: "missing email parameter" });
  }

  const formData = JSON.stringify({
    text: ":mailbox_with_mail:  Incoming invite request",
    attachments: [
      {
        text: `Hey, *${data.name}* is requesting an invite, send it?
        Their email is: ${data.email},
        They heard about us from: ${data.reason}`,
        fallback: "Uh oh, something went wrong, blame Dan",
        callback_id: "invite_response",
        color: "#3AA3E3",
        attachment_type: "default",
        actions: [
          {
            name: "send_invite",
            text: ":ok_woman: Send their invite",
            type: "button",
            style: "primary",
            value: `${data.email}`,
          },
          {
            name: "deny_invite",
            text: ":party-banhammer: Deny Invite",
            type: "button",
            style: "plain_text",
            value: `${data.email}`,
          },
        ],
      },
    ],
  });

  request.post(
    {
      url:
        "https://hooks.slack.com/services/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",
      form: formData,
    },
    function (httpResponse, body) {
      console.log("http", httpResponse);
      console.log("body", body);

      if (body !== "ok") {
        return cb({ body: body, httpResponse: httpResponse });
      }
      cb(JSON.parse(body));
    }
  );
};
