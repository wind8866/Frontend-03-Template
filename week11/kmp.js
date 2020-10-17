function kmp(source, pattern) {
    let table = new Array(pattern.length).fill(0);

    // 计算table
    {
        // 有自重复的开始位置，从1开始，即从第几个位置开始有字符和字符串开头位置重复
        let i = 1;
        // 已重复位置
        let j = 0;

        while(i < pattern.length) {
            if (pattern[i] === pattern[j]) {
                i++;
                j++;
                // 虽然pattern[i] === pattern[j]
                // 但是重复的个数记到下一个table单元格
                table[i] = j;
            } else {
                // aabaaac
                if (j > 0) {
                    // 这里不用i++，因为j往回走了，i在原地不动等着匹配回去的j
                    // 即匹配 table[table[j]] 是否等于 table[i]
                    j = table[j];
                } else {
                    // 这里不用赋值也行，因为本来就是0
                    // table[i] = j;// 0
                    i++;
                    
                }
            }
        }
        console.log(table);
    }

    // 匹配
    {
        // source 串位置
        let i = 0;
        // pattern 串位置
        let j = 0;
        
        while(i < source.length) {
            if (pattern[j] === source[i]) {
                 i++;
                 j++;
            } else {
                if (j > 0) {
                    j = table[j];
                } else {
                    i++;
                }
            }

            if (j === pattern.length) {
                return true;
            }
        }
        return false;
    }
}

console.log(kmp('helxlo', 'helxlo'));