import React, { useState } from 'react'
import useInterval from '@hook/useInterval'
import roomProvider from '@data-access/room-provider';
import "./styles.scss"
const queryString = require('query-string');

// const randomRooms = [
//     {
//         "code": "12",
//         "address": "Hà Nội",
//         "name": "LÊ VĂN HÒA",
//         "textToAudio": "Xin mời người bệnh số 9 đến cửa tiếp đón số 10",
//         "priority": false,
//         "age": 70,
//         "group": "PHÒNG 1",
//         "status": "N"
//     },
//     {
//         "code": "12",
//         "address": "Hà Nội",
//         "name": "NGUYỄN VĂN AN",
//         "textToAudio": "Xin mời người bệnh số 9 đến cửa tiếp đón số 10",
//         "priority": false,
//         "age": 70,
//         "group": "PHÒNG 2",
//         "status": "N"
//     },
//     {
//         "code": "12",
//         "address": "Hà Nội",
//         "name": "LÊ VĂN BÌNH",
//         "textToAudio": "Xin mời người bệnh số 9 đến cửa tiếp đón số 10",
//         "priority": false,
//         "age": 70,
//         "group": "PHÒNG 3",
//         "status": "N"
//     },
//     {
//         "code": "12",
//         "address": "Hà Nội",
//         "name": "LÊ THỊ DUNG",
//         "textToAudio": "Xin mời người bệnh số 9 đến cửa tiếp đón số 10",
//         "priority": false,
//         "age": 70,
//         "group": "PHÒNG 4",
//         "status": "N"
//     }
// ]

const PatientTicket = ({ room, roomName, titleStatus, timer, isOnlyRoom }) => {
    const [infoPatient, setInfoPatient] = useState({})

    // console.log(randomRooms[Math.floor(Math.random(randomRooms) * randomRooms.length)]);

    const fetchInfoPatient = async () => {
        const { data } = await roomProvider.getInfoPatientInRoom(room)

        if (data.wait.length) {   
            setInfoPatient({
                numCount: data.wait[0].code,
                namePatient: data.wait[0].name,
                agePatient: data.wait[0].age,
            })
        } else {
            setInfoPatient({
                numCount: null,
                namePatient: null,
                agePatient: null,
            })
        }
    }

    useInterval(() => {
        fetchInfoPatient()
    }, timer);

    if (!Object.keys(infoPatient).length || !room) return <div></div>

    if (isOnlyRoom) return <div className="patientTicketBig">
        <div className='nameRoom'>
            {roomName}
        </div>
        <div className='titlePatient'>
            <div className='title'>
                {titleStatus}
            </div>
        </div>
        <div className='numCount'>
            {infoPatient.numCount}
        </div>
        <div className='namePatient'>
            {infoPatient.namePatient}
        </div>
        <div className='agePatient'>
            Tuổi: <span>{infoPatient.agePatient}</span>
        </div>
    </div>

    return (
        <div className="patientTicket">
            <div className='nameRoom'>
                {roomName}
            </div>
            <div className='titlePatient'>
                {titleStatus}
            </div>
            <div className='numCount'>
                {infoPatient.numCount}
            </div>
            <div className='namePatient'>
                {infoPatient.namePatient}
            </div>
            {infoPatient.agePatient && <div className='agePatient'>
                Tuổi: <span>{infoPatient.agePatient}</span>
            </div>}
        </div >
    )
}

export default PatientTicket

