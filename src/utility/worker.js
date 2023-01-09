onmessage = (e) => {
    const data = e.data;


    const img = document.createElement("img");
    img.src = data;

    postMessage({data:img});

}