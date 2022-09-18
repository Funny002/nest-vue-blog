# NestJS Blog

用 [NestJs](http://www.nestjs.com) 框架搭建一个博客，尽可能的添加一些 ` 无用的代码 ` 并且让他运行起来。

### 说明

NestJs 独立应用拆分为 `混合应用` ，标准模式改为 `monorepo` 模式。

### 功能

- [x] [混合应用](https://docs.nestjs.cn/9/faq?id=混合应用) # Nest 中文文档
- [x] [Monorepo模式](https://docs.nestjs.cn/9/cli?id=工作空间) # Nest 中文文档
- [ ] [oAuth2](https://baike.baidu.com/item/OAuth2.0/6788617?fr=aladdin) `Github` `Google` `QQ` `WeChat` # 百度百科
- [ ] [RBAC模型](https://baike.baidu.com/item/%E5%9F%BA%E4%BA%8E%E8%A7%92%E8%89%B2%E7%9A%84%E8%AE%BF%E9%97%AE%E6%8E%A7%E5%88%B6?fromtitle=RBAC&fromid=1328788&fromModule=lemma_search-box) # 百度百科

### 目录结构

```
↘ Main
  → apps       # 应用服务
  → common     # 公共模块
  → config     # 配置文件
  → dto        # Dto声明 
  → libs       # 部分驱动
  → middleware # 中间件
  → mysql      # 数据模型文件
```
