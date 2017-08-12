$(function(){
    //阻止浏览器默认行为
    $(document).on({
        dragleave: function(e){//拖离
            e.preventDefault();
        },
        drop: function(e){//拖后放
            e.preventDefault();
        },
        dragenter: function(e){//拖进
            e.preventDefault();
        },
        dragover: function(e){//拖来拖去
            e.preventDefault();
        }
    });

    var area = document.getElementById('drop_area');
    var result = document.getElementById('result');
    var preview = document.getElementById('preview');
    var base64 = '';
    area.addEventListener('drop', function(e){
        e.preventDefault();
        var fileList = e.dataTransfer.files;//获取文件对象
        //检测是否是拖拽文件到页面的操作
        if(fileList.length == 0){
            return false;
        }
        //检测文件是不是图片
        if(fileList[0].type.indexOf('image') === -1){
            alert('您拖进来的不是图片！');
            return false;
        }

        var reader = new FileReader();
        reader.onload = function(){
            base64 = this.result;
            preview.src = base64;
            result.innerText = base64;
        }
        reader.readAsDataURL(fileList[0]);
    });

    //复制
    var clipboard = new Clipboard('#copy');
    clipboard.on('success', function(e) {
        // console.info('Action:', e.action);
        // console.info('Text:', e.text);
        // console.info('Trigger:', e.trigger);
        if(e.text.length > 0){
            alert('复制成功')
        }else{
            alert('复制失败，没有内容可复制！')
        }


        e.clearSelection();
    });

    clipboard.on('error', function(e) {
        // console.error('Action:', e.action);
        // console.error('Trigger:', e.trigger);
        alert('复制失败');
    });
});