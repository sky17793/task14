import React, { Component } from "react";

export class Information extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUserDetails: {},
      FirstName: "",
      Email: "",
      number: "",
      leaveApplication: [],
      disabled: true,
    };
  }
  componentWillMount() {
    const { params } = this.props.match;
    const userId = params.id;
    console.log(userId);
    const details = JSON.parse(localStorage.getItem("UsersData"));
    details.map((user) => {
      if (userId == user.Email) {
        this.setState({
          currentUserDetails: user,
        });
      }
    });
    var leave_application_current_user = JSON.parse(
      localStorage.getItem("leaveApplication")
    );
    var arr = [];
    if (leave_application_current_user == null) {
      leave_application_current_user = [];
    } else {
      leave_application_current_user.map((application) => {
        if (userId == application.userId) {
          arr.push(application);
        }
      });
    }
    this.setState({
      leaveApplication: arr,
    });
  }

 

  EditApplication = (e) => {
    const editData = e.target.value;
    this.setState({
      unique_id: editData,
      disabled: !this.state.disabled,
    });
    let arr = JSON.parse(localStorage.getItem("leaveApplication"));
    for (var i = 0; i <= arr.length; i++) {
      if (arr[i].App_id == editData) {
        this.setState({
          from: arr[i].from,
          to: arr[i].to,
          index: i,
        });
        break;
      }
    }
  };
  renderingViewApplication = () => {
    return this.state.leaveApplication.map((application, index) => {
      const { App_id,Firstname,Email,number, status } = application;
      if (status == "Rejected" || status == "Approved") {
        var disabled = true;
      }
      return (
        <tr key={index}>
          <td> {Firstname}</td>
          <td> {Email}</td>
          <td> {number}</td>
          <td>
            <button
              className="btn btn-success"
              disabled={disabled}
              value={App_id}
              onClick={this.EditApplication}
            >
              {" "}
              Edit
            </button>
          </td>
         
        </tr>
      );
    });
  };

  onchange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  updateData = (e) => {
    var arr = JSON.parse(localStorage.getItem("leaveApplication"));

    // for (let i = 0; i < arr.length; i++) {
    //   if (arr[i].App_id == this.state.unique_id) {
    //     arr[i].from = this.state.from;
    //     arr[i].to = this.state.to;
    //     break;
    //   }
    // }

    var new_Arr = [];
    arr.map((a) => {
      if (a.userId == this.state.currentUserDetails.Email) {
        new_Arr.push(a);
      }
    });
    this.setState({
      leaveApplication: new_Arr,
      FirstName: "",
      Email: "",
      number: "",
    });
  };


  logOut = () => {
    this.props.history.push("/login");
  };
  render() {
    return (
      <div className="container">
        <h2> welcome {this.state.currentUserDetails.FirstName}</h2>
        <button
          type="button"
          onClick={this.logOut}
        >
          {" "}
          Sign Out
        </button>
    
        <center>
          <table className="table table-hover striped m-5" border="1">
            <tr>
            
              <th scope="col">name </th>
              <th scope="col">email</th>
              <th scope="col">number</th>
              
            </tr>
            {this.renderingViewApplication()}
          </table>
        </center>
      </div>
    );
  }
}

export default Information;
