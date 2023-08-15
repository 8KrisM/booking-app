import React from 'react'
import perks from '../constants/perks'

const Perks = ({selected, onChange}) => {

    const handleClick = (e) =>{
        const {checked, name} = e.target
        if(checked){
            onChange([...selected, name])
        }
        else{ 
            onChange([...selected.filter(selectedName => selectedName!== name)])
        }
    }

  return (
    <div className="grid mt-2 grid-cols-2 gap-1 md:grid-cols-4 lg:grid-cols-6">
        {perks.map((perk) =>(
            <label key={perk} className="perks-checkbox">
                <input type="checkbox" checked={selected.includes(perk)} name={perk} onChange={handleClick}/>
                <span>{perk}</span>
            </label>
        ))}
    </div>
  )
}

export default Perks