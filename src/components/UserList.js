import React from "react";

const API = "http://85.93.97.170:7000/lemon/users/";

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersData: [],
      expandedRows: [],
      isLoading: false,
    };
  }

  fetchUser(user) {
    fetch(API + user._id)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong ...");
        }
      })
      .then((data) => {
        /*    const index = this.state.usersData.findIndex(
            (user) => user.id === user.id
          ),
          usersData = [...this.state.usersData]; 
        usersData[index] = data;*/
        console.log(data);
        this.setState({
          usersData: [...this.state.usersData, data],
        });
      })
      .catch((error) => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch(API)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong ...");
        }
      })
      //.then((data) => this.setState({ usersData: data.data, isLoading: false }))
      .then((originData) =>
        Object.keys(originData.data).map((user, index) => {
          this.fetchUser(originData.data[user]);
        })
      )
      .catch((error) => this.setState({ error, isLoading: false }));
  }

  handleRowClick(rowId) {
    const currentExpandedRows = this.state.expandedRows;
    const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

    const newExpandedRows = isRowCurrentlyExpanded
      ? currentExpandedRows.filter((id) => id !== rowId)
      : currentExpandedRows.concat(rowId);

    this.setState({ expandedRows: newExpandedRows });
  }

  renderItem(item) {
    const clickCallback = () => this.handleRowClick(item._id);
    const itemRows = [
      <tr onClick={clickCallback} key={"row-data-" + item._id}>
        <td>
          <img src={item.avatar} width="50" height="60" />
        </td>
        <td>{item.first_name}</td>
        <td>{item.last_name}</td>
      </tr>,
    ];

    if (this.state.expandedRows.includes(item._id)) {
      itemRows.push(
        <tr key={"row-expanded-" + item._id}>
          <td>
            <img src={item.avatar} width="50" height="60" />
          </td>
          <td>{item.first_name}</td>
          <td>{item.last_name}</td>
          <td>{item._id}</td>
          <td>{item.email}</td>
          <td>{item.company[0].country}</td>
          <td>{item.company[0].name}</td>
          <td>{item.company[0].location[0].lat}</td>
          <td>{item.company[0].location[0].long}</td>
        </tr>
      );
    }

    return itemRows;
  }

  render() {
    let allItemRows = [];

    let userData = this.state.usersData;
    Object.keys(userData).map((user, index) => {
      const perItemRows = this.renderItem(userData[user]);
      allItemRows = allItemRows.concat(perItemRows);
    });

    return (
      <div>
        <table>
          <tbody>{allItemRows}</tbody>
        </table>
      </div>
    );
  }
}
export default UserList;
