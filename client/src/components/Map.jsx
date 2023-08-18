import { GoogleMap, useLoadScript, MarkerF, StreetViewService } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { useEffect } from "react";



export function MapAndSearch({setAddress, address, setSelected, selected}) {
  return (
    <div className="flex flex-col w-full gap-2">  
        <div className="places-container">
            <PlacesAutocomplete setSelected={setSelected} setAddress={setAddress} addressState={address}/>
        </div>
       <div className="h-60 w-full flex items-center justify-center">
        <GoogleMap
            zoom={18}
            center={selected}
            mapContainerClassName="map-container"

        >
            {selected && <MarkerF position={selected} />}
      </GoogleMap>
      </div>
    </div>
  );
}


export const PlacesAutocomplete = ({ setSelected,setAddress, addressState='',className="combobox-input input-area w-full", text="Search an address" }) => {
    
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();


  useEffect(()=>{
    if(ready&&addressState) {
      handleSelect(addressState)
    }
  },[ready, addressState])


  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    if(setAddress)setAddress(address)
    if(setSelected)setSelected({ lat, lng });
  };

  return (
    <div>
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          className={className}
          placeholder={text}
        />
        <ComboboxPopover className="dark:bg-bgDark rounded-2xl border-gray-500">
          <ComboboxList className="">
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} className="hover:dark:bg-darkPick dark:text-darkText my-2"/>
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};