import axios from "axios";
import { useEffect, useState } from "react";


function Converter() {
  const [currencyFirst, setCurrencyFirst] = useState('');
  const [currencySecond, setCurrencySecond] = useState('');
  const [actualValue, setActualValue] = useState(1);
  const [convertedValue, setConvertedValue] = useState('');
  const [currencyList, setCurrencyList] = useState([{id: '', currency: ''}]);
  const [buttonState, setButtonState] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get('https://api.frankfurter.app/currencies').then(res => {
        const currencies = res.data;
        const currArr = Object.keys(currencies).map(id => {
          return {
            id: id,
            currency: currencies[id] 
          }
        });
        setCurrencyList(currArr);
      })
    }
    fetchData();
  }, []);

  useEffect(() => {
    const reg = /^\d+$/;
    if (currencyFirst === '' || currencySecond === '') {
      setButtonState(true);
    }
    else if (currencyFirst === currencySecond){
      setButtonState(true);
    }
    else if (!reg.test(actualValue)){
      setButtonState(true);
    }
    else if (actualValue < 1){
      setButtonState(true);
    }
    else {
      setButtonState(false);
    }
  }, [currencyFirst, currencySecond, actualValue]);

  const options = () => (
    currencyList.map(curr => (
      <option value={curr.id} key={curr.id}>{curr.currency}</option>
    ))
  );

  const convertBtn = (e) => {
    e.preventDefault();
    const fetchData = async () => {
      await axios.get(`https://api.frankfurter.app/latest?amount=${actualValue}&from=${currencyFirst}&to=${currencySecond}`)
      .then(res => {
        const val = res.data.rates[currencySecond];
        setConvertedValue(val);
      });
    };
    fetchData();
  };

  return (
    <>
      <div className="row">
        <div className="col">
          <select className="form-select m-2" value={currencyFirst} onChange={e => setCurrencyFirst(e.target.value)}>
            <option value="">Select currency</option>
            {options()}
          </select>
          <input type="text" className="form-control m-2" value={actualValue} onChange={e => setActualValue(e.target.value)}/>
        </div>
        <div className="col">
          <select className="form-select m-2" value={currencySecond} onChange={e => setCurrencySecond(e.target.value)}>
            <option value="">Select currency</option>
            {options()}
          </select>
          <input type="text" className="form-control m-2" value={convertedValue} disabled />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button className="btn btn-dark m-2" onClick={convertBtn} disabled={buttonState}>Convert</button>
        </div>
      </div>
    </>
  );
}

export default Converter;