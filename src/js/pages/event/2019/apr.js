var submit = false;
var disabledFlag=false;
$(function(){
	$(".btn_vouchers").click(function(){
		if(isLogin){
			if (submit) {
				return false;
			}
			var ruleId =$(this).data("rule")
			if(typeof ruleId == "undefined" || ruleId == null || ruleId == ""){
				return layer.msg("活动未开始或已结束");
			}
			if($(this).hasClass("disabled")){
				return false;
			}
			if($(this).data("flag")== false|| $(this).data("flag") =='false' ){
				layer.alert('您不符合红包领取条件哦！<br>本奖励为4月未上榜用户的待收保级奖励，即您未获得上榜奖励，在2019年4月30日24时的待收本金＞0，且不低于4月1日0时的待收本金，才可领取。');
				return false;
			}
			$(this).attr("disabled",true).addClass("disabled");
			$.ajax({
				url : basePath + '/event/2019/award',
				type : "POST",
				data:{
					"ruleId":ruleId
				},
				success : function(data) {
					submit = false;
					if (data.success) {
						layer.msg("领取成功！");
						$(this).attr("disabled",true).addClass("disabled");
					} else {
						$(this).attr("disabled",false).removeClass("disabled");
						layer.msg(data.msg);
					}
				}
			})
		}else{
			layerLogin();
		}
	})
})
function openLayer(ruleId,obj){
	if(isLogin){
		if (submit) {
			return false;
		}
		if(typeof ruleId == "undefined" || ruleId == null || ruleId == ""){
			return layer.msg("活动未开始或已结束");
		}
		if($(".btn-act2").hasClass("disabled")){
			return false;
		}
		var klqzs = parseInt($("#klqzs").html());
		var _this=$(obj);
		_this.attr("disabled",true).addClass("disabled");
		$.ajax({
			url : basePath + '/event/dec/award',
			type : "POST",
			data:{
				"ruleId":ruleId
			},
			success : function(data) {
				submit = false;
				if (data.success) {
					klqzs--;
					$("#klqzs").html(klqzs);
					var pig=$("#bonuslist .rate").eq(_this.data("index"));
					pig.addClass("pig");
					$("#goldtip").html('<div class="win_state"><img src="'+basePath+'/public/images/event/2019/apr/layericon.png" height="120" alt="" /></div>');
					setTimeout(function(){
						_this.attr("disabled",false).removeClass("disabled");
						pig.removeClass("pig");
						$("#goldtip").html('');
						$("#resultDesc").html('<p>您今日已经领取了<em>'+(parseInt(5-klqzs))+'</em>张</p><p>还可以领取<em>'+(klqzs)+'</em>张</p>');
						$("#getbonus").addClass('getbonus').show();
					},1400);
					if((klqzs)==0){
						$("#actBtn").html('<a href="'+basePath+'/spa/product/index" class="btn btn-act">我要出借</a>');
						submit = true;
						return;
					}
				} else {
					_this.attr("disabled",false).removeClass("disabled");
					if (data.code == '-3') {
						return layer.open({
							content : data.msg,
							title : false,
							closeBtn : false,
							btn : [ '去出借','取消' ],
							yes : function(index, layero) {
								window.location.href = basePath + '/spa/product/index';
							},btn2:function(index,layero){
								layer.closeAll();
							}
						});
					}
					layer.msg(data.msg);
				}
			}
		})
	}else{
		layerLogin();
	}
}
function colseLayer(){
	$("#getbonus").removeClass('getbonus').hide();
}

function bonusTest(){
	setTimeout(function(){
		$("#bonuslist .rate").eq(0).addClass("pig");
		$("#goldtip").html('<div class="win_state"><img src="/public/images/event/2019/apr/layericon.png" height="120" alt="" /></div>');
		setTimeout(function(){
			$("#goldtip").html('');
			$("#bonuslist .rate").eq(0).removeClass("pig");
			$("#resultDesc").html('<p>您今日已经领取了<em>4</em>张</p><p>还可以领取<em>1</em>张</p>');
			$("#getbonus").addClass('getbonus').show();
		},1400);
	},3000);
}
