---
title: AWS Availibility Zone Naming & Networking
date: 2018-01-31 21:38:00 -05:00
---

AWS uses names such as us-west-1a to refer to a given availability zone (AZ) in a region. What you may not know is that AZ naming
 is intentionally inconsistent across accounts. In other words, the us-west-1a in one of the Konekti AWS account is not
 necessarily the same as the us-west-1a in your account. AWS uses this to load balance workloads across accounts. Otherwise, the
 "1a" AZ in a region would receive more than its share of the load. This non-deterministic naming also allows AWS to add AZs in a way
 that new accounts will automatically being using them.
\
\
Why is this important? At the time of this writing, it is less important than it used to be though still relevant. An AWS AZ consists of a building
 or set of buildings. Latency is a critical factor in ensuring high throughput for intra-VPC traffic. Previously inter-AZ traversal
\
could incur latency that I'd estimate was in the multiple hundreds of microseconds. Measuring with ping is insufficient for
 this level of granularity. If you assumed that cross-account EC2 instances were in the same physical AZ, you would unknowingly
 incur the inter-AZ latency penalty.
\
\
At re:Invent 2017, AWS announced an inter-AZ latency guarantee of 25 microseconds. This eliminates much of the concern about
 latency between AZ.

Apparently, there is an exception to the AZ naming.

<div class="tweet permalink-tweet js-actionable-user js-actionable-tweet js-original-tweet with-social-proof logged-in js-initial-focus focus" data-associated-tweet-id="886271525984256000" data-tweet-id="886271525984256000" data-item-id="886271525984256000" data-permalink-path="/QuinnyPig/status/886271525984256000" data-conversation-id="886271525984256000" data-tweet-nonce="886271525984256000-f203388b-ef88-4273-8b7b-bcc5ee4f6b4d" data-tweet-stat-initialized="true" data-screen-name="QuinnyPig" data-name="Corey Quinn" data-user-id="97114171" data-you-follow="false" data-follows-you="false" data-you-block="false" data-reply-to-users-json="\[{&quot;id_str&quot;:&quot;97114171&quot;,&quot;screen_name&quot;:&quot;QuinnyPig&quot;,&quot;name&quot;:&quot;Corey Quinn&quot;,&quot;emojified_name&quot;:{&quot;text&quot;:&quot;Corey Quinn&quot;,&quot;emojified_text_as_html&quot;:&quot;Corey Quinn&quot;}}\]" data-disclosure-type="" tabindex="0">
\

\

\
      
\
      <div class="content clearfix">
\
        <div class="permalink-header">
\
            <a class="account-group js-account-group js-action-profile js-user-profile-link js-nav" href="/QuinnyPig" data-user-id="97114171">
\
      <img class="avatar js-action-profile-avatar" src="https://pbs.twimg.com/profile_images/952981499346747392/eeeQQ5J1_bigger.jpg" alt="">
\
    <span class="FullNameGroup">
\
      <strong class="fullname show-popup-with-id u-textTruncate ">Corey Quinn</strong><span>‏</span><span class="UserBadges"></span><span class="UserNameBreak">&nbsp;</span></span><span class="username u-dir u-textTruncate" dir="ltr">@<b>QuinnyPig</b></span></a>
\

\
          
\
          <small class="time">
\
  <a href="/QuinnyPig/status/886271525984256000" class="tweet-timestamp js-permalink js-nav js-tooltip" title="10:09 AM - 15 Jul 2017" data-conversation-id="886271525984256000"><span class="_timestamp js-short-timestamp " data-aria-label-part="last" data-time="1500138572" data-time-ms="1500138572000" data-long-form="true">15 Jul 2017</span></a>
\
</small>
\

\
            
\

\
    
\
    <div class="follow-bar">
\
      <div class="user-actions btn-group not-following not-muting can-dm  " data-user-id="97114171" data-screen-name="QuinnyPig" data-name="Corey Quinn" data-protected="false">
\
  <span class="user-actions-follow-button js-follow-btn follow-button">
\
  <button type="button" class="
\
    EdgeButton
\
    EdgeButton--secondary
\
    
\
    EdgeButton--medium 
\
    button-text
\
    follow-text">
\
      <span aria-hidden="true">Follow</span>
\
      <span class="u-hiddenVisually">Follow <span class="username u-dir u-textTruncate" dir="ltr">@<b>QuinnyPig</b></span></span>
\
  </button>
\
  <button type="button" class="
\
    EdgeButton
\
    EdgeButton--primary
\
    
\
    EdgeButton--medium 
\
    button-text
\
    following-text">
\
      <span aria-hidden="true">Following</span>
