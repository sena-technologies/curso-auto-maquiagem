// Service Worker - Cache Strategy Otimizada
const CACHE_NAME = 'beautymaster-v1.0.0';
const STATIC_CACHE = 'beautymaster-static-v1.0.0';
const DYNAMIC_CACHE = 'beautymaster-dynamic-v1.0.0';

// Recursos críticos para cache
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/assets/css/critical.css',
    '/assets/css/styles.css',
    '/assets/js/main.js',
    '/assets/js/performance.js',
    '/site.webmanifest',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// Estratégias de cache
const CACHE_STRATEGIES = {
    // Cache First - para recursos estáticos
    cacheFirst: async (request) => {
        const cache = await caches.open(STATIC_CACHE);
        const cached = await cache.match(request);
        return cached || fetch(request);
    },

    // Network First - para conteúdo dinâmico
    networkFirst: async (request) => {
        const cache = await caches.open(DYNAMIC_CACHE);
        try {
            const response = await fetch(request);
            if (response.status === 200) {
                cache.put(request, response.clone());
            }
            return response;
        } catch (error) {
            const cached = await cache.match(request);
            return cached || new Response('Offline - Conteúdo não disponível', {
                status: 503,
                statusText: 'Service Unavailable'
            });
        }
    },

    // Stale While Revalidate - para recursos que podem ser atualizados
    staleWhileRevalidate: async (request) => {
        const cache = await caches.open(DYNAMIC_CACHE);
        const cached = await cache.match(request);
        
        const fetchPromise = fetch(request).then(response => {
            if (response.status === 200) {
                cache.put(request, response.clone());
            }
            return response;
        }).catch(() => cached);

        return cached || fetchPromise;
    }
};

// Instalação do Service Worker
self.addEventListener('install', event => {
    console.log('SW: Instalando Service Worker');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('SW: Cache aberto');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('SW: Recursos críticos cacheados');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('SW: Erro na instalação:', error);
            })
    );
});

// Ativação do Service Worker
self.addEventListener('activate', event => {
    console.log('SW: Ativando Service Worker');
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                        console.log('SW: Removendo cache antigo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('SW: Cache limpo, assumindo controle');
            return self.clients.claim();
        })
    );
});

// Interceptação de requests
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Ignorar requests não HTTP
    if (!request.url.startsWith('http')) return;

    // Estratégia baseada no tipo de recurso
    if (STATIC_ASSETS.some(asset => request.url.includes(asset.replace('/', '')))) {
        // Cache First para recursos estáticos
        event.respondWith(CACHE_STRATEGIES.cacheFirst(request));
    } else if (url.pathname.includes('/api/') || url.hostname !== location.hostname) {
        // Network First para APIs e recursos externos
        event.respondWith(CACHE_STRATEGIES.networkFirst(request));
    } else if (request.destination === 'image') {
        // Stale While Revalidate para imagens
        event.respondWith(CACHE_STRATEGIES.staleWhileRevalidate(request));
    } else {
        // Network First como fallback
        event.respondWith(CACHE_STRATEGIES.networkFirst(request));
    }
});

// Background Sync para formulários offline
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync-contact') {
        event.waitUntil(syncContactForm());
    }
});

async function syncContactForm() {
    try {
        const db = await openDB();
        const tx = db.transaction(['pending-forms'], 'readonly');
        const store = tx.objectStore('pending-forms');
        const forms = await store.getAll();

        for (const form of forms) {
            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(form.data)
                });

                if (response.ok) {
                    // Remove formulário enviado com sucesso
                    const deleteTx = db.transaction(['pending-forms'], 'readwrite');
                    const deleteStore = deleteTx.objectStore('pending-forms');
                    await deleteStore.delete(form.id);
                }
            } catch (error) {
                console.error('Erro ao sincronizar formulário:', error);
            }
        }
    } catch (error) {
        console.error('Erro no background sync:', error);
    }
}

// Push Notifications (futuro)
self.addEventListener('push', event => {
    if (event.data) {
        const data = event.data.json();
        
        const options = {
            body: data.body,
            icon: '/icon-192.png',
            badge: '/badge-72.png',
            tag: 'beautymaster-notification',
            requireInteraction: true,
            actions: [
                {
                    action: 'view',
                    title: 'Ver Curso',
                    icon: '/icon-view.png'
                },
                {
                    action: 'close',
                    title: 'Fechar'
                }
            ]
        };

        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

// Clique em notificação
self.addEventListener('notificationclick', event => {
    event.notification.close();

    if (event.action === 'view') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Utility para abrir IndexedDB
function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('BeautyMasterDB', 1);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
        
        request.onupgradeneeded = event => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('pending-forms')) {
                db.createObjectStore('pending-forms', { keyPath: 'id', autoIncrement: true });
            }
        };
    });
}

// Performance monitoring
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'PERFORMANCE_METRICS') {
        console.log('SW: Métricas de performance recebidas:', event.data.metrics);
        // Aqui poderia enviar para analytics
    }
});

console.log('SW: Service Worker carregado com sucesso');
