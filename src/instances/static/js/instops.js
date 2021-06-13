
g_load_url = null;
g_draw_table = null;
g_task_val = null;
g_toggle_el = null;


$(function() {
  // jQuery goes here...

  // Uncomment this line to fade out the red box on page load
   $(".insttable").fadeOut(1000);

   function loadmyurl(url){
          /.. some operations ../
          // alert("from jquery"+ url);
          $.getJSON(url,{}).done(function(data){
            console.log(data);
            // taskval=JSON.stringify(data);
            g_task_val=data;
          }

        ).fail(function(){
          alert('fail');
        });
  }

  function drawTables(mytable, data){
     //alert(mytable);
     // $('.insttable#'+mytable).fadeToggle(500);
     $.each(data.instances, function(index,item){
         console.log(item.InstanceId+''+item.State.Name+''+ item.Tags[0].Value);
         $('#'+mytable).append('<tr><td>'+item.InstanceId+'</td><td>'+item.Tags[0].Value+'</td><td>'+item.State.Name+'</td></tr>');
        }
     );
     // $('#'+mytable).append('<tr><td>my data</td><td>more data</td><td>more data</td></tr>');
     $('#'+mytable).fadeToggle(3000);
     // $('#'+myTable).append('<tr><td>my data</td><td>more data</td><td>more data</td></tr>');
   }
   function toggleElement(myelement)
   {
      $('#'+myelement).fadeToggle(500);
   }
   g_load_url = loadmyurl;
   g_draw_table = drawTables;
   g_toggle_el = toggleElement;
});

class InstOps {

  // global g_load_url;
  // global g_draw_table;
  // global g_task_val;
  // global g_toggle_el;

  constructor() {}

  getInstance(taskurl, myelement) {
    var count = 0;
    var timer = setInterval(function() {
      count++;
      g_load_url(taskurl);
      if (g_task_val != null ) {
      //   alert('nul');
      // } else {
      //   // alert(taskval.task_status);
        if(g_task_val.task_status === 'SUCCESS') {
          // alert(taskval.results);
          g_draw_table(myelement, g_task_val.results)
          clearInterval(timer);
        }
        g_task_val = null;
      }
      // alert(count);
      if(count===3) {
        clearInterval(timer);
      }
    },500);
    // alert(g_task_val);
  }

  mytoggle(myelement) {
    g_toggle_el(myelement);
  }
  // drawInstance(instdetails, itable) {}
}
