<!--
 * @Author: Null
 * @Date: 2021-11-19 10:37:34
 * @Description:  前端代码规范
-->
# dekun_admin项目前端代码规范

## 文件命名
```
1、文件夹命名
  1.1 组件文件夹命名
      1）组件分为全局组件和局部组件，其文件放置于src根目录下的components文件夹中，全局组件文件夹一律大写，并且index.vue
         为全局组件的入口文件，
      2）局部组件分为全局组件的局部组件和页面局部组件，如果全局组件还需要单独写局部组件，可直接在内写组件名+后缀名.vue 
         的局部组件【特殊情况除外】；页面局部组件，如果当前模块存在共用，则放置于模块下的components文件夹中，命名规则
         与全局组件一致。如果只是单个页面的局部组件，需要在单个页面的文件夹下写入components ,局部组件写组件名+后
         缀名.vue 的局部组件

  1.2 静态资源文件夹（图片/字体/样式/动画）
      位于根目录src文件夹下的assets文件中
      1）图片放置于 /src/assets/images 中， 单张图片大小不得超过500k; 
      2）字体放置于 /src/assets/images 中
      3）动画模型放置于 /src/assets/lottie 中
      4）公共样式放置于 /src/assets/styles 中
      5）svg图片放置于 /src/assets/svg-icons 中
         
  1.3 页面模块命名
      1）页面文件夹命名一律采用小写且短横线连接，并文件夹以index.vue为该页面模块的入口文件

```
## 变量命名
```
1、环境变量命名
   1.1 .env文件 中的自定义变量的命名规则为 VUE_APP + 自定义变量 ，例如： VUE_APP_API
2、vuex的mutations的变量命名
   2.1 如果state的变量为 size , 那么mutations中的变量为 SET_SIZE ，即是 SET_ + state中的状态变量名大写
   2.2 actions变量设置，变量命名需要贴近其使用作用或场景的命名方式
3、页面内的变量命名需满足驼峰命名法，特殊场景可使用大驼峰（如类的编写）或者下划线的写法
4、保存指针，统一为 const that = this
5、给vue的prototype绑定自定义方法，需要加$ ，在加 自定义变量
6、不可命名变量太短，太笼统，未贴切描述当前场景的使用状态及作用
7、正则表达式变量命名 ， 以reg开头

```

## 公共方法命名
```
1、公共方法 位置于/src/common , 其文件夹中文件如下：
   1.1 公共方法的入口文件为index.js , 集成当前文件下的所有属性和方法
   1.2 系统功能的公共方法写于/src/common/dkCommFun.js 【重】
   1.3 业务的公共方法写于 /src/common/commFun.js 【重】

2、当前目录结构
  src
   └─common
        commAttr.js               公共属性
        commFun.js                系统公共方法
        dkCommFun.js              业务公共方法
        driver.js                 新手指导driver.js封装公共文件
        eChartOptions.js          eChart统计图配置项数据
        elementUICommon.js        存放elementUi组件公用的属性或方法
        exportExcel.js            导出excel方法
        filter.js                 过滤器
        index.js                  入口文件
        isCarLicense.js           车牌号验证
        math.js                   mathJs数学库
        parseExcel.js             解析excel文件
        performanceNavTiming.js   展示navigation对象信息
        rules.js                  用于el-form表单验证的规则以及常用的正则表达式验证
        timePoll.js               轮询定时器
        validate.js               用于数据的正则校验
        validateCode.js           前端验证码校验
        webSocket.js              webSocket方法封装

```

## 自定义组件规范
```
1、基本组件由三部分template/script/style构成，最少两部分template/script；特殊jsx方式书写的组件除外
2、必须声明name属性 , 且name的属性值必须跟文件名保持一致 ， 如Component.vue ,则name属性值则为Component，统一声明
   方式为PascalCase (首字母大写命名)，如果是全局组件，则name属性值则跟其文件夹名保持一致 
3、props 中声明传值，必须携带类型type, 当类型为Object时，传值不能为null ; 
4、$emit 不能传递数组给父组件；
5、组件间传值优先级【从高到低】 props/$emit => 回调函数 => $listener/$attr => provide/inject => $ref/$parent/$children =>  props/$emit/浏览器localSotrage/sessionStorage => vuex
6、凡是二次封装的组件需要首字符加上My，例如<el-button>进行二次封装 ，组件名为MyButton
7、组件放置于根目录下的components文件夹中，都会被自动注册为全局组件

```
## api接口文件规范
```
1、api分为私有api以及全局api,区分场景为上传类的api和单独页面类的api
```

## vuex文件规范
```
1、现在项目有两层modules, 每层modules下面通过index.js文件自动注册，也是通过文件名自动注册，所以开发时得保证文件名不重名，文件夹名和文件以驼峰法命名
2、vuex 五大属性内得命名规范 state(驼峰命名法)、mutations(全大写下划线写法，例如SET_PLAIN)、actions(驼峰命名法)、modules(自动注册)、getter(vuex集成唯一得文件)
3、getters.js 文件 ，可读缓存文件，一般存放layout布局组件相关数据/前端错误日志/权限类等
```
## 图标类文件规范
```
1、api分为私有api以及全局api,区分场景为上传类的api和单独页面类的api
```