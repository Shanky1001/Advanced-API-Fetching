import './App.css';
import '@shopify/polaris/build/esm/styles.css';
import { Page, Select } from '@shopify/polaris';
import { useEffect, useLayoutEffect, useState } from 'react';


function App() {

  // API's
  const API_1 = 'https://multi-account.sellernext.com/home/public/connector/profile/getAllCategory/';

  const API_2 = 'https://multi-account.sellernext.com/home/public/connector/profile/getCategoryAttributes/';

  // // To show the position in selected categories and subcategories
  // const [position, setPosition] = useState('Categories');

  // // To be passed as params in api
  const [selected, setSelected] = useState([]);

  // // To set results
  const [result, setResult] = useState([])

  const [form, setForm] = useState(null)

  const [options, setOptions] = useState([])

  const [valueCat] = useState([])


  useLayoutEffect(() => {
    var flag = true;

    // Function for API calling
    const getData = async (API) => {
      await fetch(API, {
        method: 'POST',
        headers:
        {
          Accept: "application/json",
          "Content-Type": "application/json",
          appTag: "amazon_sales_channel",
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjI5MGRiYjIzOGUyOWExYjIzMzYwY2E5Iiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjk2NTY4MDE3LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzM2U1ZjUxYWRkZGFlMjIyNjczN2E5MiJ9.m5LW1XQ_w6E8Y_ZAWV-SqoqLUpgyeQXe3R7aGKhCfkxA0h0i2oESFxS3NXvsqU2zBWO9iPa5vobjXypZCEo7ZbjieaowfryVym-Yc2Kc-SkfHJfr7a2QrXxfKql0nBX0SvgEfVdWKxmVb3AK7MyT60gVUCCh82H7ExXntXA46oTvIQkK2rMTC1pCAFxFcWPTUEvz2yfuyLf62533dDfbdWwnYBxOYXrTUBN9E6aOsbl8MDfglV7bRIiKCXF1hTRjyOzUzqp_Tns4kg3oT2zXKpv7mLFcPpEPnYveRP4TGi_N5gRjfyA4o7xAxTHIxmhlRrY7ZEFUx-BcW6aZz7tYNw`,
          "Ced-Source-Id": 500,
          "Ced-Source-Name": "shopify",
          "Ced-Target-Id": 530,
          "Ced-Target-Name": "amazon"
        },
        body: JSON.stringify({
          target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
          user_id: "63329d7f0451c074aa0e15a8",
          target: {
            marketplace: "amazon",
            shopId: "530"
          },
          selected: { ...selected }
        })
      })
        .then(response => response.json())
        .then(result => {
          flag ? setResult(result.data) : setForm(result.data);
          flag = result.data?.hasChildren;
        })
    }
    flag ? getData(API_1) : getData(API_2);

  }, [selected])


  // use effect to set options for each select
  useEffect(() => {
    setOptions([...options, { index: option }])
  }, [result])


  // Options making from fetched data 
  let option = result.length !== 0 ? result.map((val) => ({
    label: val.name, value: val.name
  })) : { label: "Nothing", value: "1" };

  
  // Function to handle Changes
  const handleChange = (value) => {
    result.forEach((val) => {
      if (val.name.toLowerCase() === value.toLowerCase()) {
        setSelected(val.parent_id);
        valueCat.push(value)
      } else {

      }
    })
    
  }


  return (
    <div className="App">
      <Page title={''}>
        {options.map((val, index) => {
          if (index > 0)
            return (
              <div key={index}>
              <Select  options={val.index} value={valueCat[index-1]} onChange={(value) => handleChange(value)} />
              <br/>
              </div>
            )
        })}
      </Page>
    </div>
  );
}

export default App;
