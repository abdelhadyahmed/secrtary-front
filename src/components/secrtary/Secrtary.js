import axios from 'axios';
import React, { Component } from 'react'
import './Secrtary.css'

export default class Secrtary extends Component {
    state ={
        name:"",
        reason:"",
        notes: ""
    }
    handleSubmit = (e)=>{
        e.preventDefault();
        if (e.target.name.value === '' || e.target.reason.value ===''){
            return false
        }else{
            axios.post("http://127.0.0.1:8000/api/secretary",{
                name: this.state.name,
                reason: this.state.reason,
                notes: this.state.notes
            }).then()
            this.setState({
                name: "",
                reason: "",
                notes: ""
            })
        }
    }
    handleChange = (e)=>{
        this.setState({
            [e.target.id] : e.target.value
        })
    }
    render() {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header" >
                        <h3>  معلومات عن <b>الزائر</b></h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="row mb-4">
                                <div className="col">
                                <div className="form-outline">
                                    <label className="form-label" htmlFor="form3Example1">إسم الزائر</label>
                                    <input  type="text" id="name" className="form-control" onChange={this.handleChange} value={this.state.name} />
                                </div>
                                </div>
                                <div className="col">
                                <div className="form-outline">
                                    <label className="form-label" htmlFor="form3Example2">سبب الزيارة</label>
                                    <input type="text" id="reason"  className="form-control"  onChange={this.handleChange} value={this.state.reason} />
                                </div>
                                </div>
                            </div>


                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="form3Example3">ملاحظات</label>
                                <input type="text" id="notes"  className="form-control"  onChange={this.handleChange} value={this.state.notes} />
                            </div>


                            <div className="card-footer text-center">
                                <button type="submit" className="btn btn-primary mb-4" >إرسال إلى القائد</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" >
                        <h1>أوامر الدخول</h1>
                    </div>
                    <div className="card-body">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th colSpan="2">إسم الزائر</th>
                                    <th colSpan="2">الأمر</th>
                                    <th colSpan="2">مسح طلب الدخول</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan="2">أحمد محمد</td>
                                    <td colSpan="2">سماح أو رفض</td>
                                    <td colSpan="2"><a href="#deleteEmployeeModal" className="delete" data-toggle="modal"><i className="fa fa-times"></i></a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
