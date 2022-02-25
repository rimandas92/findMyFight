
$(document).ready(function () { 
  $('#txt_search').keyup(function () {
    var search = $(this).val();
    $('table tbody tr').hide();
    var len = $('table tbody tr:not(.notfound) td:contains("' + search + '")').length;

    if (len > 0) {

      $.ajax({
        url: '/admin/manage/landlords/search',
        method: 'POST',
        data: {
          query: search
        },
        success: function(data) {
          $('table tbody tr:not(.notfound) td:contains("' + data + '")').each(function () {
            $(this).closest('tr').show();
          });
        }
      })
    } else {
      $('.notfound').show();
    }
  });
});

// Case-insensitive searching (Note - remove the below script for Case sensitive search )
$.expr[":"].contains = $.expr.createPseudo(function (arg) {
  return function (elem) {
    return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
  };
});