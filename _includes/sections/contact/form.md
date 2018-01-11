<div class="contact-form-sec ">
  <div class="container">
    <div class="content-area clearfix">
      <div class="main-title">
        <h5>Looking for a quick reply</h5>
        <h1>Send us an email</h1>
      </div>
      <div class="form-sec">
          <form name="contact" action="https://formspree.io/{{ site.email }}" method="POST" id = 'enquire'>
              <div class="col-md-4">
                <input type="text" id="contact-name" name = 'Name' placeholder="Your Name" class="text-field-box ">
              </div>
              <div class="col-md-4">
                <input type="text" id="contact-email" name="_replyto" placeholder="Your Email" class="text-field-box ">
              </div>
              <div class="col-md-4">
                <input type="text" id="contact-number" name = 'Mobile' placeholder="Your Phone" class="text-field-box ">
              </div>
              <div class="col-md-12">
                  <textarea id="contact-msg" class="text-field-box" name = 'Message' placeholder="Your Message"></textarea>
                  <button name="contact" type="submit" id="contact-submit" class="button-medium">Submit Now</button>
              </div>
              <div class="error-item">
                  <div id="contact-loading" style="display: none;"> Email Sending... </div>
                  <div id="contact-success" style="display: none;"> 
                      Your message sent sucessfully to our team and they will be in touch with you asap. 
                  </div>
                  <div id="contact-failed" style="display: none;"> 
                      Error! Message sending failed, try again soon. 
                  </div>
              </div> 
          </form>
      </div>	
    </div>
  </div>
</div>