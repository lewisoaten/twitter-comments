var bitlyLogin = 'YOUR_BIT.LY_LOGIN'
var bitlyApi = 'YOUR_BIT.LY_API'

$(document).ready(function(){
  // set up default options
  var defaults = {
    version:    '2.0.1',
    login:      bitlyLogin,
    apiKey:     bitlyApi,
    history:    '0',
    longUrl:    'http://github.com/caecus/twitter-comments'
  };

  // Build the URL to query
  var daurl = "http://api.bit.ly/shorten?"
    +"version="+defaults.version
    +"&longUrl="+defaults.longUrl
    +"&login="+defaults.login
    +"&apiKey="+defaults.apiKey
    +"&history="+defaults.history
    +"&format=json&callback=?";

  // Utilize the bit.ly API
  $.getJSON(daurl, function(data){
  // Setup comment box
  $('#tweetBtn').click( function() {
    var url = "http://twitter.com/#search?q=" + data.results[defaults.longUrl].shortUrl + "&status=";
    url += $('textarea#message').val() + " " + data.results[defaults.longUrl].shortUrl;
    window.open(url);
  });

  // Load comments
  $("#comment").html("");
  $("#comment").tweet({
    avatar_size: 32,
    count: 20,
    query: data.results[defaults.longUrl].shortUrl,
    loading_text: '<img src="/images/loading.gif"></img> Loading comments...',
    callback: function(){
      // Clear out links to this page
      var searchString = "<a href=\"" + data.results[defaults.longUrl].shortUrl + "\">" + data.results[defaults.longUrl].shortUrl + "</a>";
      var newHTML = $("#comment").html().replace(new RegExp( searchString, "gi" ), '');
      $("#comment").html(newHTML);
      }
    });
  });
});
