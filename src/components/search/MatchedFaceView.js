/**
 * Created by Riky on 2017/4/21.
 */
import React from 'react';
import { Input, Table, Popover, Button, notification, Spin, Select } from 'antd';
import { StyleSheet, css } from 'aphrodite/no-important';

import ImgView from '../common/ImgView';
import RateFaceCardView from '../common/RateFaceCardView';
import ModalFaceView from '../common/ModalFaceView';
import ImgWithBadgeView from '../common/ImgWithBadgeView';
import ExpandImgView from '../common/ExpandImgView';
import ConfirmModal from '../common/ConfirmModal';
import NoDateRemind from '../common/NoDateRemind';

import title from '../../style/common/title.css';
import record from '../../style/record.css';

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: 1504,
        height: 836,
        background: '#151a20',
        border: '1px solid #3D515C',
        borderTopRightRadius: 6,
        borderTopLeftRadius: 6
    },
    poi: {
        width: 1444,
        color: '#fff',
        margin: '12px 30px'
    },
    coverImg: {
        width: 200,
        height: 200,
        display: 'inline-block'
    },
    img: {
        width: 150,
        height: 150,
        marginLeft: 15,
        display: 'inline-block',
    },

    info: {
        height: 200,
        display: 'inline-block',
        fontSize: 14,
        marginLeft: 5,
        fontFamily: ['SimHei', 'sans-serif']
    },
    item: {
        display: 'block',
        width: 300,
        marginBottom: 10,
        overflow: 'hidden'
    },
    label: {
        display: 'inline-block',
        width: 80,
        textAlign: 'right'
    },
    fixFloat: {
        float: 'right',
        marginTop: 50
    },
    searchBar: {
        display: 'block',
        height: 32
    },
    searchLabel: {
        fontSize: 16,
        textAlign: 'left',
        color: '#70c8ea',
        height: 32,
        lineHeight: '32px'
    },
    input: {
        width: 400
    },
    searchBtn: {
        width: 78,
        height: 32,
        display: 'inline-block',
        background: '#339A99',
        lineHeight: '32px',
        textAlign: 'center',
        marginLeft: 30,
        borderRadius: 6,
        color: '#fff'
    },
    list: {
        height: 453,
        border: '1px solid #3D515C',
        borderTopRightRadius: 6,
        borderTopLeftRadius: 6
    },

    content: {
        width: 1440,
        height: 413,
        overflow: 'auto'
    },
    spin: {
        width: 1442,
        height: 420,
    },
    imgViewList: {
        width: 1440,
        height: 413,
        padding: 6,
        overflow: 'auto'
    },

    faceItem: {
        margin: '6px 20px 6px 21px',
    },

    btnArea: {
        position: 'absolute',
        bottom: 15,
        height: 46,
        margin: '0 30px',
    },
    actionBtn: {
        width: 100,
        height: 46,
        color: '#fff',
        textAlign: 'center',
        background: '#109DEC',
        lineHeight: '46px',
        borderRadius: 6,
        display: 'inline-block'
    },
    previousBtn: {
        float: 'left',
        marginLeft: 20
    },
    nextStep: {
        width: 168,
        background: '#339A99',
        marginLeft: 518
    },

    resultBtn: {
        float: 'right',
        marginRight: 20
    },

    expand: {
        width: '1330px!important'
    },
    expandImgList: {
        margin: '15px 17px',
        width: 150,
        height: 150,
        display: 'inline-block'
    }

});

const ImgViewList = ({ data, isSelected, onFaceCardImgClick, onFaceCardTextClick }) => {
    return (
            <div className={css(styles.imgViewList)}>
                {data && data.length > 0 ? data.map((value, i) =>
                                <RateFaceCardView className={css(styles.faceItem)}
                                                  key={value.ftInfoData.id}
                                                  data={value}
                                                  checked={isSelected(value)}
                                                  onImgClick={onFaceCardImgClick}
                                                  onTextClick={onFaceCardTextClick}/>) : null}
            </div>
    )
};

const tableProps = {
    pagination: false,
    expandedRowRender(record){
        return <ExpandImgView className={css(styles.expand)} imgClass={css(styles.expandImgList)}
                              size={14}
                              imgs={record.imgs}/>
    },
    scroll: {
        y: 362
    },
    columns: [
        {
            title: '序号',
            dataIndex: 'id',
            width: 200
        }, {
            title: '照片',
            dataIndex: 'imgs',
            width: 300,
            render: text => {

                return text && text.length > 0 ?
                        <ImgWithBadgeView src={text[0]} count={text.length}/> : null
            }
        },
        {
            title: '摄像头',
            width: 240,
            dataIndex: 'srcName',
        }, {
            title: '时间',
            width: 300,
            render: (record) => {
                return <Popover placement="top" content={<ImgView src={record.snapImg}/>}
                                trigger="click"
                                arrowPointAtCenter><Button
                        className={record.popoverBtn}>{record.offsetTime ? record.offsetTime : record.captureTime}</Button></Popover >
            }
        }, {
            title: '匹配度(%)',
            width: 170,
            dataIndex: 'percent',
            render: text => text ? (text * 100).toFixed(2) : null

        }
    ]
};

