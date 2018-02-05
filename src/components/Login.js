/**
 * Created by Riky on 2017/3/7.
 */

import React, {PropTypes} from 'react';
import {Layout, message, Form, Icon, Input, Button, Checkbox, Row, Col, Modal} from 'antd';
const {Header, Footer, Content} = Layout;
import styles from "./Login.css";
const FormItem = Form.Item;
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.loading = this.loading.bind(this);
    this.loginSuccess = this.loginSuccess.bind(this);
  }
  componentDidUpdate() {
    setTimeout( this.loginSuccess, 2000);

  }


  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {

      if (!err) {
        this.loading();
        this.props.onLogin(values);
      } else {
        return;
      }
    });
  }

  loading = function () {
    message.loading('正在登录', 0);
  };


  handleOk() {
    this.props.onOk(false, null);
  }


  loginSuccess() {
    if (this.props.isLogin && !this.props.hasError) {
      jump();
    } else if (this.props.hasError) {
      message.destroy();
      Modal.warning({
        title: '登录失败',
        content: this.props.errorMsg,
        okText: '确定',
        onOk: this.handleOk
      });
      this.props.clearMsg();

    }
  }


  render() {
    const {getFieldDecorator} = this.props.form;

    return (
      <Layout className={styles.normal}>
        <Header className={styles.header}>
          <div className={styles.logo}></div>
        </Header>
        <Content className={styles.content}>
          <Row className={styles.container}>
            <Col className={`${styles.fixCol} ${styles.left}`}>
              <div className={styles.imgBox}></div>
              {/*<div className={styles.logoEnglish}></div>*/}
              {/*<div className={styles.textBox}></div>*/}
            </Col>
            <Col className={`${styles.fixCol} ${styles.middle}`}>
              <div className={styles.login}>
                <div className={styles.loginTitle}>登录</div>
                <Form onSubmit={this.handleSubmit} className={styles.loginForm}>
                  <FormItem>
                    {getFieldDecorator('username', {
                      rules: [{required: true, message: '请输入用户名!'}],
                      initialValue: this.props.username ? this.props.username : null
                    })(
                      <Input addonBefore={<Icon type="user" className={styles.inputIcon}/>} placeholder="用户名"
                             className={styles.loginInput}/>
                    )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('password', {
                      rules: [{required: true, message: '请输入密码!'}],
                    })(
                      <Input addonBefore={<Icon type="lock" className={styles.inputIcon}/>} type="password"
                             placeholder="密码" className={styles.loginInput}/>
                    )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('remember', {
                      valuePropName: 'checked',
                      initialValue: true,
                    })(
                      <Checkbox className={styles.remember}>记住用户名</Checkbox>
                    )}

                  </FormItem>

                  <FormItem>
                    <Button type="primary" htmlType="submit" className={styles.loginBtn}>
                      登录
                    </Button>
                  </FormItem>
                </Form>

              </div>

            </Col>
            <Col className={`${styles.fixCol} ${styles.right}`}></Col>
          </Row>


          <Row className={styles.footer}>

            <div className={styles.footerHelp}>
              <span className={styles.help}/> <a href="#">系统使用帮助</a>
            </div>
            <div className={styles.footerHelp}>
              <span className={styles.download}/><a href="./help/"> VLC播放控件下载
            </a>
            </div>
            <div className={styles.footerHelp}>
              <span className={styles.description}/> <a href="#">批量导入模版说明</a>
            </div>

          </Row>


        </Content>

      </Layout>
    )
  }
}
;

export default Form.create()(Login);
