<div style="display:none">
  <section class="testimonials-area-outer light-grey" id="testimonials">
  <div class="container">
    <div class="content-area">
      <div class="main-title">
        <h5><span>Meet our happy clients</span></h5>
        <h2>Testimonials</h2>
      </div>
      <div class="testimonials-detail-sec">
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
    </div>
  </div>
  </section>
  </div>