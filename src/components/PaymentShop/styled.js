import styled from 'styled-components';

export const PaymentWrapper = styled.div`
  height: 400px;
  border: 1px solid #777;
  border-radius: 10px;
  padding: 2% 0%;

  .title {
    display: flex;
    justify-content: space-between;
    text-transform: uppercase;
    white-space: nowrap;
    text-align: center;
    font-weight: 900;
    font-size: 50px;
    padding: 20px;
    height: 85%;

    .left-title {
      height: 100%;
      color: #2a5caa;
      padding: 2%;
      font-weight: 900;
      background: #e3edf7;
      box-shadow: inset -6.29461px -6.29461px 12.5892px #f8fbff, inset 6.29461px 6.29461px 12.5892px #c4d9ee;
      border-radius: 20px;
      width: 50%;
      min-width: 400px;
      font-size: 170px;
      margin-right: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .right-title {
      height: 100%;
      color: #ed1847;
      padding: 2%;
      font-weight: 900;
      background: #e3edf7;
      box-shadow: inset -6.29461px -6.29461px 12.5892px #f8fbff, inset 6.29461px 6.29461px 12.5892px #c4d9ee;
      border-radius: 20px;
      width: 50%;
      min-width: 400px;
      font-size: 170px;
      margin-left: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .name {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #2a5caa;
    font-weight: 900;
    font-size: 50px;
    text-transform: uppercase;
    height: 15%;
  }
`;
