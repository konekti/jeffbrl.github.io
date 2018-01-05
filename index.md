---
layout: default
published: true
---
 
<section class="services-outer-area" id="home">
  <div class="main-banner">
    <a href="#" name="scroll-top-div"></a>
    <div class="overlay-mask">
      <div class="container">
        <!-- Start:Slider area -->
        <div class="slider">
          <div class="flexslider">
            <ul class="slides">
                <!-- Start: Banner Slide 01 -->
              <li>
                <img alt="" src="{{ site.baseurl }}/assets/banner-1.png" >
                <div class="caption">
                  <h2>Konekti Systems</h2>
                  <h4>Your Cloud and Hybrid Networking Experts</h4>
                  <a class="button-large" href="#">View More</a>
                </div>
              </li>
              <!-- End: Banner Slide 01 -->
              <!-- Start: Banner Slide 02 -->
              <li>
                <img alt="" src="{{ site.baseurl }}/assets/consult.png">
                <div class="caption">
                  <h2>We are Konekti Systems</h2>
                  <h4>We can help you optimize network connectivity to the cloud.</h4>
                  <a class="button-large" href="#">See More</a>
                </div>
              </li>
                <!-- End: Banner Slide 02 -->
            </ul>
          </div>
        </div>
        <!-- End:Slider area -->
      </div>
    </div>
  </div>
