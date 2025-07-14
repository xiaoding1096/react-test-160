import { FORMATE_DATE_VN } from "@/services/helper"
import { Avatar, Badge, Descriptions, Drawer } from "antd"
import dayjs from "dayjs"

interface IProps {
    openViewDetail: boolean,
    setOpenViewDetail: (v: boolean) => void,
    dataViewDetail : IUserTable | null
    setDataViewDetail: (v : IUserTable) => void
}
const DetailUser = (props : IProps) => {
    const {openViewDetail, setOpenViewDetail, dataViewDetail, setDataViewDetail} = props
    return (
        <Drawer
        width={'50%'}
        open = {openViewDetail}
        onClose={() => setOpenViewDetail(false)}
        >
            <Descriptions title="User Info" bordered column={2} >
                <Descriptions.Item label="ID" span={2}>{dataViewDetail?._id}</Descriptions.Item>
                <Descriptions.Item label="FULL NAME" span={2}>{dataViewDetail?.fullName}</Descriptions.Item>
                <Descriptions.Item label="EMAIL">{dataViewDetail?.email}</Descriptions.Item>
                <Descriptions.Item label="PHONE">{dataViewDetail?.phone}</Descriptions.Item>
                <Descriptions.Item label="ROLE" > 
                    <Badge status="processing" text={dataViewDetail?.role}/>
                </Descriptions.Item>
                <Descriptions.Item label="AVATAR" > 
                    <Avatar size={64} src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataViewDetail?.avatar}`}/>
                </Descriptions.Item>
                <Descriptions.Item label="CREATED AT">{dayjs(dataViewDetail?.createdAt).format(FORMATE_DATE_VN)}</Descriptions.Item>
                <Descriptions.Item label="UPDATE AT">{dayjs(dataViewDetail?.updatedAt).format(FORMATE_DATE_VN)}</Descriptions.Item>
            </Descriptions>
        </Drawer>
    )

    
}

export default DetailUser;