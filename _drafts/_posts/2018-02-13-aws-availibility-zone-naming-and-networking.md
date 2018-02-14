---
title: AWS Availibility Zone Naming & Networking
date: 2018-02-13 21:38:00 -0500
categories:
- blog
---
AWS uses names such as us-west-1a to refer to a given availability zone (AZ) in a region. What you may not know is that AZ naming is intentionally inconsistent across accounts. In other words, the us-west-1a in one of the Konekti AWS production account is not necessarily the same as the us-west-1a in your account. AWS uses this to load balance workloads across accounts. Otherwise, the "1a" AZ in a region would receive more than its share of the load. This non-deterministic naming also allows AWS to add AZs in a way that new accounts will automatically being using them.

Why is this important? An AWS AZ consists of a building or set of buildings. Latency is a critical factor in ensuring high throughput for intra-VPC traffic.

> Measuring with ping is insufficient for this level of granularity. Use a better tool such as [qperf](https://github.com/linux-rdma/qperf "qperf").

AWS can't  increase the speed of light in fiber; however, it can optimize the network stack on its instances. The new C5 instance type has an average intra-AZ latency of 50 microseconds. I confirmed this value using qperf and the c5.9xlarge instance type. The latency between my us-east-1a and us-east-1b clocked in around the 500 microsecond mark.

If you assumed that cross-account EC2 instances were in the same physical AZ, you would unknowingly incur the inter-AZ latency penalty.

Apparently, there is an exception to the AZ naming. Per @QuinnyPig's [tweet](https://twitter.com/quinnypig/status/886271525984256000), us-east-1f is an exception.

![](/uploads/2018/02/14/az-tweet.PNG "Corey Quinn Tweet")

He points out later in the thread that you can tell by tracking spot instance pricing across accounts.