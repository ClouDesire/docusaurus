setTimeout( function () {
  div = document.createElement("div");
  div.id = 'feedback-launcher';
  textNode = document.createTextNode('?');
  div.appendChild(textNode);
  document.body.appendChild(div);
  window.feedbackWidget.default(document.getElementById('feedback-launcher'), {
    "language": "en",
    "position": "top",
    "feedbackEndpoint" :"https://demo-backend.cloudesire.com/feedback/ticket",
    "categories": [
      "Generic tech support", "API"
    ]
  });
  console.log(div);
});