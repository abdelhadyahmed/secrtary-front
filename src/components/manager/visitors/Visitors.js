import React from 'react'

function Vistors(props) {
    return (
        <>
            {props.visitors.map(visitor =>{
                return(
                    <tr key={visitor.id}>
                        <td colSpan="2">{visitor.name}</td>
                        <td>{visitor.reason}</td>
                        <td>{visitor.notes}</td>
                        <td colSpan="2">
                            {/* <a href="" className="edit"><i className="fa fa-check"></i></a>
                            <a href="" className="delete" ><i className="fa fa-times"></i></a> */}
                        </td>
                    </tr>
                )
            })}
        </>
    )
}

export default Vistors
