/*
const fbAsyncInit = function () {
  FB.init({
    appId: '772451956427553',
    cookie: true,
    xfbml: true,
    version: 'v3.1'
  })
  // window.FB.AppEvents.logPageView()
};
*/
(function (d, s, id) {
  var js
  var fjs = d.getElementsByTagName(s)[0]
  if (d.getElementById(id)) { return }
  js = d.createElement(s); js.id = id
  js.src = '//connect.facebook.net/zh_TW/sdk.js#version=v3.1&appId=772451956427553&status=true&cookie=true&xfbml=true'
  fjs.parentNode.insertBefore(js, fjs)
}(document, 'script', 'facebook-jssdk'))
console.log('test for loading the facebook sdk.')
