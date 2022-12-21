export function ApartmentItem({data}) {
    return <a className="apartment-item" href={`/apartmentDetail/${data._id}`}>
        <img src={data.imgSrcs[0] || data.imgSrc} width="400" height="300" alt="" />
        <p>$ {data.price} / month</p>
        <p>{data.homeType} | {data.livingArea} sqft</p>
        <p>{data.numberOfBedrooms} beds | {data.numberOfBathrooms} baths |  </p>
        <p>{data.streetAddress}, {data.city}, {data.zipcode} </p>
        <p>Year Built: {data.yearBuilt} </p>
    </a>
}
