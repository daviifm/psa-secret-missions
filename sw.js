const params = new URLSearchParams(self.location.search)
let currentFolder = params.get('folder')
let currentQuest = params.get('quest')
console.log('SW location:', self.location.href)
console.log('SW params:', self.location.search)

self.addEventListener('message', event => {
    currentFolder = event.data.folder
    currentQuest = event.data.quest
})

self.addEventListener('fetch', event => {
    console.log('Fetch interceptado:', event.request.url)
    if(event.request.url.includes("/common/") || event.request.url.includes("/lang/") || event.request.url.includes("/global/")) {
        const url = event.request.url
        let newUrl = url
        if (url.includes("/common/"))
            newUrl = url.replace('/common/', `/swf/${currentFolder}/quest/${currentQuest}/common/`)
        else if (url.includes("/lang/"))
            newUrl = url.replace('/lang/', `/swf/${currentFolder}/quest/${currentQuest}/lang/`)
        else if (url.includes("/global/"))
            newUrl = url.replace('/global/', `/swf/${currentFolder}/global/`)
        event.respondWith(fetch(newUrl))
    }
    else {
        event.respondWith(fetch(event.request))
    }
})