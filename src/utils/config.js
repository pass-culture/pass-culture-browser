const { NODE_ENV } = process.env

export const IS_DEBUG = true

export const IS_DEV = NODE_ENV === 'development'
export const IS_STAGING = NODE_ENV === 'staging'
export const IS_PROD = NODE_ENV === 'production'

export const NEW = '_new_'

const API_URLS = { 'development' : 'http://localhost',
                   'staging' : 'https://api.passculture-staging.beta.gouv.fr',
                   'production' : 'https://api.passculture.beta.gouv.fr'
                 }

export const API_URL = API_URLS[NODE_ENV]

const BROWSER_URLS = { 'development' : 'http://localhost:3000',
                       'staging' : 'https://app.passculture-staging.beta.gouv.fr',
                       'production' : 'https://app.passculture.beta.gouv.fr'
                     }

export const BROWSER_URL = BROWSER_URLS[NODE_ENV]

const THUMBS_URLS = { 'development' : `${API_URL}/static/object_store_data/thumbs`,
                      'staging' : `${API_URL}/static/object_store_data/thumbs`,
                      'production' : `${API_URL}/static/object_store_data/thumbs`
                    }

export const THUMBS_URL = THUMBS_URLS[NODE_ENV]


function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

      // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "windows_phone";
    }

    if (/android/i.test(userAgent)) {
        return "android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "ios";
    }

    return "unknown";
}

export const MOBILE_OS = getMobileOperatingSystem()

export const IS_LOCALHOST = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

var CALC_ROOT_PATH = ''
if (window.cordova) {
  if (MOBILE_OS === 'android') {
    CALC_ROOT_PATH = 'file:///android_asset/www'
    document.getElementById('android-statusbar-overlay').style.display = 'block'
  } else if (MOBILE_OS === 'ios') {
    //TODO
    CALC_ROOT_PATH = window.location.href.substring(0,1)
  }
  document.addEventListener("deviceready",
                            function () {
                              window.StatusBar.overlaysWebView(true)
                            },
                            false)
}

export const ROOT_PATH = CALC_ROOT_PATH
