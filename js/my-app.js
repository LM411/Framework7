// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});

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



 var rootURL = 'http://www.informativenews.co.ls/wp-json/wp/v2';

 $.ajax({
            // type: 'GET',
            url: rootURL + '/posts?filter[posts_per_page]=50',
            // dataType: 'json',
            success: function(data){
                
                $.each(data, function(index, value) {
                  $$('.content-block').append('<div class="card ks-facebook-card">' +
                  	'<div class="card-header">' +
                        '<div class="ks-facebook-avatar"><img src="img/selibeng.png" width="34" height="34"/></div>' +
                        '<div class="ks-facebook-name">Selibeng.com</div>' +
                        '<div class="ks-facebook-date">'+value.date+'</div>' +
                      '</div>' +
                      '<div class="card-content">' + 
                        '<div class="card-content-inner">' +
                         '<p>'+value.title.rendered+'</p>' +
                          // '<p class="color-gray">Views: '+value.link+'</p>' +
                        '</div>' +
                      '</div>' +
                      '<div class="card-footer">' +
                      '<a href="www.selibeng.com/mis-specialist-at-psi/" class="link">Mark</a>' +
                      '<a href="www.selibeng.com/mis-specialist-at-psi/" class="link">Remove</a>' +
                      '<a href="https://www.selibeng.com/mis-specialist-at-psi/" class="link external">View</a></div>' +
                    '<div class="item-inner"><div class="item-title"></div>');
                  console.log(value.title);
                });
            },
            error: function(error){
                $$('.content-block').append('<div class="item-content">' + 
                    '<div class="item-title"><div class="item-media"><i class="icon icon-f7"></i></div> there is a problem loading data, you might wanna check you internet connection and retry.</div>');
                console.log(error);
            }

 });

 $$('.external').on('click', function () {
        createContentPage();
    });