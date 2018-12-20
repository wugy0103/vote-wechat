$(function () {
    var date = '';
    $.get('/common/getTime', {}, function (json) {
        if (json.serverTime) {
            date = new Date(json.serverTime).getDate();
        } else {
            // alert('网络繁忙，请刷新后重试！');
        }
    });
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
        var userid = $('[name="userid"]').val();

        if (!date) {
            date = new Date().getDate();
        }

        if (localStorage.getItem('item_id_' + date + '_' + item_id)) {
            alert('抱歉！您今天已经对该单位评价过了');
            return;
        }


        if (isNaN(answer_id))
            return alert('请选择您的评价');
        el.text('提交中 ...').addClass('submitting');
        $.post('./addvote', {
            userid,
            answer_id,
            item_id
        }, function (json) {
            el.text('提交')
            if (json.success) {
                $('.btn-submit').addClass('hidden');
                localStorage.setItem('item_id_' + date + '_' + item_id, '1');
                alert('提交成功，感谢您对我们的工作支持。');
            } else {
                alert(json.message);
                el.removeClass('submitting');
            }
        });
    });

});