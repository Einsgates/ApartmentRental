export function FilterOptions({opt, setOpt}) {
    function selectBeds(event) {
        if (event.target.value) {
            const [minBedrooms, maxBedrooms] = event.target.value.split('-')
            setOpt({...opt, minBedrooms, maxBedrooms})
        } else {
            setOpt({...opt, minBedrooms:'', maxBedrooms: ''})

        }
    }
    function selectBath(event) {
        if (event.target.value) {
            const [minBathrooms, maxBathrooms] = event.target.value.split('-')
            setOpt({...opt, minBathrooms, maxBathrooms})
        } else {
            setOpt({...opt, minBathrooms: '', maxBathrooms: ''})

        }
    }
    // function selectYear(event) {
    //     if (event.target.value) {
    //         const [minYearBuilt, maxYearBuilt] = event.target.value.split('-')
    //         setOpt({...opt, minYearBuilt, maxYearBuilt})
    //     } else {
    //         setOpt({...opt, minYearBuilt: '', maxYearBuilt: ''})

    //     }
    // }
    return <div style={{ margin: 10 }}>
        <button className={`btn ${opt.homeType === '' ? 'actived' : ''}`} onClick={() => setOpt({...opt, homeType: '' })}>
            All
        </button>

        <button className={`btn ${opt.homeType === 'APARTMENT' ? 'actived' : ''}`} onClick={() => setOpt({...opt, homeType: 'APARTMENT' })}>
            Apartment
        </button>

        <button className={`btn ${opt.homeType === 'SINGLE_FAMILY' ? 'actived' : ''}`} onClick={() => setOpt({...opt, homeType: 'SINGLE_FAMILY' })}>
            SINGLE FAMILY
        </button>

        <select name="beds" id="beds" onChange={selectBeds}>
            <option value="">select beds</option>
            <option value="0-1">0-1</option>
            <option value="1-2">1-2</option>
            <option value="2-3">2-3</option>
            <option value="3-4">3-4</option>
            <option value="4-5">4-5</option>
        </select>
        <select name="bath" id="bath" onChange={selectBath}>
            <option value="">select bath rooms</option>
            <option value="0-1">0-1</option>
            <option value="1-2">1-2</option>
            <option value="2-3">2-3</option>
            <option value="3-4">3-4</option>
            <option value="4-5">4-5</option>
        </select>
        {/* <select name="year" id="year" onChange={selectYear}>
            <option value="">select year build</option>
            <option value="1900-1920">1900-1920</option>
            <option value="1920-1940">1920-1940</option>
            <option value="1940-1960">1940-1960</option>
            <option value="1960-1980">1960-1980</option>
            <option value="1980-2000">1980-2000</option>
            <option value="2000-2020">2000-2020</option>
        </select> */}
    </div>
}
