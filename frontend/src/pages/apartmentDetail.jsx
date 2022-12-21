import {useEffect, useState} from 'react';
import {getApartmentDetail} from '../api';
import {useParams} from 'react-router-dom';
import axios from "axios";

export function App() {
    const [data, setData] = useState(null)
    const [buttonText, setButtonText] = useState("save")
    let {id} = useParams();

    useEffect(() => {
        getApartmentDetail(id).then(res => {
            setData(res.data.data);
            const userToken = localStorage.getItem('userToken');
            console.log(userToken)
            axios.get('http://localhost:4000/api/favorites', {
                headers: {
                    'Authorization': 'Bearer ' + userToken,
                    "Content-Type": "application/json",
                },
            }).then(
                function (res) {
                    const isIncluded = res.data.data.map(x => x._id).includes(id);
                    console.log(res.data.data.map(x => x._id))
                    if (isIncluded) {
                        setButtonText('unsave')
                    } else {
                        setButtonText('save')
                    }
                }
            )
        })
    }, [id])

    if (!data) {
        return <div>loading...</div>
    }

    const save = async () => {
        const userToken = localStorage.getItem('userToken');
        if (buttonText === 'save') {
            axios.post('http://localhost:4000/api/favorites', {
                "apartmentId": id,
                'add': true,
            },{
                headers: {
                    'Authorization': 'Bearer ' + userToken,
                    "Content-Type": "application/json",
                },
            }).then(
                function(res){
                    console.log(res)
                }
            )
            setButtonText('unsave')
        } else {
            axios.post('http://localhost:4000/api/favorites', {
                "apartmentId": id,
                "add": false,
            },{
                headers: {
                    'Authorization': 'Bearer ' + userToken,
                    "Content-Type": "application/json",
                },
            }).then(
                function(res){
                    console.log(res)
                }
            )
            setButtonText('save')
        }
    }

    return <div className="detail">

        <div className="detail-img d-flex">
            {
                data.imgSrcs.map(item => <img key={item} src={item} width={280} height={210} style={{margin: 10}}
                                              alt=""/>)
            }
        </div>
        <div className="detail-desc">
            <div>{data.streetAddress}
                <button onClick={save}>
                    {buttonText}
                </button>
            </div>
            <div>
                <p>
                    <span>${data.price}/mo {data.numberOfBedrooms} bd | {data.numberOfBathrooms} ba | {data.livingArea} sqft</span>
                </p>
                <p>
                    {data.streetAddress} {data.city} {data.zipcode}
                </p>
                <p>
                    <button className="btn">Request a Tour</button>
                    <button className="btn">Apply now</button>
                </p>
            </div>
            <div>
                <p>Description</p>
                <p>{data.description}</p>
            </div>
        </div>
    </div>
}

export default App;