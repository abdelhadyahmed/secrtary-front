import React, { useState, useEffect,useMemo } from 'react'
import testAudio from '../../sound/test.wav'
// import useSound from 'use-sound';
// import boopSfx from '../../sounds/boop.mp3';
import axios from 'axios'
import useSWR from 'swr'
import './Manager.css'
import {IP} from '../../Config'

let alertVisitors = []

export default function Manager(){
    // const [playAudio, setPlayAudio] = useState(false)
    const [visitors, setVisitors] = useState([]);
    const [boolCommand, setBoolCommand] =useState(0);
    const { data, error } = useSWR('http://'+IP+'/api/manager', (url) => axios(url).then(res => res.data), { refreshInterval: 1 });
    useEffect(()=>{
        if(data){
            setVisitors(data || [])
        }
    },[data])

    
    const audio = useMemo(()=>{
        return(new Audio(testAudio))
    },[])

    // useEffect(() => {
    //     if (!audio) return;
    //     playAudio ? audio.play() : audio.pause();
    //   }, [playAudio, audio]);
    // const audio = new Audio(testAudio)

    useEffect(()=>{
        if(alertVisitors.length < visitors.length  ){
            // alert(visitors[visitors.length -1]?.name)
            // setPlayAudio(true)
            audio.play()
        }
        alertVisitors = visitors
    },[visitors,audio])

    const deleteVisitor = (currentVisitor, bool)=>{
        if(bool === 0){
            setBoolCommand(bool + currentVisitor.id)
            axios.post('http://'+IP+'/api/deleteVisitor/'+currentVisitor.id)
            let updatedVisitors = visitors.filter(visitor =>{
                return visitor.id !== currentVisitor.id;
            });
            setVisitors(updatedVisitors)
            axios.post('http://'+IP+'/api/command_to_secrtary',{
                name: currentVisitor.name,
                command: bool
            })
        }else if(bool === 1){
            setBoolCommand(bool + currentVisitor.id)
            axios.post('http://'+IP+'/api/deleteVisitor/'+currentVisitor.id)
            let updatedVisitors = visitors.filter(visitor =>{
                return visitor.id !== currentVisitor.id;
            });
            setVisitors(updatedVisitors)
            axios.post('http://'+IP+'/api/command_to_secrtary',{
                name: currentVisitor.name,
                command: bool
            })
        }else if (bool === 2){
            setBoolCommand(bool + currentVisitor.id)
            axios.post('http://'+IP+'/api/command_to_secrtary',{
                name: currentVisitor.name,
                command: bool
            })
        }
    }
    
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
                                            <button onClick={()=>deleteVisitor(visitor, 2)}>انتظار</button>
                                            {boolCommand === 2 + visitor.id ? <p>هذه الزيارة في حالة انتظار</p> : null}
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
