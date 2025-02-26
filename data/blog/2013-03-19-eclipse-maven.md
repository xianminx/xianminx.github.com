---
layout: post
title: 'Maven with Eclipse'
tags: [android]
---

#

1. 安装Maven
2. 安装Eclipse
3. 安装m2e

- [Install Instruction](http://www.eclipse.org/m2e/download/).
- [M2E DOC](http://wiki.eclipse.org/Maven_Integration)
- [How To Create A Web Application Project With Maven](http://www.mkyong.com/maven/how-to-create-a-web-application-project-with-maven/)

```bash
mvn archetype:generate -DgroupId={project-packaging} -DartifactId={project-name} -DarchetypeArtifactId=maven-archetype-webapp -DinteractiveMode=false
```

To convert a maven project to a eclipse project

```bash
mvn eclipse:eclipse -Dwtpversion=2.0
```

<div class="mindmap">
  <p class="heading">
    <a href="http://app.wisemapping.com/c/maps/108563/public">Mind Map</a>
  </p>
  <div class="content">
    <iframe style="width:700px;height:400px;border: 1px solid black" src="http://app.wisemapping.com/c/maps/108563/embed?zoom=1"> </iframe>
  </div>
</div>
