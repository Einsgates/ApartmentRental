import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Table } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { render } from "react-dom";

function Favorite() {
  const [state, setstate] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
	let token = localStorage.getItem("userToken");
	const config = {
		headers: { Authorization: `Bearer ${token}` }
	};
    await Axios.get("http://localhost:4000/api/favorites", config).then(
      res => {
		const temp = [];
		let i = 1;
		for (const [k,v] of Object.entries(res.data.data)){
			v['key'] = i;
			i +=1;
			temp.push(v);
		}
		console.log(temp)
        setloading(false);
        setstate(
          temp.map(row => ({
			imgSrc: row.imgSrc,
            streetAddress: row.streetAddress,
            numberOfBedrooms: row.numberOfBedrooms,
			numberOfBathrooms: row.numberOfBathrooms,
			price: row.price,
			homeType: row.homeType,
			city: row.city,
      _id: row._id
          }))
        );
      }
    );
  };

  const columns = [
	{

		render: (text, record) => {
		   return (
			<img src={record.imgSrc} width="120" height="100" />
		  );},
		  width: 200,
	}, 
    {
      title: "numberOfBedrooms",
      dataIndex: "numberOfBedrooms",
      width: 200
    },
	{
		title: "numberOfBathrooms",
		dataIndex: "numberOfBathrooms",
		width: 200
	  },
	  {
		title: "price",
		dataIndex: "price",
		width: 200
	  },
	  {
		title: "homeType",
		dataIndex: "homeType",
		width: 200
	  },
	  {
		title: "city",
		dataIndex: "city",
		width: 200
	  },
    {
      title: "streetAddress",
      dataIndex: "streetAddress",
      width: 200,
      render: (text, record) => <Link to={'/apartmentDetail/'+ record._id}>{text}</Link>
    },

  ];

  return (
    <div>
      {loading ? (
        "You are unauthorized to log in this page!"
      ) : (
        <Table
          columns={columns}
          dataSource={state}
          pagination={{ pageSize: 100 }}
          scroll={{ y: 850 }}
        />
      )}
    </div>
  );
}

export default Favorite;