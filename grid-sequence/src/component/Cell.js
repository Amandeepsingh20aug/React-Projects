import React from 'react'

const Cell = ({ filled, onClick,isDisabled }) => {
  return (
    <>
    <button
    disabled = {isDisabled}
      type="button"
      onClick={onClick}
      className={
        filled
          ? "bg-green-500 border border-black h-0 pb-[100%]"
          : "bg-transparent border border-black h-0 pb-[100%]"
      }
    />
    </>
  )
}

export default Cell