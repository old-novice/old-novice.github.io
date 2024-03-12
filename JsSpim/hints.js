// Reference source: https://ctf-wiki.org/en/assembly/mips/readme/
var mipsInstDict =
{
    "add": {
        "i": "add",
        "n": "ADD – Add (with overflow)",
        "d": "Adds two registers and stores the result in a register\n將兩個暫存器加起來並將結果存儲在一個暫存器中",
        "o": "$d = $s + $t; advance_pc(4);",
        "s": "add $d, $s, $t",
        "e": "0000 00ss ssst tttt dddd d000 0010 0000"
    },
    "addi": {
        "i": "addi",
        "n": "ADDI -- Add immediate (with overflow)",
        "d": "Adds a register and a sign-extended immediate value and stores the result in a register\n將暫存器和一個符號擴展的立即值相加並將結果存儲在暫存器中",
        "o": "$t = $s + imm; advance_pc(4);",
        "s": "addi $t, $s, imm",
        "e": "0010 00ss ssst tttt iiii iiii iiii iiii"
    },
    "addiu": {
        "i": "addiu",
        "n": "ADDIU -- Add immediate unsigned (no overflow)",
        "d": "Adds a register and a sign-extended immediate value and stores the result in a register\n將暫存器和一個符號擴展的立即值相加並將結果存儲在暫存器中",
        "o": "$t = $s + imm; advance_pc(4);",
        "s": "addiu $t, $s, imm",
        "e": "0010 01ss ssst tttt iiii iiii iiii iiii"
    },
    "addu": {
        "i": "addu",
        "n": "ADDU -- Add unsigned (no overflow)",
        "d": "Adds two registers and stores the result in a register\n將兩個暫存器相加並將結果存儲在一個暫存器中",
        "o": "$d = $s + $t; advance_pc(4);",
        "s": "addu $d, $s, $t",
        "e": "0000 00ss ssst tttt dddd d000 0010 0001"
    },
    "and": {
        "i": "and",
        "n": "AND -- Bitwise and",
        "d": "Bitwise ands two registers and stores the result in a register\n對兩個暫存器進行位元AND運算並將結果存儲在暫存器中",
        "o": "$d = $s & $t; advance_pc(4);",
        "s": "and $d, $s, $t",
        "e": "0000 00ss ssst tttt dddd d000 0010 0100"
    },
    "andi": {
        "i": "andi",
        "n": "ANDI -- Bitwise and immediate",
        "d": "Bitwise ands a register and an immediate value and stores the result in a register\n對暫存器和立即值進行位元AND運算並將結果存儲在暫存器中",
        "o": "$t = $s & imm; advance_pc(4);",
        "s": "andi $t, $s, imm",
        "e": "0011 00ss ssst tttt iiii iiii iiii iiii"
    },
    "beq": {
        "i": "beq",
        "n": "BEQ -- Branch on equal",
        "d": "Branches if the two registers are equal\n如果兩個暫存器相等則分支",
        "o": "if $s == $t advance_pc (offset << 2)); else advance_pc(4);",
        "s": "beq $s, $t, offset",
        "e": "0001 00ss ssst tttt iiii iiii iiii iiii"
    },
    "bgez": {
        "i": "bgez",
        "n": "BGEZ -- Branch on greater than or equal to zero",
        "d": "Branches if the register is greater than or equal to zero\n如果暫存器大於或等於零則分支",
        "o": "if $s >= 0 advance_pc (offset << 2)); else advance_pc(4);",
        "s": "bgez $s, offset",
        "e": "0000 01ss sss0 0001 iiii iiii iiii iiii"
    },
    "bgezal": {
        "i": "bgezal",
        "n": "BGEZAL -- Branch on greater than or equal to zero and link",
        "d": "Branches if the register is greater than or equal to zero and saves the return address in $31\n如果暫存器大於或等於零則分支並將返回地址保存在$31中",
        "o": "if $s >= 0 $31 = PC + 8 (or nPC + 4); advance_pc (offset << 2)); else advance_pc(4);",
        "s": "bgezal $s, offset",
        "e": "0000 01ss sss1 0001 iiii iiii iiii iiii"
    },
    "bgtz": {
        "i": "bgtz",
        "n": "BGTZ -- Branch on greater than zero",
        "d": "Branches if the register is greater than zero\n如果暫存器大於零則分支",
        "o": "if $s > 0 advance_pc (offset << 2)); else advance_pc(4);",
        "s": "bgtz $s, offset",
        "e": "0001 11ss sss0 0000 iiii iiii iiii iiii"
    },
    "blez": {
        "i": "blez",
        "n": "BLEZ -- Branch on less than or equal to zero",
        "d": "Branches if the register is less than or equal to zero\n如果暫存器小於或等於零則分支",
        "o": "if $s <= 0 advance_pc (offset << 2)); else advance_pc(4);",
        "s": "blez $s, offset",
        "e": "0001 10ss sss0 0000 iiii iiii iiii iiii"
    },
    "bltz": {
        "i": "bltz",
        "n": "BLTZ -- Branch on less than zero",
        "d": "Branches if the register is less than zero\n如果暫存器小於零則分支",
        "o": "if $s < 0 advance_pc (offset << 2)); else advance_pc(4);",
        "s": "bltz $s, offset",
        "e": "0000 01ss sss0 0000 iiii iiii iiii iiii"
    },
    "bltzal": {
        "i": "bltzal",
        "n": "BLTZAL -- Branch on less than zero and link",
        "d": "Branches if the register is less than zero and saves the return address in $31\n如果暫存器小於零則分支並將返回地址保存在$31中",
        "o": "if $s < 0 $31 = PC + 8 (or nPC + 4); advance_pc (offset << 2)); else advance_pc(4);",
        "s": "bltzal $s, offset",
        "e": "0000 01ss sss1 0000 iiii iiii iiii iiii"
    },
    "bne": {
        "i": "bne",
        "n": "BNE -- Branch on not equal",
        "d": "Branches if the two registers are not equal\n如果兩個暫存器不相等則分支",
        "o": "if $s != $t advance_pc (offset << 2)); else advance_pc(4);",
        "s": "bne $s, $t, offset",
        "e": "0001 01ss ssst tttt iiii iiii iiii iiii"
    },
    "div": {
        "i": "div",
        "n": "DIV -- Divide",
        "d": "Divides $s by $t and stores the quotient in $LO and the remainder in $HI\n將$s除以$t並將商數存儲在$LO中,餘數存儲在$HI中",
        "o": "$LO = $s / $t; $HI = $s % $t; advance_pc(4);",
        "s": "div $s, $t",
        "e": "0000 00ss ssst tttt 0000 0000 0001 1010"
    },
    "divu": {
        "i": "divu",
        "n": "DIVU -- Divide unsigned",
        "d": "Divides $s by $t and stores the quotient in $LO and the remainder in $HI\n將$s除以$t並將商數存儲在$LO中，餘數存儲在$HI中",
        "o": "$LO = $s / $t; $HI = $s % $t; advance_pc(4);",
        "s": "divu $s, $t",
        "e": "0000 00ss ssst tttt 0000 0000 0001 1011"
    },
    "j": {
        "i": "j",
        "n": "J -- Jump",
        "d": "Jumps to the calculated address\n跳轉到計算出的地址",
        "o": "PC = nPC; nPC = (PC & 0xf0000000) | (target << 2);",
        "s": "j target",
        "e": "0000 10ii iiii iiii iiii iiii iiii iiii"
    },
    "jal": {
        "i": "jal",
        "n": "JAL -- Jump and link",
        "d": "Jumps to the calculated address and stores the return address in $31\n跳轉到計算出的地址並將返回地址存儲在$31中",
        "o": "$31 = PC + 8 (or nPC + 4); PC = nPC; nPC = (PC & 0xf0000000) | (target << 2);",
        "s": "jal target",
        "e": "0000 11ii iiii iiii iiii iiii iiii iiii"
    },
    "jr": {
        "i": "jr",
        "n": "JR -- Jump register",
        "d": "Jump to the address contained in register $s\n跳轉到暫存器$s中包含的地址",
        "o": "PC = nPC; nPC = $s;",
        "s": "jr $s",
        "e": "0000 00ss sss0 0000 0000 0000 0000 1000"
    },
    "lb": {
        "i": "lb",
        "n": "LB -- Load byte",
        "d": "A byte is loaded into a register from the specified address.\n從指定地址將一個位元組加載到暫存器中.",
        "o": "$t = MEM[$s + offset]; advance_pc(4);",
        "s": "lb $t, offset($s)",
        "e": "1000 00ss ssst tttt iiii iiii iiii iiii"
    },
    "lui": {
        "i": "lui",
        "n": "LUI -- Load upper immediate",
        "d": "The immediate value is shifted left 16 bits and stored in the register. The lower 16 bits are zeroes.\n立即值向左移動16位並存儲在暫存器中。較低的16位是零.",
        "o": "$t = (imm << 16); advance_pc(4);",
        "s": "lui $t, imm",
        "e": "0011 11-- ---t tttt iiii iiii iiii iiii"
    },
    "lw": {
        "i": "lw",
        "n": "LW -- Load word",
        "d": "A word is loaded into a register from the specified address.\n從指定地址將一個字加載到暫存器中.",
        "o": "$t = MEM[$s + offset]; advance_pc(4);",
        "s": "lw $t, offset($s)",
        "e": "1000 11ss ssst tttt iiii iiii iiii iiii"
    },
    "mfhi": {
        "i": "mfhi",
        "n": "MFHI -- Move from HI",
        "d": "The contents of register HI are moved to the specified register.\n將暫存器HI的內容移動到指定的暫存器.",
        "o": "$d = $HI; advance_pc(4);",
        "s": "mfhi $d",
        "e": "0000 0000 0000 0000 dddd d000 0001 0000"
    },
    "mflo": {
        "i": "mflo",
        "n": "MFLO -- Move from LO",
        "d": "The contents of register LO are moved to the specified register.\n將暫存器LO的內容移動到指定的暫存器.",
        "o": "$d = $LO; advance_pc(4);",
        "s": "mflo $d",
        "e": "0000 0000 0000 0000 dddd d000 0001 0010"
    },
    "mult": {
        "i": "mult",
        "n": "MULT -- Multiply",
        "d": "Multiplies $s by $t and stores the result in $LO.\n將$s乘以$t並將結果存儲在$LO.",
        "o": "$LO = $s * $t; advance_pc(4);",
        "s": "mult $s, $t",
        "e": "0000 00ss ssst tttt 0000 0000 0001 1000"
    },
    "multu": {
        "i": "multu",
        "n": "MULTU -- Multiply unsigned",
        "d": "Multiplies $s by $t and stores the result in $LO.\n將$s乘以$t並將結果存儲在$LO.",
        "o": "$LO = $s * $t; advance_pc(4);",
        "s": "multu $s, $t",
        "e": "0000 00ss ssst tttt 0000 0000 0001 1001"
    },
    "nop": {
        "i": "nop",
        "n": "NOOP -- no operation",
        "d": "Performs no operation.\n不進行任何操作.",
        "o": "advance_pc(4);",
        "s": "nop",
        "e": "0000 0000 0000 0000 0000 0000 0000 0000"
    },
    "or": {
        "i": "or",
        "n": "OR -- Bitwise or",
        "d": "Bitwise logical ors two registers and stores the result in a register\n對兩個暫存器進行位元OR運算並將結果存儲在暫存器中",
        "o": "$d = $s | $t; advance_pc(4);",
        "s": "or $d, $s, $t",
        "e": "0000 00ss ssst tttt dddd d000 0010 0101"
    },
    "ori": {
        "i": "ori",
        "n": "ORI -- Bitwise or immediate",
        "d": "Bitwise ors a register and an immediate value and stores the result in a register\n對暫存器和立即值進行位元OR運算並將結果存儲在暫存器中",
        "o": "$t = $s | imm; advance_pc(4);",
        "s": "ori $t, $s, imm",
        "e": "0011 01ss ssst tttt iiii iiii iiii iiii"
    },
    "sb": {
        "i": "sb",
        "n": "SB -- Store byte",
        "d": "The least significant byte of $t is stored at the specified address.\n在指定的地址存儲$t的最低有效位元組.",
        "o": "MEM[$s + offset] = (0xff & $t); advance_pc(4);",
        "s": "sb $t, offset($s)",
        "e": "1010 00ss ssst tttt iiii iiii iiii iiii"
    },
    "sll": {
        "i": "sll",
        "n": "SLL -- Shift left logical",
        "d": "Shifts a register value left by the shift amount listed in the instruction and places the result in a third register. Zeroes are shifted in.\n將暫存器值按照指令中列出的移位量向左移位並將結果放在第三個暫存器中。移位進入的是零.",
        "o": "$d = $t << h; advance_pc(4);",
        "s": "sll $d, $t, h",
        "e": "0000 00ss ssst tttt dddd dhhh hh00 0000"
    },
    "sllv": {
        "i": "sllv",
        "n": "SLLV -- Shift left logical variable",
        "d": "Shifts a register value left by the value in a second register and places the result in a third register. Zeroes are shifted in.\n將暫存器值按照第二個暫存器中的值向左移位並將結果放在第三個暫存器中。移位進入的是零.",
        "o": "$d = $t << $s; advance_pc(4);",
        "s": "sllv $d, $t, $s",
        "e": "0000 00ss ssst tttt dddd d--- --00 0100"
    },
    "slt": {
        "i": "slt",
        "n": "SLT -- Set on less than (signed)",
        "d": "If $s is less than $t, $d is set to one. It gets zero otherwise.\n如果$s小於$t，則$d設置為一。否則為零.",
        "o": "if $s < $t $d = 1; advance_pc(4); else $d = 0; advance_pc(4);",
        "s": "slt $d, $s, $t",
        "e": "0000 00ss ssst tttt dddd d000 0010 1010"
    },
    "slti": {
        "i": "slti",
        "n": "SLTI -- Set on less than immediate (signed)",
        "d": "If $s is less than immediate, $t is set to one. It gets zero otherwise.\n如果$s小於立即，則$t設置為一。否則為零.",
        "o": "if $s < imm $t = 1; advance_pc(4); else $t = 0; advance_pc(4);",
        "s": "slti $t, $s, imm",
        "e": "0010 10ss ssst tttt iiii iiii iiii iiii"
    },
    "sltiu": {
        "i": "sltiu",
        "n": "SLTIU -- Set on less than immediate unsigned",
        "d": "If $s is less than the unsigned immediate, $t is set to one. It gets zero otherwise.\n如果$s小於無符號立即，則$t設置為一。否則為零.",
        "o": "if $s < imm $t = 1; advance_pc(4); else $t = 0; advance_pc(4);",
        "s": "sltiu $t, $s, imm",
        "e": "0010 11ss ssst tttt iiii iiii iiii iiii"
    },
    "sltu": {
        "i": "sltu",
        "n": "SLTU -- Set on less than unsigned",
        "d": "If $s is less than $t, $d is set to one. It gets zero otherwise.\n如果$s小於$t，則$d設置為一。否則為零.",
        "o": "if $s < $t $d = 1; advance_pc(4); else $d = 0; advance_pc(4);",
        "s": "sltu $d, $s, $t",
        "e": "0000 00ss ssst tttt dddd d000 0010 1011"
    },
    "sra": {
        "i": "sra",
        "n": "SRA -- Shift right arithmetic",
        "d": "Shifts a register value right by the shift amount (shamt) and places the value in the destination register. The sign bit is shifted in.\n將暫存器值根據移位量(shamt)向右移位並將值放在目標暫存器中。符號位被移入.",
        "o": "$d = $t >> h; advance_pc(4);",
        "s": "sra $d, $t, h",
        "e": "0000 00-- ---t tttt dddd dhhh hh00 0011"
    },
    "srl": {
        "i": "srl",
        "n": "SRL -- Shift right logical",
        "d": "Shifts a register value right by the shift amount (shamt) and places the value in the destination register. Zeroes are shifted in.\n將暫存器值根據移位量(shamt)向右移位並將值放在目標暫存器中。零被移入.",
        "o": "$d = $t >> h; advance_pc(4);",
        "s": "srl $d, $t, h",
        "e": "0000 00-- ---t tttt dddd dhhh hh00 0010"
    },
    "srlv": {
        "i": "srlv",
        "n": "SRLV -- Shift right logical variable",
        "d": "Shifts a register value right by the amount specified in $s and places the value in the destination register. Zeroes are shifted in.\n將暫存器值根據$s指定的金額向右移位並將值放在目標暫存器中。零被移入.",
        "o": "$d = $t >> $s; advance_pc(4);",
        "s": "srlv $d, $t, $s",
        "e": "0000 00ss ssst tttt dddd d000 0000 0110"
    },
    "sub": {
        "i": "sub",
        "n": "SUB -- Subtract",
        "d": "Subtracts two registers and stores the result in a register\n從兩個暫存器中減去並將結果存儲在一個暫存器中",
        "o": "$d = $s - $t; advance_pc(4);",
        "s": "sub $d, $s, $t",
        "e": "0000 00ss ssst tttt dddd d000 0010 0010"
    },
    "subu": {
        "i": "subu",
        "n": "SUBU -- Subtract unsigned",
        "d": "Subtracts two registers and stores the result in a register\n從兩個暫存器中減去並將結果存儲在一個暫存器中",
        "o": "$d = $s - $t; advance_pc(4);",
        "s": "subu $d, $s, $t",
        "e": "0000 00ss ssst tttt dddd d000 0010 0011"
    },
    "sw": {
        "i": "sw",
        "n": "SW -- Store word",
        "d": "The contents of $t is stored at the specified address.\n將$t的內容存儲在指定的地址.",
        "o": "MEM[$s + offset] = $t; advance_pc(4);",
        "s": "sw $t, offset($s)",
        "e": "1010 11ss ssst tttt iiii iiii iiii iiii"
    },
    "syscall": {
        "i": "syscall",
        "n": "SYSCALL -- System call",
        "d": "Generates a software interrupt.\n產生一個軟體中斷.",
        "o": "advance_pc(4);",
        "s": "syscall",
        "e": "0000 00-- ---- ---- ---- ---- --00 1100"
    },
    "xor": {
        "i": "xor",
        "n": "XOR -- Bitwise exclusive or",
        "d": "Exclusive ors two registers and stores the result in a register\n對兩個暫存器進行互斥或運算並將結果存儲在暫存器中",
        "o": "$d = $s ^ $t; advance_pc(4);",
        "s": "xor $d, $s, $t",
        "e": "0000 00ss ssst tttt dddd d--- --10 0110"
    },
    "xori": {
        "i": "xori",
        "n": "XORI -- Bitwise exclusive or immediate",
        "d": "Bitwise exclusive ors a register and an immediate value and stores the result in a register\n對暫存器和立即值進行位元互斥或運算並將結果存儲在暫存器中",
        "o": "$t = $s ^ imm; advance_pc(4);",
        "s": "xori $t, $s, imm",
        "e": "0011 10ss ssst tttt iiii iiii iiii iiii"
    }
}

