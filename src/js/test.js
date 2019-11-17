const test = ({ foo, bar, ...others }) => {
  console.log(others);
}

export { test };