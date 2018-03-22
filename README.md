

# 一 :项目依赖注入   
 ```js
   npm install react-intl-universal --save 
 ```  

 # 二 :初始化 
 
 ```js
 //引入 
 import intl from 'react-intl-universal';

// 引入资源包 
this.state.currentLocale = 'en-US'; // 初始设置
let { currentLocale } = this.state; // 'en-US' 
 axios
    .get(`locales/${currentLocale}.json`)
    .then(res => {
// 注册当前语言 Api 
intl.init({
        currentLocale: currentLocale,//'en-US',
        locales: {
          [currentLocale]: res.data
        }
      });
    }

 // 以后在项目中切换语言环境时 可以从接口获取当前语言配置 如'zh-CN''en-US'等 再更新this.state.currentLocale 从而实现页面刷新 
```
# 三: 组件中显示 

 ```js
JS code:

 import intl from 'react-intl-universal';
 <div>
        {intl.get('SIMPLE')}  
 </div>

 ```    
  
  Local data

  1) en-US.json (英文包)
   ```json
  {
  "SIMPLE": "Simple Sentence",
  }
 ```

  2) zh-CN.json (中文包)
   ```json
  {
  "SIMPLE": "简单的句子",
  }
 ```
# 四: 项目中具体替换的json 变量值等应用

1:如果只是返回字符串消息 如上面所示:

local Data:
```json
   {"SIMPLE": "Simple Sentence",}
```

JS code:
 ```js
   {intl.get('SIMPLE')} 
``` 

2:  如果 是要返回的是html 消息：

local Data：

```json
{ "TIP": "This is <span style='color:red'>HTML</span>" }
```

JS code:
```js
intl.getHTML('TIP');  
```
3:如果本地资源包没有配置指定的key 你可以设置默认值:

JS code:
```js
intl.get('not-exist-key').defaultMessage('default message')  
//也可以设置简写模式   "default message"
intl.get('not-exist-key').d('default message') // "default message"

 // getHTML 方法也支持默认简写模式.

intl.getHTML('not-exist-key').d(<div>hello</div>) // React.Element with "<div>hello</div>"
```

4: 如果消息含有变量 直接将变量名替换为字符串:

Locale data:

```json
{ "HELLO": "Hello, {name}. Welcome to {where}!" }
```

JS code:

```js
intl.get('HELLO', {name:'Tony', where:'Alibaba'}) // "Hello, Tony. Welcome to Alibaba!"
```

5: 复数形式与千位符:

Locale data:

```json

{ "PHOTO": "You have {num, plural, =0 {no photos.} =1 {one photo.} other {# photos.}}" }
```
JS code:

```js
intl.get('PHOTO', {num:0}); // "You have no photos."
intl.get('PHOTO', {num:1}); // "You have one photo."
intl.get('PHOTO', {num:1000000}); // "You have 1,000,000 photos."
```

6: 显示的货币:

Locale data:

```json
{ "SALE_PRICE": "The price is {price, number, USD}" } // CNY (人名币)  USD (美元)
```
JS code:

```js
intl.get('SALE_PRICE', {price:123456.78}); // The price is $123,456.78 
```
此时的三个参数都是可调的 第一个是字段名 第二个是类型 第三个是format 

7: 显示日期:

Locale data:
```json

{
  "SALE_START": "Sale begins {start, date}",
  "SALE_END": "Sale ends {end, date, long}"
}
``` 

JS code:
```js

intl.get('SALE_START', {start:new Date()}); // Sale begins 4/19/2017
intl.get('SALE_END', {end:new Date()}); // Sale ends April 19, 2017
```

如果 type是date 此时format 有如下值 
 
 1) short 显示简单的日期形式 // 18/3/22
 2) medium 显示一个月的短文本模式 // 2018年3月22日
 3) long 显示一个月的文本表现 // 2018年3月22日
 4) full  显示日期的详细模式 // 2018年3月22日星期四

 8: 时间 

 Locale data:

```json
{
  "COUPON": "Coupon expires at {expires, time, medium}"
}
```

JS code:
```js

intl.get('COUPON', {expires:new Date()}); // Coupon expires at 6:45:44 PM
```
 1) short 显示小时和分钟  
 2) medium 显示时分秒  
 3) long 显示时分秒 和时区


项目githup文档 
https://github.com/alibaba/react-intl-universal