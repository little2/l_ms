



function bt_confirm_upload()
{    
    var o = {
			url:"js_homework_confirm_upload.php",			
			onSuccess:function(data){	
				    $('#take_upload_zone').addClass('no-display');
				    $('#check_file_zone').addClass('no-display'); 		
				    $('#upload_file_zone').removeClass('no-display');		
				    console.log(data);
	                $('#upload_file_zone dd').children('a').attr('href',data.url);
	             
			}					
	}	
	var msg=mypost(o);	   
}

function bt_delete_upload()
{
    $('#take_upload_zone').removeClass('no-display');
    $('#check_file_zone').addClass('no-display'); 	    
    $('#upload_file_zone').addClass('no-display');         
}




function autoResize(obj_id)
{	
	if(typeof(obj_id)=='undefined') obj_id='homework_desc_text';
	
	var textarea_height=($('#'+obj_id).prop("scrollHeight"));
	
	var origHeight = ($('#'+obj_id).height());
	
	if(textarea_height > (origHeight+5))
	{
		var textarea_height_px=(textarea_height+3)+"px";
		$('#homework_desc_text').height('0px').height(textarea_height_px);  
		$('#homework_desc').height(textarea_height_px);  		
	}
	else if(textarea_height < (origHeight-5))
	{
		var textarea_height_px=(textarea_height-3)+"px";
		$('#homework_desc_text').height('0px').height(textarea_height_px);  
		$('#homework_desc').height(textarea_height_px);  			
	}
}

function bt_review(datahid)
{	
	bt_return("review");
	var obj=$("[data-hid='"+datahid+"']");
	$('#user_homework_id').val(datahid);
	$('#jobtitle').text(obj.attr('data-jobtitle'))
	$('#user_name').text(obj.attr('data-username'))
	$('#reviewer_title').text(obj.attr('data-reviewer'))
	$('#upload_date_title').text(obj.attr('data-upload_date'))
	$('#download_homework').attr('href','server/hwfiles/'+obj.attr('data-filename'))
	
	
	$('#grade').val(obj.attr('data-grade'))
	
	grade=$('#grade').val();
	var pass_mark=$('#pass_mark').val();	 

	$(function(){	
		complete = $("#grade_slider").children('.complete');
	    $("#grade_slider").slider('value', grade);
	   
	    if(grade >= pass_mark)
	    {
	    	complete.css('background-color', 'green');
	    }
	    else
	    {
	    	complete.css('background-color', 'red');
	    }
	});
}

// Short method to set position


function save_review(next)
{
	var grade=parseInt($('#grade_slider').children("span").text());
	
	var pass_mark=$('#pass_mark').val();	 
//	 console.log(grade+' '+pass_mark);
	if(grade > pass_mark)
	{
		$('#result').val('P');
		// console.log('p'+grade+' '+pass_mark);
	}
	else
	{
		$('#result').val('F');
		// console.log(grade+' '+pass_mark);
	}	 
	 
	grade=$('#grade').val();
	var datahid=$("#user_homework_id").val();
	var obj=$("[data-hid='"+datahid+"']");	
	obj.attr('data-grade',grade);
	var reporter_uid=obj.attr('data-reporter_uid');
	
	//	reporter_uid
	
	$('#reporter_uid').val(reporter_uid);
	$('#grade').val(grade);
	
		var o = {
				url:"js_homework_save_user_review.php?next="+next,			
				onSuccess:function(data){	
					if(typeof(data.next_id)!="undefined")
					{
						bt_review(data.next_id)
					}
				}					
		}	
		var msg=mypost(o);			
}

function bt_return(act)
{		
	$( ".quiz" ).each(function( index ) {
		$(this).addClass('no-display');
	});
	
	if(parseInt($('#grade').val()) > 0 )
	{
	
		$('#result_area').removeClass('no-display');
		
		var grade=parseInt($('#grade').val());
    	var pass_mark=parseInt($('#pass_mark').val());        	

    	if(grade > pass_mark)
    	{
    		//完成後，就不需要重新上傳
    		$('#bt_reupload').addClass('no-display');
    		$('button h1',$('#result_area')).text('Pass');
    		$('button',$('#result_area')).removeClass('danger');
    		$('button',$('#result_area')).addClass('success');
    	}
    	else
    	{
    		$('button h1',$('#result_area')).text('Fail');
    		$('button',$('#result_area')).removeClass('success');
    		$('button',$('#result_area')).addClass('danger');
    	}	 
    	 
       	
	}
	
	switch(act)
	{
		case "list":
			$('#homework_review_list').removeClass('no-display');
			
			$('tbody tr').each(function(){
				$(this).children("td[id='td_grade']").text( $(this).attr('data-grade')) ;
			})
			$('#result_area').addClass('no-display');
			break;
			
		case "upload":
			$('#homework_upload').removeClass('no-display');
			break;
			
		case "review":
			$('#homework_review').removeClass('no-display');
			$('#result_area').addClass('no-display');
			break;
			
		default:
			$('#container_homework_desc').removeClass('no-display');	
		
			break;			
	}
}










