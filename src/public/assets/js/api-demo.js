/* eslint-disable */
const INDENT_SIZE = 4

async function runDemo() {
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

    const url = `/api/naverVideo?clubId=${clubId}&clubName=${clubName}&articleId=${articleId}&index=${index}`

    const { data: response } = await axios.get(url)

    document.querySelector('#result').style.whiteSpace = 'pre-wrap'
    document.querySelector('#result').innerText = JSON.stringify(response, null, INDENT_SIZE)
  } catch (e) {
    document.querySelector('#result').style.whiteSpace = 'pre-wrap'
    document.querySelector('#result').innerText =
      JSON.stringify(e.response.data, null, INDENT_SIZE) || e.message || e.toString()
  }
}

async function oembedDemo() {
  try {
    const inputUrl = document.querySelector('#url').value
    const index = document.querySelector('#oembed_index').value || '0'

    if (!inputUrl) throw ReferenceError('url이 비어있습니다.')

    const url = `/oembed?url=${inputUrl}&index=${index}&format=json`

    const { data: response } = await axios.get(url)

    document.querySelector('#oembed_result').style.whiteSpace = 'pre-wrap'
    document.querySelector('#oembed_result').innerText = JSON.stringify(response, null, INDENT_SIZE)
  } catch (e) {
    document.querySelector('#oembed_result').style.whiteSpace = 'pre-wrap'
    document.querySelector('#oembed_result').innerText =
      JSON.stringify(e.response.data, null, INDENT_SIZE).replace(/[\u00A0-\u9999<>\&]/g, i => '&#'+i.charCodeAt(0)+';') || e.message || e.toString()
  }
}

document.querySelector('#request').addEventListener('click', runDemo)
document.querySelector('#oembed_request').addEventListener('click', oembedDemo)
