---
layout: post
author: Jeff Loughridge
image: sky.jpg
title: Using Terraform to Implement a Regional Full VPC Mesh with the AWS Transit Gateway
date: 2019-02-20 09:00:00 -0500
---

Amazon provided infrastructure architects a transformative VPC component in its November 2018 introduction of the AWS Transit Gateway
(TGW). The TGW can be used to simplify previously complex and management-intensive architectures such as those involving Transit VPCs.
In this post, I'll use terraform to create a full mesh of connectivity between four VPCs in a single region.

Wouldn't using the TGW to implement an inter-region VPC full mesh be more useful? Definitely. At the time of writing, the TGW cannot
be used to connect VPCs between regions. In Nick Matthews's [AWS Transit Gateway & Transit VPCs, Ref Arch for Many VPCs 
(NET402)](https://youtu.be/ar6sLmJ45xs) talk at re:Invent 2018, he communicated that inter-region peering with the TGW is "coming 
soon."

Let's consider the following simply use case that I've constructed primarily to demonstrate the TGW automation. You've 
requested that AWS increase its default five VPCs per region limit to a large number. You want a full mesh of connectivity between 
VPCs. Network engineers familiar with internal BGP with recognize that this requires N(N-1)/2 VPC peerings.

The following diagram depicts a simplified four VPC full mesh using VPC peering.

![VPC Peering Full Mesh Diagram](/uploads/2019/02/20/vpc-peering-full-mesh.png "VPC Peering Full Mesh")

This full mesh can grow to 125 VPC peerings upon request. This is hard limit. To establish routing between VPCs, 
you'll have to request that Amazon increase the number of routes per routing table.

What if you want to add a 17th VPC? The required number of VPC peerings is 17*16/2 = 136. Uh oh. A redesign is needed. 
Fortunately, using TGW to implement a full mesh of VPC connectivity is simple.

This diagram depicts the new design using TGW.

![VPC Connectivity Full Mesh Using Transit Gateway Diagram](/uploads/2019/02/20/vpc-full-mesh-tgw.PNG
"Full VPC Connectivity Mesh using Transit Gateway")

The TGW uses VPC attachments to "hook" the VPCs into the TGW. This example uses the TGW's default routing table (or routing domain
as the AWS re:Invent speakers call it). More complex TGW architectures involving segmentation and Transit VPC replacement will
require multiple routing tables but this isn't needed for the use case in this post.

The connectivity in the TGW design matches the VPC peering full mesh design. Each subnet in a VPC that requires connectivity to 
the full mesh of VPCs will need a routing table entry with a destination of the TGW ID. You need only one entry to the TGW if
your VPC CIDR ranges can be summarized in a CIDR prefix such as 10.0.0.0/8. If not, you'll need more routing entries in the 
routing table.

Let's build a full mesh of VPC connectivity using terraform. This example will use four VPCs. The VPC named vpc-one will have a 
public subnet with connectivity to the TGW so that you can test the full mesh.

{% gist ba1ee1001ea3c706395da811fc2c0379 vpc-full-mesh-tgw.tf %}

Now let's create an instance in vpc-one's public subnet as a bastion host and one instance for the remaining VPCs for testing. I
am using the Tokyo region as I suspect most of my readers do not have VPCs deployed there and the region supports TGW. If you have
more than one existing VPC in the Tokyo region, you can either request more VPCs in that region or make minor alterations in
the terraform templates to change to another AWS region.

{% gist ba1ee1001ea3c706395da811fc2c0379 vpc-instances-tf %}

To execute the automation and verify connectivity, perform these steps.

1. git clone https://github.com/jeffbrl/terraform-examples.git
2. cd terraform-examples/full-vpc-mesh-with-transit-gateway
3. Issue "ssh-keygen -f mykey" to generate an ssh keypair.
4. Configure your AWS credentials as described [here](https://www.terraform.io/docs/providers/aws/)
5. terraform init
6. terraform plan
7. terraform apply
8. Note the public IP of the bastion host in vpc-one displayed in the output of 'terraform apply'.
9. Note the private IP addresses of vpc-two, vpc-three, and vpc-four.
10. SSH into the bastion host using "ssh -i mykey ubuntu@insert-public-ip-here"
11. Ping the private IP addresses of vpc-two, vpc-three, and vpc-four.

You should be able to ping every private IP address from the bastion host. In addition, you can test using ssh. The
automation uploads the private key you created via user-data. The file is ~ubuntu/mykey.

Execute "terraform destroy" once your testing is complete to avoid incurring unnecessary charges.

I'd like to highlight that the TGW is priced based on the number of attachments per hour and the data throughput. If you
are considering moving from a full mesh of VPC peering, keep in mind that VPC peering has no hourly charge and that you 
only pay for data throughput.

There you have it - a full mesh of connectivity between VPCs in a single region using the AWS Transit Gateway. 
Future posts will cover more complex architectures with the TGW. If you have any questions, please leave them in the 
comments or [contact us](https://konekti.us/#contact-us "Contact Us") at Konekti.

