import React, { useState, useEffect } from 'react'
import axios from 'axios'
import useSWR from 'swr'
import '../manager/Manager.css'
import {IP} from '../../Config'

export default function VisitorsTable(){
    const [visitors, setVisitors] = useState([]);
    const { data, error } = useSWR('http://'+IP+'/api/manager', (url) => axios(url).then(res => res.data), { refreshInterval: 1 });
    useEffect(()=>{
        if(data){
            setVisitors(data || [])
        }
    },[data])

    return (        
        <div className="" >
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
                                <th>الوظيفة</th>
                                <th>سبب الزيارة</th>
                                <th colSpan="2">وقت الزيارة</th>
                            </tr>
                        </thead>
                        <tbody>
                            {error ? <tr>حدث خطأ في استرجاع البيانات</tr> : null}
                            {visitors.map(visitor =>{
                                
                                return(
                                    <tr key={visitor.id}>
                                        <td colSpan="2">{visitor.name}</td>
                                        <td>{visitor.job}</td>
                                        <td>{visitor.reason}</td>
                                        <td>{visitor.created_at}</td>
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
