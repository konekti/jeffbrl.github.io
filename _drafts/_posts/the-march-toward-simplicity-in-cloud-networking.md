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

Developers speak of necessary complexity