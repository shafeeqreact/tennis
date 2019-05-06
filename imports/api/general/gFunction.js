import marked from 'marked';
//import urlObject from 'url';
import moment from 'moment';
import sanitizeHtml from 'sanitize-html';
//import getSlug from 'speakingurl';

/**
 * @summary The global namespace for project utils.
 * @namespace gFunction
 */
gFunction = {};
/**
 * @summary Convert a camelCase string to dash-separated string
 * @param {String} str
 */
gFunction.camelToDash = function (str) {
  return str.replace(/\W+/g, '-').replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();
};

/**
 * @summary Convert a camelCase string to a space-separated capitalized string
 * See http://stackoverflow.com/questions/4149276/javascript-camelcase-to-regular-form
 * @param {String} str
 */
gFunction.camelToSpaces = function (str) {
  return str.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); });
};

/**
 * @summary Convert an underscore-separated string to dash-separated string
 * @param {String} str
 */
gFunction.underscoreToDash = function (str) {
  return str.replace('_', '-');
};

/**
 * @summary Convert a dash separated string to camelCase.
 * @param {String} str
 */
gFunction.dashToCamel = function (str) {
  return str.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');});
};

/**
 * @summary Convert a string to camelCase and remove spaces.
 * @param {String} str
 */
gFunction.camelCaseify = function(str) {
  str = this.dashToCamel(str.replace(' ', '-'));
  str = str.slice(0,1).toLowerCase() + str.slice(1);
  return str;
};

/**
 * @summary Trim a sentence to a specified amount of words and append an ellipsis.
 * @param {String} s - Sentence to trim.
 * @param {Number} numWords - Number of words to trim sentence to.
 */
gFunction.trimWords = function(s, numWords) {

  if (!s)
    return s;

  var expString = s.split(/\s+/,numWords);
  if(expString.length >= numWords)
    return expString.join(" ")+"…";
  return s;
};

/**
 * @summary Trim a block of HTML code to get a clean text excerpt
 * @param {String} html - HTML to trim.
 */
gFunction.trimHTML = function (html, numWords) {
  var text = gFunction.stripHTML(html);
  return gFunction.trimWords(text, numWords);
};

/**
 * @summary Capitalize a string.
 * @param {String} str
 */
gFunction.capitalise = function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

gFunction.t = function(message) {
  var d = new Date();
  console.log("### "+message+" rendered at "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()); // eslint-disable-line
};

gFunction.nl2br = function(str) {
  var breakTag = '<br />';
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
};

gFunction.scrollPageTo = function(selector) {
  $('body').scrollTop($(selector).offset().top);
};

gFunction.getDateRange = function(pageNumber) {
  var now = moment(new Date());
  var dayToDisplay=now.subtract(pageNumber-1, 'days');
  var range={};
  range.start = dayToDisplay.startOf('day').valueOf();
  range.end = dayToDisplay.endOf('day').valueOf();
  // console.log("after: ", dayToDisplay.startOf('day').format("dddd, MMMM Do YYYY, h:mm:ss a"));
  // console.log("before: ", dayToDisplay.endOf('day').format("dddd, MMMM Do YYYY, h:mm:ss a"));
  return range;
};

//////////////////////////
// URL Helper Functions //
//////////////////////////

gFunction.getDomain = function(url) {
  try {
    return urlObject.parse(url).hostname.replace('www.', '');
  } catch (error) {
    return null;
  }
};

// add http: if missing
gFunction.addHttp = function (url) {
  try {
    if (url.substring(0, 5) !== "http:" && url.substring(0, 6) !== "https:") {
      url = "http:"+url;
    }
    return url;
  } catch (error) {
    return null;
  }
};

/////////////////////////////
// String Helper Functions //
/////////////////////////////

gFunction.cleanUp = function(s) {
  return this.stripHTML(s);
};

gFunction.sanitize = function(s) {
  // console.log('// before sanitization:')
  // console.log(s)
  if(Meteor.isServer){
    s = sanitizeHtml(s, {
      allowedTags: [
        'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul',
        'ol', 'nl', 'li', 'b', 'i', 'strong', 'em', 'strike',
        'code', 'hr', 'br', 'div', 'table', 'thead', 'caption',
        'tbody', 'tr', 'th', 'td', 'pre', 'img'
      ]
    });
    // console.log('// after sanitization:')
    // console.log(s)
  }
  return s;
};

gFunction.stripHTML = function(s) {
  return s.replace(/<(?:.|\n)*?>/gm, '');
};

gFunction.stripMarkdown = function(s) {
  var htmlBody = marked(s);
  return gFunction.stripHTML(htmlBody);
};

// http://stackoverflow.com/questions/2631001/javascript-test-for-existence-of-nested-object-key
gFunction.checkNested = function(obj /*, level1, level2, ... levelN*/) {
  var args = Array.prototype.slice.call(arguments);
  obj = args.shift();

  for (var i = 0; i < args.length; i++) {
    if (!obj.hasOwnProperty(args[i])) {
      return false;
    }
    obj = obj[args[i]];
  }
  return true;
};


// see http://stackoverflow.com/questions/8051975/access-object-child-properties-using-a-dot-notation-string
gFunction.getNestedProperty = function (obj, desc) {
  var arr = desc.split(".");
  while(arr.length && (obj = obj[arr.shift()]));
  return obj;
};

export default gFunction;