class MatchedFaceView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            model: false,
            visible: false
        };

        this.isSelected = this.isSelected.bind(this);
        this.formatterGroups = this.formatterGroups.bind(this);
        this.onFaceCardImgClick = this.onFaceCardImgClick.bind(this);
        this.onFaceCardTextClick = this.onFaceCardTextClick.bind(this);
        this.onModalClosed = this.onModalClosed.bind(this);
        this.switchActionBar = this.switchActionBar.bind(this);
        this.renderView = this.renderView.bind(this);
        this.renderActionBar = this.renderActionBar.bind(this);
        this.previousStep = this.previousStep.bind(this);
        this.related = this.related.bind(this);
        this.resolveResult = this.resolveResult.bind(this);
        this.openNotificationWithIcon = this.openNotificationWithIcon.bind(this);
        this.onShowConfirmModal = this.onShowConfirmModal.bind(this);
        this.onClosedConfirmModal = this.onClosedConfirmModal.bind(this);
        this.onRelateSubmit = this.onRelateSubmit.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    formatterGroups = (groups) => {

        let names = [];

        if (groups && groups.length > 0) {
            groups.map(value => names.push(value.name));
        }
        return names.join(',');
    };
    onFaceCardTextClick = (value) => {
        this.setState({
            visible: true,
            modalFace: value.ftInfoData
        })
    };
    onModalClosed = () => {
        this.setState({
            visible: false,
            modalFace: ''
        })
    };
    switchActionBar = () => {
        let model = this.state.model;
        this.setState({
            model: !model,
            selectedRows: ''
        })
    };
    onCameraClick = (value) => {
        this.setState({
            srcIds: value
        });
    };
    renderView = () => {
        let model = this.state.model;
        let view;
        if (!model) {
            view = <ImgViewList data={this.props.matchedFaceList} isSelected={this.isSelected}
                                onFaceCardImgClick={this.onFaceCardImgClick}
                                onFaceCardTextClick={this.onFaceCardTextClick}/>
        } else {

            const rowSelection = {
                onChange: (selectedRowKeys, selectedRows) => {
                    this.setState({ selectedRows });
                },
                onSelect: (record, selected, selectedRows) => {
                    this.setState({ selectedRows });
                },
                onSelectAll: (selected, selectedRows, changeRows) => {
                    this.setState({ selectedRows });
                }
            };
            view = <Table rowSelection={rowSelection} rowKey={record => record.id}
                          dataSource={this.props.matchedFaceList ? this.formatterList(this.props.matchedFaceList) : null} {...tableProps}/>
        }

        return view;
    };
    renderActionBar = () => {

        let model = this.state.model;
        let list;
        let view;
        let actionBar = [];
        if (model) {
            list = <a key='list' className={ record.listImg}/>;
            view = <a key='view' className={ record.viewImgSelect} onClick={this.switchActionBar}/>;
            actionBar.push(list);
            actionBar.push(view);
        } else {
            list = <a key='list' className={ record.listImgSelect} onClick={this.switchActionBar}/>;
            view = <a key='view' className={ record.viewImg}/>;
            actionBar.push(list);
            actionBar.push(view);
        }
        return actionBar;
    };
    onFaceCardImgClick = (value) => {
        let selectedRows = this.state.selectedRows ? this.state.selectedRows : [];
        let selected = false;
        let selectedIndex = -1;
        selectedRows.map((item, i) => {
            if (value.id == item.id) {
                selected = true;
                selectedIndex = i;
            }
        });
        if (selected) {
            selectedRows.splice(selectedIndex, 1);
        } else {
            selectedRows.push(value);
        }
        this.setState({ selectedRows });

    };
    /**
     * 错误提示
     * @param type
     * @param message
     */
    openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: '错误提示',
            description: message
        });
    };
    isSelected = (value) => {

        let selectedRows = this.state.selectedRows ? this.state.selectedRows : [];
        let selected = false;

        selectedRows.map((item, i) => {
            if (value.ftInfoData.id == item.id) {
                selected = true;
            }
        });
        return selected;
    };
    previousStep = () => {
        this.props.previousStep();
    };
    related = () => {

        if (this.state.selectedRows && this.state.selectedRows.length > 0) {

            let srcIds = this.state.srcIds;
            let ids = [];
            this.state.selectedRows.map(value => ids.push(value.code));

            let payload = {
                personId: this.props.poi.personId,
                facetrackIds: ids.join(','),
                srcIds: srcIds && srcIds.length > 0 ? srcIds.join(',') : ''
            };
            this.props.relateFace(payload);
        } else {
            this.openNotificationWithIcon('error', '请选择至少一个人脸记录');
        }
        this.setState({
            selectedRows: ''
        })
    }
            ;
    resolveResult = () => {
        this.props.resolveResult();
    };
    onRelateSubmit = () => {
        this.related();
        // this.props.dispatch({type: 'search/spinLoading'});
    };
    onClosedConfirmModal = () => {
        this.props.closedConfirmModal();
    };
    onShowConfirmModal = () => {
        this.props.showConfirmModal();
    };
    formatterList = (data) => {
        var list = [];
        data.map(value => list.push(value.ftInfoData));
        return list
    };
    onSubmit = () => {
        let query = {
            srcIds: this.state.srcIds ? this.state.srcIds.join(',') : ''
        };
        this.props.onQuerySubmit(query);
    };

    render() {

        return (
                <div
                        className={this.props.className ? `${ css(styles.container)} ${this.props.className}` : css(styles.container)}>
                    <div className={title.container}>
                        <span className={title.text}>目标人详情</span>
                    </div>

                    <div className={css(styles.poi)}>

                        {this.props.poi && this.props.poi.imgs && this.props.poi.imgs.length > 0 ?
                                <ImgView src={this.props.poi.imgs[0]}
                                         className={css(styles.coverImg)}/> : null}

                        <div className={css(styles.info)}>
            <span className={css(styles.item)}>
              <label className={css(styles.label)}>姓名：</label>
              <span>{this.props.poi ? this.props.poi.name : ''}</span>
            </span>
                            <span className={css(styles.item)}>
              <label className={css(styles.label)}>性别：</label>
              <span>{this.props.poi ? this.props.poi.gender : ''}</span>
            </span>
                            <span className={css(styles.item)}>
              <label className={css(styles.label)}>身份证号：</label>
              <span>{this.props.poi ? this.props.poi.identityCard : ''}</span>
            </span>
                            <span className={css(styles.item)}>
              <label className={css(styles.label)}>收入时间：</label>
              <span>{this.props.poi ? this.props.poi.gmtCreate : ''}</span>
            </span>
                            <span className={css(styles.item)}>
              <label className={css(styles.label)}>分组：</label>
              <span>{this.props.poi ? this.formatterGroups(this.props.poi.groups) : ''}</span>
            </span>
                            <span className={css(styles.item)}>
              <label className={css(styles.label)}>备注：</label>
              <span>{this.props.poi ? this.props.poi.memo : ''}</span>
            </span>
                        </div>
                        <div className={`${css(styles.info)} ${css(styles.fixFloat)}`}>
                            {this.props.poi && this.props.poi.imgs && this.props.poi.imgs.length > 0 ? this.props.poi.imgs.map((value, i) => i < 5 ?
                                            <ImgView key={`img_` + i} src={value}
                                                     className={css(styles.img)}/> : null) : null}
                        </div>

                        <div className={css(styles.searchBar)}>

                            <label className={`${css(styles.label)} ${css(styles.searchLabel)}`}>摄像头：</label>

                            <Select multiple className={css(styles.input)} size="large" allowClear
                                    onChange={this.onCameraClick}>
                                { this.props.cameraList ? this.props.cameraList.map((value, i) =>
                                                <Select.Option key={i}
                                                               value={value.srcId + ''}>{value.name}</Select.Option>) : null}
                            </Select>


                            <a className={css(styles.searchBtn)} onClick={this.onSubmit}> 查询</a>

                        </div>


                    </div>

                    <div className={`${css(styles.poi)} ${css(styles.list)} `}>
                        <div className={title.container}>
                            <span className={title.text}>挑选搜索结果</span>
                            {this.renderActionBar()}
                        </div>

                        <Spin spinning={this.props.spinLoading} tip="匹配目标人物人脸记录..."
                              wrapperClassName={css(styles.spin)}>
                            <NoDateRemind visible={this.props.noDateRemind}/>
                            <div className={css(styles.content)}>
                                {this.renderView()}
                            </div>
                        </Spin>


                    </div>

                    <div className={`${css(styles.poi)} ${css(styles.btnArea)}`}>

                        <a className={`${css(styles.previousBtn)} ${css(styles.actionBtn)}`}
                           onClick={this.previousStep}>上一步</a>
                        <a className={`${css(styles.nextStep)} ${css(styles.actionBtn)}`}
                           onClick={this.onShowConfirmModal}>确定，再搜一次</a>
                        <a className={`${css(styles.resultBtn)} ${css(styles.actionBtn)}`}
                           onClick={this.resolveResult}>查看结果</a>
                    </div>


                    <ModalFaceView visible={this.state.visible} data={this.state.modalFace}
                                   onClosed={this.onModalClosed}/>
                    <ConfirmModal modalVisible={this.props.confirmModalVisible}
                                  onSubmit={this.onRelateSubmit}
                                  onClosedModal={this.onClosedConfirmModal}/>

                </div>
        )
    }
}

export default MatchedFaceView;

