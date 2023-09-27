/* eslint-disable */
const INDENT_SIZE = 4

async function runDemo() {
  NProgress.start()

  try {
    const clubId = document.querySelector('#clubId').value
    const clubName = document.querySelector('#clubName').value
    const articleId = document.querySelector('#articleId').value
    const index = document.querySelector('#index').value || '0'

    if (!clubId && !clubName)
      throw ReferenceError(
        'clubId 및 clubName가 비어있습니다. 둘 중 하나는 값이 입력되어 있어야 합니다.',
      )
    if (!articleId) throw ReferenceError('articleId가 비어있습니다.')

    NProgress.inc()

    const url = `/api/naverVideo?clubId=${clubId}&clubName=${clubName}&articleId=${articleId}&index=${index}`

    const { data: response } = await axios.get(url)

    NProgress.inc()

    document.querySelector('#result').style.whiteSpace = 'pre-wrap'
    document.querySelector('#result').innerText = JSON.stringify(response, null, INDENT_SIZE)
  } catch (e) {
    document.querySelector('#result').style.whiteSpace = 'pre-wrap'
    document.querySelector('#result').innerText =
      JSON.stringify(e?.response?.data, null, INDENT_SIZE) || e?.message || e.toString()
  }

  NProgress.done()
}

async function oembedDemo() {
  NProgress.start()

  try {
    const inputUrl = document.querySelector('#url').value
    const index = document.querySelector('#oembed_index').value || '0'

    if (!inputUrl) throw ReferenceError('url이 비어있습니다.')

    NProgress.inc()

    const url = `/oembed?url=${inputUrl}&index=${index}&format=json`

    const { data: response } = await axios.get(url)

    NProgress.inc()

    document.querySelector('#oembed_result').style.whiteSpace = 'pre-wrap'
    document.querySelector('#oembed_result').innerText = JSON.stringify(response, null, INDENT_SIZE)
  } catch (e) {
    document.querySelector('#oembed_result').style.whiteSpace = 'pre-wrap'
    document.querySelector('#oembed_result').innerText =
      JSON.stringify(e?.response?.data, null, INDENT_SIZE) || e?.message || e.toString()
  }

  NProgress.done()
}

document.addEventListener('DOMContentLoaded', NProgress.start)
window.addEventListener('load', NProgress.done)

document.querySelector('#request').addEventListener('click', runDemo)
document.querySelector('#oembed_request').addEventListener('click', oembedDemo)
