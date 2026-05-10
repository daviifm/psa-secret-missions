const urlParams = new URLSearchParams(self.location.search)
let currentFolder = urlParams.get('folder')
let currentQuest = urlParams.get('quest')

self.addEventListener('activate', event => {
    event.waitUntil(clients.claim())
})

self.addEventListener('message', event => {
    console.log('Message:', event.data)
    currentFolder = event.data.folder
    currentQuest = event.data.quest
    console.log('currentFolder:', currentFolder)
    console.log('currentQuest:', currentQuest)
})

self.addEventListener('fetch', event => {
    if(event.request.url.includes("/common/") || event.request.url.includes("/lang/") || event.request.url.includes("/global/")) {
        const url = event.request.url
        let newUrl = url
        const basePath = self.location.pathname.replace('sw.js', '')
        const folder = currentFolder || urlParams.get('folder')
        const quest = currentQuest || urlParams.get('quest')
        console.log('folder:', folder, 'quest:', quest)
        if (url.includes("/common/"))
            newUrl = url.replace(/.*\/common\//, `${self.location.origin}${basePath}swf/${folder}/quest/${quest}/common/`)
        else if (url.includes("/lang/"))
            newUrl = url.replace(/.*\/lang\//, `${self.location.origin}${basePath}swf/${folder}/quest/${quest}/lang/`)
        else if (url.includes("/global/"))
            newUrl = url.replace(/.*\/global\//, `${self.location.origin}${basePath}swf/${folder}/global/`)
        event.respondWith(fetch(newUrl))
    }
    else {
        event.respondWith(fetch(event.request))
    }
})