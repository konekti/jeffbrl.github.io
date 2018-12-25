---
layout: post
author: Jeff Loughridge
image: sky
title: Linux Instance with GUI Using CloudFormation
date: 2018-12-25 02:00:00 -0500
---

In testing various virtual appliances on the AWS Marketplace, we realized that having an EC2 instance with a GUI helps in
experimenting with the features of the appliances. We can use the GUI to manage the appliance on an inside interface
as many appliances are GUI-centric. Another use is testing web traffic filtering with an appliance serving as a web proxy. 
While there are alternatives that we could use (SSH tunneling comes to mind), we find that the GUI is more convenient.

We tested a number of open source options before settling on using Ubuntu, LXDE, and x2go. The GUI is very responsive on
a t3.medium instance. You can increase the size of the instance if you want more horsepower.

The GUI has more uses than testing virtual appliances. With the appropriate hardening, you could use it as a bastion host. Another
use is as an alternative to Workspaces.

We're put together a CloudFormation template to get you started. You must supply the name of an existing SSH key and public subnet.

Let's step through how to launch the EC2 instance using the provided template.

1. Select an existing VPC in us-east-1 or us-west-1. These regions are the only two with AMI mappings defined in the template. I used
an Ubuntu 16.04 AMI. You can add additional AMI mappings for other regions as needed.
2. Select an existing public subnet in the VPC.
3. Download the CloudFormation template [here](/uploads/2018/12/25/linux_gui.yml).
4. Launch the CloudFormation template in the console or using the CLI.

    If using the CLI, here is the syntax.

    ```aws cloudformation create-stack --stack-name linux-gui --parameters ParameterKey=KeyName,ParameterValue=mykey 
    ParameterKey=Subnet,ParameterValue=subnet-xxxxxxxx ParameterKey=VPC,ParameterValue=vpc-xxxxxxxx --template-body 
    file://linux_gui.yml --region us-west-1```

    Replace subnet-xxxxxxxx with the ID of existing subnet and vpc-xxxxxxxx with the ID of an existing VPC.

5. Download the x2go client software from [https://wiki.x2go.org/doku.php/download:start](https://wiki.x2go.org/doku.php/download:start) 
and install it.

6. Use "ubuntu" as the username and the public DNS name from the template Outputs to connect the x2go client to 
the EC2 instance. 

The image below depicts the LXDE desktop in an x2go client window.

![LXDE desktop](/uploads/2018/12/25/x2go.PNG)

Your GUI in the VPC is ready to go. Keep in mind your instance can reach any IP address in the Classless Inter-domain Routing 
(CIDR) range assigned to the VPC. This concept is important to understand in the case that you want to test a virtual appliance
that implements a web proxy listening on an Elastic Network Interface (ENI) in a private subnet.

I hope readers found this post useful. 
