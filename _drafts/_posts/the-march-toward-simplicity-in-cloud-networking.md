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
* Any Transit VPC deployment

Developers speak of necessary vs accidental complexity. In the networking domain, the ability to maintain the inter-connectivity of a highly-available distributed system is hard. The problem itself has certain qualities of necessary, or inherent, complexity. These issues are difficult--if not impossible--to completely eliminate through abstractions. Accidental complexity is different in that it usually stems from architectures not fully understanding how components can fit together in a manner that is simple to maintain. When your engineers are awoken by a 3 am phone call, how quickly identify and remediate networking-related outages?