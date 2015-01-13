	
	
	function build_magic_suggest(fieldname,maxSelection,emptyText,style,width)
	{		
		
		if(!width) width=590
		if(style=='simple')
		{
			var responsibility = $('#'+fieldname).magicSuggest({
				toggleOnClick:true,
	        	width: width,
	        	name: fieldname,        	
	        	highlight: true,
	        	maxSelection: maxSelection,
	        	emptyText: emptyText	        	
	    	});  
		}
		else
		{
			var responsibility = $('#'+fieldname).magicSuggest({
				toggleOnClick:true,
	        	width: width,
	        	name: fieldname,        	
	        	highlight: true,
	        	maxSelection: maxSelection,
	        	emptyText: emptyText,
	        	renderer: function(v){
	    	        return '<div>' +
	    	            '<div style="float:left;"><img width="64" src="' + v.image + '"/></div>' +
	    	            '<div style="padding-left: 85px;">' +
	    	                '<div style="padding-top: 20px;font-style:bold;font-size:120%;color:#333">' + v.name + '</div>' +
	    	                '<div style="color: #999">' + v.desc + '</div>' +
	    	                '</div>' +
	    	            '</div><div style="clear:both;"></div>';
	    	        }
	    	});  			
		}
		return responsibility;
	}	
	