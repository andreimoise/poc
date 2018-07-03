import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Mod from './modal_component';
import {Button, Icon} from 'metro-ui-components';
import axios from 'axios';

class ServiceFormatter extends React.Component {
  render() {
    return (
      <input type='checkbox' checked={ this.props.isService } readOnly/>
    );
  }
}

class PrintFormatter extends React.Component {
  render() {
    return (
      <input type='checkbox' checked={ this.props.isParcelPrint } readOnly/>
    );
  }
}

class WithoutGRFormatter extends React.Component {
  render() {
    return (
      <input type='checkbox' checked={ this.props.isWithoutGoodsReceiving } readOnly/>
    );
  }
}

function serviceFormatter(cell, row) {
    return (
      <ServiceFormatter isService={ cell } />
    );
};

function printFormatter(cell, row) {
  return (
    <PrintFormatter isParcelPrint={ cell } />
  );
};

function withoutGRFormatter(cell, row) {
  return (
    <WithoutGRFormatter isWithoutGoodsReceiving={ cell } />
  );
};

function renderShowsTotal(start, to, total) {
  return (
    <p style={ { color: '#444444' } }>
      Showing records from { start } to { to } out of { total }
    </p>
  );
};

class DepartmentsTable extends React.Component {
  constructor(props) {
    super(props);
    this.row = "";
    this.isSelect = false;
    this.state = { 
      show: false,
      data: "",
      btn: "",
      departments: []
    };
    
    this.handleModal = this.handleModal.bind( this );
  }

  getDepartments() {
    axios.get("http://localhost:3000/items/")
  //axios.get("http://localhost:8080/ords/ms0866501ded/mw560f01/block/department/")

      .then((response)=>{
        // console.log(response);
        this.setState({
          departments: response.data
        })
    })
      .catch( (error) => console.log(error) )
  }

  componentDidMount(){
    this.getDepartments();
  }
  
  handleInsertButtonClick = () => {
    let prevState = this.state.show;
    this.setState({
      show: !prevState,
      data: this.row,
      btn: "Insert",
    })
  };

  handleEditButtonClick = () => {
    if (this.isSelect){
      let prevState = this.state.show;
      this.setState({
        show: !prevState,
        data: this.row,
        btn: "Edit",
      })
    }
  };

  handleModal() {
    let prevState = this.state.show;

    this.setState({
      show: !prevState,
    });
    console.log( 'getDep - handleModal ');
    this.getDepartments();

  }

  createCustomButtonGroup = () => {
    return (
      <div className="row">
        <div className="col-md-3">
          <Button 
            kind="ghost"  
            block
            onClick={this.handleInsertButtonClick}>
            <Icon type="add" />
              Add department
          </Button>
        </div>
        <div className="col-md-3">  
          <Button 
            kind="ghost"
            block
            disabled={ !this.isSelect ? true : false }
            onClick={this.handleEditButtonClick}>
            <Icon type="edit" />
              Edit department 
          </Button>
        </div>  
      </div>
    );
  };

  onRowClick = (row, isSelect) => {
    this.row = row;
    this.isSelect = isSelect;
  };

  render() {

    const options = {
        page: 1,  // which page you want to show as default
        sizePerPageList: [ {
          text: '5', value: 5
        }, {
          text: '10', value: 10
        }, {
          text: '15', value: 15
        }
        // {
        //  text: 'All', value: articleArray.length
        // }
        ], // you can change the dropdown list for size per page
        sizePerPage: 10,  // which size per page you want to locate as default
        pageStartIndex: 1, // where to start counting the pages
        paginationSize: 5,  // the pagination bar size.
        prePage: 'Prev', // Previous page button text
        nextPage: 'Next', // Next page button text
        firstPage: 'First', // First page button text
        lastPage: 'Last', // Last page button text
        paginationShowsTotal: renderShowsTotal,  // Accept bool or function
        paginationPosition: 'bottom',  // default is bottom, top and both is all available
        hideSizePerPage: false, // > You can hide the dropdown for sizePerPage
        alwaysShowAllBtns: true, // Always show next and previous button
        // afterInsertRow: onAfterInsertRow,
        btnGroup: this.createCustomButtonGroup,
        // withFirstAndLast: false > Hide the going to First and Last page button
      };

    const selectRowProp = {
      hideSelectColumn: true,  // enable hide selection column.
      mode: 'radio', //unique selection
      clickToSelect: true,  // enable click to select
      bgColor: '#e6f0ff', //bg color
      onSelect: this.onRowClick
      };

    return (

      <div className="col-md-11">

        <BootstrapTable
            data                = { this.state.departments }
            pagination          = { true }
            options             = { options }
            striped
            hover
            className = "table-condensed"
            search={ true }
            searchPlaceholder={'Search by department description...'}
            selectRow={ selectRowProp }
            >

            <TableHeaderColumn dataField='department_number' width="100" isKey={ true } dataSort={ true } searchable={ false }>Dept. no.</TableHeaderColumn>
            <TableHeaderColumn dataField='department_description' width="60%" dataSort={ true }>Department</TableHeaderColumn>
            <TableHeaderColumn dataField='is_service' width="10%" dataFormat={ serviceFormatter } searchable={ false }>Service</TableHeaderColumn>
            <TableHeaderColumn dataField='is_package_print' width="10%" dataFormat={ printFormatter } searchable={ false }>Print</TableHeaderColumn>
            <TableHeaderColumn dataField='is_without_gr' width="10%" dataFormat={ withoutGRFormatter } searchable={ false }>Without GR</TableHeaderColumn>               
            
        </BootstrapTable>

        <Mod 
          show={this.state.show} 
          data={this.state.data} 
          btn={this.state.btn} 
          handler={this.handleModal} />

      </div>

  )
  };
}


export default DepartmentsTable