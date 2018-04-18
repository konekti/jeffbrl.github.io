---
layout: post
author: Jeff Loughridge
image: postimage
title: The March Toward Simplicity in Cloud Networking
date: 2018-02-24 11:37:46 +0000
---

The networking aspect of cloud networking is complex. Does it have to be? I'll use this post to explain the complexities and how the industry is incentivized to simplify the secure and reliable movement of bits. I'll primarily focus on AWS as it is the company is the industry leader.

Developers familiar with public cloud generally know how to set-up simple topologies such as a VPC with public and private subnets. The providers make this easy with console wizards and sample architecture blueprints.

When do companies typically need specialized networking expertise?

* Connecting existing on-premises workloads to the cloud
* Addition of a second public cloud provider
* Multi-VPC connectivity when the number of VPC is large ("large" is clearly a relative term but you'll know when your organization has reached this number)
* Effective usage of new networking features such as AWS's Network Load Balancer (NLB) and PrivateLink
* Most AWS Transit VPC deployments

Developers compare necessary and accidental complexity. In the networking domain, the ability to maintain the inter-connectivity of a highly-available distributed system is hard. The problem itself has certain qualities of necessary, or inherent, complexity. These issues are difficult--if not impossible--to completely eliminate through abstractions. Accidental complexity is different in that it usually stems from architects not fully understanding how components can fit together in a manner that is simple to maintain. When your engineers are awoken by a 3 am phone call, how quickly identify and remediate networking-related outages? Even more basic, are they equipped to discern application issues from networking ones?

Public cloud providers have an economic incentive to minimize accidental complexity and to "get the network out of the way", to paraphrase James Hamilton. Providers want to eliminate barriers to moving workloads into the cloud and maintaining them once there. You can see this on the compute side with containerization and Function-as-a-Service (FaaS). I've observed a similar trend with networking in the cloud.

Let's take a look at AWS has evolved its VPC capabilities to simplify networking. Networking functionality is so limited on EC2-Classic that the company had to launch a disparate platform in 2009 to meet customer requirements for logical groupings that approximate how components are connected in a physical data center (sans the messiness of Layer 2 protocols such as VLANs and STP).

As with its other offerings, AWS has speedily announced new features and improvements for the VPC and related components.

Consider these recent improvements.

* **Inter-region peering** - AWS eliminated the need for software VPN to software VPN tunneling to connect VPCs in different regions. This also reduces use cases for Transit VPC when there is no on-premises infrastructure.
* **CIDR prefix addition** - Prior to August 2017, companies had to "go big" on CIDR allocation for a VPC to accommodate growth. Now users can add multiple CIDR prefixes within the same RFC 1918 block (e.g., 10.0.0.0/8).
* **NAT Gateways** - Tired of managing NAT instances and failover kludges? The NAT Gateway is highly available in the same vein as the IGW and VGW.
* **Direct Connect Gateway** - Before this feature was launched, DX connectivity was tied to a region for private and public VIFs (note that U.S. regions were the exception for public VIFs). Via a single BGP session to the Direct Connect Gateway, customers can receive prefixes from any participating VPC in any region. In addition, AWS will announce its public service endpoints for all regions except for China.

Do you notice a trend in how these new features and enhancements make the networking component easier for the user? This will continue. Thinking about what might come next becomes a fun exercise. Transit VPC as a service? A new type of detached VGW with which you can use Hardware VPN to reach all regions? Or might AWS provide a virtual appliance for on-premises that eliminates manual configuration of IPsec entirely?

Admittedly, this article has been AWS-centric. The concept of simplifying the networking component in public networking also applies to Azure and GCP. These developments benefit both the IaaS providers and companies that rely on the public cloud. Let's all enjoy the ride. At Konekti, we're excited to continue to work with clients on cloud data networking as IaaS providers evolve their networking capabilities.