(function($) {
    var highlightGimmick = {
        name: 'highlight',
        load: function() {
            $.md.stage('gimmick').subscribe(function(done) {
                highlight();
                done();
            });
        }
    };
    $.md.registerGimmick(highlightGimmick);


    function highlight () {
        // marked adds lang-ruby, lang-csharp etc to the <code> block like in GFM
        var $codeblocks = $('pre code[class^=lang-]');
        return $codeblocks.each(function() {

            var $this, classes, lang, parent, $parent;
            $this = $(this);
            classes = $this.attr('class');

            // TODO check for other classes and only find the lang- one
            // highlight doesnt want a lang- prefix
            lang = classes.substring(5);
            $this.removeClass(classes);

            parent = $this[0].parentElement;
            $parent = $(parent);
            $parent.addClass("language-" + lang);
            Prism.highlightElement(parent, true, function() {});

        });
    }

}(jQuery));
