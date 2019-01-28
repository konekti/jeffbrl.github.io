---
layout: post
author: Jeff Loughridge
image: sky.jpg
title: Simple VPC Peering with Terraform
date: 2019-01-28 09:00:00 -0500
---

At Konekti, we've observed that many of our clients prefer to use terraform to create AWS infrastructure.
We understand this choice. Terraform's cross-platform nature and use of modules make it very flexible
and easy to adopt.

The purpose of this post is to demonstrate how easy it is to create two VPCs and then create a VPC peering connection
between them. You can find a number of posts on the Internet about VPC peering using terraform. Why write another?
I want to be able to point engineers to a very simple example that creates two VPCs in the same account using the aws_vpc 
module, creates the VPC peering, and then references the outputs of the aws_vpc module to enable routing between the
subnets. You can find more complex, cross-account examples elsewhere. This post is about the basics.

Let's take a look at the terraform code.

{% gist 37f6dd1285a68e8ca4660b04654bb778 %}

Here are a few things I want to highlight.
* The VPCs are named vpc-east and vpc-west even though both reside in us-west-1. I tend to think about diagrams
in terms of "east" and "west". I could have just as easily called them "vpc-one" and "vpc-two". The naming isn't 
important.
* The terraform [aws_vpc module](https://www.terraform.io/docs/providers/aws/r/vpc.html) does the heavy lifting
of creating the VPCs, subnets, and routing tables.
* The use of "count", terraform's looping construct, populates the two routing tables per VPC with the routes to reach 
the other VPC via the VPC peering connection.

You can view the full code on [Github](https://github.com/jeffbrl/terraform-examples/tree/master/vpc-peering-same-account).
