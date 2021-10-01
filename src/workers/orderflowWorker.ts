// const worker: Worker = self as any;

// onmessage = (e) => {
//   postMessage("Hello back!");
// };
//
// export {};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const ctx: Worker = self as any;

// Post data to parent thread
// ctx.postMessage({ foo: "foo" });

// Respond to message from parent thread
ctx.addEventListener("message", (event) => {
  console.log(event);
  ctx.postMessage({ foo: "foo" });
});
