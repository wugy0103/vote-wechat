$(function () {
    $('.mark-option').on('click', function (e) {
        var el = $(this);
        $('.mark-item.selected').removeClass('selected');
        el.addClass('selected');
        $('[name="answer_id"]').val(el.data('value'));
    });

    $('.btn-submit').on('click', function () {
        var el = $(this);
        if (el.hasClass('submitting'))
            return;

        var answer_id = parseInt($('[name="answer_id"]').val());
        var item_id = $('[name="item_id"]').val();

        if (isNaN(answer_id))
            return alert('请选择您的评价');
        el.text('提交中 ...').addClass('submitting');
        $.post('./addvote', {
            userid: new Date().getTime(),
            answer_id,
            item_id
        }, function (json) {
            el.text('提交')
            if (json.success) {
                $('.btn-submit').addClass('hidden');
                alert('提交成功，感谢您对我们的工作支持。');
            } else {
                alert(json.message);
                el.removeClass('submitting');
            }
        });
    });

});