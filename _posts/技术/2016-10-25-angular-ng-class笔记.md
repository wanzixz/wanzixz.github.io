---
published: false
---
## ngClass

使用方法：

```
<ANY
  ng-class="expression">
...
</ANY>
```
显示css结果：

```
<ANY class="ng-class: expression;"> ... </ANY>
```

## 三种不同使用方法：

### 方法一：

```
<p ng-class="{strike: deleted, bold: important, 'has-error': error}">Map Syntax Example</p>
<label>
   <input type="checkbox" ng-model="deleted">
   deleted (apply "strike" class)
</label><br>
<label>
   <input type="checkbox" ng-model="important">
   important (apply "bold" class)
</label><br>
<label>
   <input type="checkbox" ng-model="error">
   error (apply "has-error" class)
</label>
```

### 方法二：

```
<p ng-class="style">Using String Syntax</p>
<input type="text" ng-model="style"
       placeholder="Type: bold strike red" aria-label="Type: bold strike red">
<hr>
<p ng-class="[style1, style2, style3]">Using Array Syntax</p>
<input ng-model="style1"
       placeholder="Type: bold, strike or red" aria-label="Type: bold, strike or red"><br>
<input ng-model="style2"
       placeholder="Type: bold, strike or red" aria-label="Type: bold, strike or red 2"><br>
<input ng-model="style3"
       placeholder="Type: bold, strike or red" aria-label="Type: bold, strike or red 3"><br>
```

### 方法三：

```
<p ng-class="[style4, {orange: warning}]">Using Array and Map Syntax</p>
<input ng-model="style4" placeholder="Type: bold, strike" aria-label="Type: bold, strike"><br>
<label><input type="checkbox" ng-model="warning"> warning (apply "orange" class)</label>
```

## 事件操作

```
<input id="setbtn" type="button" value="set" ng-click="myVar='my-class'">
<input id="clearbtn" type="button" value="clear" ng-click="myVar=''">
<br>
<span class="base-class" ng-class="myVar">Sample Text</span>
```
