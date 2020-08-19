
// 样式属性预处理
function getStyle(element) {
    // style对象存储计算出的样式对象，用于排版使用
    if(!element.style) {
        element.style = {};
    }
    
    // 将属性处理后赋值给element.style
    for(const prop in element.computedStyle) {
        const p = element.computedStyle.value;
        element.style[prop] = element.computedStyle[prop].value;

        // 以px结尾的都转换为整数
        if(element.style[prop].toString().match(/px$/)) {
            element.style[prop] = parseInt(element.style[prop])
        }
        // 以数字开头的都转换为整数
        if(element.style[prop].toString().match(/^[0-9\.]+$/)) {
            element.style[prop] = parseInt(element.style[prop])
        }
    }

    return element.style;
}

function layout(element) {
    // 没有属性值的跳过
    if(!element.computedStyle) {
        return;
    }
    const elementStyle = getStyle(element);
    // 跳过非flex布局的元素
    if(elementStyle.display !== 'flex') {
        return;
    }
    // 过滤flex布局的子元素，把文本节点全部过滤出去
    const items = element.children.filter(e => e.type === 'element');

    // todo: style.order排序？
    items.sort((a, b) => {
        return (a.order || 0) = (b.order || 0);
    });

    const style = elementStyle;

    ['width', 'height'].forEach(size => {
        if (style[size] === 'auto' || style[size] === '') {
            style[size] = null;
        }
    });

    // 设置默认值
    // 主轴方向: 横向
    if (!style.flexDirection || style.flexDirection === 'auto') {
        style.flexDirection = 'row';
    }
    // 交叉轴方向上元素对齐方式: 如果项目未设置高度，则会从起点到终点占满屏幕
    if (!style.alignItems || style.alignItems === 'auto') {
        style.alignItems = 'stretch';
    }
    // 主轴方向上元素对齐方式: 主轴起点
    if (!style.justifyContent || style.justifyContent === 'auto') {
        style.justifyContent = 'flex-start';
    }
    // 是否换行: 不换行
    if (!style.flexWrap || style.flexWrap === 'auto') {
        style.flexWrap = 'nowrap';
    }
    // 多根轴线的对齐方式: 轴线占满整个交叉轴
    if (!style.alignContent || style.alignContent === 'auto') {
        style.alignContent = 'stretch';
    }

    // 
    let mainSize,// 主轴尺寸
        mainStart,// 主轴开始的位置:left right top bottom
        mainEnd,// 主轴结束的位置:left right top bottom
        mainSign,// todo: 好像是主轴里的元素方向
        mainBase,// todo: 初始值
        
        crossSize,// 交叉轴尺寸
        crossStart,// 交叉轴的位置:left right top bottom
        crossEnd,// 交叉轴结束的位置:left right top bottom
        crossSign,// todo:
        crossBase;// todo:

    if (style.flexDirection === 'row') {
        mainSize = 'width';
        mainStart = 'left';
        mainEnd = 'right';
        mainSign = +1;
        mainBase = 0;

        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom';
    }
    if (style.flexDirection === 'row-reverse') {
        mainSize = 'width';
        mainStart = 'right';
        mainEnd = 'left';
        mainSign = -1;
        mainBase = style.width;

        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom'; 
    }
    if (style.flexDirection === 'column') {
        mainSize = 'height';
        mainStart = 'top';
        mainEnd = 'bottom';
        mainSign = +1;
        mainBase = 0;

        crossSize = 'width';
        crossStart = 'left';
        crossEnd = 'right'; 
    }
    if (style.flexDirection === 'column-reverse') {
        mainSize = 'height';
        mainStart = 'bottom';
        mainEnd = 'top';
        mainSign = -1;
        mainBase = style.height;

        crossSize = 'width';
        crossStart = 'left';
        crossEnd = 'right'; 
    }

    // 换行
    if (style.flexWrap = 'wrap-reverse') {
        const tmp = crossStart;
        crossStart = crossEnd;
        crossEnd = tmp;
        crossSign = -1;
    } else {
        crossBase = 0;
        crossSign = 1;
    }
}

module.exports = layout;