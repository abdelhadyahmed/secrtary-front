import React, { Component } from 'react'
import axios from 'axios'
import "./Blog.css"

export default class Blog extends Component {
    
    state={
        users: []
    }

    componentDidMount(){
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then(res => {
                this.setState({users:res.data})
            })
    }

    render() {
        return (
            <div>  
                <h2>Blogs</h2>
                <div>
                    {this.state.users.map(user => {
                        return(
                            <div key={user.id}>
                                <div className="content">
                                    <div>Name: {user.name}</div>
                                    <div>UserName: {user.username} </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        )
    }
}
