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

  $('.form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this)
    let url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('form')[0].reset();  
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました"); 
    })
    .always(function(){
      $('.submit-btn').prop("disabled", false); 
    });
  });
});