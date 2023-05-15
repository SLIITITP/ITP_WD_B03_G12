import React from 'react';

function Table() {
  const numRows = 8;
  const numCols = 8;

  const renderTable = () => {
    const table = [];

    // Create rows
    for (let i = 0; i < numRows; i++) {
      const row = [];

      // Create columns
      for (let j = 0; j < numCols; j++) {
        row.push(<div key={j} className="cell">{`Row ${i + 1}, Col ${j + 1}`}</div>);
      }

      // Add the row to the table
      table.push(<div key={i} className="row">{row}</div>);
    }

    return table;
  };

  return <div className="table">{renderTable()}</div>;
}

export default Table;
