export const Square = ({children, isSelected, updatedBoard, index}) =>
{
  const className = `square ${isSelected ? 'is-selected' : ''}`
  
  const handleClick = () => {
    updatedBoard(index)
  }

  return (
    <div className={className} onClick={handleClick}>
        {children}
    </div>
  )
}