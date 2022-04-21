import { useState, useEffect,useMemo } from 'react';
import axios from 'axios';
import testAudio from '../../sound/iphone-sms.mp3'

import useSWR from 'swr';
import './Secrtary.css'
import {IP} from '../../Config'
import VisitorsTable from './VisitorsTable';

let alertVisitors = []

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
    const audio = useMemo(()=>{
        return(new Audio(testAudio))
    },[])
    // const audio = new Audio(testAudio)

    useEffect(()=>{
        if(alertVisitors.length < visitorsCommand.length  ){
            // alert(visitors[visitors.length -1]?.name)
            // setPlayAudio(true)
            // document.body.addEventListener("mousemove", function () {
            //     audio.play()
            // })
            audio.play()
        }
        alertVisitors = visitorsCommand
    },[visitorsCommand,audio])

    const commandColor = (command)=>{
        if(command === 1) return "green";
        else if(command === 2) return "#F59006"
        return "red"
    }

    const buttonStyle = {
        color:"white",
        backgroundColor:"#f5806a",
        outline:"none",
        border:"none",
        padding:"10px",
        borderRadius:"8px",
        cursor:"pointer"
    }

    return (
        <div className="container">
            <div className="card" style={{marginBottom:"20px"}}>
                <div className="card-header" >
                    <h3>معلومات عن الزائر</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-4">
                            <div className="col">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="form3Example1">إسم الزائر</label>
                                <input required type="text" name="name" className="form-control" onChange={handleChange} value={state.name} />
                            </div>
                            </div>
                            <div className="col">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="form3Example2">الوظيفة</label>
                                <input required type="text" name="reason"  className="form-control"  onChange={handleChange} value={state.reason} />
                            </div>
                            </div>
                        </div>


                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form3Example3">سبب الزيارة</label>
                            <input type="text" name="notes"  className="form-control"  onChange={handleChange} value={state.notes} />
                        </div>


                        <div className="text-center">
                            <button type="submit" className="btn mb-4 btncolor" >إرسال إلى القائد</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="card">
                <div className="card-header" >
                    <h3>أوامر الدخول</h3>
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
                        {error ? <tr>حدث خطأ في استرجاع البيانات</tr> : null}
                            {visitorsCommand.map(visitor =>{
                                return(
                                    <tr key={visitor.id}>
                                        <td colSpan="2">{visitor.name}</td>
                                        <td colSpan="2"
                                        
                                        ><span style={{backgroundColor:commandColor(visitor.command),color:"white",fontWeight:900, fontSize:"15px", padding:"10px",borderRadius:"8px"}}>{visitor.command === 1? "سماح" : visitor.command === 2 ? "إنتظار" : "رفض" }</span></td>
                                        <td>
                                            <button style={buttonStyle} onClick={()=>deleteVisitor(visitor.id)}>مسح الطلب</button>
                                        </td>
                                    </tr>
                                )    
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <VisitorsTable />
        </div>
    )
}
