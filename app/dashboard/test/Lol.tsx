import React from 'react'
import ReactPDF from '@react-pdf/renderer';
import Test from './page';

const Lol = () => {
  return (
    <div>Lol</div>
  )
}

export default Lol
ReactPDF.renderToStream(<Test />);
