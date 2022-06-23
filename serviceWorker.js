const musicPlayer = "ISLOMDEV"
const assets = [
    "/",
    "/index.html",
    "/style/style.css",
    "/js/main.js",
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil (
        caches.open(musicPlayer).then(cache => {
            cache.addAll(assets)
        })
    )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})
