---
layout: post
author: Jeff Loughridge
image: sky.jpg
title: Creating Global VPC Infrastructure in Minutes
date: 2019-03-12 01:00:00 -0500
---

Amazon encourages companies to stop spending money on undifferentiated heavy lifting. As a developer or solution 
architect, you should take the same approach with respect to the time you invest in learning and experimenting with 
new AWS services and new architectures. Why spend time configuring VPCs with basic infrastructure rather than focusing on
the higher level components that interest you?

I recently wrote a LinkedIn post called 
[Elevating Your  AWS Proficiency Using Automation](https://www.linkedin.com/pulse/elevating-your-aws-proficiency-using-automation-jeff-loughridge/), 
in which I explained how using automation can speed up the process of learning about AWS services. I included simple automation to 
create a VPC. I instructed users to modify a terraform variables file to create a VPC. In the comments section of the post, an 
engineer suggested using YAML for the VPC configuration. I decided to give this a shot and ended up completely re-writing the tool 
in a way that significantly increased its functionality.

I wanted to rewrite the automation in a way that both useful to users who have a solid grasp on infrastructure automation tools 
as well as those who do not. I determined that if I wrote a tool that I would use in my work, others might find it beneficial.

Here were my objectives.

* Minimize the set-up and learning curve for for using the tool
* Configure all VPC parameters in a YAML file
* Deploy multiple VPCs across all AWS regions

I want to introduce the new and improved [AWS VPC Infrastructure Made Easy](https://github.com/jeffbrl/aws-vpc-infrastructure-made-easy)
 tool. The program uses terraform beneath the covers and relies heavily on the 
[terraform-aws-vpc-module](https://github.com/terraform-aws-modules/terraform-aws-vpc). The automation is very flexible in that 
the YAML configuration can contain any valid input to the terraform-aws-module.

Let’s examine a sample YAML configuration.

```
Vpcs:
  - name: red
    region: us-east-1
    cidr_range: 10.0.0.0/16
    azs: [ us-east-1a, us-east-1b ]
    public_subnets: [ 10.0.0.0/24, 10.0.1.0/24 ]
    private_subnets: [ 10.0.100.0/24, 10.0.101.0/24 ]
    enable_s3_endpoint: false
    enable_nat_gateway: false
  - name: black
    region: us-west-1
    cidr_range: 10.100.0.0/16
    azs: [ us-west-1a, us-west-1b ]
    public_subnets: [ 10.100.0.0/24, 10.100.1.0/24 ]
    private_subnets: [ 10.100.100.0/24, 10.100.101.0/24 ]
    enable_s3_endpoint: true
    enable_nat_gateway: false
```

The installation and execution is covered in the README file on github so I won’t repeat it here. 

I ran a test to see how fast the tool could instantiate ten VPCs distributed across the globe. The time was one minute and 
twenty seconds. This demonstrates how terraform creates resources in parallel. I’ll note that I did not create any NAT 
gateways, which would have increased the time significantly.

The trickiest aspect of the program was using the terraform-aws-vpc module to deploy across AWS regions as there is no 
‘region’ input to the module. I created a providers.tf file with every region. Here’s a snippet.

```
provider "aws" {
  region = "us-east-1"
  alias  = "us-east-1"
}

provider "aws" {
  region = "us-west-1"
  alias  = "us-west-1"
}
```

In the generated terraform files, I passed the provider alias to the module.

```
module "blue" {
  source = "terraform-aws-modules/vpc/aws"
  name   = "blue"
  cidr   = "10.100.0.0/16"

  providers = {
    aws = "aws.us-west-1"
  }

  azs             = ["us-west-1a", "us-west-1b"]
  public_subnets  = ["10.100.0.0/24", "10.100.1.0/24"]
  private_subnets = ["10.100.100.0/24", "10.100.101.0/24"]

  enable_s3_endpoint = true

  enable_nat_gateway = false
}
```

I recommend running this automation in a test account. The automation is intended for experimentation and 
learning. Do not use it for production.

If you find yourself regularly experimenting with AWS services, you should consider giving this automation a test drive. I welcome 
your feedback and contributions to the code.




