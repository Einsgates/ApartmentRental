import React from 'react';
import PropTypes from 'prop-types';

function App({
  content,
  func=null
}) {
  const rows = [];
  var i = 0;
  content.forEach(el => {
    //跳转到search界面的时候，只展示2个房源
    if (i < 20) {
    const game = 
        <tr onClick={() => {func(el[0])}}>
          <font size="2">
          <tr>{<img src= {el[2]} height="100%" width= "100%" alt="Morning Dove" />}
          </tr>
          <tr>Street Address: {el[1]} | City: {el[6]}</tr>
          <tr>Roomtype: {el[3]} | NumberOfBedrooms: {el[4]} |  NumberOfBathrooms: {el[5]}</tr></font>
          <br></br>
          <br></br>
        </tr>;
    rows.push(game)
    i++;
    }
  });
  return (
    <table id="result-table">
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}
App.proptype = {
  content : PropTypes.array.isRequired
}
export default App;
