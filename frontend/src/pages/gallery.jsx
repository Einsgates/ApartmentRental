import './gallery.css';
import { useCallback, useEffect, useState } from 'react';
import { getApartment } from '../api';
import { FilterOptions } from '../components/filterOption';
import { ApartmentItem } from '../components/apartmentItem';

function App() {
    const [list, setList] = useState([])
    const [opt, setOpt] = useState({
        homeType: '',
        minPrice: '',
        maxPrice: '',
        minBedrooms: '',
        maxBedrooms: '',
        minBathrooms: '',
        maxBathrooms: '',
        minYearBuilt: '',
        maxYearBuilt: '',
        minArea: '',
        maxArea: '',
        hasHeating: '',
        hasPetsAllowed: '',
        addressKeyword: '',
        sort: '',
        isAscending: '',
    })


    const getApartmentWithOpt = useCallback((opt) => {
        getApartment(opt).then(res => {
            setList(res.data.data)
        }).catch(console.log)
    }, [])

    useEffect(() => {
        console.log('useEffect')
        getApartmentWithOpt(opt)
    }, [getApartmentWithOpt, opt])

    return (
        <div className="Gallery">
            <FilterOptions opt={opt} setOpt={setOpt} />
            <div className='d-flex'>
                {
                    list.map(item => <ApartmentItem data={item} key={item._id} />)
                }
            </div>

        </div>
    );
}

export default App;
