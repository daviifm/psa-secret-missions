const urlParams = new URLSearchParams(self.location.search)
let currentFolder = urlParams.get('folder')
let currentQuest = urlParams.get('quest')
const missionMap = new Map()

self.addEventListener('install', event => {
    self.skipWaiting()
})

self.addEventListener('activate', event => {
    event.waitUntil(clients.claim())
})

self.addEventListener('message', event => {
    const clientId = event.source.id
    missionMap.set(clientId, {
        folder: event.data.folder,
        quest: event.data.quest
    })
    currentFolder = event.data.folder
    currentQuest = event.data.quest
})

self.addEventListener('fetch', event => {
    if(event.request.url.includes("/common/") || event.request.url.includes("/lang/") || event.request.url.includes("/global/")) {
        event.respondWith(
            clients.get(event.clientId).then(client => {
                const mission = missionMap.get(event.clientId) ||
                                { folder: currentFolder, quest: currentQuest } ||
                                { folder: urlParams.get('folder'), quest: urlParams.get('quest') }
                const folder = mission.folder
                const quest = mission.quest
                const url = event.request.url
                const basePath = self.location.pathname.replace('sw.js', '')
                let newUrl = url
                if (url.includes("/common/"))
                    newUrl = url.replace(/.*\/common\//, `${self.location.origin}${basePath}swf/${folder}/quest/${quest}/common/`)
                else if (url.includes("/lang/"))
                    newUrl = url.replace(/.*\/lang\//, `${self.location.origin}${basePath}swf/${folder}/quest/${quest}/lang/`)
                else if (url.includes("/global/"))
                    newUrl = url.replace(/.*\/global\//, `${self.location.origin}${basePath}swf/${folder}/global/`)
                return fetch(newUrl)
            })
        )
    } else {
        event.respondWith(fetch(event.request))
    }
})