---
layout: post
author: Jeff Loughridge
image: sky.jpg
title: Inbound Traffic Inspection in the VPC
date: 2020-04-17 00:00:00 -0500

---

Highly regulated industries typically have a requirement for a firewall to inspect all traffic and out 
of select VPCs. The traffic could be sourced from other VPCs, on-premise or the Internet. In this post, we'll 
examine two designs for forcing all inbound traffic from the Internet to traverse a firewall or similar appliance.

Prior the announcement of VPC Ingress Routing in fall 2019, VPC architects had limited options for forcing inbound 
traffic to a pair of appliances. Why is this tricky? Think about your experience deploying EC2 instances in the VPC.
Deploying an instance in a public subnet with a public IP address results in the instance being directly exposed to
the Internet. Most instances in private subnets are fronted by a load balancer. If requirements dictate inbound
inspects, we need a method for inserting an appliance in the path as the traffic enters the VPC.

The appliances in the path ususally maintain network state. If a packet enters on Appliance A and exits on 
Appliance B, Appliance B will not have information about this flow and packets will be discarded. Therefore,
the traffic path must be symmetrical. We can enforce traffic symmetry using Source Network Address Translation 
(NAT). Return traffic will use the corresponding destination IP address of the appliance traversed in the
inbound direction.

Let's get started! Our example will use open-source routers that function as firewalls. To maintain high availability, 
our infrastructure will reside in two availability zones (AZs). Two firewalls are required--one per availability 
zone--which we'll call FW1 (AZ A) and FW2 (AZ B). The firewalls are EC instances running VyOS. In our experience, 
clients often use appliances from traditional network vendors that publish AMIs on the AWS Marketplace.

The firewalls are configured for two data plane interfaces. We'll refer to the Internet-facing Elastic Network
Interface (ENI) as UNTRUST, as it would typically reside in a security zone labeled UNTRUST in a zone-based 
firewall. The ENI that faces the internal services is called TRUST. 

Our VPC provides two services creatively called APP1 and APP2. These apps are running on EC2 instances in 
both AZs. The services could be HTTP-based or any TCP/UDP service. This design does include an application
load balancer, which would restrict traffic to HTTP.

Here is a diagram.

![VPC Diagram]({{ site.baseurl }}/assets/posts/2020/inbound-inspection-diagram.png)

The first option for accessing the two services is the use of one Elastic IP (EIP) per service. Two EIPs
are applied to FW1's UNTRUST ENI and two are applied to FW2. Note that each firewall has EIPs for each application.

Incoming packets destined for the EIPs of the firewalls will have their destination addresses rewritten on 
the Internet Gateway (IGW) to the private VPC CIDR addresses. This action is always performed by the IGW; it
is not specific to inbound inspection.

The firewalls use policy-based routing to forward traffic to the EC2 instances that serves the application.
Specifically, the firewall performs a destination IP re-write to the appropriate EC2 instance based on which private
UNTRUST ENI address on which it arrived. In addition, the source IP address is re-written to the private address
of the TRUST ENI to ensure symmetric flows as discussed previously.

The policy-based routing configuration will vary based on the appliation. Here are snippets of the VyOS
configuration that includes the policy-based routing and NAT.

FW1
```
set nat destination rule 100 description 'DNAT FOR APP1'
set nat destination rule 100 destination address '10.0.0.10'
set nat destination rule 100 inbound-interface 'eth0'
set nat destination rule 100 protocol 'tcp'
set nat destination rule 100 translation address '10.0.5.100'
set nat destination rule 200 description 'DNAT FOR APP2'
set nat destination rule 200 destination address '10.0.0.20'
set nat destination rule 200 inbound-interface 'eth0'
set nat destination rule 200 protocol 'tcp'
set nat destination rule 200 translation address '10.0.5.200'
set nat source rule 100 outbound-interface 'eth1'
set nat source rule 100 source address '0.0.0.0/0'
set nat source rule 100 translation address 'masquerade'
```
  
FW2
```
set nat destination rule 100 description 'DNAT FOR APP1'
set nat destination rule 100 destination address '10.0.0.10'
set nat destination rule 100 inbound-interface 'eth0'
set nat destination rule 100 protocol 'tcp'
set nat destination rule 100 translation address '10.0.5.100'
set nat destination rule 200 description 'DNAT FOR APP2'
set nat destination rule 200 destination address '10.0.0.20'
set nat destination rule 200 inbound-interface 'eth0'
set nat destination rule 200 protocol 'tcp'
set nat destination rule 200 translation address '10.0.5.200'
set nat source rule 100 outbound-interface 'eth1'
set nat source rule 100 source address '0.0.0.0/0'
set nat source rule 100 translation address 'masquerade'
```
  

