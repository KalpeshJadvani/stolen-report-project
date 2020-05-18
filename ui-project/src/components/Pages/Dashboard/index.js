import React, { Component } from 'react';
import { Spin, Table, Button, Modal, Select } from 'antd';
import { apiService } from '../../Utility/api-service';
import { PopUp } from '../../Element/Popup';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reportes: [],
      activeCases: [],
      tableloding: true,
      statusPopupView: false,
      statusRecord: undefined,
      updateLoading: false,
    };

    this.timerId1 = '';
    this.timerId2 = '';

    // static menu so we can get value and key of status
    this.statusObj = {
      '1': 'Pending',
      '2': 'InProgress',
      '3': 'Completed',
      Pending: 1,
      InProgress: 2,
      Completed: 3,
    };
  }

  activeCasesTableColumns = [
    {
      title: 'Case Id',
      dataIndex: 'caseid',
      key: 'caseid',
    },
    {
      title: 'Officer Name',
      dataIndex: 'officer_name',
      key: 'officer_name',
    },
    {
      title: 'Reg Number',
      dataIndex: 'regNumber',
      key: 'regNumber',
    },
    {
      title: 'Car Model',
      dataIndex: 'carModel',
      key: 'carModel',
    },
    {
      title: 'Comapany Name',
      dataIndex: 'comapanyName',
      key: 'comapanyName',
    },
    {
      title: 'Color',
      dataIndex: 'colorOfCar',
      key: 'colorOfCar',
    },
    {
      title: 'Case Status',
      dataIndex: 'casestatus',
      key: 'casestatus',
      render: (text, record) => (
        <span>
          <span
            onClick={() => {
              this.openPopup({ ...record });
            }}
            style={{ color: '#1890ff', cursor: 'pointer' }}
          >
            {text}
          </span>
        </span>
      ),
    },
  ];

  reportTableColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Pincode',
      dataIndex: 'pincode',
      key: 'pincode',
    },
    {
      title: 'Reg Number',
      dataIndex: 'regNumber',
      key: 'regNumber',
    },
    {
      title: 'Car Model',
      dataIndex: 'carModel',
      key: 'carModel',
    },
    {
      title: 'Color',
      dataIndex: 'colorOfCar',
      key: 'colorOfCar',
    },
    {
      title: 'From Date',
      dataIndex: 'from',
      key: 'from',
    },
    {
      title: 'To Date',
      dataIndex: 'toDate',
      key: 'toDate',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
    },
  ];

  componentWillUnmount() {
    if (this.timerId1) clearTimeout(this.timerId1);
    if (this.timerId2) clearTimeout(this.timerId2);
  }

  openPopup = (record) => {
    record.casestatus = this.statusObj[record.casestatus];
    if (record.casestatus === 3) {
      PopUp.warning({
        title: 'Update record',
        content: 'once you completed can not change !',
      });
    } else {
      this.setState({
        statusPopupView: true,
        statusRecord: record,
      });
    }
  };
  updateStatusToServer = (status) => {
    apiService.updateStatusOfCase(status).then(
      (list) => {
        this.setState(
          {
            statusPopupView: false,
            updateLoading: false,
          },
          () => {
            PopUp.success(
              {
                title: 'Update record',
                content: ' Update Successful.',
              },
              () => {
                this.componentDidMount();
              }
            );
          }
        );
      },
      (error) => {
        this.setState(
          {
            statusPopupView: false,
            updateLoading: false,
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
  };

  updateStatus = () => {
    this.setState({ updateLoading: true }, () => {
      this.timerId2 = setTimeout(() => {
        const { caseid, casestatus } = this.state.statusRecord;
        this.updateStatusToServer({ caseid, casestatus });
      }, 1000);
    });
  };

  onSelectOption = (value) => {
    this.setState((state) => {
      state.statusRecord.casestatus = value;
      return state;
    });
  };

  componentDidMount() {
    this.timerId1 = setTimeout(() => {
      apiService.getComplainReportList().then(
        (list) => {
          const { reportList, casesActive } = list.data;
          //Append key for each row to identify for Vdom
          const reportes = reportList.map((item) => {
            return { key: item._id, ...item };
          });
          // Read only requrd value for cases table
          const activeCases = casesActive.map((item) => {
            return {
              key: item._id,
              caseid: item.caseid,
              officer_name: item.police_row.name,
              regNumber: item.reg_row.regNumber,
              carModel: item.reg_row.carModel,
              comapanyName: item.reg_row.comapanyName,
              colorOfCar: item.reg_row.colorOfCar,
              casestatus: this.statusObj[item.casestatus],
            };
          });

          this.setState({
            tableloding: false,
            reportes,
            activeCases,
          });
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
    }, 400);
  }

  render() {
    const {
      tableloding,
      reportes,
      activeCases,
      updateLoading,
      statusPopupView,
      statusRecord,
    } = this.state;

    return (
      <div>
        <Spin spinning={tableloding} tip="Loading...">
          <Table
            title={() => <b>Active Cases</b>}
            showHeader={true}
            dataSource={activeCases}
            size="small"
            pagination={{
              defaultPageSize: 10,
              showSizeChanger: false,
              pageSizeOptions: ['5', '10', '15'],
            }}
            columns={this.activeCasesTableColumns}
          />
          <Table
            title={() => <b>Report List</b>}
            dataSource={reportes}
            size="small"
            pagination={{
              defaultPageSize: 5,
              showSizeChanger: false,
              pageSizeOptions: ['5', '10', '15'],
            }}
            columns={this.reportTableColumns}
          />
        </Spin>
        <Modal
          title={'Update Status'}
          visible={statusPopupView}
          footer={[
            <Button
              key="Cancel"
              onClick={() => {
                this.setState({
                  statusPopupView: false,
                  statusRecord: undefined,
                });
              }}
            >
              Cancel
            </Button>,
            <Button
              key="Update"
              type="primary"
              loading={updateLoading}
              onClick={this.updateStatus}
            >
              Update
            </Button>,
          ]}
        >
          <br />
          <Select
            value={statusRecord ? statusRecord.casestatus : 1}
            style={{ width: 300 }}
            placeholder="Select a action"
            onChange={this.onSelectOption}
          >
            <Select.Option value={1}>{this.statusObj['1']}</Select.Option>
            <Select.Option value={2}>{this.statusObj['2']}</Select.Option>
            <Select.Option value={3}>{this.statusObj['3']}</Select.Option>
          </Select>
          <br />
        </Modal>
      </div>
    );
  }
}
