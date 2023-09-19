import React from 'react'

const Test2 = () => {
  return (
    <form id='uploadForm' encType='multipart/form-data'>
        <input type="file" id='my-files' accept='image/*' multiple />
        <button>Submit</button>
    </form>
  )
}

export default Test2