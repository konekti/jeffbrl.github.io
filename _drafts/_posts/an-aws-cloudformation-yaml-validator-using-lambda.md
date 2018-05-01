---
layout: post
author: Jeff Loughridge
image: postimage
title: An AWS CloudFormation YAML Validator Using Lambda
date: 2018-04-29 14:51:06 -0400
---
AWS Lambda is incredibly useful platform for rapidly developing web-based tools.  How fast and easy can developers jump from a concept to a production service? In this post, I'l describe the components of a Lambda app I wrote called AWS CloudFormation

The web is replete with simple, web-based tools to assist developers. These tools do one thing and do it well. For example, I frequently need to tune an Xpath expression when developing router automation.  I use [Simple Xpath Online Xpath Tester](http://www.xpathtester.com/xpath "Simple Xpath Online Xpath Tester"). When cranking out Ansible playbooks, I always have [Online YAML Parser](http://yaml-online-parser.appspot.com/ "Online YAML Parser") open in a browser tab. All developers have their own list of these web tools.

In a previous [post](https://konekti.us/blog/2018/01/24/aws-intrinsic-functions.html "AWS CloudFormation Intrinsic Functions"), I noted how AWS supports both JSON and YAML for writing CloudFormation templates.