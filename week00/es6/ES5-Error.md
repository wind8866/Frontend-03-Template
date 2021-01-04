抛出Error实例对象以后，整个程序就中断在发生错误的地方，不再往下执行。
返回程序的堆栈

使用代码标注的可直接使用new调用新建，例如`new RangeError('变量超出了范围')`

- `Error`
	- (默认错误类型)
- Uncaught `SyntaxError`(解析代码时发生语法错误):
	- Invalid or unexpected token(token非法)
- Uncaught `ReferenceError`(不存在变量):
	- unknownVariable is not defined(不存在变量unknownVariable)
- Uncaught `RangeError`(超出范围):
	- Invalid array length(数组的参数无效)
- Uncaught `TypeError`(类型错误):
	- 44 is not a constructor(44不是构造函数)
- Uncaught `URIError`(URI解析错误):
	- URI malformed(URI解析错误)
- `EvalError`
	- (eval没有正确执行)

自定义错误
```javascript
function UserError(message) {
	this.message = message || '默认信息';
	this.name = 'UserError';
}
UserError.prototype = new Error();
UserError.prototype.constructor = UserError;
```
<https://wangdoc.com/javascript/features/error.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E9%94%99%E8%AF%AF>
