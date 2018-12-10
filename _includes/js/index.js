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

function smoothScroll(selector, fn) {
  // handle links with @href started with '#' only
  $(document).on('click', selector, function(e) {
    // first close menu
    fn ? fn() : false ;
    // "a[href^='/#']"
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
}

window.innerWidth >= 1024 ? smoothScroll("a[href^='/#']", false) : false;

(function toggleMenu() {
  
  let menu = elem('.nav_menu');
  let overlay = elem('.header');
  let hamburger = elem('.nav_toggle');
  let links = elems('.nav_item');
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

  window.innerWidth < 1024 ? smoothScroll('.nav_child', modifyMenu) : false;

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
  var date = new Date();
  var year = date.getFullYear();
  elem('.year').innerHTML = year;
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

(function() {
  // select a single element
  function elem(selector) {
    let elem = document.querySelector(selector);
    return elem != false ? elem : false;
  }
  
  // select multiple elements
  function elems(selector) {
    let elems = document.querySelectorAll(selector);
    return elems != false ? elems : false;
  }

  function pushClass(el, targetClass) {
    // equivalent to addClass
    if (el && typeof el == 'object' && targetClass) {
      let elClass = el.classList;
      elClass.contains(targetClass) ? false : elClass.add(targetClass);
    }
  }
  
  function deleteClass(el, targetClass) {
    // equivalent to removeClass
    if (el && typeof el == 'object' && targetClass) {
      let elClass = el.classList;
      elClass.contains(targetClass) ? elClass.remove(targetClass) : false;
    }
  }
  
  function modifyClass(el, targetClass) {
    // equivalent to toggleClass
    if (el && typeof el == 'object' && targetClass) {
      let elClass = el.classList;
      elClass.contains(targetClass) ? elClass.remove(targetClass) : elClass.add(targetClass);
    }
  }

  (function toggleSubscribeWidget() {
    let mailPreview = elem('.mail_preview');
    let mailClose = elem('.mail_close');
    if (mailPreview) {
      let grow = 'mail_grow';
      let retard = 'mail_retard';
      function alterMailPanel(target) {
        modifyClass(target, grow);
      }
      mailPreview.addEventListener('click', function(event) {
        let mailBody = this.nextElementSibling;
        alterMailPanel(mailBody);
      });
      mailClose.addEventListener('click', function() {
        let mailBody = this.parentNode.parentNode;
        alterMailPanel(mailBody);
      });
    }
  })();
  
  (function toggleShare() {
    let items = elems('.share_item');
    let trigger = elem('.share_toggle');
    let buttons = Array.from(items).filter(function(button) {
      return button != trigger;
    });
    if (trigger) {
      trigger.addEventListener('click', function() {
        let t_class = this.classList;
        let toggled = 'share_toggled';
        t_class.contains(toggled) ? t_class.remove(toggled) : t_class.add(toggled);
        buttons.map(function(button, index){
          let b_class = button.classList;
          let active = 'share_wobble';
          b_class.contains(active) ? b_class.remove(active) : b_class.add(active);
        });
      });
    }
  })();

  function populateElement(elem, content) {
    elem.innerHTML = content.innerHTML;
  }

  (function showMemberBio() {
    let cards = elems('.team_member');
    if (cards) {
      let widget = elem('.member_content');
      let widget_close = elem('.member_close');
      let body = document.body;
      cards.forEach(function(card) {
        card.addEventListener('click', function(){
          let card_header = card.children[0];
          let card_description = card.children[1];
          let widget = elem('.member_inner').parentNode;
          let widget_header = elem('.member_header');
          let widget_description = elem('.member_description');
          modifyClass(widget, 'member_widget');
          modifyClass(body, 'truncate');
          populateElement(widget_header, card_header);
          populateElement(widget_description, card_description);
        });
      });
      function closeBio(selector) {
        if(selector) {
          selector.addEventListener('click', function(event){
            if (event.target === this) {
              modifyClass(body, 'truncate');
              modifyClass(widget, 'member_widget');
            } 
          });
        }
      }
      closeBio(widget);
      closeBio(widget_close);
    }
  })();
})();
