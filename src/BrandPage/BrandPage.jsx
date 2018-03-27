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

    /**
     * This is used to Check/Uncheck given brandId's checkbox.
     * @param {Number} brandId Branc Id to check/uncheck checkbox.
     */
    toggleRow(brandId) {
        const newSelected = Object.assign({}, this.state.selected);
        newSelected[brandId] = !this.state.selected[brandId];
        this.setState({
            selected: newSelected,
            selectAll: 2
        });
    }

    /**
     * This is used to Check/Uncheck All checkboxex.
     */
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

    /**
     * React's life cycle method, Will call after mounting.
     */
    componentDidMount() {
        let stateData = this.state;
        this.getDataFromApi(stateData.currentPage, stateData.pageSize, (renderData, apiResponse) => {
            let totalPages = this.getTotalPages(apiResponse.totalCount, stateData.pageSize);
            var pages = this.setState({
                data: renderData, pages: totalPages, apiResponse: apiResponse,
                loading: false, dataBeforeFilter: renderData
            });
        });
    }

    render() {
        const columns = this.getColumns();

        return (
            <div className="col-md-6 col-md-offset-3">
                <ReactTable
                    className="-highlight"
                    data={this.state.data}
                    columns={columns}
                    pages={this.state.pages}
                    defaultPageSize={this.state.pageSize}
                    pageSize={this.state.pageSize}
                    page={this.state.currentPage}
                    loading={this.state.loading}
                    style={{ width: '1000px' }}
                    resizable={false}

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

                    // Custom Sorting
                    sortable={true}
                    onSortedChange={(columnDetail) => {
                        if (columnDetail.length > 0) {
                            let data = this.state.data;
                            let key = columnDetail[0]["id"];
                            let order = columnDetail[0]["desc"];
                            let sortType = typeof data[0][key];

                            data = this.sortData(data, key, order, sortType);
                            this.setState({ data: data });
                        }
                    }}

                    //Custom Filtering
                    filterable={false}
                    onFilteredChange={(columnDetail) => {
                        this.filterData(columnDetail);
                    }}

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
     * This is used to Sort data by given key and type (string or number) and order(desc)
     * @param {Array} data Data to sort
     * @param {String} key Key to sortBy
     * @param {Boolean} order Order to sortBy (true/false)
     * @param {String} sortType type of given key's value (string/number)
     */
    sortData(data, key, order, sortType) {
        if (sortType === "string")
            return data.slice().sort((a, b) => {
                var nameA = a[key].toLowerCase(), nameB = b[key].toLowerCase()
                if (order) {
                    if (nameA < nameB)
                        return 1;
                    if (nameA > nameB)
                        return -1;
                    return 0; //default return value (no sorting)
                } else {
                    if (nameA < nameB)
                        return -1;
                    if (nameA > nameB)
                        return 1;
                    return 0; //default return value (no sorting)
                }
            });
        if (sortType === "number" || sortType === "boolean")
            return data.slice().sort((a, b) => !order ? a[key] - b[key] : b[key] - a[key]);
    }


    /**
     * This is used to fetch data on Page change (Next/Previous).
     * @param {number} currentPage Current page number
     */
    onPageChange(currentPage) {
        let stateData = this.state;
        this.getDataFromApi(currentPage, stateData.pageSize, (renderData, apiResponse) => {
            this.setState({
                data: renderData, currentPage: currentPage, apiResponse: apiResponse, loading: false,
                dataBeforeFilter: renderData
            });
        });
    }

    /**
     * This is used to fetch data on Page Size change (5/10/20/25 rows).
     * @param {number} pageSize Number of rows or Page Size to change
     */
    onPageSizeChange(pageSize) {
        let stateData = this.state;
        this.getDataFromApi(stateData.currentPage, pageSize, (renderData, apiResponse) => {
            let totalPages = this.getTotalPages(apiResponse.totalCount, pageSize);
            var pages = this.setState({
                data: renderData, pages: totalPages, pageSize: pageSize, apiResponse: apiResponse,
                loading: false, dataBeforeFilter: renderData
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

    /**
     * This is used to Fetch data from API.
     * @param {Number} currentPage Current Page Number
     * @param {Number} pageSize Current Page Size
     * @param {Function} callback Callback function to call after getting success from api.
     */
    getDataFromApi(currentPage, pageSize, callback) {
        this.setState({ loading: true });
        fetch("http://13.127.124.185:8080/atom/v1/brand/search?limit=" + pageSize + "&page=" + currentPage)
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
                /**
                 * Condition : If response contains data || data value is not 'null'.
                 */
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

    /**
     * This is used to fetch Column Headers.
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
                filterable: false,
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
                sortable: false,
                filterable: false,
                headerStyle: { "backgroundColor": "black", "color": "white" },
                Cell: (value) => <button onClick={(val) => console.log('Edit Clicked', value.original)}>Edit</button>
            }
        ];
    }

    /**
    * This is used to filter data by columns.
    * @param {Object} columnDetail 
    */
    filterData(columnDetail) {
        let temp = [];
        if (columnDetail.length > 0) {
            // Code for OR condition in multiple filter
            columnDetail.map((val, index) => {
                let data = this.state.dataBeforeFilter;
                let key = val["id"];
                let value = val["value"];
                data = data.filter((item) => {
                    if (item[key].toString().includes(value))
                        temp.push(item);
                });
            });
            this.setState({ data: [...new Set(temp.map(item => item))] });
        }
        else {
            this.setState({ data: this.state.dataBeforeFilter })
        }
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
