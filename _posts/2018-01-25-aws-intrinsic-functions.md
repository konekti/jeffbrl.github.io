---
title: AWS CloudFormation Intrinsic Functions
date: 2018-01-24 19:00:00 -05:00
categories:
- blog
---

<br>
AWS CloudFormation is a tool to create a template for your infrastructure. You can define AWS constructs using JSON or YAML. AWS's documentation is well-suited for explaining the basic functionality and simple resource creation. After creating a few stacks, a newcomer would likely want to learn how to increase template portability and re-use with intrinsic functions. At this point, the reference material may be a bit daunting. This article will introduce CloudFormation intrinsic functions by using the creation of a simple VPC as an example.

AWS CloudFormation intrinsic functions help you manage cloud formation stacks by assigning values that are required but are only available at run time (i.e., when the stack is launched). For example, let's say that one of your resources depends on another resource's attributes, which are not defined at the time the template is written. We can use CloudFormation to dynamically access those attributes at run time. 

Here's a list of the intrinsic functions we'll cover in this post.

 - [Fn::GetAZs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-getavailabilityzones.html) - returns an array that lists Availability Zones for a specified region

 - [Fn::Select](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-select.html) - returns a single object from a list of objects by index

 - [Fn::Ref](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-ref.html) - returns the value of the specified parameter or resource

 - [Fn::GetAtt](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-getatt.html) - returns the value of an attribute from a resource in the template

 - [Fn::Sub](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-sub.html) - substitutes variables in an input string with values that you specify

 - [Fn::Join](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-join.html) - appends a set of values into a single value, separated by the specified delimiter

Some of Konekti's customers have expressed frustration in writing CloudFormation templates in JSON. We tend to agree as we find reading and writing CloudFormation templates in YAML to be an easier method. The examples in this post will use YAML.

Like JSON, intrinsic functions in YAML can be expressed in templates using the format "Fn::*function_name*". YAML has the advantage of using the short form, "!*function_name*". This means rather than writing "Fn::Sub", you can write "!Sub". Note that the short form notation will indicate invalid when using YAML validators. The AWS CLI command `aws cloudformation validate-template --template-body file://your_template.yaml` can be executed to validate a template.


Our stack will create a VPC with two subnets, one per AZ. The stack also creates an Internet Gateway and two Routing Tables (one per subnet).

![VPC Diagram]({{ site.baseurl }}/assets/posts/2018/cloudformation_vpc_diagram.png)

<br>

#### !GetAZs

For portability and re-use, we want to create a template that will deploy infrastructure in any region. Hard coding 'us-east-1a' links the template to this AZ. Launching the stack in another region will result in an error. To resolve this issue, we'll look to !GetAZs. 

This function returns an array. We need a way to access an individual element in the area. 

> When writing templates that reference !GetAZs, don't forget that the
> number of availability zones vary by region. Don't make assumptions
> about the number of AZs.

#### !Select

The !Select function identifies a single object in an array. We want to launch one subnet in the first AZ and another in the second. The expression `AvailabilityZone: !Select [ 0, !GetAZs '' ]` returns the first element of the availability zones array. For us-east-1, the first AZ is us-east-1a.

#### !Ref

The !Ref function gives the author of the template access to variables in the Parameters section of the template.

Let's look at an example.

```yaml
Parameters:

   VpcCIDR:
        Description: Please enter the IP range (CIDR notation) for this VPC
        Type: String
        Default: 172.25.0.0/16
```
<br>
Specifying "!Ref VpcCIDR" in a template will replace the aforementioned text with "172.25.0.0/16" or the CIDR range specified at run time.

#### !GetAtt
When we need to access Parameters, we use !Ref. !GetAtt provides similar functionality for accessing resource attributes in the template.

The !GetAtt [documentation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-getatt.html) provides the attributes available for each resource. A VPC has a "DefaultSecurityGroup" attribute. We reference this security group using `!GetAttr VPC.DefaultSecurityGroup`. 

#### !Sub
The !Sub function replaces a variable with its value. The function can be used with or without a mapping. We'll use an example of basic substitution without a mapping.

The expression `!Sub ${EnvironmentName}` fills in the value of the `EnvironmentName` parameter. Placing the expression in the Outputs section would print "Konekti-prod" if the default environment name from the Parameters section is used. 


