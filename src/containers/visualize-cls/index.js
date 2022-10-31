

import React, { useEffect, useState } from 'react'
import { Row, Col } from "antd"
import PatientTicket from "./components/PatientTicket"
import "./styles.scss"
import { DHY } from '@svg';
import companyImg from '@images/company.png';
const queryString = require('query-string');


const ListPatientTicket = () => {
    const queryStr = queryString.parse(window.location.search);
    const [screenPatientTicket, setScreenPatientTicket] = useState([])

    const queryRooms = queryStr.rooms?.split(',') || []
    const queryRoomsName = queryStr.roomsName?.split(',') || []
    const titleStatus = queryStr.title?.split(',') || []
    const timer = queryStr.timer || 10000

    useEffect(() => {
        if (queryRooms.length) {
            const arrTemp = [...queryRooms];
            if (queryRooms.length === 3) {
                arrTemp.push(0)
            }

            setScreenPatientTicket(arrTemp)
        }
    }, [queryStr.zooms])

    const handleRefresh = () => {
        window.location.reload();
    }

    return (
        <div className="visualizeCls">
            <div className="header">
                <Row>
                    <Col md={5} lg={5} xl={5}>
                        <div className="logo-customer">
                            <DHY />
                        </div>
                    </Col>
                    <Col md={14} lg={14} xl={14}>
                        <div className="title-panel">
                            {/* <h2>Tạo đường dẫn màn hình</h2> */}
                        </div>
                    </Col>
                    <Col md={5} lg={5} xl={5}>
                        <div className="logo-company">
                            <img src={companyImg} alt="" />
                        </div>
                    </Col>
                </Row>
            </div>
            <Row span={16} justify="space-evenly" className='visualizeCls_list'>
                {screenPatientTicket.map((screenPatientItem, idx) => {
                    return <Col span={screenPatientTicket.length === 1 ? 24 : 12} key={screenPatientItem}
                        className={screenPatientTicket.length === 1 ? "colBig" : "col"}>
                        <PatientTicket
                            room={screenPatientItem}
                            roomName={queryRoomsName[idx]}
                            titleStatus={titleStatus[idx]}
                            timer={timer}
                            isOnlyRoom={screenPatientTicket.length === 1} />
                    </Col>
                }
                )}
            </Row>
        </div>
    )
}

export default ListPatientTicket