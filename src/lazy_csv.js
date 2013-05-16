(function( $ ) {

  $.extend($.fn, {
    tableToCSV: function() {
      this.on("click", function(e) {
        target = $(e.currentTarget)
        table = $(target.data("table"));
        if(table.length > 0) {
          target.attr("href", readTable(table));
        }
      });
    }

  });

  function readTable(table) {
    results = [];
    rows = $(table).find("tr");
    for (var i = 0; i < rows.length; i++) {
      csv_row = [];
      rows.eq(i).find("td,th").each(function(index, element) {
        csv_row.push(parseTextForCSV(element.textContent || element.innerText));
      });
      results.push(csv_row.join(","));
    }
    return "data:text/csv;base64;charset=utf-8," + btoa(unescape(encodeURIComponent(results.join("\r\n"))));
  }

  function parseTextForCSV(text) {
    return "\"" + text.trim().replace(/"/g, '""').replace(/(\r\n|\n|\r)/gm,"") + "\""
  }


})( jQuery );