const mispInstHints = document.body.insertAdjacentHTML('beforeend', `
<div id="mips-inst-hint">
<table>
    <tr>
        <td colspan="2">
        <span class=i></span>
        <span class=n></span>
        </td>
    </tr>
    <tr>
        <td style="width:80px">Syntax</td>
        <td>
            <code class=s></code>
            <code class=a></code>
        </td>
    </tr>
    <tr>
        <td>Description</td>
        <td class="d"></td>
    </tr>
    <tr>
        <td>Operation</td>        
        <td>
            <code class="o"></code>
            <code class="m"></code>
        </td>
    </tr>
    <tr>
        <td>Encoding</td>
        <td>
            <div class=e></div>
            <div class=l></div>
            <div class=v></div>
        </td>
    </tr>
</table>
</div>
`);
// inject style
document.head.insertAdjacentHTML('beforeend', `
<style>
    #mips-inst-hint {
        position: absolute;
        display: none;
        font-size: 10pt;
        background-color: #fff;
        border: 1px solid #000;
        padding: 10px;
        opacity: 0.98;
        z-index: 9999;
        width: 640px;
        table {
            width: 100%;
            border-collapse: collapse;
        }
        .i {
            display: none;
        }
        td {
            padding: 3px;
            border: 1px solid #000;
        }
        td:first-child {
            background-color: #eee;
        }
        td[colspan] {
            background-color: #ccc;
            font-weight: bold;
        }   
        .o {
            color: blue;
        } 
        .m,.a,.l {
            display: block;
            color: purple;
            font-weight: bold;
        }
        span.cht { display: none; }
        .e span, .v span {
            font-family: monospace;
        }
        
        .b1 { color: darkred; }
        .b2 { color: orange; }
        .b3 { color: #882; }
        .b4 { color: darkgreen; }
        .b5 { color: blue; }
        .b6 { color: purple; }
    }
    .show-cht #mips-inst-hint span.cht { display: block; }
</style>
`);

