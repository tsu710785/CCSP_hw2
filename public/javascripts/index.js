(function(){

// 插入 <ul> 之 <li> 樣板
var tmpl = '<li><input type="text"><span></span></li>',
    addButton = $('#add'),
    connected = $('.connected'),      // 三個 <ul>
    placeholder = $('#placeholder'),  // 三個 <ul> 的容器
    mainUl = $('.main'),              // main <ul>
    deleteUl = $('.delete'),          // delete <ul>
    doneUl = $('.done');              // done <ul>


    addButton.on('click',function(){
    	$(tmpl).prependTo(mainUl).addClass('is-editing').find('input').focus();
    })

    mainUl.on('keyup','input',function(e){
    	if(e.which === 13){
    		var input = $(this);
    		li = input.parents('li');
    		li.find('span').text( input.val() );
    		li.removeClass('is-editing');
    		save();
    	}
    });

    load();

    mainUl.sortable({
    	connectWith:[deleteUl,doneUl],
    	// connectWith:doneUl,
    	start: function( event, ui ){
    		placeholder.addClass('is-dragging')
    	},
    	beforeStop: function( event, ui ){
    		placeholder.removeClass('is-dragging')
    	},
    	stop: function( event, ui){
    		save()
    	},

    });

    deleteUl.sortable({
    	connectWith:mainUl,
		receive: function (event,ui) {
		   ui.item.remove();
		}
    });

    doneUl.sortable({
    	receive: function (event,ui) {
    		ui.item.appendTo(mainUl).addClass('is-done');
    		mainUl.sortable.save();
    	}
    });



  	function save(){
  		var arr = [];
  		mainUl.find('span').each(function(){
    		arr.push($(this).text());
  		});
  		localStorage.todoItems = JSON.stringify(arr); 
  	};

  	function load(){
  		var arr = JSON.parse( localStorage.todoItems ), i;
  		for(i=0; i<arr.length; i+=1){
    		$(tmpl).appendTo(mainUl).find('span').text(arr[i]);
  		}
  	}





}());