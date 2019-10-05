// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'

console.log(`'Allo 'Allo! Content script`);

chrome.runtime.onMessage.addListener(m => {
  console.log(m);
  if (m.type !== "search") return;
  const d = new Date(
    Date.parse(
      document
        .querySelector(
          "[role=article] > div > div > div > span:nth-child(1) > span"
        )!
        .textContent!.split("·")[1]
    )
  );
  location.href = `/search?q=${encodeURI(
    toTwQuery({
      from: window.location.pathname.split("/")[1],
      since: toDateStr(delta(d, -1)),
      until: toDateStr(delta(d, 1))
    })
  )}`;
});

function toDateStr(d: Date): string {
  return d.toISOString().split("T")[0];
}
function delta(d: Date, x: number): Date {
  const d_ = new Date(d.getTime());
  d_.setDate(d_.getDate() + x);
  return d_;
}
function toTwQuery(r: {}): string {
  return Object.entries(r)
    .map(x => x.join(":"))
    .join(" ");
}
