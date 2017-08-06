/* 
Handy Banner
============

Banner appears immediately on scroll up and scrolls off page on scroll down.

*/

var handybanner = {
    el: null,
    spacer: document.createElement("div"),
    lastY: window.scrollY,
    scroll_change_to_up: false,
    init: function(selector){
        // Assign DOM element to el
        if(selector[0] ==='#'){
            this.el = document.getElementById(selector.substring(1));
        }else if(selector[0] === '.'){
           this.el = document.getElementsByClassName(selector.substring(1))[0];
        }else{
            throw "Selector'"+selector+"' does not appear to be a class or id.";
        }
        // Apply initial inline styles to el
        this.abs();
        // Update spacer
        this.spacer.classList.add('handybanner__spacer');
        this.el.parentNode.insertBefore(this.spacer, this.el),
        this.sizeSpacer();
        // Add event listeners
        window.addEventListener('scroll', this, false);
        window.addEventListener('resize', this, false);
    },
    abs: function(){
        this.el.style.top = window.scrollY + "px";
        this.el.style.position = 'absolute';
    },
    fix: function(){
        this.el.style.top = 0;
        this.el.style.position = 'fixed';  
    },
    offset: function(element = this.el){
        var top = 0, left = 0;
        do {
            top += element.offsetTop  || 0;
            left += element.offsetLeft || 0;
            element = element.offsetParent;
        } while(element);

        return {
            top: top,
            left: left
        }
    },
    sizeSpacer: function(){
        this.spacer.style.height = parseInt(this.el.clientHeight)+"px";
    },
    update: function(){
        if(window.scrollY < this.lastY){
        //scrolling up
            if(this.scroll_change_to_up === false){
                this.el.style.top = Math.max(window.scrollY - parseInt(this.el.clientHeight), this.offset().top) + "px";
                this.scroll_change_to_up = true;
            }else if(window.scrollY <= parseInt(this.el.style.top)){
                this.fix();
            }
        }else{
        //scrolling down
            if(this.el.style.position == 'fixed'){
                this.abs();
            }
            this.scroll_change_to_up = false;
        }
        this.lastY = window.scrollY;
    },
    handleEvent: function(e){
        switch(e.type){
            case 'scroll':
                this.update();
                break;
            case 'resize':
                this.sizeSpacer();
                break;
        }
    },
}

handybanner.init('#handybanner');
