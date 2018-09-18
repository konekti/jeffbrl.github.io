---
layout: post
author: Jeff Loughridge
image: postimage
title: The Rumored AWS Whitebox Switch is a Customer Gateway
date: 2018-09-18 08:28:10 -0400

---
The online publication The Information [reported](https://www.theinformation.com/articles/amazon-web-services-targets-cisco-in-networking "Amazon Web Services Targets Cisco in Networking") in mid-July 2018 that AWS was preparing to sell white box switches with built-in connectivity to its cloud offerings. The rumor depressed Cisco stock and triggered a call from Cisco CEO Chuck Robbins to AWS CEO Andy Jassy. AWS confirmed a Cisco spokeman’s statement that AWS is “not actively building a commercial network switch.” While this statement may be true, I suspect that AWS does have plans to breach enterprise data centers with a physical device: a server capable of hosting a virtual Customer Gateway (CGW).

_Disclaimer: This article is purely speculative based on my thinking about the direction of hybrid cloud. I do not have non-pubic information on the subject._

What is the value of an Amazon-branded virtualization server that implements a CGW? Before answering this question, let’s examine the present state of AWS cloud connectivity.

In AWS, companies that require network connectivity between their Virtual Private Cloud (VPC) and their private infrastructure--either co-lo or on-premises--have several options.

**Internet** - The customer’s infrastructure connects to its VPC(s) using the public Internet. The customer would typically employ secure protocols such as TLS and SSH to ensure traffic is encrypted or can “roll-their-own” VPN to encrypt all traffic (a.k.a. Software VPN in AWS parlance).

**Direct Connect (DX)** - A dedicated circuit links an AWS DX location and the customer’s data center. Customer traffic traverses this private circuit to reach their VPCs. DX provides consistent latency and jitter. One of its biggest selling points is the discounted Data Out rate, which is very attractive for enterprises that transfer large amounts of data out of the cloud.

**Hardware VPN** - This option is a modified form of Software VPN. Rather than having the customer manage the VPN endpoints in the cloud and on-premise, AWS manages a highly available Virtual Gateway (VGW) to terminate IPsec tunnels in the cloud. The customer is responsible for configuring the IPsec endpoint on-premises. The endpoint is typically an Internet edge router at a customer’s site.

The programmability that public cloud engenders spans services such as compute, storage, and **network**. Developers can create new infrastructure using software tools such as CloudFormation and Terraform. That network administration teams often delay enterprise data center deployments while performing tasks such as provisioning VLANs or making firewall rule changes is no industry secret. Deployments to the cloud mostly eliminate the reliance developers have on the network administrators.

The caveat to the dependency elimination is Hardware VPN. The developer can initiate Hardware VPN; however, the IPsec configuration has to be pushed to the Internet edge routers, or CGWs in AWS terminology. While AWS generates CGW IPsec configuration for some vendors and software versions, you risk overwriting rules or inducing other errors if the configuration is improperly vetted.

The networking industry recognizes that the maturity of network automation tools lags server automation by at least five years. Some of the major vendors suffer from poorly API implementations and inconsistency across platforms. The situation is improving; modeling language initiatives such as YANG and OpenConfig provide hope that the industry can adopt a vendor-neutral mechanism for configuring router and other network devices.

The current situation is an impediment both to the developer and to AWS. AWS has a clear interest in moving all enterprise workloads to the cloud. If an enterprise can’t go “all-in” on public cloud, AWS benefits if the Hardware VPN connectivity between the VPC and customer site is seamless. Whether a developer or network engineer, each role feels the kludgy nature of manually configuring the CGW. This is far from an ideal solution.

Imagine a scenario in which the Amazon retail site sells an inexpensive bare metal server that executes the CGW software as a container or virtual machine. This move would effectively extend the VPC into the enterprise data center. The device would be fully controlled via API. AWS would have complete control over the virtualized CGW including tunnel management and software upgrades. The device could even “phone home” to get its initial configuration. The customer would be responsible for power, one-time cabling, and physical redundancy (read: you need at least two Amazon servers that host CGWs).

AWS already has virtual machines that run in the enterprise data center for services such as the Storage Gateway. By providing a virtual machine, the burden of managing the hypervisor--ESXi, Hyper-V, or KVM for examples--remains in the hands of the customer. AWS’s APIs can spin up a new virtual machine or perform other functions possible when AWS “owns” the hardware. The move to container or VM running on AWS hardware is the next logical step as it offloads complexity from the customer to AWS.

This is not a revolutionary concept. Telcos worldwide have embraced the idea of using a universal CPE (uCPE) to deliver customer services. These devices can enable Network Function Virtual (VNF) service chains. For last mile providers that serve end-users, perhaps the biggest win for the uCPE is software upgrades. In the present model, upgrading software/firmware on a cable modem or other CPE is a painful and risk-laden proposition. Moving to an uCPE with VNFs creates an environment in which upgrades could occur on a weekly basic or even more frequently.

What’s good for telcos is good for public cloud providers. While I suspect the initial service will be a virtualized CGW, the Storage Gateway mentioned above is another service that could be implemented on the hardware. AWS launches hundreds of new services or service improvements a year. Amazon’s presence in the data center in the form of this hardware has many applications **that help Amazon sell cloud services**. I am emphasize that point as I am certain that Amazon has no intention of trying to take over the data center. Why? No enterprise data centers are alike. The inherent heterogeneousness is the playground of large VARs and SIs, not players such as Amazon that have profited from offering IT as a service.

Will an Amazon whitebox virtualization server soon take its place next to Deep Lens on amazon.com? My guess is that it will and AWS customers that use the hybrid cloud model will benefit.