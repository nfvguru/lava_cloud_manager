 // Toggle visibility of a given element
 function toggleElement(myelement)
 {
    $('#'+myelement).slideToggle(5000);
 }


$(function() {
   $(".insttable").slideUp(1000); //hide all tables initially.
   // populate data to the tables.
   $('.instlogo-box').children('p').each(function () {
       var urltarget = $(this).data('taskurl');
       var type=this.id;
       // console.log(urltarget+ " " + type);
       loadmyurl(urltarget, type);
   });
   // toggle visibility of the tables.
   $('.instlogo-box').children('img').each(function () {
      $(this).click(function(e){
        var type = this.id.split('-')[1];
        // console.log(type);
        $('#table-'+type).slideToggle();
      });
   });


   function loadmyurl (url, type){
       var timer = setInterval(function() {
            $.getJSON(url,{}).done(function(data){
                 if(data.task_status === 'SUCCESS') {
                    if(data.results.error_code === 0 ) {
                        drawTables(data.results, type);
                        // console.log(data.results);
                    } else {
                        console.log("Error in retrieving data for "+ type);
                    }
                    clearInterval(timer);
                 }
              }
            ).fail(function(){
               console.log('fail to process' + url);
            });
       },1000); //timer
   } //funciton loadmyurl ends


   function drawTables(data, type) {
      $.each(data.instances, function(index,item){
          // console.log(item.InstanceId+''+item.State.Name+''+ item.Tags[0].Value);
          $('#table-'+type).append('<tr><td>'+item.InstanceId+'</td><td>'+item.Tags[0].Value+'</td><td>'+item.State.Name+'</td></tr>');
         }
      );
      // $('#'+mytable).fadeToggle(2000);
      $('#table-'+type).slideToggle(1000);
    }// function drawTables

}); //main ends
