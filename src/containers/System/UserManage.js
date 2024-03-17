import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers } from '../../services/userService';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {
        let response = await getAllUsers('ALL');
        // console.log('get all users', response);
        if (response && response.errCode === 0) {
            this.setState({
                arrUser: response.users
            })
        }
    }


    render() {
        let arrUser = this.state.arrUser;
        return (
            <div className='user-container'>
                <div className="text-center">Manage users with hundoo</div>
                <div className='user-table mt-3 mx-1'>
                    <table>
                        <tr>
                            <th>Email</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Adress</th>
                            <th>Action</th>
                        </tr>
                            {arrUser && arrUser.map((item,index) => {
                                return (
                                    <tr className='divClass'>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button>Edit</button>
                                            <button>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}
                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
