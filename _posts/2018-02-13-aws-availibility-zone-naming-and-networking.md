---
title: AWS Availibility Zone Naming & Networking
date: 2018-02-01 02:38:00 +0000
categories:
- blog
---
AWS uses names such as us-west-1a to refer to a given availability zone (AZ) in a region. What you may not know is that AZ naming
is intentionally inconsistent across accounts. In other words, the us-west-1a in one of the Konekti AWS account is not
necessarily the same as the us-west-1a in your account. AWS uses this to load balance workloads across accounts. Otherwise, the
"1a" AZ in a region would receive more than its share of the load. This non-deterministic naming also allows AWS to add AZs in a way
that new accounts will automatically being using them.

Why is this important? In February 2017, it is less important than it used to be though still relevant. An AWS AZ consists of a building
or set of buildings. Latency is a critical factor in ensuring high throughput for intra-VPC traffic. Previously inter-AZ traversal could incur latency that I'd estimate was in the multiple hundreds of microseconds. Measuring with ping is insufficient for
this level of granularity. If you assumed that cross-account EC2 instances were in the same physical AZ, you would unknowingly
incur the inter-AZ latency penalty.

At re:Invent 2017, AWS announced an inter-AZ latency guarantee of 25 microseconds. This eliminates much of the concern about latency between AZs.

Apparently, there is an exception to the AZ naming. Per @QuinnyPig's [tweet](https://twitter.com/quinnypig/status/886271525984256000), us-east-1f is an exception. 

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">…except for us-east-1f. <a href="https://t.co/bZPb8O1TID">https://t.co/bZPb8O1TID</a></p>&mdash; Corey Quinn (@QuinnyPig) <a href="https://twitter.com/QuinnyPig/status/886271525984256000?ref_src=twsrc%5Etfw">July 15, 2017</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
