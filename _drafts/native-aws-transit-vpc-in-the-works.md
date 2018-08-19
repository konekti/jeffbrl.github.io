---
layout: post
author: Jeff Loughridge
image: postimage
title: Native AWS Transit VPC in the Works
date: 2018-08-13 11:24:54 -0400

---
Last week Pratik Mankad, AWS Solutions Architect, [confirmed](https://youtu.be/8t-a38jBgA0?t=49m36s "Learn How CBT Nuggets Securely Connects VPCs in Minutes with Juniper Networks and AWS") that AWS is examining a native Transit VPC solution. In making the statement, he was responding to an audience member's question in a joint AWS/Juniper/CBT Nuggets webinar on the use of Juniper vSRX in Transit VPC.

For readers not familiar with Transit VPC, let's cover what the solution provides. AWS customers frequently implement many VPCs for logical separation of workloads. If the customer wants the VPCs to communicate with one another, a VPC peering relationship can be configured. There is a caveat, however. VPC peering is not transitive. Network packets from a given VPC cannot traverse an intermediary VPC to reach a third VPC.

In the below diagram, VPC A has VPC peering with VPC B and VPC B has a VPC peering with VPC C. VPC A will not be able to communicate with VPC C.

We can add a third VPC peering from VPC A to VPC C to create a full mesh such that packets from all VPC can communicate directly. This example uses only three VPCs. When this number of VPCs is high, using a full mesh of VPC peering becomes a management nightmare.

The Transit VPC solution is based on software VPN using firewall appliance from the major networking vendors such as Juniper, Cisco, and Palo Alto. Following its implementation in your cloud deployments, VPCs typically use a dedicated VPC as the transit VPC, which contains the virtual firewalls that maintain IPSec tunnels to other VPCs and on-premise firewalls. The Transit VPC can be very difficult to configure and manage. The details of how Transit VPC function could fill an entire post.

Going back to webinar, I believe this is the first time anyone at AWS has publicly commented on the potential development of an internal Transit VPC server. Pratik's comment was far from a commitment of an impending feature release. He said, "...this is one of the things that we are actively looking at." Even so, I am confident that the development of a native Transit VPC service is underway.

The release of a native Transit VPC service would be an excellent addition to the AWS VPC ecosystem. The deployment would be much simpler and more aligned for customers with simple transitive VPC connectivity requirements. Customers would not have to pay licensing costs, manage virtual firewalls running on EC2 instances, and maintain high availability.

How this solution might look is anyone's guess. The native Transit VPC could resemble the DX Gateway in being a highly available VPC component with connectivity to all VPCs. Alternatively, AWS engineers might have ideas on how to implement transitive VPC connectivity without introducing the possibility for routing loops.

Will Transit VPC go away? Certainly not. Many customers rely on the advanced security features of the firewall appliances in the AWS Marketplace. In addition, customers that use the same firewall vendors on-premise could opt to retain the same vendor's virtual firewall in the cloud to simplify management.

Perhaps the question we should be asking is, "Will AWS introduce a native Transit VPC at re:Invent 2018 or re:Invent 2019?" As active participants in AWS networking, we at Konekti are eager to find out.

Links

[Learn How CBT Nuggets Securely Connects VPCs in Minutes with Juniper Networks and AWS](https://youtu.be/8t-a38jBgA0 "Learn How CBT Nuggets Securely Connects VPCs in Minutes with Juniper Networks and AWS") video

[Slides](https://www.slideshare.net/AmazonWebServices/learn-how-cbt-nuggets-securely-connects-vpcs-in-minutes-with-juniper-networks-and-aws "CBT Nuggets Securely Connects VPCs in Minutes with Juniper Networks and AWS Slides - Slidehare.net")