</section>
  <!-- =================================================
  Banner Area End -->
  <!-- Services Content Area  Start 
  ====================================================== -->
  <section class="about-text-outer-area" id="services">
    <!-- Start:Services content area-->
    <div class="container">
      <div class="content-area">
        <!-- Start:Left area-->
        <div class="col-md-12">
          <div class="main-title left-align">
              <h1>Our Services</h1>
          </div>
          <div class="text-box">
            <p><h5>Public and Hybrid Cloud Migration</h5></p>
            <p>
              {% include public-hybrid-cloud-migration.md %}
            </p>
            <p><h5>Public and Hybrid Cloud Connectivity Health Check</h5></p>
            <p>
              {% include public-hybrid-cloud-health-check.md %}
            </p>
            <p><h5>Public Cloud Business Continuity Assurance</h5></p>
            <p>
              {% include public-cloud-business-continuity-assurance.md %}
            </p>

          </div>
        </div>			
        <!-- End:Left area-->      
      </div>
    </div>
    <!-- End:Awesome Structure content area-->
  </section>
  <!-- =================================================
  When to Engage Us Content Area  End -->   
  <!-- When to Engage Us Content Area  Start 
  ====================================================== -->
  <section class="about-text-outer-area" id="engage">
    <!-- Start:Engage content area-->
    <div class="container">
      <div class="content-area">
        <!-- Start:Left area-->
        <div class="col-md-12">
          <div class="main-title left-align">
              <h1>When to Engage Us</h1>
          </div>
          <div class="text-box">
              <p> <h5>Use Case #1</h5>
              <br><h6>"Did I get networking within the cloud right?"</h6>
              </p>
              <p> {% include story-one.md %} </p>
              <p> <h5>Use Case #2</h5> 
                  <br><h6>"How should I connect my on-premise infrastructure to the cloud?"</h6>
              </p>
              <p> {% include story-two.md %} </p>
              <p> <h5>Use Case #3</h5> 
                 <br><h6>"My existing data center networks are complex. How can I plan and implement a migration to the cloud?"</h6>
              </p>
              <p> {% include story-three.md %} </p>
              <p> <h5>Use Case #4</h5>
                <br><h6>"How can I ensure my cloud services remain highly available and quickly restored if I encounter a major outage?"</h6>
              </p>
              <p> {% include story-four.md %} </p>
          </div>
        </div>			
        <!-- End:Left area-->      
      </div>
    </div>
    <!-- End:Awesome Structure content area-->
  </section>
  <!-- =================================================
  When to Engage Us Content Area  End -->   
  <!-- Testimonials Area Start 
  ====================================================== -->
  <div style="display:none">
  <section class="testimonials-area-outer light-grey" id="testimonials">
  <div class="container">
    <div class="content-area">
      <div class="main-title">
        <h5><span>Meet our happy clients</span></h5>
        <h2>Testimonials</h2>
      </div>
      <!-- Start: Testimonials -->
      <div class="testimonials-detail-sec">
        <!-- Loop through testimonials -->
        {% for client in site.data.testimonials %}
        <div class="col-md-4">
          <div class="testimonial-member">
            <div class="testimonial-box">	
              <div class="text-box">
                <center>
                  <h5>{{ client.name }}</h5>
                  <h6>{{ client.location }}</h6>
                  <hr>
                  <p>{{ client.description }}</p>
                </center>
              </div>
            </div>
          </div>
        </div>
        {% endfor %}        
      </div>
      <!-- End: Testimonials -->
    </div>
  </div>
  </section>
  <!-- =================================================
  Testimonials Area End -->
  </div>
  <!-- Key Skills Area  Start 
  ====================================================== -->
  <section class="key-skills-outer-area" id="about">
    <div class="container">
      <div class="content-area"> 
        <!-- Start:Right area-->
        <div class="right-side col-md-6">
            <div class="main-title left-align">
              <h1>About Us</h1>
              <p> {% include about-us.md %} </p>
              <br>
            </div>
        </div>
        <!-- End:Right area-->
        <!-- Start:Left area-->
        <div class="left-side col-md-6">
            <div class="img-holder">
                <img src="{{ site.baseurl }}/assets/icons-1cs-v3-06.png" alt=""> 
            </div>
        </div>
        <!-- End:Left area-->
      </div>
    </div>
  </section>
  <!-- =================================================
      Home Fun Fact Area Start 
  ====================================================== -->
  <section class="home-fun-fact-area-outer-sec">
      <div class="home-fun-fact-area">
          <div class="container">
              <div style="display:none" class="fun-fact-sec">
                  <!-- Start:Fun Fact Items -->
                  <ul class="fun-fact-items">
                      <!-- Loop through fun facts -->
                      {% for fact in site.data.facts %}
                      <li>
                          <div class="icon"><i class="fa fa-{{ fact.icon }}" aria-hidden="true"></i></div>
                          <div class="text">
                              <h2>{{ fact.number }}</h2>
                              <p>{{ fact.text }}Clients</p>
                          </div>	
                      </li>
                      {% endfor %}
                  </ul>
                  <!-- End:Fun Fact Items -->
              </div>
          </div>
          </div>
  </section>
  <!-- =================================================
   Content Area Start 
  ====================================================== -->
  <section class="contact-area-outer  "  id="contact-us">
  <div class="contact-form-sec ">
        <!-- Start: Form Area -->
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
          <!-- End: Form Area -->
      </div>    
  <!-- Start:Contact Details Area -->
    <div class="contact-sec-contents">
      <div class="container"><br><br><br>
                <div class="contact-info">
                    <!-- Start:Phone Number -->
          <div class="col-md-4">
            <div class="features-box">
              <div class="features-icon"><i class="fa fa-building-o"></i></div>
              <div class="features-text">
                <h6>Physical Address</h6>
                <p>40356 Monroe Glen Lane<br>
                  Leesburg, VA 20175</p>
              </div>
            </div>
          </div>
                      <!-- End:Phone Number -->     
                      <!-- Start:Address -->
          <div class="col-md-4">
            <div class="features-box">
              <div class="features-icon"><i class="fa fa-phone"></i></div>
              <div class="features-text">
                <h6>Phone</h6>
                <p> (703) 852-5160</p>
              </div>
            </div>
          </div>
                      <!-- End:Address -->    
                      <!-- Start:Email -->
          <div class="col-md-4">
            <div class="features-box">
              <div class="features-icon"> <i class="fa fa-envelope-o"></i></div>
              <div class="features-text">
                <h6>Email Address</h6>
                <p> 
                   info@konekti.us
                </p>
              </div>
            </div>
          </div>
                      <!-- End:Email -->
        </div>
      </div>
    </div>
  <!-- End:Contact Details Area -->
      <!-- Start:
  <div class="map-area">
    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14604.264638061977!2d90.37898279999999!3d23.7806583!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x3ebb5b921e528ab!2z4Kas4Ka-4KaC4Kay4Ka-4Kam4KeH4Ka2IOCmrOCmv-CmruCmvuCmqCDgpqzgpr7gprngpr_gpqjgp4Ag4Kav4Ka-4Kam4KeB4KaY4Kaw!5e0!3m2!1sbn!2sbd!4v1494351475759" width="100%" height="290" frameborder="0" style="border:0" allowfullscreen></iframe>
  </div> 
  ================================================
  End:Map Area -->  
</section>
