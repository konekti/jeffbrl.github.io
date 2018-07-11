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

function resizeWindow() {
  window.open(this.href, 'mywin', 'left=20,top=20,width=500,height=500,toolbar=1,resizable=0'); return false;
}

function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

// jquery style
let elem = function(selector) {
  let doc = window.document;
  let el =  (typeof selector === 'string') ? doc.querySelector(selector) : false ;
  return el != null ? el : false;
}; 

let elems = function(selector) {
  let doc = window.document;
  let el =  (typeof selector === 'string') ? doc.querySelectorAll(selector) : false ;
  return el != null ? el : false;
};

(function autoFocusTextField() {
  let t = elem('.form-control');
  t ? t.autofocus = true : false;
})();

(function toggleMenu() {
  
  let menu = elem('.nav_menu');
  let overlay = elem('.header');
  let hamburger = elem('.nav_toggle');
  let links = elems('.nav_item');
  let childLinks = elems('.nav_child'); // check purpose in sass partial
  let childClass = 'nav_child';
  let close = 'nav_close';

  function modifyNavLinks() {
    links.forEach(function(link){
      let lClass = link.classList;
      lClass.contains(childClass) ? lClass.remove(childClass) : lClass.add(childClass);
    });
  }
  
  function menuStatus() {
    let menu__class = menu.classList;
    let overlay__class = overlay.classList;
    let x = 'nav_open';
    let y = 'nav_hide'
    let a = 'slab';
    let open = menu__class.contains(x);
    let closed = (menu__class.contains(y) || open === false) ? true : false;
    let status = [a, x, y, closed, menu__class, overlay__class];
    return status;
  }
  
  function closeMenu() {
    let s = menuStatus();
    s[4].add(s[2])
    s[4].remove(s[1]);
    s[5].remove(s[0]);
    hamburger.innerHTML = `&#9776;`;
    hamburger.classList.remove(close);
    modifyNavLinks();
  }
  
  function openMenu() {
    let s = menuStatus();
    s[4].add(s[1])
    s[4].remove(s[2]);
    s[5].add(s[0]);
    hamburger.innerHTML = `&#10006;`;
    hamburger.classList.add(close);
    modifyNavLinks();
  }
  
  function modifyMenu() {
    var z = menuStatus();
    let closed = z[3];
    closed ? openMenu() : closeMenu();
  }
  
  hamburger.addEventListener('click', function () {
    modifyMenu();
  });
  
  overlay.addEventListener('click', function(event) {
    event.target == this ? closeMenu() : false ;
  });
  
  childLinks.forEach((link) =>{
    link.addEventListener('click', function() {
      modifyMenu();
    });
  });
  
})();

(function smoothScroll() {
  // handle links with @href started with '#' only
  $(document).on('click', "a[href^='/#']", function(e) {
    // target element id
    let id = $(this).attr('href').replace('/', '');
    
    // target element
    let $id = $(id);
    if ($id.length === 0) {
      return;
    }
    
    e.preventDefault();
  
    // top position relative to the document
    let pos = $id.offset().top - 50;
    
    // animated top scrolling
    $('body, html').animate({scrollTop: pos});
  });
})();

(function showShareBar() {
  let share = elem('.mobile');
  let shareClass = share ? share.classList : false;
  let pos = elem('article').scrollTop + 600;
  // listen to scroll event
})();

(function showActiveLink() {
  let links = elems('.nav_item');
  links.forEach(function(link){
    link.addEventListener('click', function(){
      let active = 'nav_active';
      let activeLink = this;
      let myClass = activeLink.classList;
      myClass.contains(active) ? false : myClass.add(active);
      // get siblings
      let siblings = Array.from(activeLink.parentNode.children).filter(function(child){
        return child !== activeLink;
      }) 
      // remove active class on any sibling that contains such a class
      siblings.forEach(function(sibling, index) {
        let herClass = sibling.classList;
        herClass.contains(active) ? herClass.remove(active) : false;
      });
    });
  });
})();

(function modifyHeader(){
  function handleHeader() {
    let pos = $(window).scrollTop();
    pos > 250 ? $('.header').addClass('dark') : $('.header').removeClass('dark');
  }

  // if page is ready
  ready(handleHeader);

  $(window).on('scroll', function() {
    handleHeader();
  });
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
    var href = $(this).attr('action');
    
    $.ajax({
      type: 'POST',
      dataType: 'json',
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
