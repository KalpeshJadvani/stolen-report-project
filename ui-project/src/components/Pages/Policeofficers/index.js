import React, { Component } from 'react';
import { Table, Spin, Form, Button, Modal, Input } from 'antd';
import { apiService } from '../../Utility/api-service';
import { PopUp } from '../../Element/Popup';
class Policeofficers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      tableloding: true,
      actionloading: false,
      addRecord: false,
      modlePopupView: false,
      policeid: '',
      name: '',
      age: '',
    };
    this.timerId1 = '';
    this.timerId2 = '';
  }

  editeRecord = (record) => {
    this.setState({
      modlePopupView: true,
      addRecord: false,
      policeid: record.policeid,
      name: record.name,
      age: record.age,
    });
  };

  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Police Id',
      dataIndex: 'policeid',
      key: 'policeid',
    },
    {
      title: 'Edit',
      dataIndex: 'edit',
      key: 'edit',
      render: (text, record) => (
        <span>
          <span
            onClick={() => {
              this.editeRecord(record);
            }}
            style={{ color: '#1890ff', cursor: 'pointer' }}
          >
            Edite
          </span>
        </span>
      ),
    },
  ];

  editFun = (text, record) => (
    <span>
      <span
        onClick={() => {
          this.editeRecord(record);
        }}
        style={{ color: '#1890ff', cursor: 'pointer' }}
      >
        Edite
      </span>
    </span>
  );

  componentDidMount() {
    this.timerId1 = setTimeout(() => {
      apiService.getPoliceOfficerList().then(
        (list) => {
          //Append key for each row to identify for Vdom
          const data = list.data.map((item) => {
            return { key: item._id, ...item };
          });
          this.setState(
            {
              tableloding: false,
              data,
            },
            () => {}
          );
        },
        (error) => {
          this.setState(
            {
              tableloding: false,
            },
            () => {
              PopUp.error({
                title: 'Getting records',
                content: error,
              });
            }
          );
        }
      );
    }, 1000);
  }

  componentWillUnmount() {
    if (this.timerId1) clearTimeout(this.timerId1);
    if (this.timerId2) clearTimeout(this.timerId2);
  }

  onChangeValue = (obj) => {
    this.setState({ ...obj });
  };
  onSaveRecord = () => {
    const { policeid, name, age, addRecord } = this.state;
    this.setState({ actionloading: true }, () => {
      this.timerId2 = setTimeout(() => {
        if (addRecord) {
          apiService.addPoliceOfficer({ policeid, name, age }).then(
            (list) => {
              const data = list.data.map((item) => {
                return { key: item._id, ...item };
              });
              this.setState(
                {
                  actionloading: false,
                  modlePopupView: false,
                  addRecord: false,
                  policeid: '',
                  name: '',
                  age: '',
                  data,
                },
                () => {
                  PopUp.success(
                    {
                      title: 'Register record',
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
                    actionloading: false,
                    modlePopupView: false,
                    addRecord: false,
                    policeid: '',
                    name: '',
                    age: '',
                  },
                  () => {
                    PopUp.warning(
                      {
                        title: 'Add record',
                        content: 'Dubliate record, Record can not insert !',
                      },
                      () => {}
                    );
                  }
                );
              } else {
                this.setState(
                  {
                    actionloading: false,
                    modlePopupView: false,
                    addRecord: false,
                    policeid: '',
                    name: '',
                    age: '',
                  },
                  () => {
                    PopUp.error({
                      title: 'Add record',
                      content: error,
                    });
                  }
                );
              }
            }
          );
        } else {
          apiService.updatePoliceOfficer({ policeid, name, age }).then(
            (list) => {
              const data = list.data.map((item) => {
                return { key: item._id, ...item };
              });
              this.setState(
                {
                  actionloading: false,
                  modlePopupView: false,
                  addRecord: false,
                  policeid: '',
                  name: '',
                  age: '',
                  data,
                },
                () => {
                  PopUp.success(
                    {
                      title: 'Update record',
                      content: ' Update Successful.',
                    },
                    () => {}
                  );
                }
              );
            },
            (error) => {
              this.setState(
                {
                  actionloading: false,
                  modlePopupView: false,
                  addRecord: false,
                  policeid: '',
                  name: '',
                  age: '',
                },
                () => {
                  PopUp.error({
                    title: 'Update record',
                    content: error,
                  });
                }
              );
            }
          );
        }
      }, 1000);
    });
  };

  onChangeNumber = (e, key) => {
    const { value } = e.target;
    // Not allowed to add char or any special symbol
    const reg = /^-?[0-9]*(\.[0-9]*)?$/;
    if (
      (!value.includes('.') && !isNaN(value) && reg.test(value)) ||
      value === ''
    ) {
      this.setState({ [key]: value });
    }
  };

  render() {
    const {
      tableloding,
      data,
      addRecord,
      modlePopupView,
      actionloading,
      policeid,
      name,
      age,
    } = this.state;

    return (
      <div>
        <Spin spinning={tableloding} tip="Loading...">
          <Table dataSource={data} columns={this.columns} />
          <Button
            onClick={() => {
              this.setState({ modlePopupView: true, addRecord: true });
            }}
          >
            ADD POLIC OFFICER
          </Button>
        </Spin>

        <Modal
          title={addRecord ? 'Add Record' : 'Update Record'}
          visible={modlePopupView}
          footer={[
            <Button
              key="Cancel"
              onClick={() => {
                this.setState({
                  modlePopupView: false,
                  policeid: '',
                  name: '',
                  age: '',
                });
              }}
            >
              Cancel
            </Button>,
            <Button
              key="Save"
              type="primary"
              loading={actionloading}
              onClick={this.onSaveRecord}
            >
              Save
            </Button>,
          ]}
        >
          <Input
            placeholder="Name"
            value={name || ''}
            onChange={(e) => this.onChangeValue({ name: e.target.value })}
          />
          <br />
          <br />
          <Input
            placeholder="Police Id"
            value={policeid || ''}
            maxLength={6}
            disabled={!addRecord}
            onChange={(e) => this.onChangeNumber(e, 'policeid')}
          />
          <br />
          <br />
          <Input
            value={age || ''}
            maxLength={2}
            onChange={(e) => this.onChangeNumber(e, 'age')}
            placeholder="Enter Age"
          />
        </Modal>
      </div>
    );
  }
}

export default Form.create()(Policeofficers);
