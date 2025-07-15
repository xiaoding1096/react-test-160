import { getUsersApi } from '@/services/api';
import { dateRangeValidate } from '@/services/helper';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Space, Tag } from 'antd';
import { useRef, useState } from 'react';
import DetailUser from './detail.user';
import CreateUser from './create.user';





const TableUser = () => {
    
const [openViewDetail,setOpenViewDetail] = useState<boolean>(false)
const [dataViewDetail, setDataViewDetail] = useState<IUserTable | null>(null)
const [openModalCreate, setOpenModalCreate] = useState<boolean>(false)
type TSearch = {
    fullName : string;
    email: string;
    createdAtRange: string[];
    createdAt: string;
}
    const columns: ProColumns<IUserTable>[] = [
   
    {
        title: 'ID',
        align:"center",
        hideInSearch: true,
        dataIndex: '_id',
        render(dom, entity, index, action, schema) {
            return(
                <>
                    <a 
                    href="#"
                    onClick={() => {
                        setOpenViewDetail(true)
                        setDataViewDetail(entity)
                        console.log(entity)

                    }}
                    >{entity._id}</a>
                </>
            )
        },
    },
    {
        title: 'Full Name',
        dataIndex:'fullName',
        align:"center",
    },
    {
        title: 'Email',
        dataIndex: 'email',
        align:"center",
    },
    {
        title: 'Created At',
        dataIndex: 'createdAtRange',
        align:"center",
        valueType:'dateRange', 
        hideInTable: true,
    },
    
    {
        title: 'Created At',
        dataIndex: 'createdAt',
        align:"center",
        sorter: true,
        valueType: 'date',
        hideInSearch: true,
    },
    {
        title: 'Action',
        align:"center",
        hideInSearch: true,
        render(dom, entity, index, action, schema) {
            return(
                <>
                    <div style={{
                        display:"flex",
                        justifyContent:"center",
                        gap:"30px"
                    }}>
                        <EditOutlined style={{color:"green", fontSize:"22px"}}/>
                        <DeleteOutlined style={{color:"red", fontSize:"22px"}}/>
                    </div>
                </>
            )
        },
    },
]
    const actionRef = useRef<ActionType>();
    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 5,
        pages:0,
        total:0,
    })

    const refreshTable = () => {
        actionRef.current?.reload();
    }

    return (
        <>
            <ProTable<IUserTable, TSearch>
                columns={columns}
                actionRef={actionRef}
                cardBordered
                request={async (params, sort, filter) => {
                    console.log(sort, filter);
                    let query = "";
                    
                    if(params){
                        query += `current=${params.current}&pageSize=${params.pageSize}`
                        if(params.fullName){
                            query += `&fullName=/${params.fullName}/i`
                        }
                        if(params.email){
                            query += `&email=/${params.email}/i`
                        }
                        const createdDateRange = dateRangeValidate(params.createdAtRange)
                        if(createdDateRange){
                            query += `&createdAt>=${createdDateRange[0]}&createdAt<=${createdDateRange[1]}`
                        }
                    }
                    query += `&sort=-createdAt`;
                    if(sort && sort.createdAt){
                        query += `&sort=${sort.createdAt === 'ascend' ? 'createdAt' : '-createdAt'}`
                    }

                    const resGetUsersApi = await getUsersApi(query)
                    console.log(resGetUsersApi?.data?.meta)
                    if(resGetUsersApi?.data){
                        setMeta(resGetUsersApi?.data?.meta)
                        console.log(meta)
                    }
                    
                        return {
                            // data: data.data,
                            data: resGetUsersApi?.data?.result,
                            "page": 1,
                            "success": true,
                            "total": resGetUsersApi?.data?.meta?.total,
                        }
                    

                }}
                pagination={{
                    current: meta.current,
                    pageSize: meta.pageSize,
                    showSizeChanger:true,
                    total:meta.total,
                    showTotal:(total,range)=> {
                        return (
                            <div>
                                {range[0]}-{range[1]} on {total} rows
                            </div>
                        )
                    }
                }}
                rowKey="_id"
                headerTitle="Table user"
                toolBarRender={() => [
                    <Button
                        key="button"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            setOpenModalCreate(true)
                            
                        }}
                        type="primary"
                    >
                        Add new
                    </Button>

                ]}
            />
            <DetailUser
            openViewDetail = {openViewDetail}
            setOpenViewDetail = {setOpenViewDetail}
            dataViewDetail = {dataViewDetail}
            setDataViewDetail= {setDataViewDetail}
            />
            <CreateUser
                openModalCreate = {openModalCreate} 
                setOpenModalCreate = {setOpenModalCreate}
                refreshTable = {refreshTable}
            />
        </>
    );
};

export default TableUser;