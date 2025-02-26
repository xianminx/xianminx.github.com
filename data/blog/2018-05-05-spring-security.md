---
layout: "post"
title: 'Spring Security'
published: "true"
tags: [spring, java]
date: "2018-05-05"
---

Servelet Interceptor

authenticationManager,
accessDecisionManager,
securityMetadataSource

UserDetailsService接口和其loadUserByUsername方法

1）首先我们自定义一个过滤器（调度器，这里我们命名为mySecurityInterceptor），这个过滤器继承AbstractSecurityInterceptor类（这里先说明，本文但凡不是自定义的类或接口都是Spring Security提供的，无须深究）。 它至少包含 authenticationManager,accessDecisionManager,securityMetadataSource三个属性，我们的所有控制将在这三个类中实现。

（2）登录验证：自定义类MyUserDetailService实现UserDetailsService接口和其loadUserByUsername方法，这个方法根据用户输入的用户名，从数据库里面获取该用户的所有权限细信息（统称用户信息）。Spring Security的AuthenticationProcessingFilter拦截器调用authenticationManager，类MyUserDetailService拿到用户信息后，authenticationManager对比用户的密码（即验证用户），如果通过了，那么相当于通过了AuthenticationProcessingFilter拦截器，也就是登录验证通过。

（3）资源访问控制：MySecurityInterceptor继承AbstractSecurityInterceptor、实现Filter是必须的。登陆后，每次访问资源都会被MySecurityInterceptor这个拦截器拦截，它首先会调用MyFilterInvocationSecurityMetadataSource类的getAttributes方法获取被拦截url所需的权限，在调用MyAccessDecisionManager类decide方法判断用户是否够权限。

可能文字描述还是比较抽象，通过实例应该能让大家更加清楚其原理。

UserDetailsService在身份认证中的作用：

Spring Security中进行身份验证的是AuthenticationManager接口，ProviderManager是它的一个默认实现，但它并不用来处理身份认证，而是委托给配置好的AuthenticationProvider，每个AuthenticationProvider会轮流检查身份认证。检查后或者返回Authentication对象或者抛出异常。

验证身份就是加载响应的UserDetails，看看是否和用户输入的账号、密码、权限等信息匹配。此步骤由实现AuthenticationProvider的DaoAuthenticationProvider（它利用UserDetailsService验证用户名、密码和授权）处理。

因此，登录认证其实可以不实现UserDetailsService，而是实现AuthenticationProvider，然后在AuthenticationProvider里面获取用户输入的用户名和密码进行校验也是可以的。或者两者一起使用。

UsernamePasswordAuthenticationToken

<img src="http://up.2cto.com/kf/201103/20110314161540976.png" style={{ verticalAlign: "middle" }} />
<img src="http://up.2cto.com/kf/201103/20110314161540730.png" />