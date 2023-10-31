const videoClass = "ytd-rich-item-renderer";
const contentsId = "contents";
const videoContainerTag= "ytd-rich-grid-row";
const titleId = "video-title";
const shortsTag = "ytd-rich-section-renderer";

const videos = []

function hideShorts() {
    for (element of document.getElementsByTagName(shortsTag)) {
        element.style.display = "none";
    }
}

function hide() {
    hideShorts();
    for (element of document.getElementsByClassName(videoClass)) {
        let title = element.querySelector("#" + titleId);
        if (title && title.textContent.includes("p")) {
            element.style.display = "none";
        }
    }
}

function isShort(element) {
    if (element.tagName === "ytd-rich-grid-slim-media") {
        return true;
    }
}

function getVideos() {
    for (element of document.getElementsByClassName(videoClass)) {
        let title = element.querySelector("#" + titleId);
        if (title && !title.textContent.includes("e") && !title.textContent.includes("p")) {
            videos.push(element);
        }
    }
}

function deepCopyContentAndAttributes(sourceElem, targetElem) {
    if (!sourceElem || !targetElem) {
        return;
    }
    
    targetElem.innerHTML = '';
    for (let child of sourceElem.childNodes) {
        if (child.nodeType === Node.ELEMENT_NODE) {
            let clonedChild = child.cloneNode(false);
            targetElem.appendChild(clonedChild);
            deepCopyContentAndAttributes(child, clonedChild);
        } else if (child.nodeType === Node.TEXT_NODE) {
            let clonedText = document.createTextNode(child.nodeValue);
            targetElem.appendChild(clonedText);
        }
    }
    for (let i = 0; i < sourceElem.attributes.length; i++) {
        let attr = sourceElem.attributes[i];
        targetElem.setAttribute(attr.name, attr.value);
    }
}

function displayVideos() {
    if (videos.length === 0) {
        return;
    }
    // let items_per_row = videos[0].getAttribute("items-per-row");
    for (row of document.getElementsByTagName(videoContainerTag)) {
        let contents = row.querySelector("#" + contentsId);
        if (!contents) {continue}

        if (contents.children.length === 0) {
            throw "No children";
            continue;
        }
        for (let i = 0; i < contents.children.length; i++) {
            if (isShort(contents.children[i])) {
                continue;
            } else if (videos.length === 0) {
                return;
            }
            deepCopyContentAndAttributes(videos.shift(), contents.children[i]);
        }
    }
}

setTimeout(() => {
    getVideos();
    hideShorts();
    displayVideos();
}, 12000);
setTimeout(() => {
    displayVideos();
}, 18000);
setTimeout(() => {
    displayVideos();
}, 24000);