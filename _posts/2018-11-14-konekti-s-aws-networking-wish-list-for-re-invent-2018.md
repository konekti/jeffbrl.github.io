---
layout: post
author: Jeff Loughridge
image: postimage
title: Konekti's AWS Networking Wish List for re:Invent 2018
date: 2018-11-14 07:33:52 -0500

---
AWS announced massive enhancements to its core networking capabilities at re:Invent 2017. Inter-region VPC peering, PrivateLink, and the Network Load Balancer topped the list a year ago. Predicting that significant change is in store for networking at re:Invent 2018 doesn’t require clairvoyance. At Konekti, we have many opportunities to talk to AWS customers at various events and our own client base. Customers want simplification of networking within the cloud and cloud to on-premises. In this article, I’ll share our wish list of networking announcements we hope to see at the end of the month.

### Native Transit VPC Solution

We know that a native Transit VPC solution is in the works (see previous post [here](https://konekti.us/2018/08/13/native-aws-transit-vpc-in-the-works.html)). The existing Transit VPC solution has drawbacks in its management complexity and performance. Some customers need the advanced functionality of 3rd party virtual applications and they want the ability to use the same network device management tools for routers in the cloud and on-premise. Other customers want to be able to design VPC connectivity that requires a transit VPC without having to manage virtual routers. The limitation in IPsec throughput on the Virtual Gateway (VGW) is another factor that drives the requirement for a native solution. We feel that AWS may not be ready to completely eliminate the inability for packets to route between two VPCs via an intermediate one; however, we are betting that AWS will be ready to announce new features that will relax the rules under specific circumstances.

### Customer Gateway (CGW) Appliance

I predicted the announcement of a CGW appliance in a previous [post](https://konekti.us/2018/09/18/the-rumored-aws-whitebox-switch-is-a-customer-gateway.html). Please refer that post for the advantages of such an appliance. In an interesting coincidence, Jeff Barr [announced](https://aws.amazon.com/blogs/aws/new-aws-storage-gateway-hardware-appliance/) the Storage Gateway Hardware Appliance the same day as my post. Just as I surmised for a CGW appliance, the Storage Gateway appliance can be [purchased](https://www.amazon.com/dp/B079RBVX3M) on the Amazon retail site. In an ideal environment, AWS customers would have automation hooks between VGWs created in the VPC and the physical firewalls/routers in data centers and office locations. This is not always the case, particularly given the low adoption rate and relative immaturity of standardized mechanisms for vendor-neutral router automation (e.g., [OpenConfig](http://www.openconfig.net/)). The CGW appliance would a clear win for AWS and its customers. Let’s hope we see this announcement.

### Internet-Bound Traffic over VPC Peering Links

AWS customers that want tight control on traffic sourced from or destined to the Internet can deploy a dedicated Internet access VPC in their architecture. This creates a single point of policy enforcement that some customers require. The architecture can be implemented today but it is not simple and suffers from the same performance limitations as the Transit VPC.

When considering the implementation of a dedicated Internet VPC that application VPCs use to reach the Internet, the first though that comes to mind might be VPC peering, particularly now that inter-region is supported. This will not work; traffic must either originate or terminate on a network interface in the VPC. Traffic from an application VPC destined for the Internet will be blocked. The ability to send Internet-bound traffic over VPC peering links would position customers to easily create dedicated VPCs with strong performance characteristics. This wish list item is closely related to the native Transit VPC item above. A relaxation in the non-transit nature of VPCs would be required.

### Guarantee That Cross-region Traffic Will Use the AWS Backbone

We know that AWS has invested significantly in building a [world-wide 100G network.](https://youtu.be/uj7Ting6Ckk) While AWS strongly advises customers to encrypt traffic between regions, the fact is that these packets will use its private backbone _almost_ always. AWS does not currently guarantee this because traffic might fail over to the Internet in select outage scenarios. In the two years since James Hamilton’s presentation at re:Invent, I suspect the scenarios in which inter-region traffic  fails over to Internet links are exceedingly rare.

Is AWS prepared to make the guarantee that cross-region traffic will use its private backbone? I believe it is. I have no doubts that AWS is fully prepared in North America and Europe. I suspect that regions outside of these continents might prevent a world-wide guarantee.

### Flow Log Analysis Tools

Flow Logs is a vital feature in the VPC. Much like CloudTrail, Flow Logs is an absolute must-have for auditing and troubleshooting. The data in Flow Logs is presented in a raw text format. While AWS has published blogs on using various AWS services to make better use of the data, third party tools have excelled in filling this gap. By implementing analysis tools that offer insights into traffic patterns, security anomalies, and visualizations, customers look to these tools to unlock the value in the Flog Logs data. Look for AWS to either acquire a company or make major enhancements.

### Conclusion

As in years past, the AWS announcements have drastically slowed as the company prepares for re:Invent. Customers and APN partners are excited to see what comes out of the conference. As an APN partner that specializes in networking, we are eager to hear how networking will evolve as we head into 2019.

_Amir will represent Konekti at re:Invent again this year. Drop us a note if you want to talk about networking in the cloud._