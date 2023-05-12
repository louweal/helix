export default function (to, from, savedPosition) {
  if (to.path !== from.path && to.hash) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve({ selector: to.hash, offset: { x: 0, y: 90 } });
      }, 600);
    });
  } else if (to.hash) {
    return {
      selector: to.hash,
      offset: { x: 0, y: 90 },
      behavior: "smooth",
    };
  }

  // else {
  //   return { x: 0, y: 0 };
  // }
}
