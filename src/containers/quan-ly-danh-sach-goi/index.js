import React, { useEffect, useRef, useState } from 'react';
import { GlobalStyle, Main } from './styled';
import { Col, Input, Popover, Row, Table, message, Button, Icon } from 'antd';
import quanLyDanhSachGoiProvider from '@data-access/quan-ly-danh-sach-goi-provider.js';
import { groupBy } from '../../utils/common-utils';
import { MenuOutlined } from '@ant-design/icons';
import useInterval from '@hook/useInterval';
const QuanLyDanhSachGoi = (props) => {
  const query = new URLSearchParams(props.location.search);
  const tenPhong = query.get('tenPhong');
  const maHoSo = query.get('maHoSo');
  const soPhieu = query.get('soPhieu');
  const [state, _setState] = useState({
    dataSearch: {
      tenPhong,
      maHoSo,
      soPhieu,
    },
    IsQMS: 'N',
  });
  const refDataSearch = useRef({
    tenPhong,
    maHoSo,
    soPhieu,
  });

  const refValues = useRef([]);

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };
  const refTimeout = useRef();
  const onChange = (key) => (e) => {
    const dataSearch = {
      ...state.dataSearch,
      [key]: key === 'isQMR' ? e : e.target.value,
    };
    window.history.replaceState(
      null,
      '',
      `/visualize/quan-ly-danh-sach-goi?${dataSearch.tenPhong ? `tenPhong=${dataSearch.tenPhong}` : ''}${
        dataSearch.maHoSo ? `&maHoSo=${dataSearch.maHoSo}` : ''
      }${dataSearch.soPhieu ? `&soPhieu=${dataSearch.soPhieu}` : ''}`
    );
    refDataSearch.current = dataSearch;
    setState({
      dataSearch,
    });
  };
  const onChangeDanhSach = (value) => {
    const listData = (refValues.current || []).filter((item) => item.IsQMS === value);
    setState({
      listData,
      IsQMS: value,
    });
  };
  const content = (
    <>
      <div className="item" onClick={() => onChangeDanhSach('N')}>
        Danh sách chưa gọi
      </div>
      <div className="item" onClick={() => onChangeDanhSach('Y')}>
        Danh sách đã gọi
      </div>
    </>
  );

  const handleCallCancelCall = (item) => {
    const IsQMS = item.IsQMS === 'Y' ? 'N' : 'Y';
    quanLyDanhSachGoiProvider
      .callAndCancelCall({
        ServiceGroup: item.ServiceGroup,
        IsQMS,
      })
      .then((s) => {
        refValues.current.forEach((el) => {
          if (el.id === item.id) {
            el.IsQMS = IsQMS;
          }
        });
        const newData = state.listData.filter((el) => el.id !== item.id);
        setState({
          listData: newData,
        });
        message.success(IsQMS === 'N' ? 'Hủy gọi thành công' : 'Gọi thành công');
      })
      .catch((e) => {
        message.error(e);
      });
  };
  const columns = [
    {
      title: 'STT',
      dataIndex: 'code',
      key: 'code',
      width: 50,
      align: 'center',
    },
    {
      title: 'Bệnh nhân',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (text, item) => {
        return (
          <div>
            <div className="name">
              <span>
                {item.HIS_PatientDocument} - {item.name} - {item.age} tuổi
              </span>
            </div>
            <div className="address">{item.address}</div>
          </div>
        );
      },
    },
    {
      title: 'Ca chụp',
      dataIndex: 'dsDichVu',
      key: 'dsDichVu',
      width: 400,
      render: (text) => {
        return (
          <div>
            {text.map((item, index) => {
              return (
                <div key={index}>
                  {item.ServiceGroup} - {item.ServiceName}
                </div>
              );
            })}
          </div>
        );
      },
    },
    {
      title: 'Thao tác',
      dataIndex: 'ServiceGroup',
      key: 'ServiceGroup',
      width: 50,
      align: 'center',
      render: (text, item) => <Button onClick={() => handleCallCancelCall(item)}>{item.IsQMS === 'Y' ? 'Hủy gọi' : 'Gọi'}</Button>,
    },
  ];
  const sortData = (data) => {
    const UT = data
      .filter((item) => {
        return (item?.code || '').includes('UT');
      })
      .map((item) => {
        const stt = item?.code.split('.')[1].slice(2);
        return { ...item, stt: +stt };
      })
      .sort((a, b) => a.stt - b.stt);
    const notUT = data
      .filter((item) => !(item.code || '').includes('UT'))
      .map((item) => {
        const stt = item?.code.split('.')[1];
        return { ...item, stt: +stt };
      })
      .sort((a, b) => a.stt - b.stt);

    return [...UT, ...notUT];
  };
  const constvertData = (data) => {
    data.forEach((item) => {
      if (!item.IsQMS) {
        item.IsQMS = 'N';
      }
    });
    const newData = groupBy(data, 'HIS_PatientDocument');
    let dataConvert = [];
    Object.keys(newData).forEach((element) => {
      const groupBySoPieu = groupBy(newData[element], 'ServiceGroup');
      let arr = [];
      Object.keys(groupBySoPieu).forEach((e) => {
        const benhNhan = {
          HIS_PatientDocument: newData[element][0].HIS_PatientDocument,
          age: newData[element][0].age,
          name: newData[element][0].name,
          code: newData[element][0].code,
          IsQMS: newData[element][0].IsQMS,
          dsDichVu: groupBySoPieu[e],
          ServiceGroup: e,
          address: newData[element][0].address,
          id: Math.trunc(Math.random() * 10000000),
        };
        arr.push(benhNhan);
      });
      dataConvert = [...dataConvert, ...arr];
    });
    const listDataChuaGoi = sortData(dataConvert.filter((item) => item.IsQMS === 'N'));
    const listDataDaGoi = sortData(dataConvert.filter((item) => item.IsQMS === 'Y'));
    return { allData: dataConvert, listDataChuaGoi, listDataDaGoi };
  };
  const getData = (IsQMS, dataSearch) => {
    if (dataSearch?.tenPhong) {
      quanLyDanhSachGoiProvider
        .search(refDataSearch.current)
        .then((s) => {
          const { listDataChuaGoi, allData, listDataDaGoi } = constvertData(s);
          setState({
            listData: IsQMS === 'Y' ? listDataDaGoi : listDataChuaGoi,
            isQMS: state.IsQMS,
          });
          refValues.current = allData;
        })
        .catch((e) => {
          setState({
            listData: [],
            isQMS: state.IsQMS,
          });
          message.error(e.toString());
        });
    }
  };
  useEffect(() => {
    if (refTimeout.current) {
      clearTimeout(refTimeout.current);
    }
    refTimeout.current = setTimeout(() => {
      getData(state.IsQMS, state.dataSearch);
    }, 500);
  }, [state.dataSearch]);

  useInterval(() => {
    getData(state.IsQMS, refDataSearch.current);
  }, 30000);
  const width = window.screen.width;
  return (
    <Main>
      <GlobalStyle></GlobalStyle>
      <div className="header">
        <div className="menu">
          <Popover content={content} trigger="click" overlayClassName="popover-custom">
            <Button>
              Menu
              <MenuOutlined />
            </Button>
          </Popover>
        </div>
        <div className="title-header">
          <div className="name-room">
            <div>Danh sách {state.IsQMS === 'Y' ? 'đã gọi' : 'chưa gọi'}</div>
            <div>{state.dataSearch.tenPhong}</div>
          </div>
        </div>
      </div>
      <div className="body">
        <div className="search">
          <Row gutter={[12, 12]}>
            <Col span={8}>
              <Input.Search value={state.dataSearch.tenPhong} placeholder="Nhập tên phòng" onChange={onChange('tenPhong')}></Input.Search>
            </Col>
            <Col span={8}>
              <Input.Search value={state.dataSearch.maHoSo} placeholder="Nhập mã hồ sơ" onChange={onChange('maHoSo')}></Input.Search>
            </Col>
            <Col span={8}>
              <Input.Search value={state.dataSearch.soPhieu} placeholder="Nhập số phiếu" onChange={onChange('soPhieu')}></Input.Search>
            </Col>
          </Row>
        </div>
        <Table rowKey={(row) => row.id} columns={columns} scroll={{ y: width > 1366 ? 600 : 320 }} dataSource={state.listData || []} />;
      </div>
    </Main>
  );
};

export default QuanLyDanhSachGoi;
