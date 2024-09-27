import { component$ } from "@builder.io/qwik";

import "./global.css";

export default component$(() => {
  console.log('we are rendering the component');
  return (
    <>
      <head>

      </head>
      <body>
        <h1>Title Goes Here</h1>
        <button onClick$={() => {
          console.log('button clicked');
        }}>Button!</button>
      </body>
    </>
  );
});
