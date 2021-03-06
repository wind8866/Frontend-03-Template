# 总结
本周学习的课程让我想起了以前的数学课，老师将一个例子，我们能根据例子做出来，但能够应用到问题中，并且使用代码一步一步做出来不容易。
对算法还是分几个层级
1. 能看着视频把代码敲出来执行成功
2. 能够看懂每一个步骤需要做什么，自己不看视频能够完成的把代码实现。
3. 看到问题知道了解决方案能够自己想办法解决（不看步骤讲解）
4. 遇到一个算法题能够有思路，并且用代码实现
5. 能够将现实问题抽象成具体的算法问题，将问题使用最合适的算法解决

字典树的能达到第三层，其他的本周只到了第二层。

我对算法的看法是，不知道这个东西，意识不到他的存在。
工作中使用其他的工具就完成了，或者说这个东西很难做，我们可以想一个两全其美（利于开发，也不太难用）的方法。

不是算法用不着，而是我们不在一个维度（层级），意识不到高维度的存在。

---

# 学习笔记
## 字符串分析算法
- 字典树
    - 大量高重复字符串的存储与分析
    - 精确匹配，是否相等
    - 用在搜索关键词
- KMP
    - 在长字符串里找短字符串
- Wildcard
    - 带通配符的字符串模式
- 正则
    - 字符串通用模式匹配
- 状态机
    - 通用的字符串分析
- LL、LR
    - 字符串多层级解构分析


## 字典树
字典树时哈希树的一种特例，哈希树在字符串领域里面最直接的应用体现就是字典树。

## KMP字符串模式匹配算法
```
abcdabce
   j
abcdabcdabcex
       i
```
1. 找出字符串的自重复行为：每次的开头都去掉一位，检查剩下的开头有没有重复的
2. 如何用数据解构描述上述状态，只看字符串的开头是否匹配

```
abcdabce
00000123
数字2表示前面已经有两个（ab）是重复的（所有的匹配都是从头开始），如果当前位置不匹配，则跳回位置2
```

## wildcard
`ab*c?d*abc*a?d`

只有星号*
`ab*cd*abc*a?d`
1. `ab`: 开头需要完全匹配
2. `*cd`: 星号尽量少的匹配
3. `abc*`: 最后一个星号尽可能的多匹配
4. `a?d`: 最后一个需要完全匹配



