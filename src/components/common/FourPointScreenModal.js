/**
 * Created by Jason on 2017/7/12.
 */
import React from 'react';
import { Modal, Table, Switch, Button, Pagination } from 'antd';
import { StyleSheet, css } from 'aphrodite/no-important';

import FourPointScreenModal from './FourPointScreenModal.css'

const styles = StyleSheet.create({
  body: {
    top: 94
  },
  header: {
    height: 36,
    width: '100%',
    background: '#304351',
    color: '#70c8ea',
    border: '1px solid #3d515d',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    position: 'relative'
  },
  title: {
    width: '100%',
    textAlign: 'center',
    display: 'block',
    fontSize: 16,
    fontFamily: ['SimHei', 'sans-serif'],
    color: '#70c8ea',
    lineHeight: '36px'
  },

  /*container: {
   width: 1370,
   height: 715,
   background: '#232C31'
   },*/

  container: {
    // width: 1370,
    width: 600,
    height: 434,
    background: '#232C31',
    zIndex: 9999
  },
  iframe: {
    position: 'absolute',
    visibility: 'inherit',
    top: 0,
    left: 0,
    height: 480,
    width: 600,
    zIndex: -1
  },
  btn: {
    position: 'absolute',
    bottom: 10,
    right: 30
  },
  pagination: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: "#fff"
  },

})
var value
const rowSelection = {
  type: 'radio',

  onSelect: (record, selected, selectedRows) => {
    value = record
    console.log('table sELECT-->')
    console.log(selectedRows)
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

const ModalFaceView = ({ data, page, visiable, closeModal, toggleScreen, toggleScreenPageChange }) => {
  const columns = [{
    title: '序号',
    dataIndex: 'id',
    key: 'id',
  }, {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '安装地址',
    dataIndex: 'address',
    key: 'address',
  }, {
    title: '摄像头状态',
    render: (record) => (<span>{record.flag === 1 ? '开' : '关'}</span>)
  }]
  const showValue = () => {
    toggleScreen(value)
  }

  // width={1370}
  return (
    <Modal
      visible={visiable}
      width={600}
      footer=''
      closable={true}
      bodyStyle={{ padding: 0, height: 470 }}
      className={css(styles.body)}
      onCancel={closeModal}

    >
      <div className={css(styles.header)}>
        <span className={css(styles.title)}>请选择摄像头</span>
        <div className={FourPointScreenModal.closeBtn}/>
      </div>

      <div className={css(styles.container)}>
        <Table
          rowSelection={rowSelection}
          rowKey={record => record.id}
          columns={columns}
          dataSource={data}
          pagination={false}

        />
        <Pagination
          className={css(styles.pagination)}
          total={page ? page.total : 0}
          pageSize={page ? page.pageSize : 6}
          current={page ? page.currentPage : 1}
          showTotal={total => ` 共${total}条`}
          onChange={toggleScreenPageChange}
        />
        <Button className={css(styles.btn)} type="primary" onClick={showValue}>确定</Button>

        <iframe src="about:blank" frameBorder="0"
                filter='progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=1)'
                className={css(styles.iframe)}>

        </iframe>
      </div>
    </Modal>
  )
};

export default ModalFaceView;