\
      <span class="u-hiddenVisually">Following <span class="username u-dir u-textTruncate" dir="ltr">@<b>QuinnyPig</b></span></span>
\
  </button>
\
  <button type="button" class="
\
    EdgeButton
\
    EdgeButton--danger
\
    
\
    EdgeButton--medium 
\
    button-text
\
    unfollow-text">
\
      <span aria-hidden="true">Unfollow</span>
\
      <span class="u-hiddenVisually">Unfollow <span class="username u-dir u-textTruncate" dir="ltr">@<b>QuinnyPig</b></span></span>
\
  </button>
\
  <button type="button" class="
\
    EdgeButton
\
    EdgeButton--invertedDanger
\
    
\
    EdgeButton--medium 
\
    button-text
\
    blocked-text">
\
    <span aria-hidden="true">Blocked</span>
\
    <span class="u-hiddenVisually">Blocked <span class="username u-dir u-textTruncate" dir="ltr">@<b>QuinnyPig</b></span></span>
\
  </button>
\
  <button type="button" class="
\
    EdgeButton
\
    EdgeButton--danger
\
    
\
    EdgeButton--medium 
\
    button-text
\
    unblock-text">
\
    <span aria-hidden="true">Unblock</span>
\
    <span class="u-hiddenVisually">Unblock <span class="username u-dir u-textTruncate" dir="ltr">@<b>QuinnyPig</b></span></span>
\
  </button>
\
  <button type="button" class="
\
    EdgeButton
\
    EdgeButton--secondary
\
    
\
    EdgeButton--medium 
\
    button-text
\
    pending-text">
\
    <span aria-hidden="true">Pending</span>
\
    <span class="u-hiddenVisually">Pending follow request from <span class="username u-dir u-textTruncate" dir="ltr">@<b>QuinnyPig</b></span></span>
\
  </button>
\
  <button type="button" class="
\
    EdgeButton
\
    EdgeButton--secondary
\
    
\
    EdgeButton--medium 
\
    button-text
\
    cancel-text">
\
    <span aria-hidden="true">Cancel</span>
\
    <span class="u-hiddenVisually">Cancel your follow request to <span class="username u-dir u-textTruncate" dir="ltr">@<b>QuinnyPig</b></span></span>
\
  </button>
\
</span>
\

\
</div>
\

\
    </div>
\

\
            <div class="ProfileTweet-action ProfileTweet-action--more js-more-ProfileTweet-actions">
\
    <div class="dropdown">
\
  <button class="ProfileTweet-actionButton u-textUserColorHover dropdown-toggle js-dropdown-toggle" type="button" aria-haspopup="true">
\
      <div class="IconContainer js-tooltip" data-original-title="More">
\
        <span class="Icon Icon--caretDownLight Icon--small"></span>
\
        <span class="u-hiddenVisually">More</span>
\
      </div>
\
  </button>
\
  <div class="dropdown-menu is-autoCentered">
\
  <div class="dropdown-caret">
\
    <div class="caret-outer"></div>
\
    <div class="caret-inner"></div>
\
  </div>
\
  <ul>
\
    
\
      <li class="copy-link-to-tweet js-actionCopyLinkToTweet">
\
        <button type="button" class="dropdown-link">Copy link to Tweet</button>
\
      </li>
\
      <li class="embed-link js-actionEmbedTweet" data-nav="embed_tweet">
\
        <button type="button" class="dropdown-link">Embed Tweet</button>
\
      </li>
\
          <li class="mute-user-item"><button type="button" class="dropdown-link">Mute <span class="username u-dir u-textTruncate" dir="ltr">@<b>QuinnyPig</b></span></button></li>
\
    <li class="unmute-user-item"><button type="button" class="dropdown-link">Unmute <span class="username u-dir u-textTruncate" dir="ltr">@<b>QuinnyPig</b></span></button></li>
\

\
        <li class="mute-conversation-item"><button type="button" class="dropdown-link">Mute this conversation</button></li>
\
  <li class="unmute-conversation-item"><button type="button" class="dropdown-link">Unmute this conversation</button></li>
\

\
        <li class="block-link js-actionBlock" data-nav="block">
\
          <button type="button" class="dropdown-link">Block <span class="username u-dir u-textTruncate" dir="ltr">@<b>QuinnyPig</b></span></button>
\
        </li>
\
        <li class="unblock-link js-actionUnblock" data-nav="unblock">
\
          <button type="button" class="dropdown-link">Unblock <span class="username u-dir u-textTruncate" dir="ltr">@<b>QuinnyPig</b></span></button>
\
        </li>
