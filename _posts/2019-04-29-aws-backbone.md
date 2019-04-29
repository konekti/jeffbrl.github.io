---
layout: post
author: Jeff Loughridge
image: sky.jpg
title: What AWS Customers Should Know About the AWS Global Backbone
date: 2019-08-12 01:00:00 -0500

At every re:Invent, various Amazon speakers tout the security, availability, and performance of the
AWS Global Backbone, a private Internet Protocol (IP) network purpose-built for moving customer data 
across the world. The talks are pure gold for network engineers; Amazon is very transparent in discussing
the design of the backbone. Why should AWS customers care about the details of the private backbone?
This subject hasn't much coverage outside of re:Invent. Let's fix that in this post.

What are the key concepts about the backbone that enterprise cloud architect should
know?

The AWS Global Backbone is a carrier-class backbone, which means it is built to standards of the largest
ISPs in the word (known in the industry as Tier 1 ISPs). AWS has redundant 100 Gb/s circuits between regions,
with plans to move to 400 Gb/s when the technology matures. The network is completely private; AWS owns
the infrastructure from end-to-end, with the exception of some short- and long-term fiber leases. While
AWS is known to use its own routers and switches in its data centers, I suspect the WAN uses the same
two major router vendors deployed in Tier 1 ISPs' backbone. Another supposition on my part is that Amazon--with
its legion of developers--relies on advanced network automation to manage the network with a heavy focus
on telemetry data from the routers. 

I wrote in my introduction that the AWS Global Backbone is purpose-built. While comparable in many
ways to Tier 1 ISPs, this network addresses challenges specific to cloud providers. Tier 1 ISPs make
capacity management decisions based on observable trends. They are not designed to have 300Gb/s
of data suddenly flood the network in a particular point of presence (POP). AWS does not have that luxury.
Workloads can instantly spin up and spin down in minutes which forces a high degree of over-provisioning of
network capacity. While this is an expensive proposition, over-provisioning capacity is superior to the use
of complex quality-of-services (QoS) techniques. Keep in mind the QoS is a decision about which packets to 
drop in the event of congestion. Amazon describes its global backbone as congestion-free.

In AWS whitepapers and other publications, the company strongly recommends encrypting inter-region
traffic. This is an artifact of the days when inter-region traffic used the public Internet. As Amazon
built out the private backbone, more and more traffic migrated to it; however, inter-region traffic could 
still traverse the public Internet under failure conditions. This is no longer the case.

As of this writing in April 2019, you will not find an official guarantee on the AWS web site that all
inter-region traffic will use the global backbone (if anyone can find this please let me know). The statement
appears on slides from re:Invent talks as pictured below.

Note that China is excluded.

In the official documentation, AWS guarantees that traffic that traverses inter-region VPC peering 
links--including AWS PrivateLink endpoints across regions. Inter-region VPC Peering traffic is also
encrypted by AWS.

The takeaway from this discussion is that inter-region traffic is no longer at risk of being shunted to
the public Internet; the traffic will use the private backbone. I am unsure why AWS hasn't moved what it
has promised in presentations to the web site.

Let's change topics slight to packet size. The AWS Private Backbone has a maximum transmission unit (MTU) of
9001 bytes. Prior to last year, you couldn't get packets of that size between your data center and VPC as
the MTU on Direct Connect links was 1500 bytes. Now the MTU on Direct Connect private virtual interfaces can
be set to 1500 or 9001. The ability to transmit large frames should significantly increase the speed of
bulk transfers.

The final point I'll make on the AWS Global Backbone involves inter-region data transfers. AWS reduces
the data transfer rate in half for traffic between the us-east-1 and us-east-2 regions. Typically inter-region
traffic cost $0.02/GB. The reduction to $0.01 GB for us-east-1 to us-east-2 might be a consideration if you
decide to add a second region to your AWS footprint.


At Konekti, our core philosophy is that our clients should focus on what they do best--writing innovative
applications that generate revenue for the business. Yet the network is fundamental to application delivery
and securely moving bits between heterogenous locations--cloud, data centers, remote branches--can be
extremely complex. The AWS Global Backbone plays a key role in this movement of data between AWS regions
and edge locations. 

