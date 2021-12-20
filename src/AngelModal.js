import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  start: PropTypes.object.isRequired,
  end: PropTypes.object.isRequired,
  value: PropTypes.string,
  onRemove: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  actionType: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
};

const defaultProps = {
  value: '',
};

function callApi(body) {
    fetch('http://localhost:5000/event', { method: 'POST', body: JSON.stringify(body),     headers: {
        'Content-Type': 'application/json'
      } })
      .then(data => data.json()) // Parsing the data into a JavaScript object
      .then(json => alert(`Zoom ID: ${json.id} for Topic ${json.topic}`)) // Displaying the stringified data in an alert popup
  }


class AngelModal extends React.Component {
  handleRemove = () => {
    this.props.onRemove();
  }

  handleSave = () => {
    const { value } = this.input;
    const {
        start,
        end,
      } = this.props;
    const body = {val: value, start: start.format(), end: end.format()}
    callApi(body)
    this.props.onSave({
      value,
    });
  }

  renderText() {
    const {
      start,
      end,
    } = this.props;

    if (start.isSame(end, 'day')) {
      return (<span>{`${start.format('Do MMM., HH:mm')} - ${end.format('HH:mm')}`}</span>);
    }
    return (<span>{`${start.format('Do MMM.')} - ${end.format('Do MMM.')}, ${start.format('HH:mm')} - ${end.format('HH:mm')}`}</span>);
  }

  render() {
    const {
      value,
    } = this.props;
    return (
      <div className="customModal">
        <div className="customModal__text">{this.renderText()}</div>
        <input
          ref={(el) => { this.input = el; }}
          className="customModal__input"
          type="text"
          placeholder="Objet"
          defaultValue={value}
        />
        <button className="customModal__button" onClick={this.handleRemove}>Delete</button>
        <button className="customModal__button customModal__button_float_right" onClick={this.handleSave}>Save</button>
      </div>
    );
  }
}

AngelModal.propTypes = propTypes;
AngelModal.defaultProps = defaultProps;
export default AngelModal;
