---
layout: post
author: Jeff Loughridge
# image: postimage ~~~ Already defined in config defaults
title: Konekti's AWS Networking & Security Wish List for re:Invent 2019
date: 2019-11-29 13:21:33 -0500

---

Expect to see major announcements around networking and security at re:Invent next week. AWS has already
enhanced its Application Load Balancer (ALB) and Network Load Balancer (NLB) ahead of its annual
conference (see [here](https://aws.amazon.com/blogs/aws/aws-load-balancer-update-lots-of-new-features-for-you/) 
for more details). As I did 
[a year ago](https://www.linkedin.com/pulse/konektis-aws-networking-wish-list-reinvent-2018-jeff-loughridge/), 
I'm compiling a list of network and security features that would help AWS customers securely interconnect workloads
in the cloud.

### Cross-region VPC Attachments for Transit Gateway

The Transit Gateway (TGW)--announced at re:Invent 2018--represents a significant simplification of VPC networking.
You can connect VPC and VPNs to the TGW. In its most basic incarnation, the TGW replaces a full mesh of 
VPC peers within a single region. The TGW is a regional construct; you cannot connect VPCs in other regions. 
You have to a Transit VPC-like architecture, which many AWS customers find unnecessarily burdensome.

I predict that AWS will announce that customers can attach VPCs in other regions to the TGW. This enhancement should
eliminate many of the use cases for Transit VPC that you see deployed today.

### Enhanced AWS Native Visibility & Policy Enforcement for Intra-VPC East/West Traffic

AWS does not natively support segmentation within a given VPC. All instances can reach all other instances 
unless you implement SGs or NACLs to prevent this communication. Thinking that creating public and private 
subnets restrict communication is incorrect. Today you need specialized appliances for environments that 
require strict segmentation. While I don't expect AWS will attempt to match the features of a next-generation 
firewall, it's possible that we'll see incremental enhancements to segmentation using native VPC components.

### Reference Security Groups for VPC Peers Across Regions

Referencing security groups (SG) within SGs is a powerful feature. This self-referential ability simplifies
SG construction in VPC peering scenarios. Currently you can reference SGs across VPC peering if the peer is 
in the same AWS region. I'm convinced AWS can overcome whatever challenges that prevent referencing SGs across regions.

### HTTP Redirect on Network Load Balancer

The NLB is amazingly fast and powerful. For engineers with a background in traditional networking, I compare the
NLB to a core router. It doesn't have many features; however, it forwards packets blazingly fast.

As we've been building VPC infrastructure using NLBs for our clients, we've observed that performing HTTP
to HTTPS redirects can be a challenge when you have a security appliance "sandwiched" between NLB and ALB with 
the NLB as the outer load balancer and TLS termination point. 

The current solutions for implementing the redirect when the TLS is terminated on the NLB are kludgy. Remember that
the NLB is a Layer 4 device and does not insert the X-Forwarded-Proto header. What if AWS coud perform the plumbing
behind the scenes to wire a simple HTTP redirection lambda function to an HTTP listener on the NLB? This 
probably wouldn't operate at NLB speeds; however, high speed isn't required for many uses.


### Big Annoucement in Edge Computing

Edge computing is all the rage these days. Some of the smaller IaaS players are touting the benefits of edge
computing such as reduced latency. AWS has a substantial footprint in its edge locations. Lamba@Edge represents
a basic starting point for AWS's edge computing play. I expect to see more from AWS in this area.

What might that big announcement be? AWS Outposts was announced last year to compete with Azure Stacks. It would 
be interesting to see AWS enable partners to connect to edge locations in manner similar to a private
Internet Exchange Point (IXP). These partners could host AWS Outposts servers on behalf of customers. This might
fit a niche for customers who want the latency benefits of Outposts without having to maintain data centers.

### IPv6-Only VPC

IPv6 remains a second-class citizen in the VPC. The gaps are gradually being closed although I don't expect
parity soon. I'd consider the ability to launch an IPv6-only VPC to be a major leap in IPv6 support. There
are use cases such as IOT that do not need IPv4. For these use cases, why would you want to manage two IP stacks? 
I'm surprised that AWS has yet to make some of the steps required for IPv6-only VPCs possible. The 
[introduction](https://aws.amazon.com/blogs/security/defense-in-depth-open-firewalls-reverse-proxies-ssrf-vulnerabilities-ec2-instance-metadata-service/)
of the Instance Metadata Service V2 would have been a perfect opportunity.

### NAT Support in the Virtual Gateway (VGW)

Government agencies and other entities require inner destination addresses to be numbered in public
address space for on-premise IPsec VPN connections to external parties. This complicates connectivity if your
application is hosted in an VPC. Today this requires a virtual appliances to be implemented in the VPC that 
terminate the VPN connections and perform the necessary NAT functions to allow communcation with the private 
IP address space in the VPC. For customers that do not want to "roll their own" VPN and take on the management 
burden of two appliances, the ability to use AWS Managed VPN would simplify connectivity. For AWS Managed VPN 
to route EIPs once the IPsec traffic is decapsulated, the VGW would have to perform the same translation as is 
done today by virtual appliances.

### Conclusion

I believe the implementation of the features I've described in this article would simplify networking in the VPC and
increase customers' ability to securely connect workloads. I'm eager to see what AWS will announce next week.

_Amir will represent Konekti at re:Invent again this year. Drop us a_ [_note_](https://konekti.us/#contact "Contact Us") _if you want to talk about networking & security in the cloud._
