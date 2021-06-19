g_load_url = null;
g_draw_table = null;
g_task_val = null;
g_toggle_el = null;


$(function() {
  // jQuery goes here...
   $(".insttable").fadeOut(1000);

   // Fetch the data from async operation
   function loadmyurl(url,myarray){
          /.. some operations ../
          $.getJSON(url,{}).done(function(data){
            // console.log(data);
            g_task_val=data;
            myarray.push(data);
            // return data;
          }

        ).fail(function(){
          console.log('fail to process' + url);
        });
  }

  // Create table using given data
  function drawTables(mytable, data){
     $.each(data.instances, function(index,item){
         console.log(item.InstanceId+''+item.State.Name+''+ item.Tags[0].Value);
         $('#'+mytable).append('<tr><td>'+item.InstanceId+'</td><td>'+item.Tags[0].Value+'</td><td>'+item.State.Name+'</td></tr>');
        }
     );
     $('#'+mytable).fadeToggle(2000);

   }

   // Toggle visibility of a given element
   function toggleElement(myelement)
   {
      $('#'+myelement).fadeToggle(500);
   }

   // Gloval variable Trick to call jQuery from JS
   g_load_url = loadmyurl;
   g_draw_table = drawTables;
   g_toggle_el = toggleElement;

});

class InstOps {
  // constuctor for the class
  constructor() {}

  // periodically check whether the data is available and create table once data is fetched
  getInstance(taskurl, myelement) {
    var count = 0;
    var retArray = [];
    var timer = setInterval(function() {
      count++;
      g_load_url(taskurl, retArray);
      console.log(retArray.length);
      if (retArray.length != 0 ){
        console.log(retArray);
      }
      if (g_task_val != null ) {
        if(g_task_val.task_status === 'SUCCESS') {
          // alert(g_task_val.results.error_code);
          if(g_task_val.results.error_code === 0 ) {
             clearInterval(timer);
             g_draw_table(myelement, g_task_val.results);
          } else {
             console.log("Error in retrieving data for "+ myelement);
             clearInterval(timer);
          }
        }
        g_task_val = null;
      }
      if(count===3) {
        clearInterval(timer);
      }
    },1000);
  }

  // Toggle element visibility
  mytoggle(myelement) {
    g_toggle_el(myelement);
  }
}
