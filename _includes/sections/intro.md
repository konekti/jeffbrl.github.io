<style>
  .slides-contain{
    padding: 60px 25px 60px;
    overflow:hidden;
    display:block;
    margin:0 auto;
    position:relative;
  }
  .customs{
    display:flex;
    flex-direction:column;
    justify-content: space-between;
    align-items:stretch;
    overflow:hidden;
    transition: opacity 0.3s ease-out;
  }
  .customs-inner{
    width: 100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    text-align:center;
  }
  .customs h2{
    color:#fff;
    font-size:54px;
  }
  .customs h2,
  .customs h4{
    margin:7.5px 0;
    font-weight:300
  }
  .customs h4{
    color:#eee;
  }
  .customs .button-large{
      margin: 15px auto;
  }
  @media screen and (min-width: 769px) {
    .customs{
      flex-flow:row wrap;
      justify-content: space-between;
      align-items:stretch;
      overflow:hidden;
    }
    .customs-inner{
      width:49%;
      text-align:left;
    }
    .customs .button-large{
      margin: 15px 0;
    }
  }
</style>
<section class='services-outer-area' id='home'>
  <div class='main-banner'>
    <a href='#' name='scroll-top-div'></a>
    <div class='overlay-mask'>
      <div class='container'>
          <div class = 'slides-contain'>
            <div class='slide-one customs'>
                <div class = 'customs-inner'>
                  <img alt='cloud computing' src='{{ site.baseurl }}/assets/cloud-1.svg' >
                </div>
                <div class = 'customs-inner'>
                  <h2>Konekti Systems</h2>
                  <h4>Your Cloud and Hybrid Networking Experts</h4>
                  <a class='button-large' href='#services'>View More</a>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
</section>