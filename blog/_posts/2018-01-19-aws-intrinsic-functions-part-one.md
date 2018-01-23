---
layout: post
title: AWS CloudFormation Intrinsic Functions
author: Jeff Loughridge
image: postimage
published: true
---

<br>
AWS CloudFormation is a tool to create a template for your infrastructure. You can define AWS constructs using JSON or YAML. AWS's documentation is well-suited for explaining the basic functionality and simple resource creation. After creating a few stacks, a newcomer would likely want to learn how to increase template portability and re-use with intrinsic functions. At this point the reference material may be a bit daunting. This article will introduce CloudFormation intrinsic functions by using the creation of a simple VPC as an example.
<br><br>
AWS CloudFormation intrinsic functions help you manage cloud formation stacks by assigning values that are required but are only available at run time (i.e., when the stack is launched). For example, let's say that one of your resources depends on another resource's attributes, which are not defined at the time the template is written. We can use CloudFormation to dynamically access those attributes at run time. 
<br><br>
Here's a list of the intrinsic functions we'll cover in Part 1.
<br><br>
 - [Fn::GetAZs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-getavailabilityzones.html) - returns an array that lists Availability Zones for a specified region

 - [Fn::Select](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-select.html) - returns a single object from a list of objects by index

 - [Fn::Ref](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-ref.html) - returns the value of the specified parameter or resource

 - [Fn::GetAtt](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-getatt.html) - returns the value of an attribute from a resource in the template

 - [Fn::Sub](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-sub.html) - substitutes variables in an input string with values that you specify

 - [Fn::Join](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-join.html) - appends a set of values into a single value, separated by the specified delimiter

Some of Konekti's customers have expressed frustration in writing CloudFormation templates in JSON. We tend to agree as we find reading and writing CloudFormation templates in YAML to be an easier method. The examples in this post will use YAML.
<br><br>
Like JSON, intrinsic functions in YAML can be expressed in templates using the format "Fn::*function_name*". YAML has the advantage of using the short form, "!*function_name*". This means rather than writing "Fn::Sub", you can write "!Sub". Note that the short form notation will indicate invalid when using YAML validators. The AWS CLI command `aws cloudformation validate-template --template-body file://your_template.yaml` can be executed to validate a template.
<br><br>

Our stack will create a VPC with two subnets, one per AZ. The stack also creates an Internet Gateway, and two Routing Tables (one per subnet).
<br><br>
![My helpful screenshot]({{ "/assets/posts/cloudformation_vpc_diagram.png" | absolute_url }})

<br>

#### !GetAZs

For portability and re-use, we want to create a template that will deploy infrastructure in any region. Hard coding 'us-east-1a' links the template this AZ. Launching the stack in another region will result in an error. To resolve this issue, we'll look to !GetAZs. 
<br><br>
This function returns an array. We need a way to access an individual element in the area. 
<br><br>
> When writing templates that reference !GetAZs, don't forget that the
> number of availability zones vary by region. Don't make assumptions
> about the number of AZs.

#### !Select

The !Select function identifies a single object in an array. We want to launch one subnet in the first AZ and another in the second. The expression `AvailabilityZone: !Select [ 0, !GetAZs '' ]` returns the first element of the availability zones array. For us-east-1, the first AZ is us-east-1a.
<br><br>
#### !Ref

The !Ref function gives the author of the template access to variables in the Parameters section of the template.
<br><br>
Let's look at an example.
<br><br>
```
Parameters:

   VpcCIDR:
        Description: Please enter the IP range (CIDR notation) for this VPC
        Type: String
        Default: 172.25.0.0/16
```
<br>
Specifying "!Ref VpcCIDR" in a template will substitute the aforementioned text with "172.25.0.0/16" or the CIDR range specified at run time.
<br><br>
#### !GetAtt
When we need to access Parameters, we use !Ref. !GetAtt provides similar functionality for accessing resource attributes in the template.
<br><br>
The !GetAtt [documentation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-getatt.html) provides the attributes available for each resource. A VPC has a "DefaultSecurityGroup" attribute. We reference this security group using `!GetAttr VPC.DefaultSecurityGroup`. 
<br><br>
#### !Sub
The !Sub function replaces a variable with its value. The function can be used with or without a mapping. We'll use an example of basic substitution without a mapping.
<br><br>
The expression `!Sub ${EnvironmentName}` fills in the value of the `EnvironmentName` parameter. Placing the expression in the Outputs section would print "Konekti-prod" if the default environment name from the Parameters section is used. Note that !Ref could be used instead. A more useful case for calling !Ref would be to dynamically create an S3 bucket name or URL.
<br><br>

