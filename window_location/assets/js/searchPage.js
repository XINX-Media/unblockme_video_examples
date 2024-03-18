console.log(window.location.search)
//my recommended method for getting query parameters from the URL
//works better when the query prams are encoded, since this automatically handles decoding

var urlParams = new URLSearchParams(window.location.search);
var searchTerm1 = urlParams.get('searchterm1');
var searchTerm2 = urlParams.get('searchterm2');

//getting the params from the url method 2 (slightly more difficult)

// var url = new URL(window.location.href);
// var searchTerm1 = url.searchParams.get('searchterm1');
// var searchTerm2 = url.searchParams.get('searchterm2');

//getting the params from the url by splitting the url (not recommended)

// var url = window.location.href;
// var params = url.split('?')[1];
// var searchTerm1 = params.split('=')[1].split('&')[0];
// var searchTerm2 = params.split('=')[2];



var headerElement1 = document.getElementById('page2_header1');
var headerElement2 = document.getElementById('page2_header2');

//if no suearch term is entered in either input, redirect user to first page
if(!searchTerm1 && !searchTerm2) {
    window.location.replace('./index.html');
}
if (!searchTerm1) {
    headerElement1.textContent = 'No search term provided';
}else{
    headerElement1.textContent = `Search Term 1: ${searchTerm1}`;

}
if (!searchTerm2) {
    headerElement2.textContent = 'No search term provided';
} else{
    headerElement2.textContent = `Search Term 2: ${searchTerm2}`;
}