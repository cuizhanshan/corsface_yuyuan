/**
 * Created by Jason on 2017/6/19.
 */

import  React, {PropTypes} from 'react';
import {Row} from 'antd';
import styles from '../../style/common/pagination.css';

class PaginationView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pageSize: props.page && props.page.pageSize ? props.page.pageSize : 10,
      currentPage: props.page && props.page.currentPage ? props.page.currentPage :1
    };
    this.first = this.first.bind(this);
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.last = this.last.bind(this);
    this.onPageNoChange = this.onPageNoChange.bind(this);
    this.translateTo = this.translateTo.bind(this);
    this.onKeyUpEvent = this.onKeyUpEvent.bind(this);
    this.translateHandle = this.translateHandle.bind(this);
  }

  first() {
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: 1
      });
      this.translateTo(1, this.state.pageSize);
    }
  }

  previous() {

    if (this.state.currentPage > 1) {
      this.translateTo(this.state.currentPage - 1, this.state.pageSize);
      this.setState({
        currentPage: this.state.currentPage - 1
      });
    }
  }

  next() {

    if (this.state.currentPage < Math.ceil((this.props.page.total ? this.props.page.total : 0) / this.state.pageSize)) {
      this.translateTo(this.state.currentPage + 1, this.state.pageSize);
      this.setState({
        currentPage: this.state.currentPage + 1
      });
    }
  }

  last() {
    if (this.state.currentPage < Math.ceil((this.props.page.total ? this.props.page.total : 0) / this.state.pageSize)) {
      this.translateTo(Math.ceil((this.props.page.total ? this.props.page.total : 0) / this.state.pageSize), this.state.pageSize);
      this.setState({
        currentPage: Math.ceil((this.props.page.total ? this.props.page.total : 0) / this.state.pageSize)
      });
    }
  }


  onPageNoChange(e) {
    const re = new RegExp('^[1-9][0-9]*$');
    if (re.test(e.target.value)) {
      this.setState({
        pageNo: parseInt(e.target.value)
      });
    } else {
      e.target.value = '';
    }

  }

  onKeyUpEvent(e) {
    if (e.keyCode == '10' || e.keyCode == '13') {
      this.translateHandle();
    }
  }

  translateHandle() {
    if (this.state.pageNo) {
      if (this.state.pageNo > Math.ceil((this.props.page.total ? this.props.page.total : 0) / this.state.pageSize)) {
        this.translateTo(Math.ceil((this.props.page.total ? this.props.page.total : 0) / this.state.pageSize), this.state.pageSize);
        this.setState({
          currentPage: Math.ceil((this.props.page.total ? this.props.page.total : 0) / this.state.pageSize)
        });
      } else {
        this.translateTo(this.state.pageNo, this.state.pageSize);
        this.setState({
          currentPage: this.state.pageNo
        });
      }
    }
  }

  translateTo(pageNo, pageSize) {
    this.props.pageTranslate({pageNo, pageSize});
  }

  render() {
    return (
      <Row className={this.props.className ? `${this.props.className} ${styles.pagination}` : styles.pagination}
           style={this.props.style ? this.props.style : null}>
        <div className={styles.left}>
          <div className={styles.total}>
            <span>共</span>
            <span className={styles.number}>{this.props.page.total ? this.props.page.total : 0}</span>
            <span>条</span>
          </div>

          <div className={styles.current}>
            <span className={styles.number}>{this.state.currentPage}</span>
            <span >/</span>
            <span
              className={styles.number}>{Math.ceil((this.props.page.total ? this.props.page.total : 1) / this.state.pageSize)}</span>
            <span >页</span>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.pageInfo}>
            <a onClick={this.first}>首页</a>
            <a onClick={this.previous}>上一页</a>
            <a onClick={this.next}>下一页</a>
            <a onClick={this.last}>尾页</a>
          </div>
          <div className={styles.translate}>
            <span>到</span>
            <input onChange={this.onPageNoChange} onKeyUp={this.onKeyUpEvent}/>
            <span>页</span>
            <a onClick={this.translateHandle}>跳转</a>
          </div>
        </div>
      </Row>
    )
  }
}
export default PaginationView;


