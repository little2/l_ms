
function discuss_tile()
{
}

function return_view()
{
	$('#tile_create_topic').removeClass('hide');
	$('#tile_discuss').removeClass('hide');
	$('#tile_return').addClass('hide');
	
	$('#view').removeClass('hide');
	$('#post').addClass('hide');
	
	$('#topic_title').val("");
	$('#topic_content').val("");
	
}

function create_topic()
{
	$('#tile_create_topic').addClass('hide');
	$('#tile_discuss').addClass('hide');
	$('#tile_return').removeClass('hide');
	
	$('#view').addClass('hide');
	$('#post').removeClass('hide');

	
}

function submit_topic()
{
	var container=$('#post');
	var topic_content=$('#topic_content',container).val();			
	var topic_title=$('#topic_title',container).val();			
	
//	console.log(topic_title);
//	console.log(topic_content);
		
	var o = {
			url:"js_topic_create.php",			
			data:{topic_content:topic_content,topic_title:topic_title},				
			onSuccess:function(data){		
				return_view()
					////////////
				
					var newtile=$('#topic-sample').clone().removeClass('no-display');
					
					var now = new Date()
					var mm = now.getMonth()+1; //January is 0!
					var yyyy = now.getFullYear();
					var dd = now.getDate();
				
					if(dd<10) {
					    dd='0'+dd
					} 
				
					if(mm<10) {
					    mm='0'+mm
					} 
					
					
					var newtile_title="topic-"+data.topic_id;
					newtile.attr("id",newtile_title);
					newtile.find(".date_d").text(dd);
					newtile.find(".date_ym").text(yyyy+"."+mm);
					
					var topic_url='announcement_detail.php?topic_id='+data.topic_id;
					newtile.find("#topic_url").attr('href',topic_url).text(topic_title);
					newtile.find("#readme_url").attr('href',topic_url);
					topic_content=topic_content.replace(/\n/g,"<br/>"); 
					newtile.find("#topic_content").html(topic_content);
				
					return_view()
					
					 container.removeClass('animated fadeOutDownBig')		
						 $('#topic_title',container).val("");
						 $('#topic_content',container).val("");
						 
						 $("#topic-sample").before(newtile);				
						
						 $('#'+newtile_title).addClass('animated bounceIn')
						 
						 setTimeout(function(){				
							 $('#'+newtile_title).removeClass('animated bounceIn')				 
						 }, 700 );   
					////////////
			}					
	}	
	var msg=mypost(o);
	
}


function delete_topic(obj)
{
	var DivObj=$(obj).parentsUntil('ul').parent().parent();    
	var topic_id=DivObj.attr('id').replace('topic-','');
	
	
	var o = {
			url:"js_topic_remove.php",			
			data:{topic_id:topic_id},				
			onSuccess:function(data){		
				DivObj.addClass('animated bounceOutRight')
				 setTimeout(function(){				
					 DivObj.removeClass('animated bounceOutRight');
					 DivObj.remove();
				 }, 700 );   
			}
	}	
	var msg=mypost(o);
}









function submit_reply()
{
	
	var container=$('#reply_field');
	var content=$('#reply_content',container).val();		
	var topic_id=$('#topic_id').val();			
	
	var o = {
			url:"js_reply_create.php",			
			data:{content:content,topic_id:topic_id},				
			onSuccess:function(data){		
				var newtile=$('li:first-child',$('#comment_zone')).clone().removeClass('no-display');
				
			
				
				var newtile_title="comment-"+data.reply_id;
				newtile.attr("id","comment-"+data.reply_id);
				newtile.find(".comment-body").attr('id',"div-comment-"+data.reply_id);
				newtile.find("img").attr('src',$('#reply_photo_url').attr('src'));
				newtile.find("#reply_author").text($('#reply_username').text() );
				
				var content_html=$('#reply_content').val().replace(/\n/g,"<br/>"); 
				
				newtile.find("#reply_content").html(content_html);
				newtile.find("#reply_datatime").text(data.reply_datatime);
				
				container.addClass('animated fadeOutDownBig')
				scroll(0,document.body.scrollHeight)
				 setTimeout(function(){
					 container.removeClass('animated fadeOutDownBig')		
					 $('#reply_content',container).val("");
					 $("#comment_zone").append(newtile);				
					
					 $('#'+newtile_title).addClass('animated bounceIn')
					 
					 setTimeout(function(){				
						 $('#'+newtile_title).removeClass('animated bounceIn')				 
					 }, 700 );   	
				 }, 700 );   							
			}					
	}	
	var msg=mypost(o);
	
//	$("<p>123</p>").appendTo( $("#area_user_comment") );	
}

function delete_reply(obj)
{
	var DivObj=$(obj).parentsUntil('li').parent();    
	var reply_id=DivObj.attr('id').replace('comment-','');
	
	var o = {
			url:"js_reply_remove.php",			
			data:{reply_id:reply_id},				
			onSuccess:function(data){		
				DivObj.addClass('animated bounceOutRight')
				 setTimeout(function(){				
					 DivObj.removeClass('animated bounceOutRight');
					 DivObj.remove();
				 }, 700 );   
			}
	}	
	var msg=mypost(o);
	
}