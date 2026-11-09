# Nüwa
可视化Web页面构建工具

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


可视化依赖的包请按照下面步骤获取

1、安装依赖包
npm --registry https://registry.npmjs.org install art-grid-layout
npm --registry https://registry.npmjs.org install art-row-layout

2、在main.js中添加以下代码：
import ArtGridLayout from 'art-grid-layout'
Vue.use(ArtGridLayout)

import ArtRowLayout from 'art-row-layout'
import 'art-row-layout/dist/art-row-layout.css'
Vue.use(ArtRowLayout)

3、通过以上两步后，即可直接拷贝代码到自己项目中使用
