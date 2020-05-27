'use strict';

class Panel {
    constructor() {
        this.el = document.createElement('li');
        this.el.classList.add('pressed');
        this.el.addEventListener('click', () => {
            this.check();
        })
    }
    getEl() {
        return this.el;
    }

    activate(num) {
        this.el.classList.remove('pressed');
        this.el.textContent = num;
    }

    check() {
        if (currentNum === parseInt(this.el.textContent, 10)) {
            this.el.classList.add('pressed');
            currentNum++;
            if(currentNum === 300) {
                clearTimeout(timeoutId);
                currentNum = 0;
            }
        }
    }

}

class Board {
    constructor() {
        this.panels = [];
        for (let i = 0; i < 300; i++) {
            this.panels.push(new Panel());
        }
        this.setup();
    }

    setup() {
        const board = document.getElementById('board');
        this.panels.forEach(panel => {
            // board.appendChild(panel.el);
            board.appendChild(panel.getEl());
            // クラスのプロパティには外部からアクセスしない方がいい
        });
    }

    activate() {
        const nums = [...Array(300).keys()];
        this.panels.forEach(panel => {
            const num = nums.splice(Math.floor(Math.random() * nums.length), 1)[0];
            panel.activate(num);
        })
    }
}

let currentNum = 0;
let startTime;
let timeoutId;

const board = new Board();

const btn = document.getElementById('btn');
btn.addEventListener('click', () => {
    board.activate();
    startTime = Date.now();
    if(btn.textContent = "start") {
        btn.textContent = "reset";
    } else if(btn.textContent = "reset") {
        currentNum = 0;
        activate();
        btn.textContent = "start"
    }
    runTimer();
});
function runTimer() {
    const timer = document.getElementById('timer');
    timer.textContent = ((Date.now() - startTime) / 1000).toFixed(2);
    // nowに()をつけないとメソッドにならないため、バグになる。今回は(NaN)になった

    timeoutId = setTimeout(() => {
        runTimer();
    }, 10);
}



