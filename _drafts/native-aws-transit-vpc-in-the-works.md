---
layout: post
author: Jeff Loughridge
image: postimage
title: Native AWS Transit VPC in the Works
date: 2018-08-13 11:24:54 -0400

---
Last week Pratik Mankad, AWS Solutions Architect, confirmed that AWS is examining a native Transit VPC solution. In making the statement, he was responding to an audience member's question in a join AWS/Juniper/CBT Nuggets video on Juniper's vSRX usage for Transit VPC.

For readers not familiar with Transit VPC, let's cover what the solution provides. AWS customers frequently implements many VPCs for logical separation of workloads. If the customer wants the VPCs to communicate with one another, a VPC peering relationship can be configured. There is a caveat, however. VPC peering is not transitive. Network packets from a given VPC cannot traverse an intermediary VPC to reach a third VPC.

In the below diagram, even if VPC A has a VPC peering with VPC B and VPC B has a VPC peering with VPC C, VPC A cannot communicate with VPC C.

When this number reaches in the hundreds, using a full mesh of VPC peering does not scale. Why is a full mesh needed? A given VPC cannot use an intermediate VPC to reach a destination in a third VPC. Network engineers would refer to this setup as intransitive 