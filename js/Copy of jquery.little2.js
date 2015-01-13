;(function($) {
    $.fn.tools_panel = function(options) 
    {
    	var  defaults = {
    			remove_msg_title:"是否確定刪除",
    			remove_msg:"刪除後將無法回復，是否仍要刪除",
    			remove_yes_I_do_msg:"是，請刪除",
    			remove_no_msg:"否"
    	};
    
    	var _settings = $.extend(defaults, options);
    	

    	
    	   /** 
         * 初始化插件函数 
         * @param $target 将要应用插件的目标DOM节点，是个jQuery对象  
         */  
    	function _init(target) {
    		var container = this; // 加入這行，並將以下表示 div#mytab 的 this 改為 container
    		
    		$('.tile', container).click(function () {			
    			var id=$(this).attr("id");
    			var parameter = id.split('_');    			
    			$.blockUI({ message: '<h2><img src="./images/busy.gif" />Wait</h2>' }); 
    			location.href='?id='+parameter[1];
	        });
    		
    		$('.bt_create', container).click(function () {    			
    			$('.container_tile_list',container).addClass('no-display');         //隱藏列表區塊
    			$('.container_create',container).removeClass('no-display');   //顯示新增欄位的區塊
    			$('.bt_create',container).addClass('no-display');    		               //隱藏新增按鈕	
    			$('.bt_remove',container).addClass('no-display');                     //隱藏刪除按鈕	
    			$('.bt_return',container).removeClass('no-display');                 //顯示返回按鈕		    			
    	    });
           
    		$('.bt_return', container).click(function () {    			
    			$('.container_tile_list',container).removeClass('no-display');         	//隱藏列表區塊
    			$('.container_create',container).addClass('no-display');   				//顯示新增欄位的區塊
    			$('.bt_create',container).removeClass('no-display');    		                //隱藏新增按鈕	
    			$('.bt_remove',container).removeClass('no-display');                    	//隱藏刪除按鈕	
    			$('.bt_return',container).addClass('no-display');                 				//顯示返回按鈕		
    			
    			$('.tile', container).each(function () {
    				$(this).removeClass('half-opacity').unbind("click").click(function () {				
    	    			var id=$(this).attr("id");
    	    			var parameter = id.split('_');    			
    	    			$.blockUI({ message: '<h2><img src="./images/busy.gif" />Wait</h2>' }); 
    	    			location.href='?id='+parameter[1];
    		        });
    	        });    			
    	    });   		

            
    		$('.bt_remove', container).click(function () {    			
    			$('.container_tile_list',container).removeClass('no-display');   	//隱藏列表區塊
    			$('.container_create',container).addClass('no-display');   			//顯示新增欄位的區塊
    			$('.bt_create',container).addClass('no-display');    		                	//隱藏新增按鈕	
    			$('.bt_remove',container).addClass('no-display');                      		//隱藏刪除按鈕	
    			$('.bt_return',container).removeClass('no-display');                  	//顯示返回按鈕		
    			
    			$('.tile', container).each(function () {
    				$(this).addClass('half-opacity').unbind("click").click(function () {				
    	    			var id=$(this).attr("id");
    	    			var parameter = id.split('_');    	
    	    			$(this).addClass('selected');
    	    			$.Dialog({
    	    				shadow : true,
    	    				overlay : false,
    	    				icon : '<span class="icon-remove"></span>',
    	    				title : _settings.remove_msg_title,
    	    				width : 300,
    	    				padding : 20,
    	    				onShow: function(_dialog){
    	    					var content = '<p>'+_settings.remove_msg+'</p><div style="margin-top: 20px;"/><p><a class="default button"  onClick="group_remove_member_act('+parameter+')">'+_settings.remove_yes_I_do_msg+'</a><a class="button on-right-more" onclick="$(\'#'+id+'\').removeClass(\'selected\');$.Dialog.close()">'+_settings.remove_no_msg+'</a></p>';
    	    					$.Dialog.content(content);					
    	    				}				
    	    			});	
    		        });
    	        });
    	    });    	
        };
        
        return this.each(function() {   
            // 这里的this是一个DOM对象  
        	_init(this);  
        });  
        
       
    };
})(jQuery);


