import React, { useState, useEffect } from 'react'
// import NumericInput from 'react-numeric-input'
import axios from 'axios'
import useSWR from 'swr'
import './Manager.css'


export default function Manager(){
    const [visitors, setVisitors] = useState([]);
    // const [waitTime, setWaitTime] = useState(0);
    const { data, error } = useSWR('http://127.0.0.1:8000/api/manager', (url) => axios(url).then(res => res.data))
    useEffect(()=>{
        if(data){
            setVisitors(data || [])
        }
    },[data])

    const deleteVisitor = (currentVisitor, bool)=>{
        if(!bool){
            axios.post('http://127.0.0.1:8000/api/deleteVisitor/'+currentVisitor.id)
            let updatedVisitors = visitors.filter(visitor =>{
                return visitor.id !== currentVisitor.id;
            });
            setVisitors(updatedVisitors)
            axios.post('http://127.0.0.1:8000/api/command_to_secrtary',{
                name: currentVisitor.name,
                command: bool
            })
        }else{
            axios.post('http://127.0.0.1:8000/api/deleteVisitor/'+currentVisitor.id)
            let updatedVisitors = visitors.filter(visitor =>{
                return visitor.id !== currentVisitor.id;
            });
            setVisitors(updatedVisitors)
            axios.post('http://127.0.0.1:8000/api/command_to_secrtary',{
                name: currentVisitor.name,
                command: bool
            })
        }
    }
    // const handleWaitTime = (e)=>{
    //     setWaitTime(e)
    // }
    // const style ={
    //     wrap: {
    //         background: '#E2E2E2',
    //         boxShadow: '0 0 1px 1px #fff inset, 1px 1px 5px -1px #000',
    //         padding: '2px 2.26ex 2px 2px',
    //         borderRadius: '6px 3px 3px 6px',
    //         fontSize: 15
    //     },
    //     input: {
    //         borderRadius: '4px 2px 2px 4px',
    //         color: 'black',
    //         padding: '0.1ex 1ex',
    //         border: '1px solid #ccc',
    //         marginRight: 4,
    //         display: 'block',
    //         fontWeight: 100,
    //         textShadow: '1px 1px 1px rgba(0, 0, 0, 0.1)'
    //     },
    //     'input:focus' : {
    //         border: '1px inset #69C',
    //         outline: 'none'
    //     },
    //     arrowUp: {
    //         borderBottomColor: '#435d7d'
    //     },
    //     arrowDown: {
    //         borderTopColor: '#435d7d'
    //     }
    // }
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
                                <th colSpan="2">سماح / رفض </th>
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
                                            <button onClick={()=>deleteVisitor(visitor,1)}>سماح</button>
                                            <button onClick={()=>deleteVisitor(visitor, 0)}>رفض</button>
                                            {/* <NumericInput onChange={handleWaitTime} value={waitTime} step={1} min={0} max={60} mobile={true} style ={style}/> */}
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
