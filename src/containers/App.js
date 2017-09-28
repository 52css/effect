/* CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { HashRouter, Switch, Route } from 'react-router-dom';
import {} from '../actions/';
// import Main from '../components/App';
import Home from './Home';
import VideoBarrage from './VideoBarrage';
import WebRTC from './WebRTC';
import AnimateWaterInBottle from './AnimateWaterInBottle';
import PngIconColorFill from './PngIconColorFill';
import SvgFlip from './SvgFlip';
import EditAble from './EditAble';
import '../styles/app.css';
/* Populated by react-webpack-redux:reducer */
class App extends Component {
  render() {
    // const { actions } = this.props;
    // return <Main actions={actions} />;
    return (<HashRouter>
      {/* <Main actions={actions}/> */}
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/video-barrage" component={VideoBarrage}/>
        <Route path="/webrtc" component={WebRTC}/>
        <Route path="/animate-water-in-bottle" component={AnimateWaterInBottle}/>
        <Route path="/png-icon-color-fill" component={PngIconColorFill}/>
        <Route path="/svg-flip" component={SvgFlip}/>
        <Route path="/effect-editable" component={EditAble}/>
      </Switch>
    </HashRouter>);
  }
}
/* Populated by react-webpack-redux:reducer
 *
 * HINT: if you adjust the initial type of your reducer, you will also have to
 *       adjust it here.
 */
App.propTypes = {
  actions: PropTypes.shape({})
};
function mapStateToProps(state) { // eslint-disable-line no-unused-vars
  /* Populated by react-webpack-redux:reducer */
  const props = {};
  return props;
}
function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  const actions = {};
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
