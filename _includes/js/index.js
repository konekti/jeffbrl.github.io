'use strict';
(function() {
  var font, s;
  font = document.createElement('link');
  font.type = 'text/css'; 
  font.rel = 'stylesheet';
  font.href = 'https://fonts.googleapis.com/css?family=Open+Sans:400,400i|Poppins:300,400,500,600,700';
  s = document.getElementsByTagName('link')[0]; 
  s.parentNode.insertBefore(font, s);
})();

(function() {
  $('h3.pretty').on('click', function() {
    $(this).next().toggleClass('opens');
    $(this).children().toggleClass('fa-caret-down').toggleClass('fa-caret-right');
  });
})();

(function() {
    var mailForm, subForm, mailFail, mailSuccess, notify, guest;
    mailSuccess = `
      <div class = "confirm">
        <h2>Hey ${guest}!</h2>
        <div class = 'big-icon  success'><i class = 'fa fa-cool'></i></div>
        <p>Success</p>
      </div>
    `;
    mailFail = `
      <div class = "confirm">
      <div class = 'success'><i class = 'fa fa-cool'></i></div>
        <h2 class = 'error'>Yikes! There was problem.</h2>
        <p>Please refrsh and try again.</p>
      </div>
    `;
    mailForm = $('#enquire');
    notify = `
      <h2>Sending</h2>
      <span class = 'spinner'></span>
    `;
    widget = $('.fwidget');
    mailForm.submit(function(e) {
      guest = document.getElementById('name').value.toUpperCase();
      $('body').append('.fwidget');
      e.preventDefault();
      if(guest){
        $.ajax({
          url: '//formspree.io/{{site.email}}',
          method: 'POST',
          data: $(this).serialize(),
          dataType: 'json',
          beforeSend: function() {
            widget.html(notify);
          },
          success: function(data) {
            widget.html(mailSuccess);
          },
          error: function(err) {
            widget.html(mailFail);
          }
        });
      }
    });
})();
