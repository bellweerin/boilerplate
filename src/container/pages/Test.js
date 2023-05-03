import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Table, Radio, Divider, Card } from 'antd';
import { UilEye, UilEdit, UilTrash, UilPlus } from '@iconscout/react-unicons';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Modal } from '../../components/modals/antd-modals';
import DataTable from '../../components/table/DataTable';
import {Tag} from '../../components/tags/tags';

import { Main, BorderLessHeading } from '../styled';
// import { TaskLists } from '../project/style';

import { tableReadData } from '../../redux/data-filter/actionCreator';



const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: 'informant',
        dataIndex: 'informant',
        key: 'informant'
    },
    {
        title: 'subject',
        dataIndex: 'subject',
        key: 'subject'
    },
    {
        title: 'status',
        dataIndex: 'status',
        key: 'status',
        render: (status) => {
            if (status == 'open') { return (<Tag color="#87d068" >{status}</Tag>) }
            if (status == 'close') { return (<Tag color="#f50" >{status}</Tag>) }
        }
    },
    {
        title: 'tools',
        dataIndex: 'tools',
        key: 'tools',
        render: () => {
            return ( <><Button size="small" type="warning">edit</Button>
            <Button size="small" type="danger">delete</Button></>);
        }

    },
];

const dataSource = [
    {
        id: 1,
        informant: 'Adam',
        subject: 'repair',
        status: 'open',
    },
    {
        id: 2,
        informant: 'Kevin',
        subject: 'repair',
        status: 'open',
    },
    {
        id: 3,
        informant: 'Rora',
        subject: 'repair',
        status: 'close',
    },
    {
        id: 4,
        informant: 'Anna',
        subject: 'repair',
        status: 'close',
    },
   
];

function Test() {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        selectionType: 'checkbox',
        selectedRowKeys: null,
        selectedRows: null,
        values: {},
    });
    const showModal = (type) => {
        setState({
            visible: true,
            modalType: type,
        });
    };
    const handleOk = () => {
        setState({
            visible: false,
            colorModal: false,
        });
    };

    const handleCancel = () => {
        setState({
            visible: false,
            colorModal: false,
        });
    };
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          setState({ ...state, selectedRowKeys, selectedRows });
        },
        getCheckboxProps: (record) => ({
          disabled: record.name === 'Disabled User', // Column configuration not to be checked
          name: record.name,
        }),
    };

    useEffect(() => {
        if (dispatch) {
          dispatch(tableReadData(dataSource));
        }
      }, [dispatch]);

      const { TableData } = useSelector((states) => {
        return {
            TableData: states.dataTable.tableData,
        };
      });
    
    function onChange(pagination, filters, sorter, extra) {
        setState({ ...state, values: { pagination, filters, sorter, extra } });
    }
    
  

    return (
        <>
            <Main>
                <Row gutter={15}>
                    <Col xs={24}>
                        <Button size="default" type="success" raised onClick={() => showModal('success')}><UilPlus></UilPlus>Add</Button>
                        <Modal
                            type={state.modalType}
                            title="Add"
                            visible={state.visible}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            // onChange={onChange}
                        > 
                        </Modal>

                        <BorderLessHeading>
                            <Cards title="รายการแจ้งซ่อม">
                                <Table
                                    dataSource={dataSource}
                                    columns={columns}
                                    rowSelection={false}
                                    pagination={{
                                        defaultPageSize: 3,
                                        total: dataSource.length,
                                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                                    }}
                                />
                            </Cards>
                            <Cards title="รายการแจ้งซ่อม">
                                <DataTable
                                    filterOnchange
                                    filterOption
                                    tableData={TableData}
                                    columns={columns}
                                    rowSelection={false}
                                    statusItem={['open', 'close']}
                                    searchKey={'informant'}
                                // pagination={{
                                //     defaultPageSize: 3,
                                //     total: dataSource.length,
                                //     showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                                // }}
                                >   
                                </DataTable>
                            </Cards>
                        </BorderLessHeading>
                    </Col>
                </Row>
            </Main>
        </>
    );


}

export default Test;