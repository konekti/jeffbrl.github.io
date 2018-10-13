---
layout: post
author: Jeff Loughridge
image: postimage
title: The Shared Network Infrastructure VPC
date: 2018-10-13 10:39:35 -0400

---
Are you uneasy about the way your team manages your VPCs with CloudFormation? As we work with our clients to automate AWS infrastructure, we encourage them to follow established best practices to avoid the painful lessons that beget these recommendations. The belief that your public cloud infrastructure has unique requirements that deviate from AWS’s recommendation is incorrect more often than not. I will highlight a practice that we recommend: the shared network infrastructure VPC.

Engineers searching for example usage of a given software package often locate posts with titles such as “[Insanely complete Ansible playbook, showing off all the options](https://gist.github.com/phred/2897937)”. While these are great as references, you are probably using the tool incorrectly if your templates or playbooks that resemble the posts. When developing CloudFormation templates, avoid creating all-encompassing templates. Specifically, don’t cram the infrastructure and application into a single template.

You may ask, “What the problem with a single CloudFormation template that includes everything from soup to nuts for your application?” This coupling of infrastructure and application is difficult to manage. Even if you have a single team that handles both infrastructure and applications, the two components have very different lifecycles. The networking resources in your VPC--route tables, subnets, Internet Gateways and others--should change very rarely. Applications change much more frequently. Updating the VPC infrastructure ever time the application changes is unnecessary.

Organizing your CloudFormation stacks by lifecycle and ownership is straight from the [AWS CloudFormation Best Practices](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/best-practices.html). This quote from the page is apropos.

"_A layered architecture organizes stacks into multiple horizontal layers that build on top of one another, where each layer has a dependency on the layer directly below it. You can have one or more stacks in each layer, but within each layer, your stacks should have AWS resources with similar lifecycles and ownership_."

We advise including all networking resources in a shared network infrastructure VPC. Consider the situation in which you require a VPC with a public subnet and a private subnet that accesses the Internet through a NAT Gateway. Yes, this is the “VPC with Public and Private Subnets” straight from the VPC Wizard. You can view the approximate CloudFormation template [here](https://github.com/awslabs/aws-cloudformation-templates/blob/master/aws/services/VPC/VPC_With_Managed_NAT_And_Private_Subnet.yaml "VPC With Managed NAT and Private Subnet.").

Let’s return to the AWS CloudFormation Best Practices page for another tidbit: [Use Cross-Stack References to Export Shared Resources](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/best-practices.html#cross-stack). Your application templates need to know what infrastructure exists without hard coding values into the template. Exposing the network resources to your application stack can be achieved using exports in the infrastructure template with imports in the application template.

I’ve extracted the Outputs portion of the CloudFormation template referenced above.

```yaml
  Outputs:
    VPCId:
      Description: "VPCId of the newly created VPC"
      Value:
        Ref: "VPC"
      Export:
        Name:
          !Join ['-', [!Ref 'AWS::Region', !Sub '${AWS::StackName}', 'VPC']]
    PublicSubnet:
      Description: "SubnetId of the public subnet"
      Value:
        Ref: "PublicSubnet"
      Export:
        Name:
          !Join ['-', [!Ref 'AWS::Region', !Sub '${AWS::StackName}', 'PublicSubnet']]
    PrivateSubnet:
      Description: "SubnetId of the private subnet"
      Value:
        Ref: "PrivateSubnet"
      Export:
        Name:
          !Join ['-', [!Ref 'AWS::Region', !Sub '${AWS::StackName}', 'PrivateSubnet']]
    DefaultSecurityGroup:
      Description: "DefaultSecurityGroup Id "
      Value: { "Fn::GetAtt" : ["VPC", "DefaultSecurityGroup"] }
      Export:
        Name:
          !Join ['-', [!Ref 'AWS::Region', !Sub '${AWS::StackName}', 'DefaultSecurityGroup']]
```

Notice how the VPC, subnets, and default security groups are exported. Now the application template can call the Fn:ImportValue function as depicted below in defining an EC2 resource.

```yaml
  LinuxInstance:
    Type: 'AWS::EC2::Instance'
    Properties:
      Tags:
      - Key: Name
        Value: !Join [ '-', [ !Ref 'AWS::StackName', 'Linux-EC2' ] ]
      KeyName: !Ref KeyName
      ImageId: !FindInMap [ LinuxRegionMap, !Ref 'AWS::Region', LinuxAMI ]
      InstanceType: t3.nano
      SubnetId: !ImportValue PrivateSubnet
```

I discussed how the networking resources belong in the shared network infrastructure VPC template. Do this apply for the various Elastic Load Balancer types? The answer--like many answers in IT and computer science--is “it depends.” I lean toward letting the application owners manage the ELBs as these are intimately tied to applications. If the application owners want to want to use path-based routing to share ELBs among applications, let them manage this shared resource.

I hope this article provides helpful guidance to companies beginning their journey into infrastructure-as-code in the cloud as well as automation adopters that currently rely on monolithic templates. Should you need guidance on designing your shared network infrastructure VPC or implementing the template, we can help you. [Contact us](https://konekti.us/#contact "Contact Us") today.