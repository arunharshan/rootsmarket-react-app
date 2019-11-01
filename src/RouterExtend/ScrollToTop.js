/* eslint-disable */
import { withRouter } from 'react-router-dom';
const ScrollToTop = props => {
  window.scrollTo(0, 0);
  // smooth scrolling by html - css
  return props.children;
};

export default withRouter(ScrollToTop);
