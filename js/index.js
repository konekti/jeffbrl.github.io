function fileHelper() {
  
  const doc = document.documentElement;
  
  function isObj(obj) {
    return (typeof obj === 'object' && obj !== null) ? true : false;
  }
  
  function createEl(element = 'div') {
    return document.createElement(element);
  }
  
  function elem(selector, parent = document){
    let elem = parent.querySelector(selector);
    return elem != false ? elem : false;
  }
  
  function elems(selector, parent = document) {
    let elems = parent.querySelectorAll(selector);
    return elems.length ? elems : false;
  }
  
  function pushClass(el, targetClass) {
    if (isObj(el) && targetClass) {
      let elClass = el.classList;
      elClass.contains(targetClass) ? false : elClass.add(targetClass);
    }
  }
  
  function deleteClass(el, targetClass) {
    if (isObj(el) && targetClass) {
      elClass = el.classList;
      elClass.contains(targetClass) ? elClass.remove(targetClass) : false;
    }
  }
  
  function modifyClass(el, targetClass) {
    if (isObj(el) && targetClass) {
      elClass = el.classList;
      elClass.contains(targetClass) ? elClass.remove(targetClass) : elClass.add(targetClass);
    }
  }
  
  function containsClass(el, targetClass) {
    if (isObj(el) && targetClass && el !== document ) {
      return el.classList.contains(targetClass) ? true : false;
    }
  }
  
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
  
  (function autoFocusTextField() {
    let t = elem('.form-control');
    t ? t.autofocus = true : false;
  })();
  
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
      hamburger.classList.remove(close);
      modifyNavLinks();
      menuIsOpen = false;
    }
    
    function openMenu() {
      let s = menuStatus();
      s[4].add(s[1])
      s[4].remove(s[2]);
      s[5].add(s[0]);
      hamburger.classList.add(close);
      modifyNavLinks();
      menuIsOpen = true;
    }
    
    function modifyMenu() {
      var z = menuStatus();
      let closed = z[3];
      closed ? openMenu() : closeMenu();
    }
    
    doc.addEventListener('click', function(event) {
      let target = event.target;
      let isMenuToggle = target.matches('.nav_toggle');
      let isMenuOverlay = target.matches('.slab');
      isMenuToggle || isMenuOverlay ? modifyMenu() : false ;
    });
    
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
  
  (function() {
    
    function toggleArchive(archive) {
      modifyClass(archive.nextElementSibling, 'opens');
      modifyClass(archive.children[0], 'fa-caret-down')
      modifyClass(archive.children[0], 'fa-caret-right')
    }
    
    doc.addEventListener('click', function(event) {
      let target = event.target;
      let isBlog = elem('.blog');
      let archiveTitle = target.closest('h3');
      let isArchive = isBlog ? archiveTitle ? archiveTitle.matches('.pretty') : false : false;
      isArchive ? toggleArchive(archiveTitle) : false;
    });
  })();
  
  (function year(){
    var date = new Date();
    var year = date.getFullYear();
    elem('.year').innerHTML = year;
  })();
  
  (function autoResizeTextField() {
    let textarea = elem('textarea.form_input');
    textarea ? autosize(textarea) : false;
  })();
  
  function formFeedBack(parent, success = false) {
    let bold, modal, icon, clipBoard, title, message, messages;
    messages = {
      success: {
        title: "Message sent!",
        message: "Thank you for contacting us. You'll hear from us soon.",
        icon: "icon-success.png"
      },
      failure: {
        title: "Something's wrong ...",
        message: "<a href = 'mailto:info@konekti.us'<u>Contact us directly</u></a> and you'll hear from us soon.",
        icon: "icon-failure.png"
      }
    }
    let feedback = success ? messages.success : messages.failure;
    let modalClass = 'contact-feedback';
    
    modal = createEl();
    modal.className = modalClass;
    clipBoard = createEl();
    title = createEl('h3');
    title.textContent = feedback.title;
    bold = createEl('strong');
    bold.innerHTML = feedback.message;
    message = createEl('p')
    message.appendChild(bold);
    icon = createEl('img');
    icon.src = `/assets/icons/${feedback.icon}`;
    icon.className = 'modal_icon';
    
    clipBoard.appendChild(icon);
    clipBoard.appendChild(title);
    clipBoard.appendChild(message);
    modal.appendChild(clipBoard);
    
    // append modal only once
    // parent node
    let node = parent.parentNode;
    let children = node.children;
    let hasModal = containsClass(children[children.length - 1], modalClass);
    
    if (!hasModal) {
      node.appendChild(modal);
      // window.scrollTo(0, 201);
    } 
    
  }
  
  function formValues(form) {
    const isValidElement = element => {
      return element.name && element.value;
    };
    
    const isValidValue = element => {
      return (!['checkbox', 'radio'].includes(element.type) || element.checked);
    };
    
    const isCheckbox = element => element.type === 'checkbox';
    const isMultiSelect = element => element.options && element.multiple;
    
    const getSelectValues = options => [].reduce.call(options, (values, option) => {
      return option.selected ? values.concat(option.value) : values;
    }, []);
    
    const formToJSON = elements => [].reduce.call(elements, (data, element) => {
      if (isValidElement(element) && isValidValue(element)) {
        if (isCheckbox(element)) {
          data[element.name] = (data[element.name] || []).concat(element.value);
        } else if (isMultiSelect(element)) {
          data[element.name] = getSelectValues(element);
        } else {
          data[element.name] = element.value;
        }
      }
      return data;
    }, {});
    
    const data = formToJSON(form.elements);
    return JSON.stringify(data, null, "  ");
    
  }
  
  function submitSignUp(form) {
    let formAction = formCarryAction;
    
    let data = formValues(form);
    
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      body: data
    }
    
    fetch(formAction, options)
    .then(response => response.text())
    .then(() => {
      formFeedBack(form, true);
      // form.reset();
    })
    .catch(() => {
      formFeedBack(form)
    });
  }
  
  (function handleForm() {
    // request options
    let formID = '.form';
    let forms = elems(formID);
    
    if(forms) {
      const form = forms[0];
      form.addEventListener('submit', function(event) {
        event.preventDefault();
        submitSignUp(form);
        return false;
      });
    }
  })();
  
  (function() {  
    (function toggleSubscribeWidget() {
      let mailPreview = '.mail_preview';
      mailClose = '.mail_close';
      let mailInner = '.mail_inner';
      let grow = 'mail_grow';
      let expand = 'expand';
      let mailBody = elem('.mail_body');

      function mailBodyIsOpen() {
        return mailBody ? containsClass(mailBody, grow) : false;
      } 

      function togglePanel() {
        modifyClass(mailBody, grow);
        modifyClass(mailBody.closest(mailInner), expand);
      }

      doc.addEventListener('click', function(event){
        let target = event.target;
        let isMailPreview = target.matches(mailPreview) || target.closest(mailPreview);
        let isMailClose = target.matches(mailClose);
        let isWithinMail = target.closest(mailInner); 

        isMailClose || isMailPreview ? togglePanel() : mailBodyIsOpen() && !isWithinMail ? togglePanel() : false;
      });
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
  
  (function menu() {
    let fixed, nav, scroll;
    
    fixed = 'nav_fixed';
    scroll = 'nav_scroll';
    nav = elem('.header');
    
    function animateNav() {
      !containsClass(nav, scroll) ? pushClass(nav, scroll) : false;
      setTimeout(function(){
        !containsClass(nav, fixed) ? pushClass(nav, fixed) : false;
      }, 500)
    }
    
    function restoreNav() {
      containsClass(nav, scroll) ? deleteClass(nav, scroll) : false;
      setTimeout(function(){
        containsClass(nav, fixed) ? deleteClass(nav, fixed) : false;
      }, 500)
    }
    
    function fixNav() {
      window.addEventListener('scroll', function(e) {
        let position = window.scrollY;
        if (position > 200) {
          window.requestAnimationFrame(animateNav); 
        } else {
          window.requestAnimationFrame(restoreNav); 
        }
      });
    }
    nav ? fixNav() : false;
    
  })();
}

window.addEventListener('load', fileHelper);
