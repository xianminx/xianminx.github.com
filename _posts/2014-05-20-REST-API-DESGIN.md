---
layout: post
title: "REST API DESIGN"
published: true
tags: [REST, API, design]
---


REST 缩写: **RE**presentation **S**tate **T**ransfer
最初想法有Roy Fielding 在他的博士论文 [Architectural Styles and the Design of Network-based Software Architectures](http://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm) 中提出来。

REST 有6大必要条件
* Uniform Interface 统一接口
  <br/>统一接口定义了客户端和服务器之间的接口。简化并解耦了架构， 使得双方都可以独立进化。
  * Resource-based 基于资源
    URI as resource identifiers
  * Manipulation of Resources Through Representations
  * Self Descriptive Messages
  * Hypermedia as the engine of Application State
* Stateless 无状态
  <br/> 服务器端处理请求需要的状态都包含在客户端发送的请求当中。状态可能是URI的一部分，查询字符串参数， body，也可能在Header 中。URI 唯一标识资源，body 包含了资源的状态。
  无状态使得架构更具扩展性
* Cacheable 可缓存
* Client-Server 客户端-服务器模型
* Layered System 分层设计的系统
* Code on Demand (optional) 按需编码
  <br /> Java Applets or javascript




REST enables:
performance, scalability, simplicity, modifiability, visibility, portability and reliability.

[HTTP 状态码](http://www.restapitutorial.com/httpstatuscodes.html)


## Tips
* 使用HTTP 动词
  * GET: 读取某个特定资源或者资源集合
  * PUT: 更新某个资源
  * POST: 创建新的资源。如果找不到合适的动词就用这个动词
  * DELETE: 删除某个资源

### Provide Sensible Resource Names
> 设计一个好的API 80% 的艺术 + 20% 的科学

  * URL中使用标识， 而不是查询字符串， 如 /users/12345
  * 巧妙使用URL 的等级结构特性 来标识资源的结构
  * 为客户端设计， 而不是为数据设计
  * 资源名称使用名词， 使用HTTP 的方法来表示请求的动作部分
  * URL 中使用复数名词
  * 避免使用集合词
  * URL 使用小写， 使用'_'或者'-'来分割单词
  * 尽量保持URL 短小

### Use HTTP Response Codes to Indicate Status

### Offer Both JSON and XML

### Create Fine-Grained Resources

### Consider Connectedness


### Idempotence

幂等性

###


   * API 中的page设计



   * API Design
      * http://developer.github.com/v3
      * http://www.restapitutorial.com/
      * http://docs.python-requests.org/en/latest/
      * https://wiki.jenkins-ci.org/display/JENKINS/Remote+access+API
      * http://www.slideshare.net/nicolaiarocci/developing-restful-web-apis-with-python-flask-and-mongodb
      * http://docs.python-requests.org/en/latest/community/out-there/#articles-talks



# Reference:
* [django-rest-framework]（http://www.django-rest-framework.org/）
