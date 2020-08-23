
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

    // const style = elementStyle;
    // 老师代码中的style就是elementStyle也是element.element
    // 这里统一成elementStyle，表示主元素的样式对象

    ['width', 'height'].forEach(size => {
        if (elementStyle[size] === 'auto' || elementStyle[size] === '') {
            elementStyle[size] = null;
        }
    });

    // 设置默认值
    // 主轴方向: 横向
    if (!elementStyle.flexDirection || elementStyle.flexDirection === 'auto') {
        elementStyle.flexDirection = 'row';
    }
    // 交叉轴方向上元素对齐方式: 如果项目未设置高度，则会从起点到终点占满屏幕
    if (!elementStyle.alignItems || elementStyle.alignItems === 'auto') {
        elementStyle.alignItems = 'stretch';
    }
    // 主轴方向上元素对齐方式: 主轴起点
    if (!elementStyle.justifyContent || elementStyle.justifyContent === 'auto') {
        elementStyle.justifyContent = 'flex-start';
    }
    // 是否换行: 不换行
    if (!elementStyle.flexWrap || elementStyle.flexWrap === 'auto') {
        elementStyle.flexWrap = 'nowrap';
    }
    // 多根轴线的对齐方式: 轴线占满整个交叉轴
    if (!elementStyle.alignContent || elementStyle.alignContent === 'auto') {
        elementStyle.alignContent = 'stretch';
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

    if (elementStyle.flexDirection === 'row') {
        mainSize = 'width';
        mainStart = 'left';
        mainEnd = 'right';
        mainSign = +1;
        mainBase = 0;

        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom';
    }
    if (elementStyle.flexDirection === 'row-reverse') {
        mainSize = 'width';
        mainStart = 'right';
        mainEnd = 'left';
        mainSign = -1;
        mainBase = elementStyle.width;

        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom'; 
    }
    if (elementStyle.flexDirection === 'column') {
        mainSize = 'height';
        mainStart = 'top';
        mainEnd = 'bottom';
        mainSign = +1;
        mainBase = 0;

        crossSize = 'width';
        crossStart = 'left';
        crossEnd = 'right'; 
    }
    if (elementStyle.flexDirection === 'column-reverse') {
        mainSize = 'height';
        mainStart = 'bottom';
        mainEnd = 'top';
        mainSign = -1;
        mainBase = elementStyle.height;

        crossSize = 'width';
        crossStart = 'left';
        crossEnd = 'right'; 
    }

    // 换行
    if (elementStyle.flexWrap = 'wrap-reverse') {
        const tmp = crossStart;
        crossStart = crossEnd;
        crossEnd = tmp;
        crossSign = -1;
    } else {
        crossBase = 0;
        crossSign = 1;
    }

    // 因父元素没有设置尺寸，所有元素相加即是主轴尺寸，所有元素都放到同一行
    const isAutoMainSize = false;
    if (!elementStyle[mainSize]) {
        elementStyle[mainSize] = 0;
        for (let i = 0;i < items;i++) {
            const item = items[i];
            if(itemStyle[mainSize] !== null) {//  || itemStyle[mainSize]
                elementStyle[mainSize] += parseInt(items[i]);
            }
        }
        isAutoMainSize = true;
    }

    // 换行的情况下用二维数组表示位置
    let flexLine = [];
    let flexLines = [flexLine];

    let mainSpace = elementStyle[mainSize];
    let crossSpace = 0;

    for(let i = 0; i < items.length; i++) {
        let item = items[i];
        let itemStyle = getStyle(item);


        if(itemStyle[mainSize] === null) {
            itemStyle[mainSize] = 0;
        }
        // flex属性
        if(itemStyle.flex) {
            flexLine.push(item);
        } else if(style.flexWrap === "nowrap" && isAutoMainSize){
            mainSpace -= itemStyle[mainSize];
            if(itemStyle[crossSize] !== null && itemStyle[crossSize] !== void 0) {
                crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
            }
            flexLine.push(item);
        } else {
            if(itemStyle[mainSize] > style[mainSize]){
                itemStyle[mainSize] = style[mainSize];
            }
            if(mainSpace < itemStyle[mainSize]) {
                flexLine.mainSpace = mainSpace;
                flexLine.crossSpace = crossSpace;
                flexLine = [item];
                flexLines.push(flexLine);
                mainSpace = style[mainSize];
                crossSpace = 0;
            } else {
                flexLine.push(item);
            }
            if(itemStyle[crossSize] !== null && itemStyle[crossSize] !== void 0) {
                    crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
            }
            mainSpace -= itemStyle[mainSize];
        }
        flexLine.mainSpace = mainSpace;
        
        if(style.flexWrap === "nowrap" || isAutoMainSize) {
            flexLine.crossSpace = (style[crossSize] !== undefined ? style[crossSize] : crossSpace); 
        } else {
            flexLine.crossSpace = crossSpace;
        }

        if (mianSpace < 0) {
            let scale = style[mainSize] / (style[mainSize] - mainSpace);
            let currentMain = mainBase;
            for(let i = 0; i < items.length; i++){
                const item = items[i];
                const itemStyle = getStyle(item);

                // flex : 1不是display: flex
                if(itemStyle.flex) {
                    itemStyle[mainSize] = 0;
                }

                itemStyle[mainSize] = itemStyle[mainSize] * scale;


                itemStyle[mainStart] = currentMain;
                itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
                currentMain = itemStyle[mainEnd];
            }
        } else {
            flexLines.forEach((items) => {
                let mainSpace = items.mainSpace;
                let flexTotal = 0;
                for(let i = 0; i < items.length; i++){
                    const item = items[i];
                    const itemStyle = getStyle(item);

                    if((itemStyle.flex !== null) && (itemStyle.flex !== (void 0))) {
                        flexTotal += itemStyle.flex;
                        continue;
                    }
                }
                if (flexTotal > 0) {
                    let currentMain = mainBase;
                    for(let i = 0; i < items.length; i++) {
                        const item = items[i];
                        const itemStyle = getStyle(item);

                        if(item) {
                            itemStyle[mainSize] = (mainSpace / flexTotal) * itemStyle.flex;
                        }
                        itemStyle[mainStart] = currentMain;
                        itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
                        currentMain = itemStyle[mainEnd];
                    }
                } else {
                    if (style.justifyContent === "flex-start") {
                        var currentMain = mainBase;
                        var step = 0
                    }
                    if (style.justifyContent === "flex-end") {
                        var currentMain = mainSpace * mainSign + mainBase;
                        var step = 0
                    }
                    if (style.justifyContent === "center") {
                        var currentMain = mainSpace / 2 * mainSign + mainBase;
                        var step = 0
                    }
                    if (style.justifyContent === "space-between") {
                        var currentMain =  mainSpace / (items.length - 1) * mainSign;
                        var step = mainBase;
                    }
                    if (style.justifyContent === "space-around") {
                        var currentMain =  mainSpace / items.length * mainSign;
                        var step = step / 2 + mainBase;
                    }
                    for (let i = 0; i < items.length; i++) {
                        let item = items[i];
                        itemStyle[mainStart, currentMain];
                        itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
                        currentMain = itemStyle[mainEnd].step;
                    }
                }
                var crossSpace;
                if(!style[crossSize]) {
                    crossSpace = 0;
                    elementStyle[crossSize] = 0;
                    for(let i = 0; i < flexLines.length; i++){
                        elementStyle[crossSize] = elementStyle[crossSize] + flexLines[i].crossSpace;
                    }
                } else {
                    crossSpace = style[crossSize];
                    for(let i = 0; i < flexLines.length; i++) {
                        crossSpace -= flexLines[i].crossSpace;
                    }
                }
                if (style.flexWrap === "wrap-reverse") {
                    crossBase = style[crossSize];
                } else {
                    crossBase = 0;
                }

                var lineSize = style[crossSize] / flexLines.length;

                var step;
                if(style.alignContent === "flex-start"){
                    crossBase += 0;
                    step = 0;
                }
                if(style.alignContent === "flex-end"){
                    crossBase += crossSign * crossSpace;
                    step = 0;
                }
                if(style.alignContent === "center"){
                    crossBase += crossSign * crossSpace / 2;
                    step = 0;
                }
                if(style.alignContent === "space-between"){
                    crossBase += 0;
                    step = crossSpace / (flexLines.length - 1);
                }
                if(style.alignContent === "space-between") {
                    crossBase += crossSign * crossSpace / 2;
                    step = 0;
                }
                if(style.alignContent === "space-around") {
                    crossBase += crossSign * step / 2;
                    step = crossSpace / (flexLines.length);
                }
                if(style.alignContent === "stretch") {
                    crossBase += 0;
                    step = 0;
                }

                flexLines.forEach((items) => {
                    let lineCrossSize = style.alignContent === "stretch" ?
                            items.crossSpace + crossSpace / flexLines.length :
                            items.crossSpace;
                    for(let i = 0; i < items.length; i++){
                        const item = item[i];
                        const itemStyle = getStyle(item);
                        
                        const align = itemStyle.alignSelf || style.alignItems;
                        if (item === null) {
                            itemStyle[crossSize] = (align === 'stretch') ?
                            lineCrossSize : 0;
                        }

                        if (align === 'flex-start') {
                            itemStyle[crossStart] = crossBase;
                            itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[corssSize];
                        }

                        if(align === 'flex-end') {
                            itemStyle[crossEnd] = crossBase + crossSign * (lineCrossSize - itemStyle[corssSize ]) / 2;
                            itemStyle[crossStart] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
                        }

                        if(align === 'stretch') {
                            itemStyle[crossStart] = crossBase;
                            itemStyle[crossEnd] = crossBase + crossSign * ((itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)));

                            itemStyle[crossSize] = crossSign * (itemStyle[crossEnd] - itemStyle[crossStart]);

                        }

                    }
                    crossBase += crossSign * (lineCrossSize + step);
                })
            })
        }
    }

}

module.exports = layout;