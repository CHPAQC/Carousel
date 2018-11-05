function Carousel($ct){
    this.init($ct)
    this.bind()
    this.autoPlay()
}
Carousel.prototype = {
    constructor: Carousel,
    init: function($ct){
        this.$ct = $ct
        this.$imgCt = this.$ct.find('.img-ct')
        this.$imgs = this.$ct.find('.img-ct > li')
        this.$preBtn = this.$ct.find('.pre')
        this.$nextBtn = this.$ct.find('.next')
        this.$bullets = this.$ct.find('.bullet li')
        this.$btnstop = this.$ct.find('.stop')
        this.$btnstart = this.$ct.find('.start')
        this.index = 0
        this.isAnimate = false
        this.isplay = true
        this.imgWidth = this.$imgs.width()
        this.imgCount = this.$imgs.length
        this.$imgCt.append(this.$imgs.first().clone())
        this.$imgCt.prepend(this.$imgs.last().clone())

        this.$imgCt.width((this.imgCount + 2) * this.imgWidth)
        this.$imgCt.css('left',-this.imgWidth)
    },
    bind: function(){
        var _this = this
        this.$preBtn.on('click',function(){
            _this.playPre(1)
        })
        this.$nextBtn.on('click',function(){
            _this.playNext(1)
            // console.log('next ...')
        })
        this.$bullets.on('click',function(){
            var index = $(this).index()
            if(_this.index > index) {
                _this.playPre(_this.index - index)
            }else{
                _this.playNext(index - _this.index)
            }
        })
        this.$btnstop.on('click',function(){
            _this.stopAuto()
            _this.isplay = false
        })
        this.$btnstart.on('click',function(){
            if(_this.isplay) return
            _this.autoPlay()
            _this.isplay = true
        })
    },
    playNext: function(len){
        var _this = this
        if(_this.isAnimate) return
        this.isAnimate = true
        this.$imgCt.animate({
            left: '-=' +this.imgWidth * len
        },function(){
            _this.index += len
            if(_this.index === _this.imgCount){
                _this.$imgCt.css('left', -_this.imgWidth)
                _this.index = 0 
            }
            _this.setBullet()
            _this.isAnimate = false
        })
    },
    playPre: function(len){
        var _this = this
        if(_this.isAnimate) return
        this.isAnimate = true
        this.$imgCt.animate({
            left: '+=' +this.imgWidth * len 
        },function(){
            _this.index -= len
            if(_this.index < 0) {
                _this.$imgCt.css('left',-(_this.imgCount * _this.imgWidth))
                _this.index = _this.imgCount - 1 
            }
            _this.setBullet()
            _this.isAnimate = false
        })
    },
    setBullet: function(){
        this.$bullets.eq(this.index).addClass('active')
        .siblings().removeClass('active')
    },
    autoPlay: function(){
        var _this = this
        this.autoClock = setInterval(function(){
            _this.playNext(1)
        },2000)
    },
    stopAuto: function(){
        clearInterval(this.autoClock)
    }
}




var a = new Carousel($('.carousel').eq(0))  
new Carousel($('.carousel').eq(1)) 