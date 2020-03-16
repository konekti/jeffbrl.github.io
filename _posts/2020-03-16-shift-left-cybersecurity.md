---
layout: post
author: Andrew Rufener
image: sky.jpg
title: Why "Shift Left" is Fundamental to Security 
date: 2020-03-15 00:00:00 -0500

---

You may be looking at the title of the blog and wondering what the term "shift left" means in the context of 
cybersecurity. You are not alone. The term has yet to reach buzzword status among C-level executives; however,
the chances are you will hear more about it more soon and you certainly must understand it. 

The term refers to the process of shifting control over security more to the "left" of the development process 
as indicated in the figure below. 

![Shift Left Figure]({{ site.baseurl }}/assets/posts/2020/shift-left.png)

Let's start at the beginning. In recent years two key trends have become a source of great concern for IT security 
professionals. These trends are cloud and agile development paired with DevOps. Agile allows me to bring new offerings 
to market faster and more effectively and cloud provides me the ability to reduce my capex and increase my agility even 
further, right? Yes, correct, but it also results in gaping holes in your cybersecurity posture unless managed 
effectively. Before explaining the issue at hand, let’s provide a quick summary of what agile, DevOps and cloud are 
and what they do to provide context.

### Agile
What Agile and Scrum have in common at a high level is that they aim to make the development process more agile 
and involve the business more closely into the process of defining requirements, reviewing results and adjusting 
where possible, allowing businesses to deliver working code and results for products and customers faster than in 
the past where we used waterfall or other similar methods. The fundamental change here (without going into detail) 
is that code is delivered usually in 2-4 week intervals (also referred to as sprints) and the focus is more on 
delivering working code than extensive documentation. It also means that the development team takes on a broader set 
of responsibilities from development through testing and deployment.

### DevOps
DevOps or Development Operations is essentially what the term suggests, developers as part of a development team that 
handle both development and operations of the usually agile developed components, frequently using technologies as 
containers and serverless functions as part of public cloud services to package and push software into operation. 
Unfortunately in many development teams the DevOps engineers are still seen as the "poor cousins" and are frequently 
staffed with junior team members that lack the level of experience that is actually required, but more about that later. 

### Cloud
While we are all familiar with cloud services by now with public cloud services providers such as Amazon Web Services (AWS), 
Microsoft Azure, Google GCP and Alibaba, more often than not managers don’t understand that the choice of cloud 
architectures but also development platforms and virtualization approaches (think VMs, Docker, Kubernetes and serverless 
functions) lead to increased agility but also an entire new range of complexity and potential security issues. Moreover 
the use of many new cloud services and technologies means that there is a clearer delineation between the development 
and DevOps teams and the traditional IT and security teams. 

While cloud and agile are trends that are positive and can deliver substantial potential business benefits, they create 
substantial security challenges that, unless managed effectively, can lead to an increase in vulnerabilities and 
potential incidents. 

One of the challenges relates to the fact that DevOps teams can spin up instances and services in the cloud at any time 
and the security operations teams very often find themselves in a position having to check compliance with security 
policies after the fact. In combination with the fact that more often than not the DevOps engineers aren’t the most senior 
engineers this means that they may not fully comprehend the complexity of a system or the different cloud services they 
are responsible for and may inadvertently open the system up to unauthorized access due to the lack of understanding or 
misconfigurations. In combination with the agile development approach this can lead to substantial risks. Ways to mitigate 
some of these risks are the use of policies and restrictions of the freedom of operation. Additional ways of mitigating 
the risks are the use of cloud monitoring solutions that monitor for misconfigurations, violations of best practices and 
possible violations of codified security policies using platforms such as Palo Alto’s Prisma Cloud or Dome 9 to name a few. 
What these platforms do (amongst other things) is to allow the security teams to codify the organization's security policies 
and actively monitor public and private environments against these policies and best practices continuously.  

However, this is only half the story. The bigger challenge is that as we move to agile development, containerization and 
the use of serverless functions, developers and DevOps often make choices that have a fundamental impact on security 
without having the understanding of the impact their actions may have. A simple example is the choice of base OS image used 
for a container and the means by which a Docker container is built and pushed into operation. Developers may elect to use a 
base image based upon an older version of say CentOS which may well include known vulnerabilities but happens to include 
the components the developer prefers and may run it as "root" user. However, this container is likely to be more vulnerable 
than an image based upon a minimal image such as Alpine for example and built with only approved, required and validated 
components and that includes the latest security patches. Since developers focus on delivering working code, they are 
generally far less concerned with security and frequently unaware of the vulnerabilities they inadvertently introduce. 
Traditional approaches would then frequently result in the security teams getting involved once the components have been 
built and withholding the system being placed in operation (best case) or fighting for changes after the fact (worst case). 
In either case this leads to inefficiency, frustration in both the development and the security teams and 
most importantly potential exposure to the organization. 

And this is where "shift left" comes in, moving the codified security policies (by the security) team into the development 
and build environments and integrating with the development environments that developers use as well as the CI/CD pipeline 
to enforce security policies automatically right at the source. Shifting left means ensuring developers can operate in 
their known environments and focus on developing code while being made aware of any decisions that would conflict with the 
organization's security policy right then and there. This increases efficiency and reduces frustration and conflict. It 
furthermore protects the organization from potential exposure and provides all teams a set of reports that span the entire 
pipeline from development through build to operation by integrating at every step and adhering to a single policy. 

Shift left approaches are fundamental to cybersecurity and if you are using Agile/Scrum approaches and DevOps, you should 
ensure you provide your organization the tools to protect yourself from these possible exposures. 

