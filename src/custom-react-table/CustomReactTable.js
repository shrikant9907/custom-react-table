import React from 'react';
import "./CustomReactTable.css";

function CustomReactTable(props) {

  const handleUpdates = (e, id, action) => {
    props.actions.update(e, id, action);
  }

  return (
    <div className="custom-react-table-ui">

      {/* Heading */}
      { 
        (props.tableHeading !== '') && 
        <h3 className="crtui-heading">
          { props.tableHeading }
        </h3>
      }

      <table>
        {/* Table Header */}
        { (props.hideTableHead !== false) &&
          <thead>
            <tr>
              { 
                props.tableColumns.length > 0 && props.tableColumns.map((col, coli) => (
                  <th key={ coli }>{ col.label }</th>
                ))
              }
            </tr>
          </thead>
        }
        
        {/* Table Body */}
        <tbody>
        { 
            props.tableData.length > 0 ? props.tableData.map((row, idx) => (              
              <tr key={row.id}>
                {
                  props.tableColumns.map((col, i) => {
                    return (
                      col.name === 'actions' ?
                      <td key={i}>
                        {
                          props.actions.allowDelete === true && 
                          <button type="button" onClick={(e) => handleUpdates(e, row.id, 'delete')}>
                            Delete
                          </button>                      
                        }
                        {
                          props.actions.allowEdit === true && 
                          <button type="button" onClick={(e) => handleUpdates(e, row.id, 'edit')}>
                            Edit
                          </button>                      
                        }
                      </td>
                      : 
                      <td key={i}>
                        {row[col.name]}
                      </td>
                    )
                  })
                }
              </tr>
            ))
            :
            <tr className="nodatafound"><td colSpan={props.tableColumns.length} className="text-danger">No data found</td></tr>
          }
          {
            props.actions.allowAdd === true && 
            <tr colSpan={props.tableColumns.length} >
              <td>
                <button type="button" onClick={(e) => handleUpdates(e, '', 'add')}>
                  Add
                </button>                      
              </td>
            </tr>
          }
        </tbody>

        {/* Table Footor */}
        { props.hideTableFoot !== 'false' &&
          <tfoot>
            <tr>
              { 
                props.tableColumns.length > 0 && props.tableColumns.map((col, coli) => (
                  <th key={ coli }>{ col.label }</th>
                ))
              }
            </tr>
          </tfoot>
        }
      </table>
    </div>
  )
}
export default CustomReactTable;