//交卷
function finish_exam()
{		
	$('#defaultCountdown').addClass('no-display');
	$('#area_quiz').addClass("no-display");
	$('#area_result').removeClass("no-display");
	$('#bt_exam_edit2').addClass('no-display');
	
	var pass_mark= $('#pass_mark').val();
	var correct_count=0;
	var total_count=0;
		
	$( ".quiz_section" ).each(function( index ) {
		total_count++;
		var qid= $( this ).attr('data-qid');
		var quiz_type = $('#quiz_type_'+qid).val();
		var user_exam_detail_id = $('#user_exam_detail_id_'+qid).val();
		var user_answer = $('#user_answer_'+qid).val();
		var correct_answer = $('#correct_answer_'+qid).val();
		if(user_answer==correct_answer)
		{
			correct_count++;
		}	
	});
	
	var grade= parseInt(Math.min(100,Math.round(100 / total_count * correct_count)));
	$('#bt_send').addClass('no-display');
	if(grade > pass_mark)
	{
		$('button h1',$('#area_result')).text('Pass');
		$('button',$('#area_result')).removeClass('danger');
		$('button',$('#area_result')).addClass('success');
		$('#result').val('P');
	}
	else
	{
		$('button h1',$('#area_result')).text('Fail');
		$('button',$('#area_result')).removeClass('success');
		$('button',$('#area_result')).addClass('danger');
		$('#result').val('F');
		
		$('#bt_again').removeClass('no-display');
	}
	
	$('#grade').val(grade);	

	//回傳成績 
	//user_exam_id
	
	var o = {
			url:"js_quiz_finish_user_exam.php",			
			onSuccess:function(data){	
				//$('#user_exam_detail_id').val(data.user_exam_detail_id);		
				$('#grade_title').text(grade);

			}					
	}	
	var msg=mypost(o);		
}




function CountDownOnExpiry()
{
	if($('#area_quiz').hasClass("no-display"))
	{
		//強迫交卷
		console.log('HAD')	
	}
	else
	{
		finish_exam();
		
	}
	
}

function CountDownOnTick(periods)
{	
	 if ($.countdown.periodsToSeconds(periods) === 60) { 
	   	$("#bt_send").addClass('fg-red');         
	    $("#defaultCountdown").addClass('shake shake-constant shake-little fg-red'); 
	}  
	else if ($.countdown.periodsToSeconds(periods) === 15) { 
	    $("#defaultCountdown").removeClass('shake-little'); 
	    $("#bt_send").addClass('shake shake-constant shake-little');         
	}
}





function bt_choose(obj,qid)
{	
	var type=$('#quiz_type_'+qid).val();
	var container=$('#container_quiz_'+qid);

	if(type=='quiz_SICE')
	{
		$('.bt_choose', container).each(function () {
	
			$(this).removeClass('primary');
		});
		$(obj).addClass('primary');
	}
	else
	{	
		if($(obj).hasClass('primary'))
		{
			$(obj).removeClass('primary');
		}
		else
		{
			$(obj).addClass('primary');
		}
	}
	var id=$(obj).attr('seq');
	
	var user_answer="";
	$('.bt_choose', container).each(function () {		
		if($(this).hasClass('primary'))
		{
			if(user_answer) user_answer+=";"
			user_answer+=$(this).attr("seq");
		}
	});
	$('#user_answer_'+qid).val(user_answer);	
	
	//user_exam_detail_id_{QUIZ.qid}
	var user_exam_detail_id=$('#user_exam_detail_id_'+qid).val();
	var user_exam_id=$('#user_exam_id').val();
	var o = {
			url:"js_quiz_update_user_answer.php",
			data: {user_exam_detail_id:user_exam_detail_id,qid:qid,user_answer:user_answer,user_exam_id:user_exam_id},
			onSuccess:function(data){	
				$('#user_exam_detail_id_'+qid).val(data.user_exam_detail_id);		
				}					
	}	
	var msg=mypost(o);
	
	
	//alert(id);
}

