'use strict';
(function() {
  var font, s;
  font = document.createElement('link');
  font.type = 'text/css'; 
  font.rel = 'stylesheet';
  font.href = 'https://fonts.googleapis.com/css?family=Montserrat:300,400,500|PT+Serif:400,400i';
  s = document.getElementsByTagName('link')[0]; 
  s.parentNode.insertBefore(font, s);
})();

(function copyToClipboard() {
  // var blocks = document.getElementsByClassName('.highlight');
  // console.log(blocks);
  // blocks.map((block) => {
  //   console.log(block);
  //   block.select();
  //   document.execCommand("Copy");
  //   alert("Copied the text: " + block.value);
  // });
})();

(function() {
  $('h3.pretty').on('click', function() {
    $(this).next().toggleClass('opens');
    $(this).children().toggleClass('fa-caret-down').toggleClass('fa-caret-right');
  });
})();

(function year(){
  var $date = new Date();
  var $year = $date.getFullYear();
  $('footer .year').text($year);
})();

(function autoResizeTextField() {
  let textarea = document.querySelector('textarea');
  textarea ? autosize(textarea) : false;
})();


(function contactForm() {
  let widget = `
  <div class = 'form_action'>
    <div class = 'feedback'>
      <div class = 'spinner'></div>
    </div>
  </div>`;

  let form = $('.form');

  function removeWidget() {
    $('body').find('.form_action').remove();
    document.querySelector('.form').reset();
  }

  function handleForm(message)  {
    function showMessage() {
      $('.form_action').html(message);
      setTimeout(removeWidget, 2700);
    }
    setTimeout(showMessage, 1500); 
  }

  form.submit(function(e){
    let f_name = document.querySelector('.contact-name').value.toUpperCase();
    let messages = {
      success: `
        <div class = 'feedback'>
          <h5 class = 'golden'>Thank you for contacting us ${f_name} </h5>
          <p class = 'pale'>We'll get back to you asap.</p>
        </div>
      `,
      error: `
        <div class = 'feedback'>
         <h5>Oops!</h5>
         <p class = 'pale'>There was an error. please try again.</p>
        </div>
      `
    };

    e.preventDefault();
    var href = $(this).attr("action");
    
    $.ajax({
        type: "POST",
        dataType: "json",
        url: href,
        data: $(this).serialize(),
        beforeSend: function() {
          $('body').append(widget);
        },
        success: function(data) {
          handleForm(messages.success);
        },
        error: function(err) {
          handleForm(messages.error); 
        }
    });
  });
})();
