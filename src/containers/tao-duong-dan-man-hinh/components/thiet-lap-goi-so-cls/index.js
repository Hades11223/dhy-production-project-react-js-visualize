import { Form, Button, Col, Tooltip, Input, InputNumber, Row, Select } from 'antd';
import React, { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import { Element } from 'react-scroll';
import './index.scss';
import toast from "@utils/snackbar-utils.js"
import { PaperClipOutlined } from '@ant-design/icons';

const { Option } = Select;

const CallCLS = () => {
    const [form] = Form.useForm();
    const [resultLink, setrResultLink] = useState("")

    const handleGenerateLink = (values) => {
        let strLink = `${window.location.origin}/visualize-cls?`

        if (values.id.length === values.name.length
            && values.id.length === values.status.split(",").length) {
            strLink = strLink.concat(`rooms=${values.id.join(",")}&`)
            strLink = strLink.concat(`roomsName=${values.name.join(",")}&`)
            strLink = strLink.concat(`title=${values.status}&`)
            strLink = strLink.concat(`timer=${values.timer * 1000}`)
            setrResultLink(strLink)
            return;
        }
        else toast.showShort("Trường ID Phòng, Tên Phòng, Trạng thái Phòng phải được mapping với nhau!", "warning")
    }

    return (
        <div className="callCLS">
            <hr />
            <div className="generate-visualize-room mt-4">
                <div className="title-generate-room">
                    <Element name="3" className="element">
                        <Link to="/#3">
                            <h3>#2. Thiết lập gọi số CLS</h3>
                        </Link>
                    </Element>
                </div>
                <Form
                    form={form}
                    onFinish={handleGenerateLink}
                    initialValues={{ timer: 3 }}
                >
                    <div className="create-form">
                        <Row gutter={[16, 16]}>
                            <Col span={6}>
                                <div className="field repeat">
                                    <div className="label">ID Phòng</div>
                                    <Form.Item name="id"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Trường ID Phòng không được để trống!'
                                            },
                                        ]}
                                    >
                                        <Select
                                            mode="tags"
                                            style={{ width: '100%' }}
                                            tokenSeparators={[',']}
                                        />
                                    </Form.Item>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div className="field repeat">
                                    <div className="label">Tên Phòng</div>
                                    <Form.Item name="name"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Trường Tên Phòng không được để trống!'
                                            },
                                        ]}
                                    >
                                        <Select
                                            mode="tags"
                                            style={{ width: '100%' }}
                                            tokenSeparators={[',']}
                                        />
                                    </Form.Item>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div className="field repeat">
                                    <div className="label">Trạng thái Phòng</div>
                                    <Form.Item name="status"
                                        // hasFeedback
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Trường Trạng thái Phòng không được để trống!'
                                            },
                                        ]}
                                    >
                                        {/* <Select
                                            mode="tags"
                                            style={{ width: '100%' }}
                                            tokenSeparators={[',']}
                                        /> */}
                                        <Input placeholder='Cách nhau bởi 1 dấu phẩy' />
                                    </Form.Item>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div className="field timer">
                                    <div className="label">Thời gian cập nhật dữ liệu (giây)</div>
                                    <Form.Item name="timer">

                                        <InputNumber name="timer" min={0}
                                            className="w-100" />

                                    </Form.Item>

                                </div>
                            </Col>
                        </Row>
                        <Row className="mt-3" gutter={[8, 8]}>
                            <Col span={6}>
                                <div className="action-btn">
                                    <Button type="primary" htmlType="submit">
                                        Tạo link
                                    </Button>
                                </div>
                            </Col>
                            <Col span={16}>
                                {resultLink &&
                                    <div className="generated-link" >
                                        {resultLink}
                                        <Tooltip placement="right" title="Đã lưu vào bộ nhớ tạm! 🎉" trigger={["click"]}>
                                            <PaperClipOutlined
                                                className='icon'
                                                onClick={() => {
                                                    navigator.clipboard.writeText(resultLink)
                                                    console.log("123123");
                                                }}
                                            />
                                        </Tooltip>
                                    </div>
                                }
                            </Col>
                        </Row>
                    </div>
                    {/* <div>
                    
                        * Note: Đối với mỗi ô nhập thì không được 
                    </div> */}
                </Form>

            </div>
        </div>
    )
}

export default CallCLS