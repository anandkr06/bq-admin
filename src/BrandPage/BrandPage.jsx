import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactTable from 'react-table';

class BrandPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: {}, selectAll: 0, data: [], currentPage: 0, pages: 0, pageSize: 10, loading: false,
      totalCount: 0, apiResponse: {}
    };
    this.toggleRow = this.toggleRow.bind(this);
  }

  toggleRow(brandId) {
    const newSelected = Object.assign({}, this.state.selected);
    newSelected[brandId] = !this.state.selected[brandId];
    this.setState({
      selected: newSelected,
      selectAll: 2
    });
  }

  toggleSelectAll() {
    let newSelected = {};
    if (this.state.selectAll === 0) {
      this.state.data.forEach(x => {
        newSelected[x.brandId] = true;
      });
    }
    this.setState({
      selected: newSelected,
      selectAll: this.state.selectAll === 0 ? 1 : 0
    });
  }

  componentDidMount() {
    let stateData = this.state;
    this.getDataFromApi(stateData.currentPage, stateData.pageSize, (renderData, apiResponse) => {
      let totalPages = this.getTotalPages(apiResponse.totalCount, stateData.pageSize);
      var pages = this.setState({
        data: renderData, pages: totalPages, apiResponse: apiResponse,
        loading: false
      });
    });
  }

  render() {
    const columns = this.getColumns();

    return (
      <div className="col-md-6 col-md-offset-3">
        <ReactTable
          data={this.state.data}
          columns={columns}
          pages={this.state.pages}
          defaultPageSize={this.state.pageSize}
          pageSize={this.state.pageSize}
          page={this.state.currentPage}
          loading={this.state.loading}
          style={{ width: '1000px' }}
          className="-highlight"

          // Pagination
          showPageJump={true}
          showPagination={true}
          showPaginationTop={true}
          showPaginationBottom={false}
          showPageSizeOptions={true}
          pageSizeOptions={[5, 10, 20, 25, 50, 100]}

          manual // informs React Table that you'll be handling sorting and pagination server-side
          onPageSizeChange={pageSize => this.onPageSizeChange(pageSize)}
          onPageChange={currentPage => this.onPageChange(currentPage)}

          // Text
          previousText='Previous'
          nextText='Next'
          loadingText='Loading...'
          noDataText="No Record Found!"
          pageText='Page'
          ofText='of '
          rowsText='records'
        />
        <p>
          <Link to="/login">Logout</Link>
          <Link to="/">Home</Link>
        </p>
      </div>
    );
  }

  /**
   * This is used to get Column Headers.
   */
  getColumns() {
    return [
      {
        id: "checkbox",
        accessor: "",
        headerStyle: { "backgroundColor": "black", "color": "white" },
        Cell: ({ original }) => {
          // console.log('original : ', original)
          return (
            <input
              type="checkbox"
              className="checkbox"
              checked={this.state.selected[original.brandId] === true}
              onChange={() => this.toggleRow(original.brandId)}
            />
          );
        },
        Header: x => {
          return (
            <input
              type="checkbox"
              className="checkbox"
              checked={this.state.selectAll === 1}
              ref={input => {
                if (input) {
                  input.indeterminate = this.state.selectAll === 2;
                }
              }}
              onChange={() => this.toggleSelectAll()}
            />
          );
        },
        sortable: false,
        width: 40
      },
      {
        Header: "Store Id",
        accessor: "storeId",
        headerStyle: { "backgroundColor": "black", "color": "white" }
      },
      {
        Header: "Brand Id",
        accessor: "brandId",
        headerStyle: { "backgroundColor": "black", "color": "white" }
      },
      {
        Header: "Brand Name English",
        accessor: "brandNameEnglish",
        width: 160,
        headerStyle: { "backgroundColor": "black", "color": "white" }
      },
      {
        Header: "Brand Name Arebic",
        accessor: "brandNameArebic",
        width: 160,
        headerStyle: { "backgroundColor": "black", "color": "white" }
      },
      {
        Header: "Created At",
        accessor: "createdAt",
        headerStyle: { "backgroundColor": "black", "color": "white" }
      },
      {
        Header: "Status",
        accessor: "status",
        headerStyle: { "backgroundColor": "black", "color": "white" }
      },
      {
        Header: "Action",
        id: 'edit',
        headerStyle: { "backgroundColor": "black", "color": "white" },
        Cell: (value) => <button onClick={(val) => console.log('Edit Clicked', value.original)}>Edit</button>
      }
    ];
  }

  onPageChange(currentPage) {
    let stateData = this.state;
    this.getDataFromApi(currentPage, stateData.pageSize, (renderData, apiResponse) => {
      this.setState({
        data: renderData, currentPage: currentPage, apiResponse: apiResponse, loading: false
      });
    });
  }

  onPageSizeChange(pageSize) {
    let stateData = this.state;
    this.getDataFromApi(stateData.currentPage, pageSize, (renderData, apiResponse) => {
      let totalPages = this.getTotalPages(apiResponse.totalCount, pageSize);
      var pages = this.setState({
        data: renderData, pages: totalPages, pageSize: pageSize, apiResponse: apiResponse,
        loading: false
      });
    });
  }

  /**
   * This is used to find Total number of Pages by totalCount and pageSize.
   * @param Number Total Number of Records 
   * @param Number Page Size 
   */
  getTotalPages(totalCount, pageSize) {
    return ((totalCount % pageSize === 0) ?
      parseInt(totalCount / pageSize) : parseInt(totalCount / pageSize) + 1);
  }

  getDataFromApi(currentPage, pageSize, callback) {
    this.setState({ loading: true });
    fetch("http://10.177.0.101:8080/atom/v1/brand/search?limit=" + pageSize + "&page=" + currentPage)
      .then(response => response.json())
      .then((myJson) => {
        /**
         * Condition : If data in response is 'null'
         */
        if (myJson.payload.data === null) {
          alert("Invalid fetch data request. Records reset by given Page Size.");
          /**
           * Fetch users for reset records.
           */
          this.getDataFromApi(0, pageSize, (renderData, apiResponse) => {
            let totalPages = this.getTotalPages(apiResponse.totalCount, pageSize);
            var pages = this.setState({
              data: renderData, pages: totalPages, apiResponse: apiResponse,
              loading: false, pageSize: pageSize, currentPage: 0
            });
          });
        }
        else {
          let renderData = [];
          myJson.payload.data.map((value, index) => {
            var data = {};
            data.id = index;
            data.brandId = value.brandId;
            value.brand.map((val) => {
              if (val.i18nLang === "English")
                data.brandNameEnglish = val.brandName;
              if (val.i18nLang === "Arebic")
                data.brandNameArebic = val.brandName;
            });
            data.storeId = "Test-01"
            data.status = "Test-Active";
            data.createdAt = "Test-date";
            // data.status = value.enableBrand ? "Active" : "In-Active";
            // data.createdAt = value.createdAt;
            renderData.push(data);
          });
          callback(renderData, myJson.payload);
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users
  };
}

const connectedBrandPage = connect(mapStateToProps)(BrandPage);
export { connectedBrandPage as BrandPage };