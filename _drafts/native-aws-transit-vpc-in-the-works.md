---
layout: post
author: Jeff Loughridge
image: postimage
title: Native AWS Transit VPC in the Works
date: 2018-08-13 11:24:54 -0400

---
Last week Pratik Mankad, AWS Solutions Architect, confirmed that AWS is examining a native Transit VPC solution. In making the statement, he was responding to an audience member's question in a join AWS/Juniper/CBT Nuggets video on Juniper's vSRX usage for Transit VPC.

For readers not familiar with Transit VPC, let's cover what the solution provides. AWS customers frequently implements many VPCs for logical separation of workloads. If the customer wants the VPCs to communicate with one another, a VPC peering relationship can be configured. There is a caveat, however. VPC peering is not transitive. Network packets from a given VPC cannot traverse an intermediary VPC to reach a third VPC.

In the below diagram, VPC A has VPC peering with VPC B and VPC B has a VPC peering with VPC C. VPC A will not be able to communicate with VPC C.

  
![Non-transitive VPC Peering](/uploads/2018/08/13/VPC Peering.png "Non-transitive VPC Peering")

We can add a third VPC peering from VPC A to VPC C to create a full mesh such that packets from all VPC can communicate directly. This example uses only three VPCs. When this number of VPCs is high, using a full mesh of VPC peering becomes a management nightmare.

The Transit VPC solution is based on software VPN using firewall appliance from the major networking vendors such as Juniper, Cisco, and Palo Alto. Following its implementation in your cloud deployments, VPCs use a dedicated VPC as the transit VPC, which contains the virtual firewalls that maintain IPSec tunnels to other VPCs and on-premise firewalls. The Transit VPC can be very difficult to configure. The details of how Transit VPC function could fill an entire post.

Going back to webinar.