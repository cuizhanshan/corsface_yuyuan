/**
 * Created by Riky on 2017/2/24.
 */
import React from 'react';
import { connect } from 'dva';
import { notification, Switch, Input, Table, Pagination } from 'antd';
import { StyleSheet, css } from 'aphrodite';
import { BASE_VERSION, API_VERSION, WEB_VERSION } from '../../utils/constant';
import SystemLayout from './SystemLayout';
import PaginationView from '../../components/common/PaginationView';
import EditSystemView from '../../components/system/EditSystemView';
import ConfirmModal from '../../components/common/ConfirmModal';

import title from '../../style/common/title.css';
import styles from './Config.css';

const dfVer = BASE_VERSION;
const apiVer = API_VERSION;
const webVer = WEB_VERSION;

const { Column, ColumnGroup } = Table;
class Config extends React.Component {

    showEditModal = value => {
        console.log(value);
        value.action = 'edit';
        this.props.dispatch({
            type: 'dictory/success',
            payload: {
                EditSystemVisiable: true,
                editSystemView: value
            }
        })
    };
    showDeleteConfirmModal = value => {
        this.props.dispatch({
            type: 'dictory/showDeleteConfirmModal',
            payload: { id: value.id }
        });
        this.setState({ action: 'delete' });
    };

    onCloseConfirmModal = () => {
        this.props.dispatch({
            type: 'dictory/success',
            payload: {
                confirmModalVisible: false
            }
        })
    }
    onConfirmModalSubmit = () => {
        console.log('................')
        switch (this.state.action) {
            case 'delete':
                this.props.dispatch({
                    type: 'dictory/dictoryDelete'
                });
                break;
        }

    }

