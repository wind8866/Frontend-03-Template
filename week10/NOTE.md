学习笔记

## LL算法构建AST
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
