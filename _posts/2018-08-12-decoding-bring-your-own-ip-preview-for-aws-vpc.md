---
layout: post
author: Jeff Loughridge
image: postimage
title: Decoding 'Bring Your Own IP' Preview for AWS VPC
date: 2018-08-12 20:29:44 -0400

---
In Werner Vogels’s keynote at the AWS NYC Summit, he [announced](https://youtu.be/VL6aFvEEFQo?t=1h42m30s "AWS Summit New York 2018 - Keynote with Dr. Werner Vogels and Dr. Matt Wood") the preview release of Bring Your Own IP Address. The VPC feature allows customers to use IP addresses they own as public addresses in the VPC. Is it hard to grasp what exactly this means and how it benefits AWS customers? Before delving in, let’s take a step back and examine public and private IP addresses in the VPC.

#### Private IP Addresses in the VPC

When you create a VPC, you specify a Classless Interdomain Routing (CIDR) range for private intra-VPC, inter-VPC (in the case of VPC Peering), and VPC-to-site connectivity. Prior to 2017, you had to carefully select a right-sized CIDR range as you could not later change it short of rebuilding the VPC. The ability to [grow your VPC](https://aws.amazon.com/about-aws/whats-new/2017/08/amazon-virtual-private-cloud-vpc-now-allows-customers-to-expand-their-existing-vpcs/) from an IP address perspective was added in August 2017. I’ll note that this feature allows additional flexibility but does not eliminate the need for deliberate IP address planning.

Private IP addresses are used to number EC instances in your VPC. You will see them when viewing the IP addresses on an instance. For example, performing an ‘ifconfig’ or ‘ip address show’ on a Linux instance will display an IP pulled from the private IP address range.

Enterprises are accustomed to using private address space to number their on-premise data centers. Network Address Translation (NAT) is used to convert the private IP addresses to Internet routeable IP addresses and vice versa. AWS constructed the VPC to allow customers to replicate this model in the VPC such that in some ways VPCs can be considered virtual data centers in the cloud.

AWS recommends that customers use IP addresses taken from two Internet Engineering Task Force (IETF) Requests for Comments (RFCs).

* RFC 1918 – 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16
* RFC 6598 - 100.64.0.0/10

The RFC 1918 space is pervasive in the enterprise data center. If you have worked in one, there is no doubt you are familiar with the concept. You may also be familiar with the acute pain associated with IP address renumbering in cases such as acquisition of a new company that also uses the same RFC 1918 space. Think about the need to modify hundreds of IP addresses in firewall rules and in many cases manually update the network configuration of thousands of servers and network infrastructure components.

The shared address space defined in RFC 6598 provides an alternative. Its original use was for ISPs that deploy Carrier-Grade NAT (see [https://tools.ietf.org/html/rfc6598](https://tools.ietf.org/html/rfc6598 "https://tools.ietf.org/html/rfc6598") if this piques your interest). The advantage of using this space is that the likelihood of overlap is very low. Outside of the ISP community, few engineers have heard of this space. The near-guarantee of avoiding IP address overlap--and therefore IP renumbering and complex NAT architectures--is appealing to network engineers. The use of 100.64.0.0/10 in the VPC also clearly stands out from RFC 1918 addresses during troubleshooting of VPC to data center routing.

#### Public IP Addresses in the VPC

In a VPC context, public--as in Internet routable--addresses fall into two categories.

* **Elastic IP (EIP) addresses** - Persistent IPv4 addresses that are tied to ENIs. EIPs should be used when you want a fixed public IPv4 address in your VPCs. These addresses can be moved around between instances in the same region. AWS has a soft limit of five EIPs per region.
* **Public IP addresses** - IP addresses assigned to your instances based on the “Auto-assign Public IP” field in the AWS console. The public IP DNS field in the console with names like ec2-52-90-199-41.compute-1.amazonaws.com map to public IP addresses from the AWS address pool.

AWS documentation and certification exams sometime refer to public IP addresses generically, leaving the reader to use context to distinguish between EIPs and AWS public IP addresses. “Ephemeral” public addresses is a term I use to differentiate them from EIPs. The ephemeral addresses disappear when an instance is stopped or terminated. If you need a fixed address, use an EIP.

Neither types of public IP addresses are visible to the OS in your instance. In the private IP addresses section above, I described how the private IP address appears on the instance. Recall that enterprise data centers use NAT to communicate with the Internet. The same is true for EC2 instances. While you may not explicitly configure a NAT Gateway or NAT Instance in your VPC, NAT always plays a role when VPCs communicate with the Internet.

I mentioned that EIP and AWS public IP addresses are pulled from Amazon’s public IP address pools. When an EIP is released or an EC2 instance with ephemeral public IP address is stopped or terminated, the IP address is released back to the Amazon pool for use by other AWS customers.

#### Enter Bring Your Own IP

The Bring Your Own IP (BYOIP) feature allows customers to use their own IPv4 public space as EIPs in the VPC. Customers that use the BGP protocol typically possess what’s known as provider independent IP addresses. These IP addresses can be moved between ISPs should the company decide to do so. Other companies use IP addresses obtained from the provider. These companies do not own the addresses; the addresses are tied to their provider. In the networking industry, the latter type of IP addresses is called provider aggregatable, a term that stems from how the ISP announces a superset of this address space. To pass AWS’s verification process for Bring Your Own IP, the address space must be provider independent space.

Once AWS approves the IP range for BYOIP, customers can issue an API call to signal AWS that the space should be announced using BGP from a specific AWS region. In most cases, customers will want to cease announcing the CIDR range from on-premise data centers. Announcing the space from both locations is an advanced use case that might cause serious problems for any network equipment that maintains session state such as stateful firewalls.

The smallest CIDR range you can port to AWS is a /24. If you are familiar with BGP routing on the Internet, you’ll recognize that this size wasn’t chosen arbitrarily. ISPs are almost guaranteed to accept /24s and larger (e.g., /23, /22, etc). Most ISPs will reject provider independent IPv4 addresses smaller than /24 (e.g., /25, /26, etc.).

What happens now that an AWS region is announcing your public CIDR range? Customers can allocate EIPs from this range. Via the API, customers can get a random EIP or a specific one. In addition, customers can continue to pull EIPs from Amazon address space. I like the flexibility AWS offers in choosing address pools.

Now we can address why the BYOIP functionality has been a common feature request. In Matt Lehnews’s [Bring Your Own IP Address to the Cloud (SRV218)](https://youtu.be/XY3n7n7l4iw "Bring Your Own IP Address to the Cloud (SRV218)") video, he highlights several use cases.

* IP address “reputation” – The IP addresses used by some companies have value accrued over many years of responsible service. Think about well-behaved email providers and web crawlers.
* Whitelisting – Firewalls and other devices permit specific IP addresses. Contacting 3rd parties to make changes after migrating to the crowd would represent a significant effort.
* Migration – You can avoid changing IP address used by your application as you migrate workloads from the data center to the VPC. IP renumbering is giant headache. Apps should always rely on DNS; however, in practice some on-premise apps use hard-coded IP addresses. The ability to migrate IP addresses from the data center to the VPC helps to mitigate the problem.
* Redundancy - I see this use case as the advanced scenario in which IP addresses are announced from both an AWS region and on-premise. If designed carefully, a failure in a region or data center could be almost seamless to users of the applications as traffic re-routes accordingly.

Matt describes a benefit of the new feature in the video: EIP reclamation. For EIPs for AWS IP space, customers frequently contact AWS Support after accidentally releasing EIPs. The support team tries to pull the EIPs out of the free pool but can’t always guarantee EIP availability. The EIP may have been claimed by another customer. This can’t happen when you use your own public IP addresses. You may have to duke it out with another organization within your company though.

Another benefit has to do with a small cost savings.The EIP pricing [section](https://aws.amazon.com/ec2/pricing/on-demand/#Elastic_IP_Addresses) of the EC2 Instance pricing page describes small hourly charges for the following.

* Additional IP address associated with a running instance per hour on a pro rata basis
* Elastic IP address not associated with a running instance per hour on a pro rata basis

Remapping EIPs also incurs a charge of $0.10/remap when the remaps per month exceeds 100.

If you use the IPv4 address you’ve brought to the VPC, there is no charge for EIPs associated with stopped instances and no charge for remapping EIPs. The need to remap EIPs may be reduced depending on the size of the prefix you port to VPC.

The BYOIP preview has a number of caveats at the time of this article (8/12/18).

* The documentation is missing
* IPv6 is not supported
* Support for public IP (i.e., non-EIP) addresses is unknown

The announcement of Bring Your Own IP can be found here.

[https://aws.amazon.com/about-aws/whats-new/2018/07/announcing-bring-your-own-ip-for-amazon-virtual-private-cloud-preview/](https://aws.amazon.com/about-aws/whats-new/2018/07/announcing-bring-your-own-ip-for-amazon-virtual-private-cloud-preview/ "https://aws.amazon.com/about-aws/whats-new/2018/07/announcing-bring-your-own-ip-for-amazon-virtual-private-cloud-preview/")

Need help determining how BYOIP can benefit your AWS workloads? Contact us today.