var mispInstHintEnabled = true;
// if languages contains Chinese, show Chinese hint
if (navigator.languages.filter(l => l.startsWith('zh')).length) {
    document.getElementById('toggle-cht').click();
}

const hintEl = document.getElementById('mips-inst-hint');
function extractVariables(str) {
    const re = /[\s,()]+/g;
    const p = str.split(re);
    if (p.length > 1) return p.slice(1);
    return [];
}
var regMapper = {};
function mapRegVar(s) {
    if (Object.keys(regMapper) == 0) {
        [...document.getElementById('general-regs').querySelectorAll('div > .hljs-string')]
            .map(o => {
                let [s, n, r] = o.textContent.match(/R(\d+) \((\S+)\)/);
                regMapper['$' + n] = '$' + r;
            });
    }
    return s.replace(/\$[a-z0-9]+\b/g, m => regMapper[m] || m);
}
function markBinStrColor(binStr) {
    const m = binStr.match(/(\S{4} \S{2})(\S{2} \S{3})(\S{1} \S{4})( \S{4} \S{1})(\S{3} \S{2})(\S{2} \S{4})/);
    return `<span class=b1>${m[1]}</span><span class=b2>${m[2]}</span><span class=b3>${m[3]}</span><span class=b4>${m[4]}</span><span class=b5>${m[5]}</span><span class=b6>${m[6]}</span>`;
}
function convHexToBin(hexStr) {
    return hexStr.split('').map(c => parseInt(c, 16).toString(2).padStart(4, '0')).join(' ');
}