#### !Join
If you are a python developer, the `!Join` function is reminiscent of the python `join` method. The result is the string "1,2,3). The comma serves as a separater character. The same holds true for the expression `!Join [ ",", [ !Ref Subnet1, !Ref Subnet2 ]]`.
<br><br>

```
Description:
    This template deploys a VPC with two Availability Zones, each with
    one subnet. It also deploys an Internet Gateway and a Route Table.

Parameters:

    EnvironmentName:
        Description: 
            Please enter a name for this VPC
        Type: String
        Default: Konekti-prod

    VpcCIDR:
        Description: 
            Please enter the IP range in CIDR notation for this VPC
        Type: String
        Default: 172.25.0.0/16

    Subnet1CIDR:
        Description: 
            Please enter the IP range in CIDR notation for the 
            subnet in the first Availability Zone
        Type: String
        Default: 172.25.30.0/24

    Subnet2CIDR:
        Description: 
            Please enter the IP range (CIDR notation) for the
            subnet in the second Availability Zone
        Type: String
        Default: 172.25.32.0/24

Resources:

    VPC:
        Type: AWS::EC2::VPC
        Properties:
            CidrBlock: !Ref VpcCIDR
            Tags:
                - Key: Name
                  Value: !Ref EnvironmentName

    InternetGateway:
        Type: AWS::EC2::InternetGateway
        Properties:
            Tags:
                - Key: Name
                  Value: !Ref EnvironmentName

    InternetGatewayAttachment:
        Type: AWS::EC2::VPCGatewayAttachment
        Properties:
            InternetGatewayId: !Ref InternetGateway
            VpcId: !Ref VPC

    Subnet1:
        Type: AWS::EC2::Subnet
        Properties:
            VpcId: !Ref VPC
            AvailabilityZone: !Select [ 0, !GetAZs '' ]
            CidrBlock: !Ref Subnet1CIDR
            MapPublicIpOnLaunch: false
            Tags:
                - Key: Name
                  Value: !Sub ${EnvironmentName} AZ1

    Subnet2:
        Type: AWS::EC2::Subnet
        Properties:
            VpcId: !Ref VPC
            AvailabilityZone: !Select [ 1, !GetAZs '' ]
            CidrBlock: !Ref Subnet2CIDR
            MapPublicIpOnLaunch: false
            Tags:
                - Key: Name
                  Value: !Sub ${EnvironmentName} AZ2

    RouteTable:
        Type: AWS::EC2::RouteTable
        Properties:
            VpcId: !Ref VPC
            Tags:
                - Key: Name
                  Value: !Sub ${EnvironmentName}

    DefaultRoute:
        Type: AWS::EC2::Route
        DependsOn: InternetGatewayAttachment
        Properties:
            RouteTableId: !Ref RouteTable
            DestinationCidrBlock: 0.0.0.0/0
            GatewayId: !Ref InternetGateway

    Subnet1RouteTableAssociation:
        Type: AWS::EC2::SubnetRouteTableAssociation
        Properties:
            RouteTableId: !Ref RouteTable
            SubnetId: !Ref Subnet1

    Subnet2RouteTableAssociation:
        Type: AWS::EC2::SubnetRouteTableAssociation
        Properties:
            RouteTableId: !Ref RouteTable
            SubnetId: !Ref Subnet2

Outputs:

    VPC:
        Description: A reference to the created VPC
        Value: !Ref VPC

    Subnets:
        Description: A list of the  subnets
        Value: !Join [ ",", [ !Ref Subnet1, !Ref Subnet2 ]]

    Subnet1:
        Description: A reference to the  subnet in the 1st Availability Zone
        Value: !Ref Subnet1

    Subnet2:
        Description: A reference to the  subnet in the 2nd Availability Zone
        Value: !Ref Subnet2

    SecurityGroup:
        Description: VPC Default Security Group
        Value: !GetAtt VPC.DefaultSecurityGroup
```
<br>
#### Conclusion

The most important take-away from this article is that you should associate CloudFormation intrinsic functions with run time intelligence. The awareness CloudFormationhas about the resources being created increases the portability of the templates. We did not cover all functions. Check in soon for the second post in this series.

