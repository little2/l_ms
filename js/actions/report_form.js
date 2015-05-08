function show_detail(obj)
{
	console.log(obj);
	var sco_id=$(obj).attr('data-scoid')
	var tile_obj=$('#sco-tile-detail-'+sco_id);
	if($(obj).find('i').hasClass("icon-plus"))
	{
		$('#sco-detail-'+sco_id).removeClass('hide');
		tile_obj.find('i').removeClass("icon-plus");
		tile_obj.find('i').addClass("icon-minus");
	}
	else
	{
		$('#sco-detail-'+sco_id).addClass('hide');
		tile_obj.find('i').removeClass("icon-minus");
		tile_obj.find('i').addClass("icon-plus");
	}
}


function jump_course(course_id)
{
	var url="./course.php?course_id="+course_id;
	window.open(url);

}

function click_sco_tile(obj)
{		
	var sco_id=$(obj).attr('data-scoid')
	var btclass = $('#scotile_'+sco_id).attr('class');
	var go_to_url;

		$.blockUI({ message: '<h2><img src="./images/busy.gif" /> 處理中, 請稍侯...</h2>' }); 
		
		if(btclass.indexOf('exam')!=-1)
		{       
			go_to_url='sco_exam.php?sco_id='+sco_id;
		}
		else if(btclass.indexOf('homework')!=-1)
		{       
			go_to_url='sco_homework.php?sco_id='+sco_id;
		}
		else if(btclass.indexOf('attachment')!=-1)
		{       
			var url=$('#scotile_'+sco_id).attr('data-url');
			
			go_to_url=('/lms/server/attachment/'+url);
			/*
			 $.ajax('/lms/server/attachment/'+url, {dataType:'json', success:function(data){
				   var bb = new Blob([data.content], {type: 'application/octet-binary'});
				   $('#scotile_'+sco_id).attr({download:url,href:window.URL.createObjectURL(bb)})
				 }});
			*/
			//alert(url);
			//data-url
		
			
			return false;
		}
		else
		{
			go_to_url='sco.php?sco_id='+sco_id;
		}
		
		window.open(go_to_url);
		$.unblockUI();
}