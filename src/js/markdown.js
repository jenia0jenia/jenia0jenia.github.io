let mdParams = {
  headers: true,
  fonts: true,
  pre: true,
  code: true,
  links: true,
  images: true
}

function markdownProcess(text) {
  text = escapeHTML(text)

  if (mdParams.headers){
    text = text.replace(/#{6}(.+)/g, '<h6>$1</h6>')
    text = text.replace(/#{5}(.+)/g, '<h5>$1</h5>')
    text = text.replace(/#{4}(.+)/g, '<h4>$1</h4>')
    text = text.replace(/#{3}(.+)/g, '<h3>$1</h3>')
    text = text.replace(/#{2}(.+)/g, '<h2>$1</h2>')
    text = text.replace(/#(.+)/g, '<h1>$1</h1>')
  }

  if (mdParams.fonts) {
    text = text.replace(/[*_]{2}([^*_]+)[*_]{2}/g, '<b>$1</b>')
    text = text.replace(/[*_]([^*_]+)[*_]/g, '<i>$1</i>')
    text = text.replace(/[~]{2}([^~]+)[~]{2}/g, '<del>$1</del>')
  }

  if (mdParams.pre) {
    text = text.replace(/^\s*\n```([^\s]+)?/gm, '<pre class="$1">')
    text = text.replace(/^```\s*\n/gm, '</pre>\n\n')
  }
  if (mdParams.pre) {
    text = text.replace(/[`]([^`]+)[`]/g, '<code>$1</code>')
  }

  if (mdParams.images) {
    text = text.replace(/\!\[([^\]]+)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1" />')
  }

  if (mdParams.links) {
    text = text.replace(/[\[]([^\]]+)[\]][\(]([^\)\"]+)(\"(.+)\")?[\)]/g, '<a href="$2" title="$4">$1</a>')
  }

  return text
}

function escapeHTML(text) {
  if (text && text.length > 0) {
    return text.replace( /&/g, "&amp" )
      .replace( /</g, "&lt" )
      .replace( />/g, "&gt" )
      .replace( /"/g, "&quot" )
      .replace( /'/g, "&#39" )
  } else {
    return ""
  }
}

module.exports = { markdownProcess }
