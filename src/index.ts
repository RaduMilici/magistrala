const main = async () => {
    const adapter = await navigator.gpu.requestAdapter({
        powerPreference: 'high-performance',
    });
    const device = await adapter?.requestDevice();

    console.log(adapter);
    console.log(device);
};

main();
