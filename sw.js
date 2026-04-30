const params = new URLSearchParams(self.location.search)
let currentFolder = null
let currentQuest = null

self.addEventListener('activate', event => {
    event.waitUntil(clients.claim())
})

self.addEventListener('message', event => {
    currentFolder = event.data.folder
    currentQuest = event.data.quest
})

self.addEventListener('fetch', event => {
    if(event.request.url.includes("/common/") || event.request.url.includes("/lang/") || event.request.url.includes("/global/")) {
        const url = event.request.url
        let newUrl = url
        const basePath = self.location.pathname.replace('sw.js', '')
        if (url.includes("/common/"))
            newUrl = url.replace(/.*\/common\//, `${self.location.origin}${basePath}swf/${currentFolder}/quest/${currentQuest}/common/`)
        else if (url.includes("/lang/"))
            newUrl = url.replace(/.*\/lang\//, `${self.location.origin}${basePath}swf/${currentFolder}/quest/${currentQuest}/lang/`)
        else if (url.includes("/global/"))
            newUrl = url.replace(/.*\/global\//, `${self.location.origin}${basePath}swf/${currentFolder}/global/`)
        event.respondWith(fetch(newUrl))
    }
    else {
        event.respondWith(fetch(event.request))
    }
})