<style>
  .custom-slides{
     display:block;
     margin:0 auto;
  }
  .custom-slides:focus{
    outline:none;
  }
  .slides-contain{
    padding: 60px 25px 60px;
    overflow:hidden;
    display:block;
    margin:0 auto;
    position:relative;
  }
  .custom-indicators{
    position:absolute;
    right:25px;
    bottom:40px;
  }
  .custom-indicators label{
    color:#fff;
    cursor:pointer;
    padding: 6px;
    margin:0 5px;
    border: 1px solid transparent;
    border-radius: 50%;
    position: relative;
    line-height:3em;
    z-index: 9;
    background-color: #ccc;
  }
  .custom-indicators label.is-checked{
    background-color:#fff;
    padding: 7px;
  }
  .customs{
    display:flex;
    opacity:0;
    width:0;
    height:0;
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
  [id^='slide']:checked + .customs{
    opacity:1;
    width:100%;
    height:initial;
    z-index:11;
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
  @media screen and (min-width: 768px) {
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
<div class='custom-slides' tabindex = '1'>
  <div class = 'slides-contain'>
    <div class = 'custom-indicators'>
      <label for = 'slide-one-trigger' class = 'slide-one-trigger is-checked'></label>
      <label for = 'slide-two-trigger' class = 'slide-two-trigger'></label>
    </div>
    <input type = 'radio'  id = 'slide-one-trigger'  name = 'slide' checked>
    <div class='slide-one customs'>
        <div class = 'customs-inner'>
          <img alt='' src='{{ site.baseurl }}/assets/cloud-2.svg' >
        </div>
        <div class = 'customs-inner'>
          <h2>Konekti Systems</h2>
          <h4>Your Cloud and Hybrid Networking Experts</h4>
          <a class='button-large' href='#'>View More</a>
        </div>
      </div>
    <input type = 'radio' id = 'slide-two-trigger'  name = 'slide'>
    <div class='slide-two customs'>
        <div class = 'customs-inner'>
          <img alt='' src='{{ site.baseurl }}/assets/cloud.svg'>
        </div>
        <div class = 'customs-inner'>
          <h2>We are Konekti Systems</h2>
          <h4>We can help you optimize network connectivity to the cloud.</h4>
          <a class='button-large' href='#'>See More</a>
        </div>
    </div>
  </div>
</div>