---
layout: post
author: Jeff Loughridge
image: postimage
title: The March Toward Simplicity in Cloud Networking
date: 2018-02-24 11:37:46 +0000
---
The networking aspect of cloud networking is complex. Does it have to be? I'll use this post to explain the complexities and how the industry is incentivized to simplify the secure and reliable movement of bits. I'll rely on AWS nomenclature in some cases as the company is the industry leader.

Developers familiar with public cloud generally know how to set-up simple topologies such as a VPC with public and private subnets. The providers make this easy with console wizards and sample architecture blueprints.

When does networking typically need specialized expertise?

* Connecting existing on-prem workloads to the cloud
* Addition of a second public cloud provider
* Multi-VPC connectivity when the number of VPC is large ("large" is clearly a relative term but you'll know when your organization has reached this number)
* Effective usage of new networking features such as AWS's Network Load Balancer (NLB) and PrivateLink
* Any AWS Transit VPC deployment

Developers speak of necessary vs accidental complexity. In the networking domain, the ability to maintain the inter-connectivity of a highly-available distributed system is hard. The problem itself has certain qualities of necessary, or inherent, complexity. These issues are difficult--if not impossible--to completely eliminate through abstractions. Accidental complexity is different in that it usually stems from architectures not fully understanding how components can fit together in a manner that is simple to maintain. When your engineers are awoken by a 3 am phone call, how quickly identify and remediate networking-related outages? Even more basic, are they equipped to discern application issues from networking ones?

Public cloud providers have an economic incentive to minimize accidental complexity and to "get the network out of the way", to paraphrase James Hamilton. Providers want to eliminate barriers to moving workloads into the cloud and maintaining them once there. You can see this on the compute side with containerization and Function-as-a-Service (FaaS). I've observed a similar trend with networking in the cloud.

Let's take a look at AWS in particular has evolved its VPC capabilities to simplify networking. Networking functionality is so limited on EC2-Classic that the company had to launch a disparate platform in 2009 to meet customer requirements for logical groupings that approximate how components are connected in a physical data center.

As with its other offerings, AWS has furiously announced new features and improvements for the VPC and related components.

Consider these improvements.

* **Inter-region peering** - AWS eliminated the need for software VPN to software VPN tunneling to connect VPCs in different regions. This also reduces use cases for Transit VPC when there is no on-premise infrastructure.
* **CIDR prefix addition** - Prior to August 2017, companies had to "go big" on CIDR allocation for a VPC to accommodate growth. Now users can add multiple CIDR prefixes within the same RFC 1918 block (e.g., 10.0.0.0/8).
* **NAT Gateways**