    newDictory = () => {
        //  新建弹窗显示
        this.props.dispatch({
            type: 'dictory/success',
            payload: {
                editSystemView: {
                    action: 'new'
                },
                EditSystemVisiable: true
            }
        })
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'dictory/success',
            payload: {
                dictoryListParams: {
                    pageSize: 10,
                    pageNo: 1,
                    tag: '',
                    key: '',
                    name: ''
                }
            }
        })
        this.props.dispatch({
            type: 'dictory/getDictoryList'
        })
        // dictoryListParams: {
        //     pageSize: 10,
        //             pageNo: 1,
        //             tag:'',
        //             key: '',
        //             name: ''
        // }

    }

    onCancel = () => {
        this.props.dispatch({
            type: 'dictory/success',
            payload: {
                EditSystemVisiable: false,
                editSystemView: ''
            }
        })
    }
    onModalSubmit = () => {
        const editSystemView = this.props.dictory.editSystemView;
        if (editSystemView && editSystemView.action && editSystemView.action === 'edit') {
            // editSystemView有值, 是修改操作
            console.log('editSystemView有值')
            this.props.dispatch({
                type: 'dictory/dictoryModify'
            })
        } else {
            // editSystemView有值, 是新建操作
            console.log('editSystemView无值')
            this.props.dispatch({
                type: 'dictory/dictoryAdd'
            })
        }
    }
    onKeyChange = (e) => {
        const dictoryListParams = this.props.dictory.dictoryListParams;
        this.props.dispatch({
            type: 'dictory/success',
            payload: {
                dictoryListParams: {
                    ...dictoryListParams,
                    key: e.target.value
                }
            }
        })
    }
    onTagChange = (e) => {
        const dictoryListParams = this.props.dictory.dictoryListParams;
        this.props.dispatch({
            type: 'dictory/success',
            payload: {
                dictoryListParams: {
                    ...dictoryListParams,
                    tag: e.target.value
                }
            }
        })
    }
    onNameChange = (e) => {
        const dictoryListParams = this.props.dictory.dictoryListParams;
        this.props.dispatch({
            type: 'dictory/success',
            payload: {
                dictoryListParams: {
                    ...dictoryListParams,
                    name: e.target.value
                }
            }
        })
    }
    searchSubmit = () => {
        this.props.dispatch({
            type: 'dictory/getDictoryList'
        })
    }

    // onPaginationChange = (pageSize, pageNo) => {
    //     const dictoryListParams = this.props.dictory.dictoryListParams;
    //     this.props.dispatch({
    //         type: 'dictory/success',
    //         payload: {
    //             dictoryListParams: {
    //                 ...dictoryListParams,
    //                 pageNo,
    //                 pageSize
    //             }
    //         }
    //     });
    //     this.props.dispatch({
    //         type: 'dictory/getDictoryList'
    //     });
    // }
    pageTranslate = (value) => {

        const dictoryListParams = this.props.dictory.dictoryListParams;
        this.props.dispatch({
            type: 'dictory/success',
            payload: {
                dictoryListParams: {
                    ...dictoryListParams,
                    pageNo: value.pageNo,
                    pageSize: value.pageSize
                }
            }
        });
        this.props.dispatch({
            type: 'dictory/getDictoryList'
        });

    };

    render() {
        return (
                <SystemLayout location={this.props.location} dispatch={this.props.dispatch}>
                    <div className={styles.container}>
                        <div className={styles.searchBar}>
                            <label className={styles.label}>主键：</label>
                            <Input size="large" value={this.props.dictory.dictoryListParams.key}
                                   className={styles.input} onChange={this.onKeyChange}/>
                            <label className={styles.label}>编码：</label>
                            <Input size="large" value={this.props.dictory.dictoryListParams.tag}
                                   className={styles.input} onChange={this.onTagChange}/>
                            <label className={styles.label}>名称：</label>
                            <Input size="large" value={this.props.dictory.dictoryListParams.name}
                                   className={styles.input} onChange={this.onNameChange}/>
                            <a className={styles.btn} onClick={this.searchSubmit}>查询</a>
                            <a className={styles.newBtn} onClick={this.newDictory}>新建</a>
                        </div>
                        <div className={styles.content}>
                            <div className={title.container}>
                                <span className={title.text}>数据字典列表</span>
                            </div>

                            <Table
                                    rowKey={record => record.id}
                                    className={styles.list}
                                    dataSource={this.props.dictory.dictoryList && this.props.dictory.dictoryList.length > 0 ? this.props.dictory.dictoryList : null}
                                    pagination={false}
                            >

                                <Column
                                        title="序号"
                                        dataIndex="id"
                                        width={50}
                                />


                                <Column
                                        title="编码"
                                        dataIndex="dicTag"
                                        width={90}
                                />
                                <Column
                                        title="主键"
                                        dataIndex="dicKey"
                                        width={170}
                                />

                                <Column
                                        title="名称"
                                        dataIndex="dicName"
                                        width={150}
                                />


                                <Column
                                        title="值"
                                        dataIndex="dicValue"
                                        width={100}
                                />
                                <Column
                                        title="排序号"
                                        dataIndex="sortNo"
                                        width={50}
                                />


                                <Column
                                        title="备注"
                                        dataIndex="memo"
                                        width={220}
                                />

                                <Column
                                        title="操作"
                                        width={100}
                                        render={(record) => (<div>
                                            <div className={styles.edit}
                                                 onClick={() => this.showEditModal(record)}/>
                                            <div className={styles.deleteBtn}
                                                 onClick={() => this.showDeleteConfirmModal(record)}/>
                                        </div>)}

                                />
                            </Table>
                            {/*{this.props.dictory.dictoryPage.total > 15 ? <Pagination*/}
                            {/*total={this.props.dictory.dictoryPage.total}*/}
                            {/*showTotal={(total, range) => <div*/}
                            {/*className={styles.paginationItem}>*/}
                            {/*<span className={styles.totalItem}>共{total}条 {this.props.dictory.dictoryPage.currentPage}/{Math.ceil(total/15)}页</span>*/}
                            {/*</div>}*/}
                            {/*onChange={this.onPaginationChange}*/}
                            {/*pageSize={15}*/}
                            {/*current={this.props.dictory.dictoryPage.currentPage}*/}
                            {/*showQuickJumper*/}
                            {/*/> : null}*/}
                            {this.props.dictory && this.props.dictory.dictoryPage ?
                                    <PaginationView className={styles.page}
                                                    page={this.props.dictory.dictoryPage}
                                                    pageTranslate={this.pageTranslate ? this.pageTranslate : null}/> : null}


                            <EditSystemView
                                    modalVisible={this.props.dictory.EditSystemVisiable}
                                    data={this.props.dictory.editSystemView ? this.props.dictory.editSystemView : null}
                                    onModalSubmit={this.onModalSubmit}
                                    onModalCancel={this.onCancel}
                            />

                            <ConfirmModal
                                    modalVisible={this.props.dictory.confirmModalVisible}
                                    title={this.props.dictory.confirm ? this.props.dictory.confirm.title : null}
                                    content={this.props.dictory.confirm ? this.props.dictory.confirm.msg : null}
                                    onClosedModal={this.onCloseConfirmModal}
                                    onSubmit={this.onConfirmModalSubmit}
                            />

                        </div>


                        <div style={{ marginLeft: '565px' }}>
                            <div className={styles.text}>
                                <span>df ver:</span>
                                <span>{dfVer}</span>
                            </div>
                            <div className={styles.text}>
                                <span>api ver:</span>
                                <span>{apiVer}</span>
                            </div>
                            <div className={styles.text}>
                                <span>web ver:</span>
                                <span>{webVer}</span>
                            </div>
                        </div>
                    </div>

                </SystemLayout>
        );
    }
}

function mapStateToProps({ dictory }) {
    return { dictory };
}

export default connect(mapStateToProps)(Config);
