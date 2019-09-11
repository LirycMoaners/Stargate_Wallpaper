class Stargate {
    constructor() {
        this.binary1 = document.getElementById('binary-1');
        this.binary2 = document.getElementById('binary-2');
        this.chars = ['-', '|', '_', ' '];
        this.colors = ['#29A6A6', '#D5C896', '#CCC99C', '#2B5858'];

        this.lights = [];
        for (let i = 1; i <= 5; i++) {
            this.lights.push(document.getElementById('light-' + i));
        }

        this.symbolSelection = document.getElementById('symbolSelection');
        this.circle = document.getElementById('circle');
        this.message = document.getElementById('message');
        this.planetName = document.getElementById('planetName').firstElementChild;

        this.symbols = [];
        this.chevrons = [];
        this.statusList = [];
        for (let i = 1; i <= 7; i++) {
            this.symbols.push(document.getElementById('symbol-' + i));
            this.chevrons.push(document.getElementById('chevron-' + i));
            this.statusList.push(document.getElementById('status-' + i));
        }

        this.currentSymbolIndex = null;
    }

    initAllIntervals() {
        setInterval(() => {        
            if (this.binary1.innerHTML.length > 140) {
                this.binary1.innerHTML = this.binary1.innerHTML.slice(1);
            }
        
            if (this.binary2.innerHTML.length > 140) {
                this.binary2.innerHTML = this.binary2.innerHTML.slice(1);
            }
        
            if (Math.random() * 10 > 8) {
                this.binary1.innerHTML += ' ';
            } else {
                this.binary1.innerHTML += Math.round(Math.random()).toString();
            }
        
            if (Math.random() * 10 > 8) {
                this.binary2.innerHTML += ' ';
            } else {
                this.binary2.innerHTML += Math.round(Math.random()).toString();
            }
        }, 100);
        
        setInterval(() => {
            this.lights[0].innerHTML = '';
            this.lights[1].innerHTML = '';
            this.lights[2].innerHTML = '';
            this.lights[3].innerHTML = '';
            this.lights[4].innerHTML = '';
        
            for (let i = 0; i < 8; i++) {
                this.lights[0].innerHTML += '<span style="color:' + this.colors[Math.round(Math.random() * 3)] + '">' + this.chars[Math.round(Math.random() * 3)] + '<span>';
                this.lights[1].innerHTML += '<span style="color:' + this.colors[Math.round(Math.random() * 3)] + '">' + this.chars[Math.round(Math.random() * 3)] + '<span>';
                this.lights[2].innerHTML += '<span style="color:' + this.colors[Math.round(Math.random() * 3)] + '">' + this.chars[Math.round(Math.random() * 3)] + '<span>';
                this.lights[3].innerHTML += '<span style="color:' + this.colors[Math.round(Math.random() * 3)] + '">' + this.chars[Math.round(Math.random() * 3)] + '<span>';
                this.lights[4].innerHTML += '<span style="color:' + this.colors[Math.round(Math.random() * 3)] + '">' + this.chars[Math.round(Math.random() * 3)] + '<span>';
            }
            
            for (let i = 0; i < 12; i++) {
                this.lights[0].innerHTML += '<span style="color:' + this.colors[Math.round(Math.random() * 3)] + '">' + this.chars[Math.round(Math.random() * 3)] + '<span>';
                this.lights[1].innerHTML += '<span style="color:' + this.colors[Math.round(Math.random() * 3)] + '">' + this.chars[Math.round(Math.random() * 3)] + '<span>';
                this.lights[2].innerHTML += '<span style="color:' + this.colors[Math.round(Math.random() * 3)] + '">' + this.chars[Math.round(Math.random() * 3)] + '<span>';
                this.lights[3].innerHTML += '<span style="color:' + this.colors[Math.round(Math.random() * 3)] + '">' + this.chars[Math.round(Math.random() * 3)] + '<span>';
            }
        
            for (let i = 0; i < 32; i++) {
                this.lights[3].innerHTML += '<span style="color:' + this.colors[Math.round(Math.random() * 3)] + '">' + this.chars[Math.round(Math.random() * 3)] + '<span>';
            }
        }, 1000);
    }
        
    onClickSymbol (id) {
        this.currentSymbolIndex = id;
        this.symbolSelection.style.display = 'grid';
    }
    
    onChooseSymbol (symbolCharCode) {
        this.symbols[this.currentSymbolIndex].innerHTML = '<span>' + symbolCharCode + '</span>';
    
        if (symbolCharCode && !this.chevrons[this.currentSymbolIndex].classList.contains('engaged')) {
            this.chevrons[this.currentSymbolIndex].classList.add('engaged');
        } else if (!symbolCharCode && this.chevrons[this.currentSymbolIndex].classList.contains('engaged')) {
            this.chevrons[this.currentSymbolIndex].classList.remove('engaged');
        }
    
        if (symbolCharCode && this.statusList[this.currentSymbolIndex].children.item(0).classList.contains('engaged')) {
            this.statusList[this.currentSymbolIndex].children.item(0).classList.remove('engaged');
        } else if (!symbolCharCode && !this.statusList[this.currentSymbolIndex].children.item(0).classList.contains('engaged')) {
            this.statusList[this.currentSymbolIndex].children.item(0).classList.add('engaged');
        }
    
        if (symbolCharCode && !this.statusList[this.currentSymbolIndex].children.item(1).classList.contains('engaged')) {
            this.statusList[this.currentSymbolIndex].children.item(1).classList.add('engaged');
        } else if (!symbolCharCode && this.statusList[this.currentSymbolIndex].children.item(1).classList.contains('engaged')) {
            this.statusList[this.currentSymbolIndex].children.item(1).classList.remove('engaged');
        }
    
        if (symbolCharCode && !this.statusList[this.currentSymbolIndex].children.item(3).classList.contains('engaged')) {
            this.statusList[this.currentSymbolIndex].children.item(3).classList.add('engaged');
            this.statusList[this.currentSymbolIndex].children.item(3).innerHTML = 'OK';
        } else if (!symbolCharCode && this.statusList[this.currentSymbolIndex].children.item(3).classList.contains('engaged')) {
            this.statusList[this.currentSymbolIndex].children.item(3).classList.remove('engaged');
            this.statusList[this.currentSymbolIndex].children.item(3).innerHTML = 'KO';
        }
        
        const address = this.symbols.map(c => c.firstElementChild.innerHTML).filter(s => s != '+').join('');
        const foundAddress = addresses.find(a => a.address == address);
        if (foundAddress) {
            this.message.firstElementChild.innerHTML = 'SUCCESS';
            this.message.style.color = 'limegreen';
    
            if (this.message.classList.contains('blink')) {
                this.message.classList.remove('blink');
            }
    
            if (!this.circle.classList.contains('engaged')) {
                this.circle.classList.add('engaged')
                this.planetName.innerHTML = foundAddress.name;
            }
        } else {
            if (this.circle.classList.contains('engaged')) {
                this.circle.classList.remove('engaged')
                this.planetName.innerHTML = '';
            }
    
            if (address.length == 7) {
                this.message.firstElementChild.innerHTML = 'FAILURE';
                this.message.style.color = 'red';
    
                if (this.message.classList.contains('blink')) {
                    this.message.classList.remove('blink');
                }
            } else if (address.length > 0) {
                this.message.firstElementChild.innerHTML = 'ENGAGED';
                this.message.style.color = 'yellow';
    
                if (this.message.classList.contains('blink')) {
                    this.message.classList.remove('blink');
                }
            } else {
                this.message.firstElementChild.innerHTML = 'IDLE';
                this.message.style.color = 'grey';
                
                if (!this.message.classList.contains('blink')) {
                    this.message.classList.add('blink');
                }
            }
        }

        this.symbolSelection.style.display = 'none';
    }
}

var stargate = null;

setTimeout(() => {
    stargate = new Stargate();
    stargate.initAllIntervals();
}, 0);
