import React, {Component} from 'react'
import intl from 'react-intl-universal';

class DateComponent extends Component {
  render() {
    let start = new Date();
    let end = new Date();
    let expires = new Date();
    let theTime = new Date();
    return (
      <div>
        <div className="title">Date Examples:</div>
        <div>{intl.get('SALE_START', {start})}</div>
        <div>{intl.get('SALE_END', {end})}</div>
        <div>{intl.get('COUPON', {expires})}</div>
        <div>{intl.get('not-exist-key').d('default message')}</div>
        <div>{intl.get('not-exist-key').defaultMessage('default message')}</div>
        <div>{intl.get('TIME', {theTime:expires})}</div>
      </div>
    )
  }
}

export default DateComponent;