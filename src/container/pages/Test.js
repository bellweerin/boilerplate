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

import { Main, BorderLessHeading } from '../styled';
// import { TaskLists } from '../project/style';

// import { tableReadData } from '../../redux/data-filter/actionCreator';


const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    }
];

const dataSource = [
    {
        id: 1,
        name: 'Adam'

    },
    {
        id: 2,
        name: 'Anna'
    },
    {
        id: 3,
        name: 'Kevin'
    }, {
        id: 4,
        name: 'Edwin'
    }
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
                        >
                          <input type="text" />
                        </Modal>

                        <BorderLessHeading>
                            <Cards title="Data Table">
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
                        </BorderLessHeading>
                    </Col>
                </Row>
            </Main>
        </>
    );


}

export default Test;