\
      <li class="report-link js-actionReport" data-nav="report">
\
        <button type="button" class="dropdown-link">
\
          
\
            
\
            Report Tweet
\
        </button>
\
      </li>
\
      <li class="dropdown-divider"></li>
\
      <li class="js-actionMomentMakerAddTweetToOtherMoment MomentMakerAddTweetToOtherMoment">
\
        <button type="button" class="dropdown-link">Add to other Moment</button>
\
      </li>
\
      <li class="js-actionMomentMakerCreateMoment">
\
        <button type="button" class="dropdown-link">Add to new Moment</button>
\
      </li>
\
  </ul>
\
</div>
\

\
</div>
\

\
  </div>
\

\
        </div>
\
      </div>
\

\

\
      
\
          <p class="u-hiddenVisually" aria-hidden="true" data-aria-label-part="1">Corey Quinn Retweeted Julien Simon</p>
\

\

\
<div class="js-tweet-text-container">
\
  <p class="TweetTextSize TweetTextSize--jumbo js-tweet-text tweet-text" lang="en" data-aria-label-part="4">…except for us-east-1f.<a href="https://t.co/bZPb8O1TID" rel="nofollow noopener" dir="ltr" data-expanded-url="https://twitter.com/julsimon/status/886269358883954690" class="twitter-timeline-link u-hidden" target="_blank" title="https://twitter.com/julsimon/status/886269358883954690"><span class="tco-ellipsis"></span><span class="invisible">https://</span><span class="js-display-url">twitter.com/julsimon/statu</span><span class="invisible">s/886269358883954690</span><span class="tco-ellipsis"><span class="invisible">&nbsp;</span>…</span></a></p>
\
</div>
\

\

\
<p class="u-hiddenVisually" aria-hidden="true" data-aria-label-part="3">Corey Quinn added,</p>
\
  
\
      <div class="QuoteTweet
\
    
\
    
\
    u-block js-tweet-details-fixer">
\
  <div class="QuoteTweet-container">
\
    <a class="QuoteTweet-link js-nav" href="/julsimon/status/886269358883954690" data-conversation-id="886269358883954690" aria-hidden="true">
\
    </a>
\
    <div class="QuoteTweet-innerContainer u-cf js-permalink js-media-container" data-item-id="886269358883954690" data-item-type="tweet" data-screen-name="julsimon" data-user-id="27206572" href="/julsimon/status/886269358883954690" data-conversation-id="886269358883954690" tabindex="0">
\
      <div class="tweet-content">
\
            <div class="QuoteMedia">
\
      <div class="QuoteMedia-container js-quote-media-container">
\
          <div class="QuoteMedia-singlePhoto">
\
    <div class="QuoteMedia-photoContainer js-quote-photo" data-image-url="https://pbs.twimg.com/media/DEypAGrXgAE763j.jpg" data-element-context="platform_photo_card" style="background-color:rgba(64,64,64,1.0);" data-dominant-color="\[64,64,64\]">
\
  <img data-aria-label-part="" src="https://pbs.twimg.com/media/DEypAGrXgAE763j.jpg" alt="" style="height: 100%; left: -187px;">
\
</div>
\

\
</div>
\

\

\
      </div>
\
  </div>
\

\
        <div class="QuoteTweet-authorAndText u-alignTop">
\
            
\
  <div class="QuoteTweet-originalAuthor u-cf u-textTruncate stream-item-header account-group js-user-profile-link">
\
    <b class="QuoteTweet-fullname u-linkComplex-target">Julien Simon</b><span class="UserBadges"></span><span class="UserNameBreak">&nbsp;</span><span class="username u-dir u-textTruncate" dir="ltr">@<b>julsimon</b></span>
\
  </div>
\

\
          
\
          <div class="QuoteTweet-text tweet-text u-dir" lang="en" data-aria-label-part="2" dir="ltr"><span data-query-source="hashtag_click" class="twitter-hashtag pretty-link js-nav" dir="ltr"><s>#</s><b>EC2</b></span> availability zones: not sure all of you actually know this :) <span rel="nofollow noopener" dir="ltr" data-expanded-url="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html" class="twitter-timeline-link" target="_blank" title="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html"><span class="tco-ellipsis"></span><span class="invisible">https://</span><span class="js-display-url">docs.aws.amazon.com/AWSEC2/latest/</span><span class="invisible">UserGuide/using-regions-availability-zones.html</span><span class="tco-ellipsis"><span class="invisible">&nbsp;</span>…</span></span> <span class="twitter-timeline-link u-hidden" data-pre-embedded="true" dir="ltr">pic.twitter.com/iQyn3jDuY1</span></div>
