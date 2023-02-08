import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

const mdUtils = MarkdownIt().utils

const md = MarkdownIt({
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        const _result = hljs.highlight(str, {
          language: lang,
          ignoreIllegals: true,
        })
        return (
          `<pre class="hljs" lang="${lang}"><code>` +
          _result.value +
          '</code></pre>'
        )
      } catch (e) {
        /* empty */
      }
    }

    return (
      '<pre class="hljs"><code>' + mdUtils.escapeHtml(str) + '</code></pre>'
    )
  },
})

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  const aIndex = tokens[idx].attrIndex('target')

  if (aIndex < 0) {
    tokens[idx].attrPush(['target', '_blank'])
  } else {
    tokens[idx].attrs![aIndex][1] = '_blank'
  }

  return self.renderToken(tokens, idx, options)
}

md.renderer.rules.code_inline = function (tokens, idx) {
  const token = tokens[idx]
  const code = mdUtils.escapeHtml(token.content)

  return `<code class="inline-code">${code}</code>`
}

export const parseMarkDown = (rawString: string) => {
  return md.render(rawString)
}
