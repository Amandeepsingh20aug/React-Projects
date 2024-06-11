import {useState} from 'react'
import Cell from './component/Cell';

function App() {
  const [order, setOrder] = useState([]);
  const [isNotActive,setIsNotActive] = useState(false)
  const config = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];

  const setActiveIndex = (index) =>{
    const newOrder = [...order, index];
    setOrder(newOrder);
    if (newOrder.length === config.flat(1).filter(Boolean).length) {
      removeColor();
    }
  }

  const removeColor = () =>{
    setIsNotActive(true)
    const timer = setInterval(()=>{
      setOrder((val)=>{
        const newColor = [...val];
        newColor.pop();

        if(newColor.length === 0){
          clearInterval(timer);
          setIsNotActive(false);
        }

        return newColor
      })
    },300)
  }

  return (
    <div className="flex justify-center items-center flex-col gap-4">
      <div
        className="grid max-w-xs w-full p-5 gap-5 border border-black"
        style={{
          gridTemplateColumns: `repeat(${config[0].length}, 1fr)`,
        }}
      >
        {config.flat(1).map((val, index) => (
         val ? <Cell key={index} filled={order.includes(index)} onClick={()=>setActiveIndex(index)} 
           isDisabled={order.includes(index) || isNotActive}
         /> : <span key={index}
         />
        ))}
      </div>
    </div>
  );
}

export default App;
