$(document).ready(
    function() {
        $('[data-spinner]').each(function(index, spinner) {
            var words = $(spinner).attr('data-spinner').split(",");
            $(spinner).addClass('text-spinner');
            words.forEach(function(word) {
                $(spinner).append("<span>" + word + "</span>");
            });
            //$(spinner).find('span').first().addClass('active');

            var i = 0;
            var run = function() {
                $(spinner).find('span.active').addClass('away').removeClass('active');
                $($(spinner).find('span')[i]).addClass('active');
                i++;
                if(i >= $(spinner).find('span').length) i = 0;
            }
            run();
            setInterval(run, 3000);
            $(spinner).find('span').on("transitionend", function() {
                $(this).removeClass("away");
            });
});
})