import React, { useState, useEffect } from 'react'
import axios from 'axios'
import useSWR from 'swr'
import './Manager.css'


export default function Manager(){
    const [visitors, setVisitors] = useState([]);
    const { data, error } = useSWR('http://127.0.0.1:8000/api/manager', (url) => axios(url).then(res => res.data))
    useEffect(()=>{
        if(data){
            setVisitors(data || [])
        }
        // console.log(visitors)
    },[data])
    
    return (
        <div className="container" >
            <div className="table-responsive">
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row">
                            <div className="col-sm-6">
                                <h2>الزائريين</h2>
                            </div>
                        </div>
                    </div>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th colSpan="2">إسم الزائر</th>
                                <th>سبب الزيارة</th>
                                <th>ملاحظات</th>
                                <th colSpan="2">سماح / رفض</th>
                            </tr>
                        </thead>
                        <tbody>
                            {error ? <tr>content not relod</tr> : null}
                            {visitors.map(visitor =>{
                                return(
                                    <tr key={visitor.id}>
                                        <td colSpan="2">{visitor.name}</td>
                                        <td>{visitor.reason}</td>
                                        <td>{visitor.notes}</td>
                                        <td colSpan="2">
                                            {/* <a  className="edit"><i className="fa fa-check"></i></a>
                                            <a  className="delete" ><i className="fa fa-times"></i></a> */}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
