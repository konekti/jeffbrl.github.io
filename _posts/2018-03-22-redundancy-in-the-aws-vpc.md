---
layout: post
author: Jeff Loughridge
# image: postimage ~~~ Already defined in config defaults
title: Redundancy in the AWS VPC
date: 2018-03-22 20:29:54 +0000
---
IT workloads require uninterrupted connectivity whether in the cloud or physical data centers. Network engineers know from experience that the elimination of single points of failure in the network is the key to high availability. One Internet edge router? Let's make that two with  one ISP circuit homed to each. Think you can get away with one core switch in your data center? Think again.

Network engineers--much to the bean counters' dismay--zealously add redundant network devices to the network. Let's consider two types of network redundancy.

1. Active-standby - One path through the network is used in steady state (a fancy engineering term for a non-failure scenario). One or more paths are used when the primary path degrades or fails. An example of active-standby is the deployment of two firewalls with traffic traversing Firewall A if it is available. Firewall B is only used upon the failure of Firewall A.
2. Active-active - There is no backup path in this model. Traffic flows over two or more paths in steady state. The networking concept of equal-cost multipath (ECMP) demonstrates an active-active redundancy configuration. Heard of Layer 3-based spine-and-leaf designs in the data center? The use of ECMP to spread traffic across multiple network devices is an inherent benefit to this design.

I am a long-time proponent of active-active redundancy in networks. With traffic traversing all available paths, problems are identified and corrected as they occur. There are no surprises at the time of a failure event. I am leery of active-standby designs, particularly if the back-up paths are never tested. I'll never forget the days when protected SONET circuits were prevalent in the WAN. Too often the primary fiber pair would fail and the circuit would not correctly switch to the back-up pair.

You see both active-standby and active-active designs in the public cloud.  Companies successfully use both types. The cloud mitigates some of my concerns about the active-standby design given the increased flexibility of the cloud over bare metal infrastructure. We have infrastructure-as-code tools to ensure that VPC A in us-east-1 mirrors VPC B in us-west-2. AWS's Werner Vogels has drilled into our collective heads to expect failure. Highly sophisticated cloud deployment also regularly test for failure ([Chaos Monkey](https://en.wikipedia.org/wiki/Chaos_Monkey), anyone?).

Within AWS, we have the luxury of building networks using the VPC abstraction. VPCs are tied to a region. AWS's [EC2 SLA](https://aws.amazon.com/ec2/sla/ "Amazon Compute Service Level Agreement") commits to 99.99% uptime for a region.  Some customers may be satisfied with deploying services in a single VPC; however, the best practice is to plan for region failure by relying on at least another VPC in a different region.

Understanding AWS's concept of an availability zone (AZ) is necessary for cloud architects. An AZ is defined as one or more adjacent physical buildings. AWS's reference designs encourage the use of multiple AZ. VPC components that are tied to an AZ--think subnets as one example--will be unavailable should the AZ fail.

Fortunately for network engineers, many VPC components are not coupled to an AZ and are highly available. The AWS Console and API will not let you add more than one component that is highly available at the region-level.

What VPCs components can we expect to be available short of a region-level failure?

* VPC implied router
* Virtual Private Gateway (VGW)
* Internet Gateway (IGW)
* NAT Gateway
* Egress-Only Gateway
* VPC peering connection

AWS has offloaded many of the concerns surrounding single points of failure from you. I suspect that all network engineers will be excited to hear that there will be no 3 am phone calls for an IGW failure.

I mentioned earlier in the article that some VPC components are specific to an AZ and will fail (probably at 3 am just to increase the suffering of the on-call engineer).

* Subnets
* NAT Instances
* Elastic Network Interfaces (ENIs)

My list is not exhaustive. For the above items, the burden is on your staff to build redundancy into the design.

I've barely scratched the surface of redundancy in AWS VPCs. The topic is a broad one that requires in-depth knowledge of AWS networking. The complexity increases with multiple VPCs and hybrid cloud scenarios.

Want an audit of your network redundancy in the cloud? [Contact us](https://konekti.us/#contact-us "Contact Konekti").