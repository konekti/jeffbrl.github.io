---
layout: post
author: Jeff Loughridge
image: postimage
title: Are You Using the AWS Default VPC? Stop now!
date: 2018-11-08 21:56:58 -0500

---
In the beginning, the EC2 team in Cape Town, South Africa developed a flat IP network for EC2 instances. Hypervisor-based firewalls separated tenants. Without any way to summarize IP addresses, the network admins’ had a difficult task ensuring developers could reach the instances. The year 2009 ushered in the VPC and the networking components that have underpinned the amazing cloud architecture patterns we have today. The introduction of the VPC was accompanied by the default VPC, which exists in every AWS region.

AWS’s reasoning was sound in offering the default VPC. The adoption of public cloud was not where it is today. Many developers were launching EC2 instances for the first time. AWS wanted the experience to match the simplicity of spinning up instances in what we now call the EC2-Classic platform. For users accustomed to EC2-Classic, AWS wanted developers’ initial experience to be a positive one. In either case, allowing users to avoid instantiating subnets, routing tables, and IGWs before launching an instance benefited VPC adoption. Therefore, a default VPC that included these components permitted customers to dive right in.

By the time the VPC was rolled out, many AWS customers had massive deployments on EC2-Classic. Migrating to EC2-VPC was a challenging task that tooks years in some cases. To make an analogy, the default VPC is like training wheels on a child’s bicycle. It served as a learning tool for developers to experiment with new and improved ways of architecting for the cloud.

Now that my history lesson has concluded, I have advice for all AWS customers. Do not use the default VPC for any production workload. In working on EC2-VPC since 2011, I have yet to encounter a use case for the default VPC except for training new users. The use of the default VPC is not a practice that should be employed for any reason.

What’s the harm in the default VPC? Could its use be such a poor practice? Yes and yes. Let’s explore why this is the case.

The default VPC lacks the proper security and auditing controls. The default VPC does make the best use of critical VPC functionality.

* VPC flow logs - The default VPC does not enable flow logs. The feature allows users to track network flows in the VPC for auditing and troubleshooting purposes. The AWS ecosystem contains many 3rd party tools for analyzing flow logs to increase the value of the data.
* Unrestricted Network Access Control Lists ( NACLs) - This isn’t necessarily a bad practice per se as some customers forgo deny rules in NACLs. At Konekti, we highlight how deny rules in NACLs adds a layer of hardening for network security. You may determine that NACL deny rules add complexity you deem unneeded; however, you should consider the benefits they bring prior to dismissing them outright.
* No tagging - Tagging is a huge benefit. Many clients have told me their AWS epiphany moments. These moments usually involve either CloudFormation or tagging. Using tags and the closely related resource groups simplifies the management of resources in the VPC and helps in analyzing AWS costs.

Automation and the use of the default VPC for production workloads are wholly incompatible. If the VPC ID is not included in AWS API calls, the default VPC is assumed. You don’t want random infrastructure appearing in your VPC.

Have you seen a button like this?

![](https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png)

Deploying untrusted CloudFormation templates without reading them first is a bad practice whether or not you use the default VPC. Launching these templates or using AWS CLI examples from GitHub Gists is a really poor idea if you use the default VPC.

Whether you use CloudFormation, Terraform, or other infrastructure-as-code tool to create AWS infrastructure, you want the templates to be easily reused. You want the ability to build VPCs from scratch and destroy them at will. Using the default VPC engenders many opportunities for mistakes and unexpected results. Avoid them when using automation.

On the networking side, the default VPC enables the assignment of public addresses in public subnets by default. This is a security no-no. If a developer errs in automation or the console, you don’t want the instance to be reachable by the Internet. Mistakes should result in instances unreachable by the Internet, which may harm the service but doesn’t introduce security holes.

Should you delete the default VPCs in the regions? I’ll offer the potentially controversial suggestion to consider doing so. Now that the AWS Console permits users to re-create the default VPC, there’s no need to open a support ticket to restore a deleted default VPC.

I pose this question to my readers: Have I missed a legitimate use of the default VPC in for production workloads? Let me know on twitter or the comments section. I suspect there’s a Solution Architect out there somewhere who may have some interesting tidbit to share. If so, I’ll add an update to this article.