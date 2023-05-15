import React from 'react';

const Table = () => {
  const numRows = 8;
  const numCols = 8;

  const renderTable = () => {
    const table = [];

    for (let i = 0; i < numRows; i++) {
      const row = [];
      for (let j = 0; j < numCols; j++) {
        row.push(<td key={j}></td>);
      }
      table.push(<tr key={i}>{row}</tr>);
    }

    return table;
  };

  return (
    <table>
      <tbody>
        {renderTable()}
      </tbody>
    </table>
  );
};

export default Table;
