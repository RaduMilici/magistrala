const main = async () => {
  const adapter = await navigator.gpu.requestAdapter();
  console.log(adapter);
};

main();
