---
layout: post
author: Jeff Loughridge
image: cog_globe
title: The Most Common Mistake Architects Make with IP Addresses in the AWS VPC
date: 2018-12-20 04:00 -0500

---

Developers typically do not have a background as network engineers. While Amazon has done yeoman’s work in simplifying the network components of the VPC, the fundamental nature of networking in application delivery is such that developers will never be completely relieved from network-related considerations. A basic component of networking is the use of IP addresses to uniquely identify a host. In this post, I’ll discuss the response an Amazon engineer’s response to my question on the most common mistake architects make with respect to IP addresses in the VPC.

Back in October, Scott Kuehn, the Amazon software development manager responsible for delivering the Bring Your Own IP address feature, noticed my [post](https://konekti.us/2018/08/12/decoding-bring-your-own-ip-preview-for-aws-vpc.html) on BYOIP and encouraged me to attend an EC2 Tech Talk in Herndon, VA. At the event, I had the opportunity to talk to Scott and a developer on his team. For a while I’ve wanted to write a comprehensive and opinionated guide to IP addresses in the VPC (it’s still on my to-do list) so I knew what question I wanted to pose to them. What is the most common mistake architects make with IP addresses in the VPC?

For the majority of the VPC platform’s lifespan, we knew the answer and it was drilled into us at the VPC presentations at re:Invent: Choose a Classless Inter-domain Routing (CIDR) range that accommodates growth or be forced to completely rebuild your VPCs. With IPv4 in on-premise networks, we’ve operated in a scarcity mindset even when private addresses were used. This isn’t the best strategy in the VPC.

The addition of the ability to add CIDR blocks to existing VPCs reduces the danger of undersizing your VPC CIDR range. So what is tripping up customer now with respect to IP addresses in the VPC? The answer from the Amazon employees did not surprise me.

#### The most common mistake is failing to use Elastic IPs (EIP) when a fixed public IP address is required.

Let’s review several concepts in examining why this is a problem. The term “public IP address” is overloaded in the AWS documentation. Depending on context, it may refer to one an EIP or a non-EIP public address assigned to an EC2 instance launch. “Non-EIP public address” sounds awkward, right? I typically refer to them as “ephemeral IP addresses” for reasons that will be more clear shortly.

EIPs are allocated from Amazon public addresses space or IP address space you own that you’ve brought to the VPC. The value in EIPs is that they do not change. Developers can allocate EIPs to their account. These EIPs can be moved between instances and Network Load Balancers. While the use of DNS is strongly encouraged for most cases, circumstances such as IP address whitelisting or firewall rules require a fixed IP address.

If you rely on ephemeral public IP addresses, you can lose the address at any time. Amazon virtualization hosts can fail and when you restart the instance, the ephemeral IP address will change. The same also holds true for  starting and stopping your instances.

Use EIPs if you need a fixed IPv4 or IPv6 address. If you use EIPs from Amazon-owned space, there is a soft [limit](https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html) of five per region. While this limit can be increased if the request is approved, EIPs are going to be relatively scarce and therefore should be carefully planned. No such limit exists exists for EIPs pulled from BYOIP allocation pools; however, typically only enterprise customers would own public IP addresses capable of being “ported” to the VPC.

Don’t make the mistake of relying on the ephemeral IP address when your use case calls for a fixed address. EIPs have many interesting use cases and understanding when their usage is needed will save you many headaches.

