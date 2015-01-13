function shake(u_tagname,message)
{
	$(u_tagname).addClass('fg-red');
	
	$(u_tagname).addClass('animated shake')
	 setTimeout(function(){
		 $(u_tagname).removeClass('animated shake')
	 }, 700 );       
	
	if(message)
	{
	setTimeout(function() {
		$.Notify({
			style : {
				background : 'red',
				color : 'white'
			},
			content : message
		});
	}, 100);
	}
}




function set_tag(tag,type,container)
{
	var _tag='#'+tag;
	
	if(type=='hidden' || type=='h')
	{
		$(_tag,container).addClass("no-display");
	}
	else
	{
		$(_tag,container).removeClass("no-display");
	}
}


function mypost(o)
{
	$.Dialog.close()
	$.blockUI({ message: '<h2><img src="./images/busy.gif" /> 處理中, 請稍侯...</h2>' });        		
	
	var data = (o.data)?o.data:$("#formPost").serialize();
	
	
	$.ajax({
		type : 'POST', //GET or POST
		url : o.url, 						//請求的頁面
		cache : false,									//防止抓到快取的回應
		data : data, //要傳送到頁面的參數
		success :  function(data) {
				$.unblockUI();
				o.onSuccess(data)
			}, 			
		error : function(data) {
			$.unblockUI();
			alert("Error");
		}, //當請求失敗後此事件會被呼叫
		statusCode : { //狀態碼處理
			404 : function() {
				$.unblockUI();
				alert ("page not found");        				
			}
		}
	});	 
}



//=========================================
//			Class 	MetroContainer
//=========================================

