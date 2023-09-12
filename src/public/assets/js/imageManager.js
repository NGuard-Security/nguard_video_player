const apiDomains = [
    'i1.daumcdn.net',
    'i2.daumcdn.net',
    'm1.daumcdn.net',
    'm2.daumcdn.net',
    'm3.daumcdn.net',
    't1.daumcdn.net',
    't2.daumcdn.net',
    't3.daumcdn.net',
    't4.daumcdn.net',
    't5.daumcdn.net',
    'img1.daumcdn.net',
    'img2.daumcdn.net',
    'ssl.daumcdn.net',
    // 'map.daumcdn.net',
    // 'map0.daumcdn.net',
    // 'map1.daumcdn.net',
    // 'map2.daumcdn.net',
    // 'map3.daumcdn.net',
    // 'map4.daumcdn.net',
    'tistory1.daumcdn.net',
    'tistory2.daumcdn.net',
    'tistory3.daumcdn.net',
    'tistory4.daumcdn.net',
]
  
function cropImage(image, size) {
    const apiDomain = apiDomains[Math.floor(Math.random() * apiDomains.length)]
    return `https://${apiDomain}/thumb/C${size}/?fname=${image}`
}