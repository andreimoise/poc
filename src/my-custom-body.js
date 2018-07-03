import React from 'react'
import { Button, Icon, Checkbox } from 'metro-ui-components';
import DepartmentsApi from './departments_api';

export default class MyCustomBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      department_number: "",
      department_description: "",
      is_service:false,
      is_package_print: false,
      is_without_gr: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleExit = this.handleExit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleInsert = this.handleInsert.bind(this);

  }
/*eslint no-useless-concat: "off"*/
  handleSave(event) {
    event.preventDefault();

    const payload = {
      department_number: this.state.department_number,
      department_description: this.state.department_description,
      is_service: this.state.is_service ? 1 : 0,
      is_package_print: this.state.is_package_print ? 1 : 0,
      is_without_gr: this.state.is_without_gr ? 1 : 0
    };
    console.log( 'axios.call with payload: ', payload );

    DepartmentsApi.updateDepartment( payload );

    this.handleExit();

  }

  handleDelete(event) {
    event.preventDefault();

    const payload = {
      department_number: this.state.department_number
    }
    console.log( 'axios.call for delete with dep_no: ', this.state.department_number );
    
    DepartmentsApi.deleteDepartment( payload );

    this.handleExit();
  }

  handleInsert(event) {
    event.preventDefault();

    const payload = {
      department_number: this.state.department_number,
      department_description: this.state.department_description,
      is_service: this.state.is_service ? 1 : 0,
      is_package_print: this.state.is_package_print ? 1 : 0,
      is_without_gr: this.state.is_without_gr ? 1 : 0
    };
    console.log( 'axios.call with payload: ', payload );

    DepartmentsApi.insertDepartment( payload );

    this.handleExit();
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleExit = () => {
    this.setState( {
      department_number: "",
      department_description: "",
      is_service: false,
      is_package_print: false,
      is_without_gr: false,
    });

    this.props.handler()
  }

  componentWillReceiveProps(nextProps) {
    // console.log( nextProps );
    if (nextProps !== this.state && nextProps.btn !== "Insert" ) {
      this.setState( {
        department_number: nextProps.data.department_number,
        department_description: nextProps.data.department_description,
        is_service: nextProps.data.is_service > 0 ? true : false,
        is_package_print: nextProps.data.is_package_print > 0 ? true : false,
        is_without_gr: nextProps.data.is_without_gr > 0 ? true : false
      })
    } else {
      this.setState( {
        department_number: "",
        department_description: "",
        is_service: false,
        is_package_print: false,
        is_without_gr: false,
      });
    }
  }

  render() {
    const btn = this.props.btn;

    if(btn === "Insert") {
      return(
        <form>
          <div className='modal-body'>
            <h2 style={ { color: '#007bff' } }>{btn}</h2>
            <div className='form-group'>
            <label> Dept. no. </label>
              <input ref={ "department_number" } name={"department_number"} type='number' placeholder={ "Dept. no." } className="form-control " value={this.state.department_number} onChange={ this.handleChange }/>
            </div>
            <div className='form-group'>
              <label> Department </label>
              <input ref={ "department_description" } name={"department_description"} type='text' placeholder={ "Department" } className="form-control " value={this.state.department_description} onChange={ this.handleChange }/>
            </div>
            <div className='form-group'>
              <label> Service </label>
              <Checkbox
                name="is_service"
                checked={ this.state.is_service }
                disabled={ false }
                onChange={ this.handleChange }
              />
              </div>
            <div className='form-group'>
              <label> Print </label>
              <Checkbox
                name="is_package_print"
                checked={this.state.is_package_print }
                disabled={ false }
                onChange={ this.handleChange }
              />
              </div>
            <div className='form-group'>
              <label> Without GR </label>
              <Checkbox
                name="is_without_gr"
                checked={this.state.is_without_gr }
                disabled={ false }
                onChange={ this.handleChange }
              />
            </div>
            <div className="modal-footer" >
                <Button 
                  kind="ghost"  
                  block
                  onClick={this.handleExit}>
                    Close
                </Button>
                <Button 
                  kind="ghost"  
                  block
                  disabled = { this.state.department_number && this.state.department_description ? false : true }
                  onClick={this.handleInsert}>
                  <Icon type="add" />
                    Add department
                </Button>
            </div>           
          </div>
        </form>
      );
    } else if(btn === "Edit") {
      return(
        <form >
          <div className='modal-body'>
          <h2 style={ { color: '#007bff' } }>{btn}</h2>
          <div className='form-group'>
          <label> Dept. no. </label>
            <input ref={ "department_number" } name={"department_number"} type='text' placeholder={ "Dept. no." } className="form-control " value={this.props.data.department_number} readOnly/>
          </div>
          <div className='form-group'>
            <label> Department </label>
            <input ref={ "department_description" } name={"department_description"} type='text' placeholder={ "Department" } className="form-control " value={this.state.department_description} onChange={ this.handleChange }/>
          </div>
          <div className='form-group'>
            <label> Service </label>
            <Checkbox
              name="is_service"
              checked={ this.state.is_service }
              disabled={false}
              onChange={ this.handleChange }
            />
            </div>
          <div className='form-group'>
            <label> Print </label>
            <Checkbox
              name="is_package_print"
              checked={ this.state.is_package_print }
              disabled={false}
              onChange={ this.handleChange }
            />
            </div>
          <div className='form-group'>
            <label> Without GR </label>
            <Checkbox
              name="is_without_gr"
              checked={ this.state.is_without_gr }
              disabled={false}
              onChange={ this.handleChange }
            />
          </div>
          <div className="modal-footer" style={{ justifyContent: "space-between" }}>
            <Button 
              kind="ghostWarning"  
              block
              onClick={this.handleDelete}>
              <Icon type="trash" />
                Delete
            </Button>
            <Button 
              kind="ghost"  
              block
              onClick={this.handleExit}>
                Close
            </Button>
            <Button 
              kind="ghost"  
              block
              disabled = { this.state.department_number && this.state.department_description ? false : true }
              onClick={this.handleSave}>
              <Icon type="check" />
                Save
            </Button>
          </div>
        </div>
      </form>
      );
    } else {
      return(
      <button type="button" className="btn btn-primary" onClick={this.handleExit} style={{ marginLeft: "12px" }}>
        Save
      </button>
      );
    }
  }
}