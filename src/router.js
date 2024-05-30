

let ROUTES = {};
let rootEl;

export const setRoutes = (routes) => {
  ROUTES = routes;
};

export const setRootEl = (el) => { //selector
// assign ROUTES
  rootEl = el;
};

const renderView = (pathname, props = {}) => { 
  // clear the root element
  rootEl.innerHTML = "";
  // find the correct view in ROUTES for the pathname //in case not found render the error view
  const view = ROUTES[pathname] ?? ROUTES["/error"];
  //render the correct view passing the value of props
  const viewElement = view(props);
  // add the view element to the DOM root element
  rootEl.appendChild(viewElement);
};

const queryStringToObject = (queryString) => {
// convert query string to URLSearchParams
  const params = new URLSearchParams(queryString);
  // convert URLSearchParams to an object
  const obj = Object.fromEntries(params);
  // return the object
  return obj;
};

export const navigateTo = (pathname, props={}) => {
  // update window history with pushState
  const pageUrl = pathname+ "?" + new URLSearchParams(props)
  history.pushState({},"", pageUrl)
  // render the view with the pathname and props
  renderView(location.pathname, props)
}
export const onURLChange = ({ currentTarget: { location } }) => {
  // parse the location for the pathname and search params
  const pathname = location.pathname
  // convert the search params to an object
  const searchParams = queryStringToObject(location.search);
  // render the view with the pathname and object
  renderView(pathname, searchParams);
};
