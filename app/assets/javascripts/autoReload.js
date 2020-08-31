$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="chat-box__top" data-message-id=${message.id}>
            <div class="chat-name">
              ${message.user_name}
            </div>
            <div class="chat-date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-box__message">
            <p class="message.content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
       `<div class="chat-box__top" data-message-id=${message.id}>
          <div class="chat-name">
            ${message.user_name}
          </div>
          <div class="chat-date">
            ${message.created_at}
          </div>
        </div>
        <div class="chat-box__message">
          <p class="message.content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    }; 
  }
  
  let reloadMessages = function() {
    let last_message_id = $('.chat-box__top:last').data("message-id") || 0;
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat-main__message-list').append(insertHTML);
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});