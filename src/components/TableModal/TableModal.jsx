import React from 'react'

const TableModal = ({ setView, MobalData, title }) => {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="d-flex justify-content-between">
        <h4 className='text-center'>{title}</h4>
          <button className='close-btn' onClick={() => setView(false)}>x</button>
         
        </div>

   
        <table className="table-my table-bordered table-striped v-align mt-3">
                    <thead className="thead-dark">
                        <tr>

                            
                            <th className='w-25'>Particular </th>
                            <th className='w-75'>Value</th>
                          

                         
                        </tr>
                    </thead>

                    <tbody>
                    {Object.keys(MobalData).filter(ele=>ele!="userId").map((ele, i) => {
                            return (
                                <tr className='' key={i} color="info">
                                    <td className='text-capitalize'>{ele} :- </td>
                                    <td>{MobalData[ele] || ""}</td>
                                </tr>
                            )
                        }

                        )}
                    </tbody>

                </table>



      </div>
    </div>
  )
}

export default TableModal