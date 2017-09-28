/*
* @Author: weijie
* @Date:   2017-09-26 22:20:54
* @Last Modified by:   weijie
* @Last Modified time: 2017-09-26 22:24:59
*/
import React, {Component} from 'react';
import EditAble from 'components/EditAble';

import './index.less';


class EditAbleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        top: 0,
        left: 0,
        width: 100,
        height: 100
      }
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  handleChange(style) {
    this.setState({
      style
    });
  }

  render() {
    return (
      <div className="pg-edit-able">
        <EditAble
          resize={true}
          drag={true}
          style={this.state.style}
          onChange={css => this.handleChange(css)}>
          this is edit able
        </EditAble>
      </div>
    );
  }
}

export default EditAbleComponent;