function showMipsInstHint(target) {
    if (!mispInstHintEnabled) return;
    const ins = target.innerText.trim();
    const hint = mipsInstDict[ins];
    if (hint) {
        const x = target.getBoundingClientRect().left;
        let y = target.getBoundingClientRect().top;

        hintEl.style.display = 'block';
        for (let p in hint) {
            if (p == 'd') {
                let html = hint[p].replace(/\n/g, '<br>');
                let [en, cht] = hint[p].split('\n');
                if (cht) html = `${en}<span class=cht>${cht}</span>`;
                hintEl.querySelector('.' + p).innerHTML = html;
            }
            else
                hintEl.querySelector('.' + p).innerText = hint[p];
        }
        const lineOfCode = target.parentElement.textContent.trim();
        const syntax = hint.s;
        const tmplVars = extractVariables(syntax);
        const codeVars = extractVariables(lineOfCode);
        const mapper = {};
        let mappedOperation = '';
        if (tmplVars.length && tmplVars.length <= codeVars.length) {
            mappedOperation = hint.o;
            for (let i = 0; i < tmplVars.length; i++) {
                mapper[tmplVars[i]] = codeVars[i];
            }
            mappedOperation = mappedOperation.replace(/\$[a-z0-9]+\b|offset|imm|target/g,
                m => mapper[m] || m);            
        }
        hintEl.querySelector('.m').innerText = mapRegVar(mappedOperation);
        hintEl.querySelector('.a').innerText = mapRegVar(lineOfCode);

        hintEl.querySelector('.e').innerHTML = markBinStrColor(hint.e);
        hintEl.querySelector('.l').innerText = lineOfCode;
        const hexCode = target.parentElement.parentElement.querySelector('.hljs-number').textContent.trim();
        hintEl.querySelector('.v').innerHTML = hexCode ? markBinStrColor(convHexToBin(hexCode)) + ` [${hexCode}]` : '';
        hintEl.style.left = x + 'px';
        if (y < hintEl.getBoundingClientRect().height) {
            y = target.getBoundingClientRect().bottom + 6;
            hintEl.style.top = y + 'px';
        }
        else 
            hintEl.style.top = (y - hintEl.getBoundingClientRect().height) + 'px';
    }
}

function hideMipsInstHint(e) {
    hintEl.style.display = 'none';
}