#### !Join
If you are a python developer, the `!Join` function is reminiscent of the python `join` method. The result is the string "1,2,3". The comma serves as a separater character. The same holds true for the expression `!Join [ ",", [ !Ref Subnet1, !Ref Subnet2 ]]`.


```yaml
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
#### Creating the stack

Let's demonstrate how the template can be used to build a stack. Copy the text from the template or download it 
[here]({{ site.baseurl }}/assets/posts/2018/vpc.yaml). Validate it using 
`aws cloudformation validate-template --template-body file://vpc.yaml`.

You should see the following if the template validates.

```plaintext
# aws cloudformation validate-template --template-body file://vpc.yaml
{
    "Description": "This template deploys a VPC with two Availability Zones, each with one subnet. It also deploys an Internet Gateway and a Route Table.",
    "Parameters": [
        {
            "DefaultValue": "172.25.0.0/16",
            "NoEcho": false,
            "Description": "Please enter the IP range in CIDR notation for this VPC",
            "ParameterKey": "VpcCIDR"
        },
        {
            "DefaultValue": "Konekti-prod",
            "NoEcho": false,
            "Description": "Please enter a name for this VPC",
            "ParameterKey": "EnvironmentName"
        },
        {
            "DefaultValue": "172.25.32.0/24",
            "NoEcho": false,
            "Description": "Please enter the IP range (CIDR notation) for the subnet in the second Availability Zone",
            "ParameterKey": "Subnet2CIDR"
        },
        {
            "DefaultValue": "172.25.30.0/24",
            "NoEcho": false,
            "Description": "Please enter the IP range in CIDR notation for the subnet in the first Availability Zone",
            "ParameterKey": "Subnet1CIDR"
        }
    ]
}
#
```

The command will return a ValidationError if the template fails validation.

Let's create our stack and examine the outputs.

```plaintext
# aws cloudformation create-stack --stack-name Konekti --template-body file://vpc.yaml
{
    "StackId": "arn:aws:cloudformation:us-east-1:097996670471:stack/Konekti/b9a63580-0235-11e8-a218-50d5ca6326ba"
}
# 

# # wait a few minutes, query the stack, and wait for it to complete if needed

# aws cloudformation describe-stacks --stack-name Konekti | grep StackStatus
            "StackStatus": "CREATE_COMPLETE",
#  aws cloudformation describe-stacks --stack-name Konekti  --output text
STACKS  2018-01-26T01:10:40.614Z        This template deploys a VPC with two Availability Zones, each with one subnet. It also deploys an Internet Gateway and a Route Table.  False   arn:aws:cloudformation:us-east-1:097996670471:stack/Konekti/b9a63580-0235-11e8-a218-50d5ca6326ba       Konekti CREATE_COMPLETE
OUTPUTS A reference to the  subnet in the 1st Availability Zone Subnet1 subnet-fd2842d2
OUTPUTS A reference to the  subnet in the 2nd Availability Zone Subnet2 subnet-8789b9cc
OUTPUTS A list of the  subnets  Subnets subnet-fd2842d2,subnet-8789b9cc
OUTPUTS A reference to the created VPC  VPC     vpc-5c203324
OUTPUTS VPC Default Security Group      SecurityGroup   sg-cc3fd0bb
PARAMETERS      VpcCIDR 172.25.0.0/16
PARAMETERS      EnvironmentName Konekti-prod
PARAMETERS      Subnet2CIDR     172.25.32.0/24
PARAMETERS      Subnet1CIDR     172.25.30.0/24
#

```

Look! We have a stack. We used the OUTPUTS section to display the text related to resource creation. I encourage readers to 
experiment with intrinsic functions using OUTPUTS. If you use Resources such as VPCs, Route Tables and Subnets, no costs 
will be incurred. When you want to delete the stack, execute `aws cloudformation delete-stack --stack-name Konekti`. Remember
that you have a limit of five VPCs per region.



#### Conclusion

The most important take-away from this article is that you should associate CloudFormation intrinsic functions with run 
time intelligence. The awareness CloudFormation has about the resources being created increases the portability of the 
templates. We didn't cover all functions nor describe other critical components of portability such as pseudo parameters.
I'll describe this information in a future post.

