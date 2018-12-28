---
layout: post
author: Jeff Loughridge
image: sky
title: Reclaiming AWS Elastic IP Addresses
date: 2018-12-28 09:00:00 -0500
---

Humans err. In working on AWS infrastructure, performing tasks in the Console clearly leaves room for mistakes. Even carefully 
crafted automation can contain defects. In this post, I'll describe a feature AWS offers that you can use when you accidentally
release Elastic IP (EIP) assigned to your account.

I discussed the importance of fixed IP addresses in the VPC in a previous 
[post](https://konekti.us/2018/12/20/the-most-common-mistake-ip-addresses.html). 
Fixed IP addresses in the VPC are called EIPs. You can perform four actions on EIPs.

1. Allocate - Request EIPs from an Amazon pool or an IP address pool that you've "ported" to AWS using the new BYOIP feature.

2. Associate - Assign EIPs from your account to an Elastic Network Interface (ENI). If an instance has a single ENI, you can 
associate the EIP to an instance.

3. Disassociate - Remove association between an EIP and an ENI.

4. Release - Relinquish the EIP from your account.

Let's take a look at the steps using the boto3 python module and the AWS CLI.

Python
```python
import boto3

ENI_ID = 'eni-0db349fd2b49c87d2'

ec2 = boto3.client('ec2')

eip = ec2.allocate_address(Domain='vpc')
print("EIP Allocatation ID: {}	IP address: {}".format(eip['AllocationId'], 
    eip['PublicIp'])

response = ec2.associate_address(
    AllocationId=eip['AllocationId'],
    NetworkInterfaceId=ENI_ID
)
print("EIP Association ID: {}".format(response['AssociationId']))

response = ec2.disassociate_address(
    AssociationId=reponse['AssociationId']
)

response = ec2.release_address(AllocationId=eip['AllocationId'])
```

AWS CLI

```bash
#!/bin/bash

ENI='eni-0db349fd2b49c87d2'

allocation_id=$(aws ec2 allocate-address --query "AllocationId" --output text)
ip=$(aws ec2 describe-addresses --allocation-ids $allocation_id \
--query "Addresses[0].PublicIp" --output text)
echo "Allocation ID: $allocation_id	 EIP: $ip"

association_id=$(aws ec2 associate-address  --network-interface-id $eni_id \
--allocation-id $allocation_id --output text)
aws ec2 disassociate-address --association-id $association_id
aws ec2 release-address --allocation-id $allocation_id
```

#### EIP Recovery

What happens when you accidentally release an EIP associated with your account? In previous years, you had to open a ticket
with AWS Support to attempt to recover the specific IP addresses. If no other customer allocated the IP address in the time
since the accidental release, AWS would allocate the IP address into your account.  EC2 software developers added the ability 
to attempt this recovery in the API and CLI.

Here is how this performed in python and the CLI.

Python
```python
import sys

import boto3

allocation_id = 'eipalloc-0ecd17945768c2718'

ec2 = boto3.client('ec2')
response = ec2.describe_addresses(AllocationIds= [ allocation_id ])
ip = response['Addresses'][0]['PublicIp']
response = ec2.release_address(AllocationId=allocation_id)

# attempt recovery
try:
    response = ec2.allocate_address(Address=ip)
except botocore.exceptions.ClientError:
    print("Unable to reclaim {}".format(ip))
    sys.exit(1)
print("successfully reclaimed {}".format(ip))

# clean up
response = ec2.release_address(AllocationId=response['AllocationId'])

```
AWS CLI

```bash
#!/bin/bash

allocation_id=eipalloc-0ecd17945768c2718
ip=$(aws ec2 describe-addresses --allocation-ids $allocation_id \
--query "Addresses[0].PublicIp" --output text)
aws ec2 release-address --allocation-id $allocation_id

# attempt recovery
allocation_id=$(aws ec2 allocate-address --address $ip --query "AllocationId" \
--output text)
if [ $? -ne 0 ]; then
    echo "Unable to reclaim $ip"
    exit 1
fi
echo "successfully reclaimed $ip"

# clean up
aws ec2 release-address --allocation-id $allocation_id
```

Now that you know how to reclaim accidentally released EIPs, you might wonder, "How likely is it that IPs will be available?" I ran
a quick test to check the likelihood. Over a twenty-four hour period, my automation performed the following sequence.

1. Allocate one EIP per region.
2. Release each IP.
3. Wait one hour and attempt to reclaim the IPs.
4. Release each IP successfully reclaimed.
5. Repeat the procedure.

I observed that I was unable to reclaim only one IP address in the 24 hour period. This suggests Amazon has ample address space
and probably uses a First-In, Last Out algorithm for EIP reuse.

There you have it. That's how to use Amazon's EIP recovery feature.
