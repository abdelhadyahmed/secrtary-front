import { useState, useEffect } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import './Secrtary.css'
import {IP} from '../../Config'

export default function Secrtary(){
    const [state, setState] = useState({
        name:'',
        reason:'',
        notes:''
    });
    const [visitorsCommand, setVisitorsCommand] = useState([]);
    const { data, error } = useSWR('http://'+IP+'/api/getVisitorsCommand', (url) => axios(url).then(res => res.data), { refreshInterval: 1 })
    useEffect(()=>{
        if(data){
            setVisitorsCommand(data || [])
        }
     },[data])
    const handleSubmit = (e)=>{
        e.preventDefault();
        if (e.target.name.value === '' || e.target.reason.value ===''){
            return false
        }else{
            axios.post('http://'+IP+'/api/secretary',{
                name: state.name,
                reason: state.reason,
                notes: state.notes
            });
            setState({
                name: "",
                reason: "",
                notes: ""
            });
        }
    }
    const handleChange = (e)=>{
        setState({
            ...state,
            [e.target.name] : e.target.value
        })
    }
    const deleteVisitor = (id)=>{
        axios.post('http://'+IP+'/api/deleteVisitorCommand/'+id)
            let updatedVisitors = visitorsCommand.filter(visitor =>{
                return visitor.id !== id;
            });
            setVisitorsCommand(updatedVisitors)
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-header" >
                    <h3>  معلومات عن <b>الزائر</b></h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-4">
                            <div className="col">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="form3Example1">إسم الزائر</label>
                                <input  type="text" name="name" className="form-control" onChange={handleChange} value={state.name} />
                            </div>
                            </div>
                            <div className="col">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="form3Example2">سبب الزيارة</label>
                                <input type="text" name="reason"  className="form-control"  onChange={handleChange} value={state.reason} />
                            </div>
                            </div>
                        </div>


                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form3Example3">ملاحظات</label>
                            <input type="text" name="notes"  className="form-control"  onChange={handleChange} value={state.notes} />
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
                            {error ? <tr>content not relod</tr> : null}
                            {visitorsCommand.map(visitor =>{
                                return(
                                    <tr key={visitor.id}>
                                        <td colSpan="2">{visitor.name}</td>
                                        <td colSpan="2">{visitor.command === 1? "سماح" : visitor.command === 2 ? "إنتظار" : "رفض" }</td>
                                        <td>
                                            <button onClick={()=>deleteVisitor(visitor.id)}>مسح الطلب</button>
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
