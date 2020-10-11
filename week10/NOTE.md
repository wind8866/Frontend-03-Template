## 课程总结
本周讲解编译原理的词法分析与语法分析。词法分析使用正则表达是匹配的方法，语法分析将词法整理成语法树。
语法树的思想很重要，将一组毫无关联的词组合成易处理的数据结构，处理的过程中大量用到了递归，加法表达式与乘法表达式相互引用。将数字看作特殊乘法表达式，将乘法表达式作为一种特殊的加法。

算法和编程能力都要提高。

---

## 学习笔记

LL算法构建AST
AST：抽象语法树

1. 分词（词法分析）
2. 构成语法树（语法分析）
3. 构建代码去执行

LL算法：从左到右扫描，从左到右归并。

- TokenNumber: `[0-9]`
- Operator: +、-、*、/
- Whitespace: `<SP>`
- LineTerminator: `<LF>`、`<CR>`

```
<Expression>::=
    <AdditiveExpression><EOF>

<AdditiveExpression>::=
    <MultiplicativeExpression>
    |<AdditiveExpression><+><MultiplicativeExpression>
    |<AdditiveExpression><-><MultiplicativeExpression>

<MultiplicativeExpression>::=
    <Number>
    |<MultiplicativeExpression><*><Number>
    |<MultiplicativeExpression></><Number>
```

表达式有终结符和非终结符组合而成。

LL语法分析：
从左到右扫描，从左到右归并。

```
<AdditiveExpression>::=
    <Number>
    |<MultiplicativeExpression><*><Number>
    |<MultiplicativeExpression></><Number>
    |<AdditiveExpression><+><MultiplicativeExpression>
    |<AdditiveExpression><-><MultiplicativeExpression>
```
