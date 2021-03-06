import { useState, useEffect,useMemo } from 'react';
import Nav from '../nav/Nav'
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
        job:'',
        reason:'',
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
        if (e.target.name.value === '' || e.target.job.value ===''){
            return false
        }else{
            axios.post('http://'+IP+'/api/secretary',{
                name: state.name,
                job: state.job,
                reason: state.reason,
            });
            setState({
                name: "",
                job: "",
                reason: "",
            });
        }
    }
    const handleChange = (e)=>{
        setState({
            ...state,
            [e.target.name] : e.target.value
        })
    }
    const deleteAllCommands = ()=>{
        axios.post('http://'+IP+'/api/deleteAllVisitorsCommand')
            setVisitorsCommand([])
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
        <>
            <Nav title='???????????????? ????????????'/>
            <div className="container">
                <div className="card" style={{marginBottom:"20px"}}>
                    <div className="card-header" >
                        <h3>?????????????? ???? ????????????</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row mb-4">
                                <div className="col">
                                <div className="form-outline">
                                    <label className="form-label" htmlFor="form3Example1">?????? ????????????</label>
                                    <input required type="text" name="name" className="form-control" onChange={handleChange} value={state.name} />
                                </div>
                                </div>
                                <div className="col">
                                <div className="form-outline">
                                    <label className="form-label" htmlFor="form3Example2">??????????????</label>
                                    <input required type="text" name="job"  className="form-control"  onChange={handleChange} value={state.job} />
                                </div>
                                </div>
                            </div>


                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="form3Example3">?????? ??????????????</label>
                                <input type="text" name="reason"  className="form-control"  onChange={handleChange} value={state.reason} />
                            </div>


                            <div className="text-center">
                                <button type="submit" className="btn mb-4 btncolor" >?????????? ?????? ????????????</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header commands-header d-flex justify-content-between">
                        <h3>?????????? ????????????</h3>
                        <button style={buttonStyle}
                            onClick={()=>{deleteAllCommands()}}
                        >?????? ????????</button>    
                    </div>
                    <div className="card-body">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th colSpan="2">?????? ????????????</th>
                                    <th colSpan="2">??????????</th>
                                    <th colSpan="2">?????? ?????? ????????????</th>
                                </tr>
                            </thead>
                            <tbody>
                            {error ? <tr>?????? ?????? ???? ?????????????? ????????????????</tr> : null}
                                {visitorsCommand.map(visitor =>{
                                    return(
                                        <tr key={visitor.id}>
                                            <td colSpan="2">{visitor.name}</td>
                                            <td colSpan="2"
                                            
                                            ><span style={{backgroundColor:commandColor(visitor.command),color:"white",fontWeight:900, fontSize:"15px", padding:"10px",borderRadius:"8px"}}>{visitor.command === 1? "????????" : visitor.command === 2 ? "????????????" : "??????" }</span></td>
                                            <td>
                                                <button style={buttonStyle} onClick={()=>deleteVisitor(visitor.id)}>?????? ??????????</button>
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
        </>
    )
}
