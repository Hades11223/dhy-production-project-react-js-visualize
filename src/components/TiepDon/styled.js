import styled from 'styled-components';
export const Main = styled.div`
  margin: 5px;
  color: #333333;
  background: #fff;
  border: 1px solid #666666;
  border-radius: 15px;
  .container-header {
    color: #fff;
    text-transform: uppercase;
    background: #3f459a;
    border-radius: 15px 15px 0px 0px;
    min-height: 50px;
    align-items: center;
    justify-content: center;
    display: flex;
    font-family: Nunito Sans;
    font-style: normal;
    font-weight: 900;
    font-size: 72px;
    line-height: 98px;
  }
  .container-content {
    .status {
      background: #56ccf2;
      color: #fff;
      align-items: center;
      justify-content: center;
      display: flex;
      font-family: Nunito Sans;
      font-style: normal;
      font-weight: 900;
      font-size: 36px;
      line-height: 49px;
    }
    .waiting {
      .content {
        min-height: 220px;
        justify-content: center;
        margin-top: 15px;
        display: flex;
        align-items: center;
        > ul {
          list-style: none;
          padding: 0;
          margin: 0;
          > li {
            display: block;
            align-items: center;
            margin: 0;
            font-size: 60px;
          }
        }
        .stt {
          width: 380px;
          border-radius: 47.8882px;
          color: #e93234;
          font-family: Nunito Sans;
          font-style: normal;
          font-weight: 900;
          font-size: 84.3338px;
          line-height: 115px;
          justify-content: center;
          text-align: center;
          &.audio{
            animation: audio 1s linear infinite;
          }
        }
        .fullname {
          text-align: center;
          padding-top: 10px;
          padding-bottom: 10px;
          font-family: Nunito Sans;
          font-style: normal;
          font-weight: 900;
          font-size: 40px;
          line-height: 55px;
          &.audio{
            animation: audio 1s linear infinite;
          }
        }
        &.block-2 {
          font-size: 90px;
          min-height: 220px;
          > ul {
            > li {
              margin: 3px;
              .stt {
                min-width: 100%;
                font-size: 84.3338px;
                line-height: 115px;
              }
            }
          }
        }
      }
    }
  }
 
}
@keyframes audio {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;