//
function bt_choose_correct(obj,qid)
{	
	var type=$('#quiz_type_'+qid).val();
	var container=$('#container_quiz_'+qid);

	if(type=='quiz_SICE')
	{
		$('.bt_correct', container).each(function () {	
			$(this).removeClass('primary');
		});
		$(obj).addClass('primary');
	}
	else
	{	
		if($(obj).hasClass('primary'))
		{
			$(obj).removeClass('primary');
		}
		else
		{
			$(obj).addClass('primary');
		}
	}
	var id=$(obj).attr('seq');
	
	var correct_answer="";
	$('.bt_correct', container).each(function () {		
		if($(this).hasClass('primary'))
		{
			if(correct_answer) correct_answer+=";"
				correct_answer+=$(this).attr("seq");
		}
	});
	$('#correct_answer_'+qid).val(correct_answer);	
	
	//user_exam_detail_id_{QUIZ.qid}
	var user_exam_detail_id=$('#user_exam_detail_id_'+qid).val();
	var user_exam_id=$('#user_exam_id').val();
	var o = {
			url:"js_quiz_update_correct_answer.php",
			data: {qid:qid,answer:correct_answer},
			onSuccess:function(data){	
				
				}					
	}	
	var msg=mypost(o);
	
	
	//alert(id);
}


function exam_edit()
{	
	
	$('.viewmode').each(function() {
		$(this).addClass('no-display');
	});   		
	
	
	$('.editmode').each(function() {
		$(this).removeClass('no-display');
	});             
	

}

function exam_save()
{	
	exam_show()
}



function exam_show()
{	
	$('.viewmode').each(function() {
		$(this).removeClass('no-display');
	});   		
	
	$('.editmode').each(function() {
		$(this).addClass('no-display');
	});    
}




function quiz_create()
{
	var o = {
			url:"js_quiz_create.php",
			onSuccess:function(data){	
						location.reload();					
				}					
	}	
	var msg=mypost(o);
}

function quiz_remove(sid)
{
	var o = {
			url:"js_quiz_remove.php?sid="+sid,
			onSuccess:function(data){	
						location.reload();					
				}					
	}	
	var msg=mypost(o);
}


function create_new_item()
{
	if($('#new_item_content').val()=="")
	{
		alert('請填寫選項內容');
		return;	
	}
	var item_count=0;
	
	var controls = document.getElementsByTagName('textarea');
	for(var i=0; i<controls.length; i++)
	{			
		if(controls[i].id)
		{
			var t=controls[i].id;
			if(t=='new_item[]')
			{				
				item_count++;				
			}
		}
	 }
	item_count=item_count+65
	var item_no=String.fromCharCode(item_count);
	var item_content=$('#new_item_content').val();
	var item_html='<div style="clear:both;height:10px"></div><div>';
	 item_html+='<div  class="place-left " style="width:10%"><button class="button large">'+item_no+'</button></div>';
	 item_html+='<div  class="place-left" style="width:88%">';
	 item_html+='<div class="input-control textarea editmode readable-text">';
	 item_html+='<textarea style="readable-text" id="new_item[]" name="new_item[]">'+item_content+'</textarea>';
	 item_html+='</div></div></div>';
	 $('#new_item_content').val("");
	 $(item_html).insertBefore('#new_item_zone');
}

function show_quiz_type()
{
	$("#quiz_SICE").removeClass('no-display').addClass('animated fadeIn half-opacity');
	$("#quiz_MUCE").removeClass('no-display').addClass('animated fadeIn half-opacity');
	$("#quiz_SHAS").removeClass('no-display').addClass('animated fadeIn half-opacity');
}

function quiz_kind(obj)
{
	$("#quiz_SICE").removeClass('animated fadeIn');
	$("#quiz_MUCE").removeClass('animated fadeIn');
	$("#quiz_SHAS").removeClass('animated fadeIn');	
	
	var type = obj.id;
	$('#quiz_type').val(type);	
	$("#quiz_SICE").addClass('half-opacity');
	$("#quiz_MUCE").addClass('half-opacity');
	$("#quiz_SHAS").addClass('half-opacity');	
	$(obj).removeClass('half-opacity');
	
	switch(type)
	{
		case "quiz_SICE":
			$('#quiz_choose_zone').removeClass('no-display');
		break;
		
		case "quiz_MUCE":
			$('#quiz_choose_zone').removeClass('no-display');
		break;
		
		case "quiz_SHAS":
			$('#quiz_choose_zone').addClass('no-display');
		break;
	}
	
}