\
        </div>
\
      </div>
\
    </div>
\
  </div>
\
</div>
\

\

\

\
      
\

\
      
\
      
\

\
      <div class="js-tweet-details-fixer tweet-details-fixer">
\
  <div class="client-and-actions">
\
  <span class="metadata">
\
    <span>10:09 AM - 15 Jul 2017</span>
\
        <span class="permalink-tweet-geo-text">
\
      from <a href="/search?q=place%3A5a110d312052166f" class="u-textUserColor js-nav js-geo-pivot-link" data-nav="search" data-place-id="5a110d312052166f">San Francisco, CA</a>
\
  </span>
\

\
  </span>
\
  
\
</div>
\

\

\
  <div class="js-machine-translated-tweet-container"></div>
\
  <div class="js-tweet-stats-container tweet-stats-container">      
\

\
<ul class="stats" aria-label="Retweeted and favorited by">
\
    <li class="js-stat-count js-stat-retweets stat-count" aria-hidden="true">
\
      <a tabindex="0" role="button" data-tweet-stat-count="3" data-compact-localized-count="3" class="request-retweeted-popup" data-activity-popup-title="3 retweets">
\
          
\
          <strong>3</strong> Retweets
\
      </a>
\
    </li>
\

\
    <li class="js-stat-count js-stat-favorites stat-count" aria-hidden="true">
\
      <a tabindex="0" role="button" data-tweet-stat-count="3" data-compact-localized-count="3" class="request-favorited-popup" data-activity-popup-title="3 likes">
\
          
\
          <strong>3</strong> Likes
\
      </a>
\
    </li>
\

\
  <li class="avatar-row js-face-pile-container">
\
      <a class="js-profile-popup-actionable js-tooltip" href="/dontrebootme" data-user-id="15146957" original-title="Patrick O'Connor" rel="noopener" data-original-title="Patrick O'Connor">
\
  <img class="avatar size24 js-user-profile-link" src="https://pbs.twimg.com/profile_images/910378627656814592/dwnJ9ueW_normal.jpg" alt="Patrick O'Connor">
\
</a>
\
      <a class="js-profile-popup-actionable js-tooltip" href="/jermops" data-user-id="27906446" original-title="Jermops" rel="noopener" data-original-title="Jermops">
\
  <img class="avatar size24 js-user-profile-link" src="https://pbs.twimg.com/profile_images/954905443960107008/oXRQUZ3w_normal.jpg" alt="Jermops">
\
</a>
\
      <a class="js-profile-popup-actionable js-tooltip" href="/richburroughs" data-user-id="19552154" original-title="Rich Burroughs" title="Rich Burroughs" rel="noopener">
\
  <img class="avatar size24 js-user-profile-link" src="https://pbs.twimg.com/profile_images/851145027153575936/Z7_SaNEl_normal.jpg" alt="Rich Burroughs">
\
</a>
\
      <a class="js-profile-popup-actionable js-tooltip" href="/Birdy_0" data-user-id="908224753" original-title="Alberto Ruis" title="Alberto Ruis" rel="noopener">
\
  <img class="avatar size24 js-user-profile-link" src="https://pbs.twimg.com/profile_images/930994013162823680/YIX1im6u_normal.jpg" alt="Alberto Ruis">
\
</a>
\
      <a class="js-profile-popup-actionable js-tooltip" href="/mdpolaris" data-user-id="11388002" original-title="mdpolaris" title="mdpolaris" rel="noopener">
\
  <img class="avatar size24 js-user-profile-link" src="https://pbs.twimg.com/profile_images/730384031028633600/SRm5AzX4_normal.jpg" alt="mdpolaris">
\
</a>
\
  </li>
\
</ul>
\

\

\
  </div>
\
</div>
\

\

\
      
\
      <div class="stream-item-footer">
\
          
\

\

\
        
\
            <div class="ProfileTweet-actionCountList u-hiddenVisually">
\
    
\
    
\
    <span class="ProfileTweet-action--reply u-hiddenVisually">
\
      <span class="ProfileTweet-actionCount" data-tweet-stat-count="2">
\
        <span class="ProfileTweet-actionCountForAria" id="profile-tweet-action-reply-count-aria-886271525984256000" data-aria-label-part="">2 replies</span>
\
      </span>
\
    </span>
\
    <span class="ProfileTweet-action--retweet u-hiddenVisually">
\
      <span class="ProfileTweet-actionCount" data-tweet-stat-count="3">
\
        <span class="ProfileTweet-actionCountForAria" id="profile-tweet-action-retweet-count-aria-886271525984256000" data-aria-label-part="">3 retweets</span>
