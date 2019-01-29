---
layout: post
author: Jeff Loughridge
image: sky.jpg
title: Outbound Internet Access via Web Proxy and AWS VPC Peering
date: 2019-01-29 09:00:00 -0500
---
AWS provides the mechanisms to create VPC designs that run the gamut of 
the complexity spectrum. You can deploy your application in a single VPC 
with only public subnets. Other applications may be better suited to a 
collection of VPCs with both public and private subnets. You can use 
VPCs as building blocks for large-scale distributed applications, a 
design decision that requires VPCs to communicate to one another. In 
this post, I’ll examine a VPC design pattern in which a VPC is 
dedicated for providing internet access using VPC peering with a web 
proxy. 

Consider the scenario in which you maintain applications in separate 
VPCs. The applications require outbound access to the Internet and do 
not offer any Internet-facing services. When the number of VPCs is many, 
centralizing the egress point for all traffic to the Internet may help 
an organization meet specialized security requirements. The centralized 
point for policy enforcement can be implemented with a pair of security 
appliances in a VPC dedicated to providing egress to the Internet. In a 
networking chalk talk at re:Invent 2018, an AWS engineer referred to 
this design pattern as an outbound services VPC. The use of web proxies 
is one implementation of an outbound services VPC. 

Why centralize outbound Internet access? From a security perspective, 
the company might want to perform URL filtering, IDS/IPS, or 
application-layer filtering. By centralizing outbound access, the 
company’s security team can manage policy in a smaller number of 
places. Security appliances are not needed in every application VPC, 
which has benefits in terms of cost and decoupling the application 
lifecycle from the outbound services VPC. 

The applications are instantiated in other dedicated VPCs. Traffic from 
these VPCs must traverse the outbound services VPC to reach the 
Internet. Recall that transitive traffic in the VPC is prohibited: 
traffic that is sourced in one VPC and directed toward a second VPC must 
terminate in the second VPC. For this reason, you can’t rely on VPC 
peering alone for enabling applications VPCs to traverse the outbound 
services VPCs. The traffic would be dropped. 

By adding a pair of proxy servers in the outbound services VPC, the 
limitation on the non-transitive nature of VPCs can be worked around. The 
servers in the application VPCs that require outbound access are 
configured to use the proxies in the outbound services VPC. This 
terminates the TCP connection in the outbound services VPC and creates a 
new TCP session for the proxy to Internet web server connection. 

VPC peering is ideal for inter-VPC connectivity for a host of reasons. 

* VPC peering is highly available service provided as a native VPC component
* VPC peering traffic uses the private AWS network backbone
* VPC peering can be established between AWS regions 
* VPC peering traffic is encrypted when established between regions 
* Network throughput with VPC peering is higher than you'll experience with AWS Managed VPN

Let’s examine a diagram of this design. 

![Outbound Services VPC Diagram](/uploads/2019/01/29/Proxy_diagram.png)

The diagram depicts EC2 servers in application VPCs. These instances 
must be configured to use the web proxies in the outbound services VPC. 
The outbound service VPC can be a simple as two web proxies running on 
EC2 instances. A more robust implementation would use a proxy farm 
fronted by an ELB. 

Let’s check out how we can use a squid proxy in the outbound services 
VPC to proxy connections from an application VPC. 

Here is the outbound VPC template.

{% gist 9d8b009cb7e91c14714e590bbdfb2568 outbound_vpc_proxy.yml %}

The next template creates one application VPC with an EC2 instance for testing.

{% gist 9d8b009cb7e91c14714e590bbdfb2568 app_vpc_proxy_access.yml %}


First launch the outbound services VPC stack.

```
aws cloudformation create-stack --stack-name outbound-vpc 
--template-body file://outbound_vpc_proxy.yml --parameters 
ParameterKey=KeyName,ParameterValue=YourSSHKeyHere --region us-east-1
```

Now launch a template for a single application VPC using the name of outbound services VPC
stack so that the peer VPC ID can be imported.

```
aws cloudformation create-stack --stack-name app1 --template-body 
file://app_vpc_proxy_access.yml --parameters 
ParameterKey=OutboundVpcStack,ParameterValue=outbound-vpc --region us-east-1
ParameterKey=KeyName,ParameterValue=YourSSHKeyHere 
```

To verify that the application VPC uses the proxy to reach Internet web servers, ssh into the squid proxy as ec2-user.
Next ssh to the Ubuntu EC2 instance using the "ubuntu" username. Type 'curl https://konekti.us' and you will retrieve
the contents of the Konekti landing page.

I'll note several things about the templates.
* AWS SSM can be used to locate the latest Amazon Linux AMI. See this blog 
[post](https://aws.amazon.com/blogs/compute/query-for-the-latest-amazon-linux-ami-ids-using-aws-systems-manager-parameter-store/)
for more details.

* For serving as a basic web proxy, no additional configuration for squid on Amazon Linux 2 is required.

* Additional application VPCs can be deployed by overriding the default AppVpcCIDR parameter to use unique CIDR ranges.

The VPC design pattern described in this post is very helpful for companies that require strict security controls. If you have 
any questions, please contact Konekti using this [form](https://konekti.us/#contact).
