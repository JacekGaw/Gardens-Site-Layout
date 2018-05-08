$('.slider').slick({
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  adaptiveHeight: true,
});
				

// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });

//////////////////////////////////////////////////////////////////////

var canCount = true;
var count = $(".count").offset();
var windowHeight = window.innerHeight;
document.addEventListener('scroll',function(){
   var offset = $("#about").offset();
    if(window.scrollY >= offset.top){
        $("#scroll-button").css("display","block")
        $(".nav").css({"background-color": "#444", "padding-bottom": "1%", "padding-top": "1%"});
    }
    else if(window.scrollY < offset.top){
        $("#scroll-button").css("display","none");
        $(".nav").css({"background-color": "rgba(10,10,10,0)", "padding-bottom": "0", "padding-top": "2%"});
    }
    
   if((window.scrollY + windowHeight) >= count.top){
       if(canCount == true){
            counting();
           canCount = false;
       }
   }
    
});

$("#scroll-button").click(function(){
    var target = $("#header");
   $('html, body').animate({
       scrollTop: target.offset().top
   },1000)
});


function counting(){
(function ($) {
        $.fn.countTo = function (options) {
            options = options || {};

            return $(this).each(function () {
                var settings = $.extend({}, $.fn.countTo.defaults, {
                    from:            $(this).data('from'),
                    to:              $(this).data('to'),
                    speed:           $(this).data('speed'),
                    refreshInterval: $(this).data('refresh-interval'),
                    decimals:        $(this).data('decimals')
                }, options);

                var loops = Math.ceil(settings.speed / settings.refreshInterval),
                    increment = (settings.to - settings.from) / loops;

                var self = this,
                    $self = $(this),
                    loopCount = 0,
                    value = settings.from,
                    data = $self.data('countTo') || {};

                $self.data('countTo', data);
                if (data.interval) {
                    clearInterval(data.interval);
                }
                data.interval = setInterval(updateTimer, settings.refreshInterval);
                render(value);
                function updateTimer() {
                    value += increment;
                    loopCount++;
                    render(value);
                    if (typeof(settings.onUpdate) == 'function') {
                        settings.onUpdate.call(self, value);
                    }
                    if (loopCount >= loops) {
                        // remove the interval
                        $self.removeData('countTo');
                        clearInterval(data.interval);
                        value = settings.to;

                        if (typeof(settings.onComplete) == 'function') {
                            settings.onComplete.call(self, value);
                        }
                    }
                }
                function render(value) {
                    var formattedValue = settings.formatter.call(self, value, settings);
                    $self.html(formattedValue);
                }
            });
        };
        $.fn.countTo.defaults = {
            from: 0,             
            to: 0,            
            speed: 1000,         
            refreshInterval: 100,  
            decimals: 0,           
            formatter: formatter,  
            onUpdate: null,        
            onComplete: null       
        };
        function formatter(value, settings) {
            return value.toFixed(settings.decimals);
        }
    }(jQuery));

    jQuery(function ($) {
      // custom formatting example
      $('.count-number').data('countToOptions', {
        formatter: function (value, options) {
          return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
        }
      });
      $('.timer').each(count);  
      function count(options) {
        var $this = $(this);
        options = $.extend({}, options || {}, $this.data('countToOptions') || {});
        $this.countTo(options);
      }
    });
}

