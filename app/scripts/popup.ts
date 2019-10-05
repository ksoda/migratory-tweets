// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'

console.log(`'Allo 'Allo! Popup`);

document.querySelector("button")!.addEventListener("click", e => {
  console.log(e);
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    console.log(tabs);
    chrome.tabs.sendMessage(tabs[0].id!, { type: "search" });
  });
});
