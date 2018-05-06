---
layout: post
author: Jeff Loughridge
image: postimage
title: An AWS CloudFormation YAML Validator Using Lambda
date: 2018-04-29 14:51:06 -0400
---
<br>
AWS Lambda is an incredibly useful platform for rapidly developing web-based tools.  How fast and easy can developers advance from a concept to a production service? With a little bit of javascript in the front end with Lambda as the backend, the pace is very fast. In this post, I'l describe the components of a Lambda app I wrote called AWS CloudFormation

The web is replete with simple, web-based tools to assist developers. These tools do one thing and do it well. For example, I frequently need to tune an Xpath expression when developing router automation.  I use [Simple Xpath Online Xpath Tester](http://www.xpathtester.com/xpath "Simple Xpath Online Xpath Tester"). When cranking out Ansible playbooks, I always have [Online YAML Parser](http://yaml-online-parser.appspot.com/ "Online YAML Parser") open in a browser tab. All developers have their own list of these web tools. Before writing this post, I considered what tool would be useful to the AWS user base while also demonstrating the rapid develelopment cycle engendered by Lambda.

In a previous [post](https://konekti.us/blog/2018/01/24/aws-intrinsic-functions.html "AWS CloudFormation Intrinsic Functions"), I noted how AWS supports both JSON and YAML for writing CloudFormation templates. I prefer for two reasons: comments and readability. The use of the shorthand `!function_name` for intrinsic functions will break some YAML validators. Based on my interpretation of the YAML spec, the exclamation mark immediately followed by text indicates a primary tag. I believe this should be valid YAML.

This annoyance spawned the idea of a AWS CloudFormation template validator. I could overcome the probable bug with validating the intrinsic function shorthand and perform a true template validator rather than a a simple YAML syntax one.

I decided to use [chalice](https://github.com/aws/chalice), the Python Serverless Microframework for AWS. This module handles all aspects of interacting with IAM,  API Gateway, and Lambda. The modules routes URL endpoints in a manner similar to Flask, a microframework popular with python programmers.

While a very impressive framework, chalice has a few rough edges. Two affected me during the development of the tool.

1. There is no defined way to share chalice apps on Github. I spent an hour reading the repo's issues to find a kludgy work-around for putting the app on Github.
2. Getting your application to excute on Lambda is tricky if your code or imported modules need C dependencies. The binaries must be compatiable with Amazon Linux. The process for building the binaries is described in the docs, however,  improvement in the docs--such as including more examples--would be helpful. I was able to get the app working with the C dependency but ended up eliminating it to make things easier for distribution to others.

My app certainly isn't complex or clever. The app makes a simple call to boto3's  `validate_template` method. The JSON the application returns expresses the validity of the template and an error message in the case that the template is invalid.

I posted the backend code at [https://github.com/konekti/aws-cf-validator](https://github.com/konekti/aws-cf-validator "https://github.com/konekti/aws-cf-validator"). along with directions for executing it yourself. If your sole interest is using the web app, visit [AWS CloudFormation YAML Validator](https://konekti.us/aws-cf-validator/ "AWS CloudFormation YAML Validator").