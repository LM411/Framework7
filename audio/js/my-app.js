// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

//Get parameters from URL
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function refresh(){
  window.location.reload();
}

// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
  mainView.router.loadContent(
      '<!-- Top Navbar-->' +
      '<div class="navbar">' +
      '  <div class="navbar-inner">' +
      '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
      '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
      '  </div>' +
      '</div>' +
      '<div class="pages">' +
      '  <!-- Page, data-page contains page name-->' +
      '  <div data-page="dynamic-pages" class="page">' +
      '    <!-- Scrollable page content-->' +
      '    <div class="page-content">' +
      '      <div class="content-block">' +
      '        <div class="content-block-inner">' +
      '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
      '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
      '        </div>' +
      '      </div>' +
      '    </div>' +
      '  </div>' +
      '</div>'
    );
  return;
}



 var rootURL = 'https://www.selibeng.com/wp-json/wp/v2';

 $.ajax({
            // type: 'GET',
            url: rootURL + '/posts?filter[posts_per_page]=400',
            // dataType: 'json',
            success: function(data){
                
                $.each(data, function(index, value) {
                  $$('#content-block-main').append('<div class="card ks-facebook-card">' +
                    '<div class="card-header">' +
                        '<div class="ks-facebook-avatar"><img src="img/selibeng.png" width="34" height="34"/></div>' +
                        '<div class="ks-facebook-name">Selibeng.com</div>' +
                        '<div class="ks-facebook-date">'+value.date+'</div>' +
                      '</div>' +
                      '<div class="card-content">' + 
                        '<div class="card-content-inner">' +
                         '<p>'+value.title.rendered+'</p>' +
                          //'<p class="more-content">Views: '+value.link+'</p>' +
                        '</div>' +
                      '</div>' +
                      '<div class="card-footer">' +
                      '<button data-text="To get more posts download this app..." data-link="'+value.link+'" class="whatsapp w3_whatsapp_btn w3_whatsapp_btn_large">'+
                       '<img src="img/share.png" height="34px">'+
                      '</button>'+
                      '<a href="posts.html?postid='+value.id+'" class="button item-link external">View</a></div>' +
                    '<div class="item-inner"><div class="item-title"></div>');
                 //console.log(parseObject.profession);
                  //console.log(value.id);
                });
            },
            error: function(error){
                $$('.content-block-main').append('<div class="item-content">' + 
                    '<div class="item-title"><div class="item-media"></div><center><img style="height:350px" src="img/error.png"/><br/><a onClick="refresh()">REFRESH PAGE</a></center></div>');
                console.log(error);
            }

 });

 
  var postid = getUrlParameter('postid');
  if (postid != null){
         $.ajax({
            // type: 'GET',
            url: rootURL + '/posts/'+postid,
            // dataType: 'json',
            success: function(data){
              $$('.post-content-block').append('<div class="card ks-facebook-card">' +
                '<div class="card-header">' +
                    '<div class="ks-facebook-avatar"><img src="img/selibeng.png" width="34" height="34"/></div>' +
                    '<div class="ks-facebook-name">Selibeng.com</div>' +
                    '<div class="ks-facebook-date">'+data.date+'</div>' +
                  '</div>' +
                  '<div class="card-content">' + 
                    '<div class="card-content-inner">' +
                    '<p><h3>'+data.title.rendered+'</h3></p>' +
                     '<p>'+data.content.rendered+'</p>' +
                     '<p>More Content: <a href="'+data.link+'">'+data.link+'</a></p>' +
                      // '<p class="color-gray">Views: '+value.link+'</p>' +
                    '</div>' +
                  '</div>' +
                '<div class="item-inner"><div class="item-title"></div>');
              //console.log(value.title);
            },
            error: function(error){
                $$('.post-content-block').append('<div class="item-content">' + 
                    '<div class="item-title"><div class="item-media"><i class="icon icon-f7"></i></div> there is a problem loading data, you might wanna check you internet connection and retry.</div>');
                console.log(error);
            }

  });
};