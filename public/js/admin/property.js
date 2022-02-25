$(document).ready(function(){
  
    // SEARCH within the Records. 
    $('#txt_searchall').keyup(function(){
        var search = $(this).val();
          
        // Hide all table tbody rows
        $('table tbody tr').hide();
          
        // Count total search result
        var len = $('table tbody tr:not(.notfound) td:contains("'+search+'")').length;
          
        if(len > 0){
            // Searching text in columns and show match row
            $('table tbody tr:not(.notfound) td:contains("'+search+'")').each(function(){
                $(this).closest('tr').show();
            });
            }else{
            $('.notfound').show();
            }
          });
        
        // Case-insensitive searching (Note - remove the below script for Case sensitive search )
        $.expr[":"].contains = $.expr.createPseudo(function(arg) {
            return function( elem ) {
            return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
            };
        });

    // AJAX 
    // POST REQUEST and submitting the data.

    //DELETE REQUEST 
    // $('#deleteProperty').bind("submit", function(event) {
    //     $.ajax({
    //         type: 'DELETE',
    //         url: $(this).attr('action'),
    //         success  : function(result) {
    //             console.log(result);
    //         }
    //     })
    //     return false;
    // })

});