---
layout: post
author: Amir Tabdili
image: postimage
title: The Value of AWS PrivateLink
date: 2018-04-09 21:13:46 +0000
---



A few years ago I had a great business idea…or at the very last I thought I did. Like many ideas, it started with a conversation about something unrelated. One of my colleagues had developed an Ansible-based tool intended to automate deployment of new configurations to hundreds of routers and switches. I wanted to see if the same Ansible tool could be used in the AWS cloud where we had our test topology. Then came the idea: Why not create a more generalized business for “Network Automation as a Service” in AWS? We could have the most repeated configuration tasks sold or rented as blocks (Ansible Playbooks) and allow users to pay for usage of these automation “blocks”. Since the conversation was in the context of routers and switches my initial thoughts were around a service that focused on networking devices, whether in the cloud or on-premises.


Then came the catch. How could we connect our Virtual Private Cloud (VPC) in AWS where our software lived to the customer VPC where the virtual appliance was located? Even better, how could we connect from our AWS VPC to the customer premise where many of their legacy networking devices were in dire need of automation bliss.



#### VPC Peering – Not a Fit

The most obvious existing solution was VPC peering. In the [VPC Peering](https://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/vpc-peering.html) scenario, we would connect the customer VPC to our own VPC, keeping all the traffic private to AWS.  But prior to November 2017, VPC peering was only supported between VPCs in the same region. This limitation meant we needed to deploy our VPC in many regions in order to make customer connections from diverse geographical locations possible. This would force us into a deployment model which was way more expensive than our requirements dictated. To start, we would have liked to limit our VPC deployment to two regions. Even with inter-region VPC peering support, VPC peering came with a whole lot of operational and security baggage.



VPC peering creates too much exposure into the customer’s VPC because it allows connectivity to the full VPC. The connectivity can be limited in both VPCs using routing tables and security groups/NACLs; however, this is an unnecessary burden when providing a single SaaS offering to a customer’s VPC. VPC peering should only be utilized where there are a many services that need connectivity across the two VPCs. If there is this high degree of inter-VPC communication and the security postures of the two VPCs are similar, then VPC peering may be a solution.



To add to the list of issues, VPC peering requires non-overlapping IP addresses. How can we, as the provider of service, guarantee that we will never have an addressing overlap with a customer? We could use an esoteric address range to try to minimize this possibility but no one could argue that this solution is elegant. Finally, scaling limits of the VPC peering are an issue for any business that would like to scale its service many enterprises. Each VPC can only peer with only 125 other VPCs. This would mean that for the 126th customer we would have to create a new VPC. This is hardly a solution that can scale up to the needs of a growing business.



Plus, the VPC peering did not necessarily solve the issue around access to the customer on premise equipment. Such a connectivity probably would require a Direct Connect (too expensive) or an IPsec-based solution (too cumbersome). None of the available solutions at the time gave us what we needed.



#### On the Path to PrivateLink – VPC Endpoints

The predecessor to the PrivateLink solution is “VPC Endpoints” – initially for [S3](https://aws.amazon.com/blogs/aws/new-vpc-endpoint-for-amazon-s3/) and then [DynamoDB](https://aws.amazon.com/blogs/aws/new-vpc-endpoints-for-dynamodb/).  The endpoints provide a gateway within the VPC directly to these AWS public services. Once configured, requests to the endpoint service were automatically routed via the gateway to the service. All the traffic between the VPC and the “Endpoint” service never left the AWS network:



> “A VPC endpoint enables you to privately connect your VPC to supported AWS services and VPC endpoint services…without requiring an internet gateway, NAT device, VPN connection, or AWS Direct Connect connection. Instances in your VPC do not require public IP addresses to communicate with resources in the service. Traffic between your VPC and the other service does not leave the Amazon network.
>
> [https://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/vpc-endpoints.html](https://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/vpc-endpoints.html "https://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/vpc-endpoints.html")”



#### Enter PrivateLink for AWS Services

In early November 2017, AWS announced an extension to VPC endpoints called PrivateLink for AWS Services. Let’s look to the AWS blog for a description of the two pivotal benefits of the initial PrivateLink offering:



> “With traditional endpoints, it’s very much like connecting a virtual cable between your VPC and the AWS service. Connectivity to the AWS service does not require an Internet or NAT gateway, but the endpoint remains outside of your VPC. **With PrivateLink, endpoints are instead created directly inside of your VPC, using Elastic Network Interfaces (ENIs) and IP addresses in your VPC’s subnets**. The service is now in your VPC, enabling connectivity to AWS services via private IP addresses. That means that VPC Security Groups can be used to manage access to the endpoints and that **PrivateLink endpoints can also be accessed from your premises via AWS Direct Connect**.”
>
> [https://aws.amazon.com/blogs/aws/new-aws-privatelink-endpoints-kinesis-ec2-systems-manager-and-elb-apis-in-your-vpc/](https://aws.amazon.com/blogs/aws/new-aws-privatelink-endpoints-kinesis-ec2-systems-manager-and-elb-apis-in-your-vpc/ "https://aws.amazon.com/blogs/aws/new-aws-privatelink-endpoints-kinesis-ec2-systems-manager-and-elb-apis-in-your-vpc/")



Sounds great, right? Yes, for select services provided by AWS. But this still would not allow us to offer our “Network automation as a Service” from our VPC free of the operational hell described previously.



#### SaaS Providers Rejoice – AWS for Customers and Partners

At re:Invent 2017, AWS extended the PrivateLink service to customers and partners.



> “…customers can now use AWS PrivateLink to access third party SaaS applications from their Virtual Private Cloud (VPC) without exposing their VPC to the public Internet. Customers can also use AWS PrivateLink to connect services across different accounts and VPCs within their own organizations, significantly simplifying their internal network architecture”
>
> [https://aws.amazon.com/about-aws/whats-new/2017/11/aws-privatelink-now-available-for-customer-and-partner-services/](https://aws.amazon.com/about-aws/whats-new/2017/11/aws-privatelink-now-available-for-customer-and-partner-services/ "https://aws.amazon.com/about-aws/whats-new/2017/11/aws-privatelink-now-available-for-customer-and-partner-services/")



With  AWS PrivateLink for customer and partners, businesses can now make their services available to other accounts and VPCs that are accessed securely as private endpoints. Customers of the service connect to these private endpoints in the normal manner, while on the service side, AWS PrivateLink works in combination with a Network Load Balancer to route traffic to service instances, containers, or IP targets.  These service resources would appear as endpoints in the customer VPC, enabling direct connectivity to the service via private IP addresses. Customers can further decide choose which of their VPCs and subnets can have access to the endpoint. This effectively allows a provider’s service to function like it is hosted directly on the customer’s private network.



Going back to my “Network Automation as Service” idea, we could now offer AWS PrivateLink services for subscription to our automation service in the AWS Marketplace. We would be notified of new subscription requests and could decide to accept or reject each request. As we scaled our business, we would accept the request as part of a larger, and perhaps automated, onboarding workflow for a new customer. Furthermore, our infrastructure and the service consumer’s resources would run in separate VPCs and AWS accounts and communicate solely through the endpoint, with all the traffic between the endpoints flowing within  Amazon’s private network. Service consumers don’t have to worry about overlapping IP addresses, arranging for VPC peering, or using a VPC Gateway. Finally, for the consumer of the service, there is no data transfer fee since the traffic consider internal to the VPC.



#### PrivateLink Drawbacks

Well, there are few small details one needs to be aware of: AWS PrivateLink only allows the consumer of the service to initiate request to the provider (unidirectional). If you need bi-directional connectivity, then maybe VPC peering is a better choice.  In addition, traffic to the PrivateLink is load balanced so it inherits many of the restrictions of the load balancers. For example, only TCP traffic is supported for the PrivateLink service.



Given the advantages of PrivateLink, these issues probably won’t amount for much for most applications. We are not alone in recognizing the enormous potential in this new service. The PrivateLink service enables private SaaS offerings that can easily be sold on the AWS Marketplace while meeting customer security requirements.



#### Conclusion

This article hightlighted the business opportunities that PrivateLink creates for providing highly secure, private SaaS between VPCs. The details of its implementation with regard to single vs multi-tenancy, performance, and availability are crucial. As always, Konekti is here to help. [Contact us](https://konekti.us/#contact-us "Contact Us") today.