//偽 Class MetroContainer;
function MetroContainer(container_id)
{
	 this.container_id=container_id;
	 
	 
	 //初始化
	 this.init = function(options) {
		 
		var container=$('#'+this.container_id);	
		
		this.adjust_for_center();
		
		//檢查是否有按鈕放置區
		if ($("#area_buttom",container).length <= 0) {		
			container.prepend('<div id="area_buttom"></div>');
			
		}
		
		
		
		//初始化磚的Click
		$('.tile',container).bind('click', this, this.click_tile);		
				
		
		if(options.jump)
		{
			this.jump=options.jump;
		}
		

		if(options.remove)
		{
			this.remove=options.remove;
		}
		
		if(options.create)
		{
			this.create = options.create;	
		}
		

		if(options.save)
		{
			this.save = options.save;	
		}
		
		//初始化Create Click (Save按鈕)
		$('#bt_create',container).bind('click', this, this.create);				
		
		
		if(options.bt_add)
		{
			$('#area_buttom',container).append(this.buildButtomHtml('add','icon_add','bt_create'));
			$('#icon_add a',container).click(function(e) {		
				set_tag('icon_add','h',container)
				set_tag('icon_remove','h',container)
				set_tag('icon_list','s',container)				
				set_tag('area_list','h',container)
				set_tag('area_add','s',container)
			});
		}

		if(options.bt_list)
		{
			$('#area_buttom',container).append(this.buildButtomHtml('list'));
			$('#icon_list',container).addClass('no-display')
			
			$('#icon_list a',container).bind('click', this, this.show_tile);		
		
		}

		if(options.bt_remove)
		{
			$('#area_buttom',container).append(this.buildButtomHtml('remove'));
			
			$('#icon_remove a',container).click(function(e) {
				set_tag('icon_add','h',container)
				set_tag('icon_remove','h',container)
				set_tag('icon_list','s',container)

				set_tag("area_list","s",container)
				set_tag("area_add","h",container)
				
				//half-opacity
				
				 $('a.tile', container).each(function () 
				 { 
				  	$(this).addClass('half-opacity');
				 }); 			
			});			
		}
		

		if(options.bt_edit)
		{
			$('#area_buttom',container).append(this.buildButtomHtml('edit'));			
		
			$('#icon_edit a',container).click(function(e) {
				$('.viewtext',container).each(function() {
					$(this).addClass('no-display');
				});
		
				$('.inputtext',container).each(function() {
					$(this).removeClass('no-display');
				});
			});
			
			//bt_cancel (資料列)
			$('#bt_cancel',container).bind('click', this, this._show_viewtext);		
		
			
			//bt_save (資料列)
			$('#bt_save',container).bind('click', this, this._save_inputview);	
			
		}				
	 };
	 
	 this._save_inputview = function(event)
	 {
		var _self = (event.data) ? event.data : this;	
		var container=$('#'+_self.container_id);	
		_self.save(event) 
		_self._show_viewtext(event);
	 }
	 	 
	 this._show_viewtext = function (event)
	 {
			$('.viewtext',container).each(function() {
				$(this).removeClass('no-display');
			});
	
			$('.inputtext',container).each(function() {
				$(this).addClass('no-display');
			});		 
	 }
	 
	this.show_tile = function (event) {
		console.log(typeof(event.data));
		var _self = (event.data) ? event.data : this;	
		var container=$('#'+_self.container_id);	
			
	
		set_tag('icon_add','s',container)
		set_tag('icon_remove','s',container)
		set_tag('icon_list','h',container)
	    
		
		set_tag('area_list','s',container)
		set_tag('area_add','h',container)
		
		 $('a.tile', container).each(function () 
		 { 
		  	$(this).removeClass('half-opacity');
		  	$(this).removeClass('selected');				  	
		 });
		 		
	}

	this.click_tile = function(event)	{		
		var _self = (event.data) ? event.data : this;	
			//	$.blockUI({ message: '<h2><img src="./images/busy.gif" /> 處理中, 請稍侯...</h2>' }); 
				//location.href='contact_list.php?id='+options.user_id;	
					
			thisid = $(this).attr('data-tileid');
			options={id:thisid,obj:$(this)};
			
			var btclass = $(this).attr('class');
			if(btclass.indexOf('half-opacity')!=-1)
	    	{        
				//待刪除（透明）			
				$(this).addClass('selected');
				
				$.Dialog({
					shadow : true,
					overlay : false,
					icon : '<span class="icon-remove"></span>',
					title : '是否確定刪除',
					width : 300,
					padding : 20,
					onShow: function(_dialog){
						var divId = "dialog" + Math.round(Math.random() * 100);
						var content = '<p>刪除後將無法回復，是否仍要刪除</p><div style="margin-top: 20px;"/><p>';
						 content+= '<a class="default button" id="YES'+divId+'" name="YES'+divId+'">是, 刪除</a>';
						 content+='<a class="button on-right-more" id="NO'+divId+'" name="NO'+divId+'" >否</a></p>';							 
						$.Dialog.content(content);	
						
						$('#YES'+divId).click(function(e) {
							$.Dialog.close();
							options.obj.removeClass('selected');					
							_self.remove(options);
						});			
						
						$('#NO'+divId).click(function(e) {
							$.Dialog.close();
							options.obj.removeClass('selected');
							console.log('no');
						});			
						
						//options.obj.removeClass('selected')
						//console.log(options.obj);
					}							
				});
				 //_self.remove(options);
	    	}
			else
			{	
				 _self.jump(options);					
			}	
	};
	 
	this.adjust_for_center = function adjust_for_center()
	{		
		var container=$('#'+this.container_id);	
		var container_width=$('#container').width();	
		var padding= (container_width%260)/2-5
		$( "#area_list",container ).offset({ left: padding });			
	}
	
	this.jump = function(options)	{
		
	};
	
	this.remove = function(options){
		console.log('function remove');
	};
	

	this.create = function (event) {
		var _self = (event.data) ? event.data : this;	
		console.log('default function add');
	//   $('#area_list a:first-child',container).clone().attr('data-tileid', 'id1').appendTo( $("#area_list",container) );
	};	
	 
	this.save = function (event) {
		var _self = (event.data) ? event.data : this;	
		console.log('default function save');
	//   $('#area_list a:first-child',container).clone().attr('data-tileid', 'id1').appendTo( $("#area_list",container) );
	};		
	
	 this.buildButtomHtml = function(act,id,pic) {
		 //console.log(typeof(id));
		 	if(typeof(id)=="undefined")
		 	{
		 		switch(act)
		 		{
			 		case "add":
			 			id='icon_add';
			 			pic='bt_create';
			 			break;
			 			
			 		case "list":
			 			id='icon_list';
			 			pic='bt_undo';
			 			break;

			 		case "remove":
			 			id='icon_remove';
			 			pic='bt_delete';
			 			break;
			 			
			 		case "edit":
			 			id='icon_edit';
			 			pic='edit';
			 			break;
		 		}
		 	}
		 	
		 	var bt_pic='images/'+pic+'.png';	
			var bthtml='<div id="'+id+'"  name="'+id+'"  class="place-right">';				
			bthtml+="<a class='on-right-more' style='cursor:pointer'>";
			//href='javascript:click_buttom(\""+act+"\",\""+this.container_id+"\");' 
			bthtml+='<img src="'+bt_pic+'" width="48px"></a></div>';				
			return bthtml;
	};
}	