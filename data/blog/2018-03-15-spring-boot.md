---
layout: 'post'
title: 'Spring boot'
tags: [cloud]
date: '2018-03-15'
---

Sping Boot

## Dependency Management

The curated list contains all the spring modules that you can use with Spring Boot as well as a refined list of third party libraries. The list is available as a standard Bills of Materials (spring-boot-dependencies) that can be used with both Maven and Gradle.

```sh
BUILD FAILED in 4s
➜  NutNetwork git:(master) ✗ ./gradlew dependencies
/Users/lucas/.gradle/caches/modules-2/files-2.1/log4j/log4j/1.2.15/1483490805e8f86c21240958629905e733d079eb/log4j-1.2.15.pom:
    'build.plugins.plugin[io.spring.gradle.dependencymanagement.org.apache.maven.plugins:maven-antrun-plugin].dependencies.dependency.scope' for junit:junit:jar must be one of [compile, runtime, system] but is 'test'. in log4j:log4j:1.2.15
+--- org.springframework.boot:spring-boot-starter-data-rest -> 2.0.0.RELEASE
|    +--- org.springframework.boot:spring-boot-starter:2.0.0.RELEASE
|    |    +--- org.springframework.boot:spring-boot:2.0.0.RELEASE
|    |    |    +--- org.springframework:spring-core:5.0.4.RELEASE
|    |    |    |    \--- org.springframework:spring-jcl:5.0.4.RELEASE
|    |    |    \--- org.springframework:spring-context:5.0.4.RELEASE
|    |    |         +--- org.springframework:spring-aop:5.0.4.RELEASE
|    |    |         |    +--- org.springframework:spring-beans:5.0.4.RELEASE
|    |    |         |    |    \--- org.springframework:spring-core:5.0.4.RELEASE (*)
|    |    |         |    \--- org.springframework:spring-core:5.0.4.RELEASE (*)
|    |    |         +--- org.springframework:spring-beans:5.0.4.RELEASE (*)
|    |    |         +--- org.springframework:spring-core:5.0.4.RELEASE (*)
|    |    |         \--- org.springframework:spring-expression:5.0.4.RELEASE
|    |    |              \--- org.springframework:spring-core:5.0.4.RELEASE (*)
|    |    +--- org.springframework.boot:spring-boot-autoconfigure:2.0.0.RELEASE
|    |    |    \--- org.springframework.boot:spring-boot:2.0.0.RELEASE (*)
|    |    +--- org.springframework.boot:spring-boot-starter-logging:2.0.0.RELEASE
|    |    |    +--- ch.qos.logback:logback-classic:1.2.3
|    |    |    |    +--- ch.qos.logback:logback-core:1.2.3
|    |    |    |    \--- org.slf4j:slf4j-api:1.7.25
|    |    |    +--- org.apache.logging.log4j:log4j-to-slf4j:2.10.0
|    |    |    |    +--- org.slf4j:slf4j-api:1.7.25
|    |    |    |    \--- org.apache.logging.log4j:log4j-api:2.10.0
|    |    |    \--- org.slf4j:jul-to-slf4j:1.7.25
|    |    |         \--- org.slf4j:slf4j-api:1.7.25
|    |    +--- javax.annotation:javax.annotation-api:1.3.2
|    |    +--- org.springframework:spring-core:5.0.4.RELEASE (*)
|    |    \--- org.yaml:snakeyaml:1.19
|    +--- org.springframework.boot:spring-boot-starter-json:2.0.0.RELEASE
|    |    +--- org.springframework.boot:spring-boot-starter:2.0.0.RELEASE (*)
|    |    +--- org.springframework:spring-web:5.0.4.RELEASE
|    |    |    +--- org.springframework:spring-beans:5.0.4.RELEASE (*)
|    |    |    \--- org.springframework:spring-core:5.0.4.RELEASE (*)
|    |    +--- com.fasterxml.jackson.core:jackson-databind:2.9.4 -> 2.6.3
|    |    |    +--- com.fasterxml.jackson.core:jackson-annotations:2.6.0 -> 2.6.3
|    |    |    \--- com.fasterxml.jackson.core:jackson-core:2.6.3
|    |    +--- com.fasterxml.jackson.datatype:jackson-datatype-jdk8:2.9.4
|    |    |    +--- com.fasterxml.jackson.core:jackson-core:2.9.4 -> 2.6.3
|    |    |    \--- com.fasterxml.jackson.core:jackson-databind:2.9.4 -> 2.6.3 (*)
|    |    +--- com.fasterxml.jackson.datatype:jackson-datatype-jsr310:2.9.4
|    |    |    +--- com.fasterxml.jackson.core:jackson-annotations:2.9.0 -> 2.6.3
|    |    |    +--- com.fasterxml.jackson.core:jackson-core:2.9.4 -> 2.6.3
|    |    |    \--- com.fasterxml.jackson.core:jackson-databind:2.9.4 -> 2.6.3 (*)
|    |    \--- com.fasterxml.jackson.module:jackson-module-parameter-names:2.9.4
|    |         +--- com.fasterxml.jackson.core:jackson-core:2.9.4 -> 2.6.3
|    |         \--- com.fasterxml.jackson.core:jackson-databind:2.9.4 -> 2.6.3 (*)
|    +--- org.springframework.boot:spring-boot-starter-web:2.0.0.RELEASE
|    |    +--- org.springframework.boot:spring-boot-starter:2.0.0.RELEASE (*)
|    |    +--- org.springframework.boot:spring-boot-starter-json:2.0.0.RELEASE (*)
|    |    +--- org.springframework.boot:spring-boot-starter-tomcat:2.0.0.RELEASE
|    |    |    +--- javax.annotation:javax.annotation-api:1.3.2
|    |    |    +--- org.apache.tomcat.embed:tomcat-embed-core:8.5.28
|    |    |    +--- org.apache.tomcat.embed:tomcat-embed-el:8.5.28
|    |    |    \--- org.apache.tomcat.embed:tomcat-embed-websocket:8.5.28
|    |    |         \--- org.apache.tomcat.embed:tomcat-embed-core:8.5.28
|    |    +--- org.hibernate.validator:hibernate-validator:6.0.7.Final
|    |    |    +--- javax.validation:validation-api:2.0.1.Final
|    |    |    +--- org.jboss.logging:jboss-logging:3.3.0.Final -> 3.3.2.Final
|    |    |    \--- com.fasterxml:classmate:1.3.1 -> 1.3.4
|    |    +--- org.springframework:spring-web:5.0.4.RELEASE (*)
|    |    \--- org.springframework:spring-webmvc:5.0.4.RELEASE
|    |         +--- org.springframework:spring-aop:5.0.4.RELEASE (*)
|    |         +--- org.springframework:spring-beans:5.0.4.RELEASE (*)
|    |         +--- org.springframework:spring-context:5.0.4.RELEASE (*)
|    |         +--- org.springframework:spring-core:5.0.4.RELEASE (*)
|    |         +--- org.springframework:spring-expression:5.0.4.RELEASE (*)
|    |         \--- org.springframework:spring-web:5.0.4.RELEASE (*)
|    \--- org.springframework.data:spring-data-rest-webmvc:3.0.5.RELEASE
|         +--- org.springframework.data:spring-data-rest-core:3.0.5.RELEASE
|         |    +--- org.springframework:spring-tx:5.0.4.RELEASE
|         |    |    +--- org.springframework:spring-beans:5.0.4.RELEASE (*)
|         |    |    \--- org.springframework:spring-core:5.0.4.RELEASE (*)
|         |    +--- org.springframework.hateoas:spring-hateoas:0.23.0.RELEASE -> 0.24.0.RELEASE
|         |    |    +--- org.springframework:spring-aop:4.3.12.RELEASE -> 5.0.4.RELEASE (*)
|         |    |    +--- org.springframework:spring-beans:4.3.12.RELEASE -> 5.0.4.RELEASE (*)
|         |    |    +--- org.springframework:spring-context:4.3.12.RELEASE -> 5.0.4.RELEASE (*)
|         |    |    +--- org.springframework:spring-core:4.3.12.RELEASE -> 5.0.4.RELEASE (*)
|         |    |    +--- org.springframework:spring-web:4.3.12.RELEASE -> 5.0.4.RELEASE (*)
|         |    |    +--- org.springframework:spring-webmvc:4.3.12.RELEASE -> 5.0.4.RELEASE (*)
|         |    |    \--- org.slf4j:slf4j-api:1.7.25
|         |    +--- org.springframework.data:spring-data-commons:2.0.5.RELEASE
|         |    |    +--- org.springframework:spring-core:5.0.4.RELEASE (*)
|         |    |    +--- org.springframework:spring-beans:5.0.4.RELEASE (*)
|         |    |    \--- org.slf4j:slf4j-api:1.7.25
|         |    +--- org.springframework.plugin:spring-plugin-core:1.2.0.RELEASE
|         |    |    +--- org.springframework:spring-beans:4.0.9.RELEASE -> 5.0.4.RELEASE (*)
|         |    |    +--- org.springframework:spring-context:4.0.9.RELEASE -> 5.0.4.RELEASE (*)
|         |    |    +--- org.springframework:spring-aop:4.0.9.RELEASE -> 5.0.4.RELEASE (*)
|         |    |    \--- org.slf4j:slf4j-api:1.7.10 -> 1.7.25
|         |    +--- org.atteo:evo-inflector:1.2.2
|         |    +--- com.fasterxml.jackson.core:jackson-annotations:2.9.4 -> 2.6.3
|         |    +--- com.fasterxml.jackson.datatype:jackson-datatype-jdk8:2.9.4 (*)
|         |    \--- org.slf4j:slf4j-api:1.7.25
|         +--- org.springframework:spring-webmvc:5.0.4.RELEASE (*)
|         +--- com.fasterxml.jackson.core:jackson-databind:2.9.4 -> 2.6.3 (*)
|         +--- com.fasterxml.jackson.core:jackson-annotations:2.9.4 -> 2.6.3
|         \--- org.slf4j:slf4j-api:1.7.25
+--- org.springframework.boot:spring-boot-starter-data-jpa -> 2.0.0.RELEASE
|    +--- org.springframework.boot:spring-boot-starter:2.0.0.RELEASE (*)
|    +--- org.springframework.boot:spring-boot-starter-aop:2.0.0.RELEASE
|    |    +--- org.springframework.boot:spring-boot-starter:2.0.0.RELEASE (*)
|    |    +--- org.springframework:spring-aop:5.0.4.RELEASE (*)
|    |    \--- org.aspectj:aspectjweaver:1.8.13
|    +--- org.springframework.boot:spring-boot-starter-jdbc:2.0.0.RELEASE
|    |    +--- org.springframework.boot:spring-boot-starter:2.0.0.RELEASE (*)
|    |    +--- com.zaxxer:HikariCP:2.7.8
|    |    |    \--- org.slf4j:slf4j-api:1.7.25
|    |    \--- org.springframework:spring-jdbc:5.0.4.RELEASE
|    |         +--- org.springframework:spring-beans:5.0.4.RELEASE (*)
|    |         +--- org.springframework:spring-core:5.0.4.RELEASE (*)
|    |         \--- org.springframework:spring-tx:5.0.4.RELEASE (*)
|    +--- org.hibernate:hibernate-core:5.2.14.Final
|    |    +--- org.jboss.logging:jboss-logging:3.3.1.Final -> 3.3.2.Final
|    |    +--- org.hibernate.javax.persistence:hibernate-jpa-2.1-api:1.0.0.Final
|    |    +--- org.javassist:javassist:3.22.0-GA
|    |    +--- antlr:antlr:2.7.7
|    |    +--- org.jboss:jandex:2.0.3.Final
|    |    +--- com.fasterxml:classmate:1.3.0 -> 1.3.4
|    |    +--- dom4j:dom4j:1.6.1
|    |    \--- org.hibernate.common:hibernate-commons-annotations:5.0.1.Final
|    |         \--- org.jboss.logging:jboss-logging:3.3.0.Final -> 3.3.2.Final
|    +--- javax.transaction:javax.transaction-api:1.2
|    +--- org.springframework.data:spring-data-jpa:2.0.5.RELEASE
|    |    +--- org.springframework.data:spring-data-commons:2.0.5.RELEASE (*)
|    |    +--- org.springframework:spring-orm:5.0.4.RELEASE
|    |    |    +--- org.springframework:spring-beans:5.0.4.RELEASE (*)
|    |    |    +--- org.springframework:spring-core:5.0.4.RELEASE (*)
|    |    |    +--- org.springframework:spring-jdbc:5.0.4.RELEASE (*)
|    |    |    \--- org.springframework:spring-tx:5.0.4.RELEASE (*)
|    |    +--- org.springframework:spring-context:5.0.4.RELEASE (*)
|    |    +--- org.springframework:spring-aop:5.0.4.RELEASE (*)
|    |    +--- org.springframework:spring-tx:5.0.4.RELEASE (*)
|    |    +--- org.springframework:spring-beans:5.0.4.RELEASE (*)
|    |    +--- org.springframework:spring-core:5.0.4.RELEASE (*)
|    |    \--- org.slf4j:slf4j-api:1.7.25
|    \--- org.springframework:spring-aspects:5.0.4.RELEASE
|         \--- org.aspectj:aspectjweaver:1.8.13
+--- org.springframework.boot:spring-boot-starter-thymeleaf -> 2.0.0.RELEASE
|    +--- org.springframework.boot:spring-boot-starter:2.0.0.RELEASE (*)
|    +--- org.thymeleaf:thymeleaf-spring5:3.0.9.RELEASE
|    |    +--- org.thymeleaf:thymeleaf:3.0.9.RELEASE
|    |    |    +--- org.attoparser:attoparser:2.0.4.RELEASE
|    |    |    +--- org.unbescape:unbescape:1.1.5.RELEASE
|    |    |    \--- org.slf4j:slf4j-api:1.7.25
|    |    \--- org.slf4j:slf4j-api:1.7.25
|    \--- org.thymeleaf.extras:thymeleaf-extras-java8time:3.0.1.RELEASE
|         +--- org.thymeleaf:thymeleaf:3.0.0.RELEASE -> 3.0.9.RELEASE (*)
|         \--- org.slf4j:slf4j-api:1.6.6 -> 1.7.25
+--- org.springframework.boot:spring-boot-starter-security -> 2.0.0.RELEASE
|    +--- org.springframework.boot:spring-boot-starter:2.0.0.RELEASE (*)
|    +--- org.springframework:spring-aop:5.0.4.RELEASE (*)
|    +--- org.springframework.security:spring-security-config:5.0.3.RELEASE
|    |    +--- org.springframework.security:spring-security-core:5.0.3.RELEASE
|    |    |    +--- org.springframework:spring-aop:5.0.4.RELEASE (*)
|    |    |    +--- org.springframework:spring-beans:5.0.4.RELEASE (*)
|    |    |    +--- org.springframework:spring-context:5.0.4.RELEASE (*)
|    |    |    +--- org.springframework:spring-core:5.0.4.RELEASE (*)
|    |    |    \--- org.springframework:spring-expression:5.0.4.RELEASE (*)
|    |    +--- org.springframework:spring-aop:5.0.4.RELEASE (*)
|    |    +--- org.springframework:spring-beans:5.0.4.RELEASE (*)
|    |    +--- org.springframework:spring-context:5.0.4.RELEASE (*)
|    |    \--- org.springframework:spring-core:5.0.4.RELEASE (*)
|    \--- org.springframework.security:spring-security-web:5.0.3.RELEASE
|         +--- org.springframework.security:spring-security-core:5.0.3.RELEASE (*)
|         +--- org.springframework:spring-aop:5.0.4.RELEASE (*)
|         +--- org.springframework:spring-beans:5.0.4.RELEASE (*)
|         +--- org.springframework:spring-context:5.0.4.RELEASE (*)
|         +--- org.springframework:spring-core:5.0.4.RELEASE (*)
|         +--- org.springframework:spring-expression:5.0.4.RELEASE (*)
|         \--- org.springframework:spring-web:5.0.4.RELEASE (*)
+--- org.springframework.boot:spring-boot-starter-data-redis -> 2.0.0.RELEASE
|    +--- org.springframework.boot:spring-boot-starter:2.0.0.RELEASE (*)
|    +--- org.springframework.data:spring-data-redis:2.0.5.RELEASE
|    |    +--- org.springframework.data:spring-data-keyvalue:2.0.5.RELEASE
|    |    |    +--- org.springframework.data:spring-data-commons:2.0.5.RELEASE (*)
|    |    |    +--- org.springframework:spring-context:5.0.4.RELEASE (*)
|    |    |    +--- org.springframework:spring-tx:5.0.4.RELEASE (*)
|    |    |    \--- org.slf4j:slf4j-api:1.7.25
|    |    +--- org.springframework:spring-tx:5.0.4.RELEASE (*)
|    |    +--- org.springframework:spring-oxm:5.0.4.RELEASE
|    |    |    +--- org.springframework:spring-beans:5.0.4.RELEASE (*)
|    |    |    \--- org.springframework:spring-core:5.0.4.RELEASE (*)
|    |    +--- org.springframework:spring-aop:5.0.4.RELEASE (*)
|    |    +--- org.springframework:spring-context-support:5.0.4.RELEASE
|    |    |    +--- org.springframework:spring-beans:5.0.4.RELEASE (*)
|    |    |    +--- org.springframework:spring-context:5.0.4.RELEASE (*)
|    |    |    \--- org.springframework:spring-core:5.0.4.RELEASE (*)
|    |    \--- org.slf4j:slf4j-api:1.7.25
|    \--- io.lettuce:lettuce-core:5.0.2.RELEASE
|         +--- io.projectreactor:reactor-core:3.1.4.RELEASE -> 3.1.5.RELEASE
|         |    \--- org.reactivestreams:reactive-streams:1.0.2
|         +--- io.netty:netty-common:4.1.21.Final -> 4.1.22.Final
|         +--- io.netty:netty-transport:4.1.21.Final -> 4.1.22.Final
|         |    +--- io.netty:netty-buffer:4.1.22.Final
|         |    |    \--- io.netty:netty-common:4.1.22.Final
|         |    \--- io.netty:netty-resolver:4.1.22.Final
|         |         \--- io.netty:netty-common:4.1.22.Final
|         \--- io.netty:netty-handler:4.1.21.Final -> 4.1.22.Final
|              +--- io.netty:netty-buffer:4.1.22.Final (*)
|              +--- io.netty:netty-transport:4.1.22.Final (*)
|              \--- io.netty:netty-codec:4.1.22.Final
|                   \--- io.netty:netty-transport:4.1.22.Final (*)
+--- org.springframework.boot:spring-boot-starter-web -> 2.0.0.RELEASE (*)
+--- com.h2database:h2 -> 1.4.196
+--- org.mybatis:mybatis:3.3.0
+--- org.mybatis:mybatis-spring:1.2.3
+--- com.mchange:c3p0:0.9.5.1
|    \--- com.mchange:mchange-commons-java:0.2.10
+--- mysql:mysql-connector-java:5.1.31
```

## Code Structure

```sh
com
 +- example
     +- myapplication
         +- Application.java
         |
         +- customer
         |   +- Customer.java
         |   +- CustomerController.java
         |   +- CustomerService.java
         |   +- CustomerRepository.java
         |
         +- order
             +- Order.java
             +- OrderController.java
             +- OrderService.java
             +- OrderRepository.java
```
