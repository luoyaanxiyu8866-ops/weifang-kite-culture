# 潍坊风筝文化 App - 项目上下文

## Dependencies

- **lucide-react**: 图标库，用于底部导航、教程步骤等 UI 图标
- **@tanstack/react-router**: 路由管理，支持文件路由约定和搜索参数验证
- **embla-carousel-react**: 横向滑动组件（我的风筝、推荐图鉴）

## Architecture

### 页面结构
- `/` - 首页：个人中心 + 内容推荐
- `/workshop` - 工坊页：参数化工坊入口 + 示例作品展示 + 四步教程
- `/workshop_/designer` - 参数化风筝工坊：Canvas 实时绘制 + 物理模拟
- `/library` - 图书馆页：三标签切换（图鉴/传承人/时间轴）
- `/profile` - 个人中心：用户信息 + 统计数据 + 功能菜单
- `/profile_settings` - 设置页：六项设置入口

### 核心组件
- `BottomNav`: 固定底部导航栏，三个 tab 切换
- `PageLayout`: 页面容器，统一 padding 和底部留白
- `KnowledgeCard`: 每日一则知识卡片，按天循环 30 条内容
- `MyKitesCarousel`: 横向滑动的风筝缩略图列表
- `ProgressSection`: 扎糊绘放四步学习进度条
- `RecommendedKites`: 推荐风筝图鉴横向卡片

### 数据流
- 所有数据本地模拟，无后端依赖
- 每日知识通过 `Date.now()` 计算天数取模循环
- 参数化工坊通过 URL 查询参数实现分享链接还原状态
- Canvas 绘制使用原生 2D API，根据滑块参数实时重绘

## Lessons

- 国风配色系统使用 oklch 色值定义语义变量，避免直接使用 hex 值
- 标题字体使用 KaiTi/STKaiti 等楷体回退链，正文用系统默认无衬线字体
- Canvas 绘制需要处理高 DPI 屏幕，通过 `devicePixelRatio` 缩放避免模糊
- 分享功能使用 `navigator.clipboard.writeText` 复制带参数的 URL
- 保存设计图使用 `canvas.toDataURL()` 导出 PNG，触发浏览器下载
- 返回按钮统一样式：白色卡片背景 + 边框 + 阴影，悬停时图标左移反馈
