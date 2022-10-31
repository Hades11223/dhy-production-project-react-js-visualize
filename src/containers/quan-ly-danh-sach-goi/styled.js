import styled, { createGlobalStyle } from 'styled-components';
export const GlobalStyle = createGlobalStyle`
.popover-custom{
    .ant-popover-inner-content{
    padding: 0;
    div{
        padding: 10px;
        :hover{
            background-color: #eaf2d3;
            cursor: pointer;
        }
    }
}
}


`;
export const Main = styled.div`
  padding: 10px;
  .title-header {
    .name-room {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      font-size: 25px;
      font-weight: 700;
    }
    padding-bottom: 10px;
  }
  .ant-table-thead {
    tr {
      th {
        font-weight: 600;
        color: #fff;
        font-size: 18px;
        background-color: #a7c942;
      }
    }
  }
  .ant-table-cell-row-hover {
    background-color: #a7c942 !important;
  }
  .ant-table {
    tr:nth-child(even) {
      background-color: #eaf2d3;
    }
  }
  .ant-table-tbody {
    tr {
      td {
        font-weight: 500;
        border-bottom: 1px solid #9dc22b;
        border-left: 1px solid #9dc22b;
      }
    }
  }
  .ant-table-body {
    ::-webkit-scrollbar {
      width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #9dc22b;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }
  .search {
    padding-bottom: 10px;
    button {
      :hover {
        border-color: #9dc22b;
        box-shadow: 0 0 0 1px #9dc22b;
      }
      :focus {
        border-color: #9dc22b;
        box-shadow: 0 0 0 1px #9dc22b;
        color: #9dc22b;
      }
      :active {
        border-color: #9dc22b;
      }
    }
    input {
      :hover {
        border-color: #9dc22b;
        box-shadow: 0 0 0 1px #9dc22b;
      }
      :focus {
        border-color: #9dc22b;
        box-shadow: 0 0 0 1px #9dc22b;
      }
      :active {
        border-color: #9dc22b;
      }
    }
  }
  .ant-pagination {
    .ant-pagination-item-active {
      border-color: #9dc22b;
    }
    .ant-pagination-item {
      :hover {
        border-color: #9dc22b;
      }
    }
    .ant-select:not(.ant-select-disabled):hover .ant-select-selector {
      border-color: #9dc22b;
    }
  }
  .menu {
    position: absolute;
    top: 10px;
    left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      :hover {
        border-color: #9dc22b;
        box-shadow: 0 0 0 1px #9dc22b;
        color: #9dc22b;
      }
      :focus {
        border-color: #9dc22b;
        box-shadow: 0 0 0 1px #9dc22b;
      }
      :active {
        border-color: #9dc22b;
      }
    }
    .ant-btn:focus {
      color: #9dc22b;
    }
  }
`;