In the return direction, the EC2 instance will generate packets destined for the private TRUST ENI of the firewall
in the same AZ. The FW will re-write the source IP address to the private UNTRUST ENI. As the packet exits the
VPC, the IGW will re-write the destination to the original client IP address.

The final step is to configure your DNS zone for the two apps. APP1.yourdomain.com should include two A records, 
one the APP1 EIP on FW1 and one for the APP1 EIP on FW2. The same logic is used for the APP2 A records with the 
EIPs for APP2 on each firewall.

The disadvantage of this approach is number of required EIPs. With one EIP per service, the number of EIPs can 
quickly exceed the soft limit of five EIPs per region. While this limit can be raised via support ticket, this
approach does not scale to many applications.

AZ failover in this design can be automatic if your domain name is hosted in Route 53. You can associate a health
check such that only EIPs for healthy targets are returned. If you domain is not in Route 53, you'd have to write
a script or lambda function to perform the health check and modify your zone as necessary using your DNS provider's 
API.

Let's change the design so that only one EIP is assigned to reach firewall. We'll modify the policy-based routing 
to make its decisions based on destination ports. When a packet arrives at the UNTRUST ENI, the firewall examines 
the destination port and forwards the packet accordingly.

Here are the relevant snippet of the VyOS configuration for translating based on port.

FW1
```
set nat destination rule 100 description 'DNAT FOR APP1'
set nat destination rule 100 destination port '8080'
set nat destination rule 100 inbound-interface 'eth0'
set nat destination rule 100 protocol 'tcp'
set nat destination rule 100 translation address '10.0.5.100'
set nat destination rule 100 translation port '80'
set nat destination rule 200 description 'DNAT FOR APP2'
set nat destination rule 200 destination port '8081'
set nat destination rule 200 inbound-interface 'eth0'
set nat destination rule 200 protocol 'tcp'
set nat destination rule 200 translation address '10.0.5.200'
set nat destination rule 200 translation port '80'
set nat source rule 100 outbound-interface 'eth1'
set nat source rule 100 source address '0.0.0.0/0'
set nat source rule 100 translation address 'masquerade'
```
  
FW2
```
set nat destination rule 100 description 'DNAT FOR APP1'
set nat destination rule 100 destination port '8080'
set nat destination rule 100 inbound-interface 'eth0'
set nat destination rule 100 protocol 'tcp'
set nat destination rule 100 translation address '10.0.6.100'
set nat destination rule 100 translation port '80'
set nat destination rule 200 description 'DNAT FOR APP2'
set nat destination rule 200 destination port '8081'
set nat destination rule 200 inbound-interface 'eth0'
set nat destination rule 200 protocol 'tcp'
set nat destination rule 200 translation address '10.0.6.200'
set nat destination rule 200 translation port '80'
set nat source rule 100 outbound-interface 'eth1'
set nat source rule 100 source address '0.0.0.0/0'
set nat source rule 100 translation address 'masquerade'
```

The disadvantage of this approach is the need for port numbers in URLs for web applications. 
You don't want to direct a customer to https://example.com:8080. This technique is more appropriate
for non-HTTP traffic or machine-to-machine HTTP traffic. Also, AZ failover will have to be handled at
the application layer.

I've created CloudFormation templates for the multiple EIP and single EIP with port designs. See 
[here](https://github.com/jeffbrl/cloudformation-examples/blob/89e14b4cdb49039211d5652671986a7804e8f84f/ingress-inspection-EIP-per-service.yaml)
and
[here](https://github.com/jeffbrl/cloudformation-examples/blob/89e14b4cdb49039211d5652671986a7804e8f84f/ingress-inspection-EIP-per-firewall.yaml)
respectively. I included VyOS AMI mappings for us-east-1 and us-west-1 only. The template should be
launched in one of those regions. Keep in mind that the infrastructure described in the templates require
either two or four available EIPs in the region.

For those who want to log in to the VyOS instances, you'll need to launch a bastion host. You will not be able to
SSH to the instances using the EIPs.

For production environments, I recommend inserting a load balancer between the firewalls
and the EC2 instances. I want to point out two caveats. Each appliance will need a static route to
the other AZ's private subnet prefix as the internal load balancer's domain name can resolve to the private subnet
of AZ A or AZ B. My example VyoS configs include the static route. In addition, you'll need to cope with dynamic 
nature of ALB IP addresses. Many appliances can route to a FQDN  
(e.g., internal-foo-1138859725.us-east-2.elb.amazonaws.com). If devices cannot do this, a lambda function can be used 
to change the static route in the appliance if the ALB's IP changes.

This concludes the first part of our examination of inbound inspection. Future posts will highlight
the sandwich architecture and VPC ingress routing.
