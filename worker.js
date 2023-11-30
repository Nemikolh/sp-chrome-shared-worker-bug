
const knownContext = new Set();

self.addEventListener('connect', (ev) => {
    const port = ev.ports[0];

    port.onmessage = (message) => {
        if (message.data.type == 'register') {
            knownContext.add(message.data.id);
            return;
        }
        if (message.data.type === 'info') {
            port.postMessage([...knownContext]);
        }
    };
});
