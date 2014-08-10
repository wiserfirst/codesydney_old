var carouselCtrl = {
    switchInterval: 2000,
    transitInterval: 300,
    imageIndex: 0,
    timeOutHandle: 0,
    showImage: function(index) {
        if (index === 'next') {
            carouselCtrl.imageIndex = (carouselCtrl.imageIndex + 1) % 4;
        } else if (index === 'prev') {
            carouselCtrl.imageIndex = (carouselCtrl.imageIndex - 1) % 4;
        } else {
            carouselCtrl.imageIndex = index;
        }
        var i = carouselCtrl.imageIndex;
        // show image
        $("#carousel>li").fadeOut(carouselCtrl.transitInterval)
                         .eq(i).fadeIn(carouselCtrl.transitInterval);

        // set points
        $("#points>li").removeClass("active").eq(i).addClass("active");

        if (carouselCtrl.timeOutHandle > 0) {
            clearTimeout(carouselCtrl.timeOutHandle);
        }
        // Register call for next image
        carouselCtrl.timeOutHandle = setTimeout(function() {
            carouselCtrl.showImage('next');
        }, carouselCtrl.switchInterval);
    },
};

$("#prev").click(function() { carouselCtrl.showImage('prev'); });
$("#next").click(function() { carouselCtrl.showImage('next'); });

$("#points>li").click(function() {
    var i = $(this).index();
    carouselCtrl.showImage(i);
});

$(carouselCtrl.showImage(0));
