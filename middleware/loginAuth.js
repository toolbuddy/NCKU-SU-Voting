export default function () {
  window.FB.AppEvents.logPageView()
  // check FB login state
  window.FB.getLoginStatus(response => {
    if (response.status === 'unknow') {
      return false
    }
    return true
  })
}
