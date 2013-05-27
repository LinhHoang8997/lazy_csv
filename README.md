**This readme overpromises. It's still false advertising**

# Lazy CSV - Client Side CSV Generation
Lazy CSV allows you to generate and download a CSV file from any well-formed HTML table without going through the server.

## Why?

You constructed a swanky table for your users, building filters, authorization logic etc. Of course, shortly later, they want to see that same data their favouritest app in the universe, MS Excel :scream:

So you toil again, keeping things DRY, producing a new CSV view for download.

But downloading that nice html table you built is almost equivalent to copying it and pasting into Excel (that works actually, somehow users just can't highlight rows properly).

Lazy CSV is my attempt to stop myself from going through the above during a hack day. I hope it helps someone else.

### Some Snake Oil
* No more mistmatches - The CSV downloaded is what you see on the screen
* One less potential security leak to worry about. Since CSV is not generated by server
* Hit the server less? Especially if your app is slow =)
* Relies on JS. That must be good right?
* Helps make you lazier. (Most important feature to me)

## How do I make it work?

include `jquery.lazy_csv.js` and `webtoolkit.base64.js` (for non modern browser support).

**In Your View**

    /* Link for downloading CSV, data-table pointed to table selector */
    <a href="#" class="csv-link" data-table=".my-wonderful-table">Download CSV</a>

    /* Erm. the table */
    <table class="my-wonderful-table">
      <tr>
        <td>Hello!</td>
        <td>World</td>
      </tr>
    </table>

**In your JS code**

    // Initialize links that do tableToCSV
    $(".csv-link").tableToCSV();


## How does it work?
Lazy CSV naively parses your table and construct a string that represents the CSV file. This string is converted into Base64 and attached as a `data-uri` on clicking the link. Some browsers might display it inline, hence the users have to `right-click, save as...`. Base 64 is needed because linebreaks are stripped from plain-text data-uris.

## But does it work?
Hopefully. It's the web so well, let's talk browsers.

IE 8- and other old browsers might not come with a native Base64 encoder api (window.btoa), for those cases, please include `webtoolkit.base64.js` to make it work. Include it too for FUD and if you're trying to cover more browsers.

IE 8 also has a limitation in data-uris. The max size is 32kb.

Tested on:
* IE 8+ (not yet actually. my VM is dead).
* Firefox
* Chrome
* Opera