# 校园二手交易平台

解决本校学生二手物品的交易问题。

## 技术栈

**后端**

- SpringBoot
- JPA
- Swagger-UI
- maven
- H2

**前端**

- 微信小程序
- vue

## 项目目录

**后端（server）**

- config- 配置文件
- aop - 切面（用于请求过滤）
- common - 一些工具类
- controller - 控制器（控制层）
- repository - 数据库模型（存储层）
- service - 服务类（服务层）

**前端（client）**

采用微信小程序云开发

- utils - 封装的一些函数，脚本工具等
- pages - 页面

- img - 图片

- style - 样式 

## 系统功能

用户管理，商品管理，分类管理，通知管理，权限管理，收藏管理

## 产品快照

![1577178414(F:\typoraImg\1577178414(1).jpg)](https://github.com/ChaoAbner/fosu-transactions/blob/master/images/1577178414(1).jpg)

![1577178450(F:\typoraImg\1577178450(1).jpg)](https://github.com/ChaoAbner/fosu-transactions/blob/master/images/1577178450(1).jpg)

![1577178461(F:\typoraImg\1577178461(1).jpg)](https://github.com/ChaoAbner/fosu-transactions/blob/master/images/1577178461(1).jpg)

## 一些问题

由于微信小程序对于个人开发者的开发类别要求，产品无法上线，所以有很多问题可能没法被发现。这里列举一些开发过程中所考虑和遇到的问题.

**隐私问题**

用户第一次发布二手商品时,必须输入微信联系方式,电话方式可选.在第一次填写并提交后,用户的信息被缓存,之后的发布会自动从缓存中读取用户的信息并设为默认输入,这样就不需要用户多次输入信息了.

对于其他人浏览发布信息时,如果浏览者是游客,那么发布信息中的用户微信和电话信息将会被保护,不会被游客所看见.如果浏览者是认证过的学生的话,那么可以看见用户微信号,电话信息也会被保护,但是可以复制出完整电话,防止了用户隐私信息的直接暴露.

**发布问题**

 对于内容发布平台都需要考虑用户发布的东西是否合法，包括一些**敏感词过滤，敏感图片**的过滤等等。

敏感词过滤，可以考虑采用**DFA算法**来进行敏感词过滤。[参考链接](https://blog.csdn.net/yqwang75457/article/details/79407992)

敏感图片过滤，可以使用平台的图片鉴定API来进行图片过滤。

