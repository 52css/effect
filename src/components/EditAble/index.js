/*
* @Author: weijie
* @Date:   2017-09-26 22:25:36
* @Last Modified by:   weijie
* @Last Modified time: 2017-09-28 08:50:23
*/
import React, {Component, PropTypes} from 'react';
import $ from 'jquery';
import './index.less';

class EditAbleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  onMouseDown(e) {
    const { drag } = this.props;
    const target = e.target;
    const $el = $(target);
    const $elParent = $el.parent();

    if (drag) {
      this._pos = {
        ready: true,
        top: parseInt($el.css('top'), 10),
        left: parseInt($el.css('left'), 10),
        pageX: e.pageX,
        pageY: e.pageY,
        width: $el.width(),
        height: $el.height(),
        minLeft: 0,
        minTop: 0,
        maxTop: $elParent.height() - $el.height(),
        maxLeft: $elParent.width() - $el.width()
      };
    }

    this.setState({
      isFocus: true
    });
  }

  handleMouseOver(e) {
    const { onChange } = this.props;
    const { _pos } = this;

    if (_pos && _pos.ready) {
      e.preventDefault();

      if (onChange) {
        onChange({
          top: (e.pageY - _pos.pageY) + _pos.top,
          left: (e.pageX - _pos.pageX) + _pos.left,
          width: _pos.width,
          height: _pos.height
        });
      }
    }

  }

  handleMouseUp() {
    const { _pos } = this;

    if (_pos && _pos.ready) {
      _pos.ready = false;
    }

    this.setState({
      isFocus: false
    });
  }

  render() {
    const { children, style, resize, editList } = this.props;
    const { isFocus, isResize } = this.state;

    return (
      <div
        onMouseDown={e => this.handleMouseDown(e)}
        onMouseUp={e => this.handleMouseUp(e)}
        onMouseOver={e => this.handleMouseOver(e)}
        className="cp-edit-able"
        style={style}>
        <div className="ui-content">
          {children}
        </div>
        {resize && isFocus && (
          <div className="ui-resizable ui-resizable-n" />
        )}
        {resize && isFocus && (
          <div className="ui-resizable ui-resizable-n" />
        )}
        {resize && isFocus && (
          <div className="ui-resizable ui-resizable-e" />
        )}
        {resize && isFocus && (
          <div className="ui-resizable ui-resizable-s" />
        )}
        {resize && isFocus && (
          <div className="ui-resizable ui-resizable-w" />
        )}
        {resize && isFocus && (
          <div className="ui-resizable ui-resizable-ne"/>
        )}
        {resize && isFocus && (
          <div className="ui-resizable ui-resizable-nw"/>
        )}
        {resize && isFocus && (
          <div className="ui-resizable ui-resizable-sw"/>
        )}
        {resize && isFocus && (
          <div className="ui-resizable ui-resizable-se"/>
        )}
        {resize && isResize && (
          <button className="ui-recover" onClick={e => this.handleRecover(e)} />
        )}
        {isFocus && (
          <div className="ui-btns">
            {editList.map((item, index) => {
              return (<a href="" onClick={item.onClick(item)} key={index} className="ui-btn">
                {item.name}
              </a>);
            })}
          </div>
        )}
      </div>
    );
  }
}

EditAbleComponent.propTypes = {
  drag: PropTypes.bool.isRequired,
  resize: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.element,
  style: PropTypes.object,
  editList: PropTypes.array
};

export default EditAbleComponent;
