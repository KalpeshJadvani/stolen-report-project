import React, { Component } from 'react';
import { Form, Input, Button, Col, DatePicker, Row, Layout, Spin } from 'antd';
import { apiService } from '../../Utility/api-service';
import { PopUp } from '../../Element/Popup';
const { RangePicker } = DatePicker;
const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss';
class Complain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentSize: 'small',
      pincode: '',
      pincodeError: false,
      loding: false,
    };
    this.timerId1 = '';
  }

  componentWillUnmount() {
    if (this.timerId1) clearInterval(this.timerId1);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.pincodeError || this.state.pincode.length !== 6)
      return alert('Please Insert Valid Pincode Number 6 Digit!');
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let obj = {
          from: values['range-time-picker'][0].format(dateTimeFormat),
          toDate: values['range-time-picker'][1].format(dateTimeFormat),
          regNumber: values.regNumber.replace(/ /g, ''),
          pincode: this.state.pincode,
        };
        try {
          delete values['range-time-picker'];
          delete values['regNumber'];
        } catch (error) {}
        obj = { ...obj, ...values };
        //console.log('Received values of signup form: ', obj);
        this.setState(
          {
            loding: true,
          },
          () => {
            this.timerId1 = setTimeout(() => {
              apiService.regLostReport(obj).then(
                (user) => {
                  this.setState(
                    {
                      loding: false,
                    },
                    () => {
                      PopUp.success(
                        {
                          title: 'Register report',
                          content: ' Register Successful.',
                        },
                        () => {
                          const { from } = this.props.location.state || {
                            from: { pathname: '/' },
                          };
                          this.props.history.push(from);
                        }
                      );
                    }
                  );
                },
                (error) => {
                  if (error.includes('Dubliate record')) {
                    this.setState(
                      {
                        loding: false,
                      },
                      () => {
                        PopUp.warning(
                          {
                            title: 'Register report',
                            content: 'Register form can not insert !',
                          },
                          () => {
                            this.props.form.setFields({
                              regNumber: {
                                value: obj.regNumber,
                                errors: [
                                  new Error(
                                    'this reg Number Id Already exist!'
                                  ),
                                ],
                              },
                            });
                          }
                        );
                      }
                    );
                  } else {
                    this.setState(
                      {
                        loding: false,
                      },
                      () => {
                        PopUp.error({
                          title: 'Register report',
                          content: error,
                        });
                      }
                    );
                  }
                }
              );
            }, 1500);
          }
        );
      }
    });
  };

  onReset = () => {
    this.props.form.resetFields();
  };

  justCheack = () => {

    fetch("https://stolenreportbackend.herokuapp.com/get_policeofficerslist")
    .then((data)=> data.json())
    .then((data)=> console.log(" Data ===>   ",data));
  
  }

  onChangeNumber = (e, key) => {
    const { value } = e.target;
    const reg = /^-?[0-9]*(\.[0-9]*)?$/;
    if (
      (!isNaN(value) && !value.includes('.') && reg.test(value)) ||
      value === ''
    ) {
      this.setState({
        pincodeError: false,
        [key]: value,
      });
    } else {
      this.setState({ pincodeError: 'true' });
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { pincode, loding, pincodeError } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 15 },
        sm: { span: 15 },
      },
      // layout: 'horizontal',
      // initialValues: { size: componentSize },
      // size: componentSize,
    };
    return (
      <Layout className="container-layout">
        <Spin spinning={loding} tip="Loading...">
          <Form
            {...formItemLayout}
            onSubmit={this.handleSubmit}
            name="reg_form_controls"
          >
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Complainant's Name">
                  {getFieldDecorator('name', {
                    initialValue: 'Kalpesh Jadvani',
                    rules: [
                      {
                        required: true,
                        message: 'The input is not valid Name!',
                        whitespace: true,
                      },
                    ],
                  })(<Input placeholder="Enter name" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Car's Model Name">
                  {getFieldDecorator('carModel', {
                    initialValue: 'Neno',
                    rules: [
                      {
                        required: true,
                        message: 'Input model name of car!',
                        whitespace: true,
                      },
                    ],
                  })(<Input placeholder="Enter model name of car" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Complainant's Address">
                  {getFieldDecorator('address', {
                    initialValue: 'Btm Layout',
                    rules: [
                      {
                        required: true,
                        message: 'Input Address!',
                        whitespace: true,
                      },
                    ],
                  })(<Input placeholder="Enter Address" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Company name">
                  {getFieldDecorator('comapanyName', {
                    initialValue: 'TATA',
                    rules: [
                      {
                        required: true,
                        message: 'Input comapany name!',
                        whitespace: true,
                      },
                    ],
                  })(<Input placeholder="Enter comapany name" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Select State">
                  {getFieldDecorator('state', {
                    initialValue: 'Karnataka',
                    rules: [
                      {
                        required: true,
                        message: 'Input state!',
                        whitespace: true,
                      },
                    ],
                  })(<Input placeholder="Enter state" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Car's Color">
                  {getFieldDecorator('colorOfCar', {
                    initialValue: 'Black',
                    rules: [
                      {
                        required: true,
                        message: 'Input color of car!',
                        whitespace: true,
                      },
                    ],
                  })(<Input placeholder="Enter color of car" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Enter City">
                  {getFieldDecorator('city', {
                    initialValue: 'Nano',
                    rules: [
                      {
                        required: true,
                        message: 'Input city!',
                        whitespace: true,
                      },
                    ],
                  })(<Input placeholder="Enter city" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Car's Reg Number">
                  {getFieldDecorator('regNumber', {
                    initialValue: 'KA19EQ3943',
                    rules: [
                      {
                        required: true,
                        message: 'Input car number!',
                        whitespace: true,
                      },
                    ],
                  })(<Input placeholder="reg number e.g KA19 EQ 1316" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Enter District">
                  {getFieldDecorator('district', {
                    initialValue: 'Banalore',
                    rules: [
                      {
                        required: true,
                        message: 'Input district!',
                        whitespace: true,
                      },
                    ],
                  })(<Input placeholder="Enter district" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="range-time-picker" label="Date&Time Picker">
                  {getFieldDecorator('range-time-picker', {
                    defaultPickerValue:
                      '2020-05-15 16:15:13 2020-05-16 16:15:13',
                    rules: [
                      {
                        type: 'array',
                        required: true,
                        message: 'Please select time!',
                      },
                    ],
                  })(<RangePicker showTime format={dateTimeFormat} />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="pincode"
                  label="Enter pincode"
                  {...(pincodeError && {
                    help: 'Please Insert Pincode',
                    validateStatus: 'error',
                  })}
                >
                  <Input
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => {
                      this.onChangeNumber(e, 'pincode');
                    }}
                    placeholder="Enter pincode"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Enter Any Sign|Symbol">
                  {getFieldDecorator('symbol', {
                    initialValue: 'Back glass Google logo',
                    rules: [
                      {
                        required: true,
                        message: 'Input Sign|Symbol!',
                        whitespace: true,
                      },
                    ],
                  })(
                    <Input placeholder="Enter any sign or symbol e.g small scratch" />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col
                span={24}
                style={{
                  textAlign: 'right',
                }}
              >
                <Button htmlType="submit">Submit</Button>
                <Button
                  style={{
                    margin: '0 8px',
                  }}
                  onClick={this.onReset}
                >
                  Clear
                </Button>
                <Button
                  style={{
                    margin: '0 8px',
                  }}
                  onClick={this.justCheack}
                >
                  Cheack
                </Button>
              </Col>
              
            </Row>
          </Form>
        </Spin>
      </Layout>
    );
  }
}

export default Form.create({ name: 'reg_form_controls' })(Complain);