\
      </span>
\
    </span>
\
    <span class="ProfileTweet-action--favorite u-hiddenVisually">
\
      <span class="ProfileTweet-actionCount" data-tweet-stat-count="3">
\
        <span class="ProfileTweet-actionCountForAria" id="profile-tweet-action-favorite-count-aria-886271525984256000" data-aria-label-part="">3 likes</span>
\
      </span>
\
    </span>
\
  </div>
\

\
  <div class="ProfileTweet-actionList js-actions" role="group" aria-label="Tweet actions">
\
    <div class="ProfileTweet-action ProfileTweet-action--reply">
\
  <button class="ProfileTweet-actionButton js-actionButton js-actionReply" data-modal="ProfileTweet-reply" type="button" aria-describedby="profile-tweet-action-reply-count-aria-886271525984256000">
\
    <div class="IconContainer js-tooltip" title="Reply">
\
      <span class="Icon Icon--medium Icon--reply"></span>
\
      <span class="u-hiddenVisually">Reply</span>
\
    </div>
\
      <span class="ProfileTweet-actionCount ">
\
        <span class="ProfileTweet-actionCountForPresentation" aria-hidden="true">2</span>
\
      </span>
\
  </button>
\
</div>
\

\
    <div class="ProfileTweet-action ProfileTweet-action--retweet js-toggleState js-toggleRt">
\
  <button class="ProfileTweet-actionButton  js-actionButton js-actionRetweet" data-modal="ProfileTweet-retweet" type="button" aria-describedby="profile-tweet-action-retweet-count-aria-886271525984256000">
\
    <div class="IconContainer js-tooltip" title="Retweet">
\
      <span class="Icon Icon--medium Icon--retweet"></span>
\
      <span class="u-hiddenVisually">Retweet</span>
\
    </div>
\
      <span class="ProfileTweet-actionCount">
\
    <span class="ProfileTweet-actionCountForPresentation" aria-hidden="true">3</span>
\
  </span>
\

\
  </button><button class="ProfileTweet-actionButtonUndo js-actionButton js-actionRetweet" data-modal="ProfileTweet-retweet" type="button">
\
    <div class="IconContainer js-tooltip" title="Undo retweet">
\
      <span class="Icon Icon--medium Icon--retweet"></span>
\
      <span class="u-hiddenVisually">Retweeted</span>
\
    </div>
\
      <span class="ProfileTweet-actionCount">
\
    <span class="ProfileTweet-actionCountForPresentation" aria-hidden="true">3</span>
\
  </span>
\

\
  </button>
\
</div>
\

\

\
    <div class="ProfileTweet-action ProfileTweet-action--favorite js-toggleState">
\
  <button class="ProfileTweet-actionButton js-actionButton js-actionFavorite" type="button" aria-describedby="profile-tweet-action-favorite-count-aria-886271525984256000">
\
    <div class="IconContainer js-tooltip" data-original-title="Like">
\
      <span role="presentation" class="Icon Icon--heart Icon--medium"></span>
\
      <div class="HeartAnimation"></div>
\
      <span class="u-hiddenVisually">Like</span>
\
    </div>
\
      <span class="ProfileTweet-actionCount">
\
    <span class="ProfileTweet-actionCountForPresentation" aria-hidden="true">3</span>
\
  </span>
\

\
  </button><button class="ProfileTweet-actionButtonUndo ProfileTweet-action--unfavorite u-linkClean js-actionButton js-actionFavorite" type="button">
\
    <div class="IconContainer js-tooltip" title="Undo like">
\
      <span role="presentation" class="Icon Icon--heart Icon--medium"></span>
\
      <div class="HeartAnimation"></div>
\
      <span class="u-hiddenVisually">Liked</span>
\
    </div>
\
      <span class="ProfileTweet-actionCount">
\
    <span class="ProfileTweet-actionCountForPresentation" aria-hidden="true">3</span>
\
  </span>
\

\
  </button>
\
</div>
\

\

\
      <div class="ProfileTweet-action ProfileTweet-action--dm">
\
    <button class="ProfileTweet-actionButton u-textUserColorHover js-actionButton js-actionShareViaDM" type="button" data-nav="share_tweet_dm">
\
      <div class="IconContainer js-tooltip" title="Direct message">
\
        <span class="Icon Icon--medium Icon--dm"></span>
\
        <span class="u-hiddenVisually">Direct message</span>
\
      </div>
\
    </button>
\
  </div>
\

\

\
    
\

\
  </div>
\

\
      </div>
\

\
      <div class="permalink-footer">
\
        
\
      </div>
\
    </div>