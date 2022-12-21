import requests
import time
import http.client
import urllib
import json

if __name__ == "__main__":
    zpids = []
    info = []
    for page in range(2, 21):
        params = {'location': 'champaign, il', 'status': 'forRent', 'page': page}
        headers = {
        'X-RapidAPI-Key': 'cfdad900b9mshbfc5b3be95ec186p123a51jsnc856506862e0',
        'X-RapidAPI-Host': 'zillow56.p.rapidapi.com'
        }
        response = requests.get("https://zillow56.p.rapidapi.com/search", params = params, headers=headers)
        data = response.json()

        for item in data['results']:
            zpids.append(item['zpid'])
            info.append(item['imgSrc'])
        time.sleep(0.5)
    baseurl = "localhost"
    port = 4000
    conn = http.client.HTTPConnection(baseurl, port)
    for i, zpid in enumerate(list(set(zpids))):
        params = {'zpid': str(zpid)}
        headers = {
            'X-RapidAPI-Key': 'cfdad900b9mshbfc5b3be95ec186p123a51jsnc856506862e0',
            'X-RapidAPI-Host': 'zillow56.p.rapidapi.com'
        }
        response = requests.get(
            'https://zillow56.p.rapidapi.com/property', params=params, headers=headers)
        data = response.json()
        new_params = {
            "streetAddress": data['streetAddress'] if ('streetAddress' in data) else "",
            "numberOfBathrooms": data['bathrooms'] if ('bathrooms' in data) else 1,
            "numberOfBedrooms": data['bedrooms'] if ('bedrooms' in data) else 1,
            "city": data['address']['city'] if ('address' in data) else 'Champaign',
            "zipcode": data['zipcode'] if ('zipcode' in data) else 51820,
            "latitude": data['latitude'],
            "longitude": data['longitude'],
            "homeType": data['homeType'] if ('homeType' in data) else 'condo',
            "imgSrc": info[i],
            "imgSrcs": [item['url'] for item in data["big"][:5]],
            "hasPetsAllowed": data['resoFacts']['hasPetsAllowed'] if ('hasPetsAllowed' in data['resoFacts']) else True,
            "price": data['price'] if ('price' in data) else 0,
            "livingArea": data['livingArea'] if ('livingArea' in data) else 0,
            "hasHeating": data['resoFacts']['hasHeating'] if ('hasHeating' in data['resoFacts']) else False,
            "description": data['description'],
            "yearBuilt": data['yearBuilt'],
            "appliances": data['resoFacts']['appliances'] if ('appliances' in data['resoFacts']) else [],
        }
        headers = {'Content-type': 'application/json'}
        conn.request("POST", "/api/apartments", json.dumps(new_params), headers)
        response = conn.getresponse()
        data = response.read()
        d = json.loads(data)
        time.sleep(0.5)
    conn.close()
