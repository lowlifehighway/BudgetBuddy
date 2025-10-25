import { useState } from 'react';
import { FilterAdd, SearchNormal } from 'iconsax-reactjs';
import BudgetItem from '../Components/BudgetItem';
import InputData from './InputData';

function Main({
  layout,
  paymentData,
  topOfListRef,
  search,
  setSearch,
  activeStatus,
  setActiveStatus,
}) {
  const [inputDataVisible, setInputDataVisible] = useState(false);
  function inputData(e) {
    e.preventDefault();
    inputDataVisible ? setInputDataVisible(false) : setInputDataVisible(true);
  }

  let TotalPayableAmount = 1500.0;
  let Currency = 'USD';

  return (
    <main
      className="h-screen order-2 px-8 pt-20 "
      style={{ paddingTop: layout.topPad }}
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl">Budget Tracker</h1>
        <a
          className="px-4 py-2 bg-secondary text-white font-semibold"
          onClick={(e) => {
            inputData(e);
          }}
        >
          + Input Data
        </a>
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[rgba(0,0,0,0.75)] w-full h-full flex items-center justify-center z-1 backdrop-blur-sm ${
            inputDataVisible ? '' : 'hidden'
          }`}
        >
          <InputData inputData={inputData} />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <ul className="flex items-center gap-2 font-medium">
          <li
            className={` ${
              activeStatus === 'All'
                ? 'status-tabs-active'
                : 'status-tabs-inactive'
            }`}
            onClick={() => setActiveStatus('All')}
          >
            All
          </li>
          <li
            className={` ${
              activeStatus === 'Paid'
                ? 'status-tabs-active'
                : 'status-tabs-inactive'
            }`}
            onClick={() => setActiveStatus('paid')}
          >
            Paid
          </li>
          <li
            className={` ${
              activeStatus === 'Unpaid'
                ? 'status-tabs-active'
                : 'status-tabs-inactive'
            }`}
            onClick={() => setActiveStatus('unpaid')}
          >
            Unpaid
          </li>
        </ul>
        <span>
          Budget: {TotalPayableAmount.toFixed(2)} {Currency}
        </span>
      </div>
      <hr />
      <div className="flex gap-4 mr-2 mt-2">
        <a className="flex border-black py-1 px-2 border rounded-sm gap-2 ">
          <FilterAdd />
          Filter
        </a>
        <a className="flex gap-3 items-center border rounded-sm p-1">
          <SearchNormal />
          <input
            type="text"
            placeholder="search by payment name"
            className="outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </a>
      </div>
      <ul className="grid grid-cols-4 justify-items-center font-medium">
        <li>Payment Name</li>
        <li>User Status</li>
        <li>Payment Status</li>
        <li>Amount</li>
      </ul>
      <hr ref={topOfListRef} />
      <div style={{ height: layout.listHeight }}>
        <BudgetItem payment_data={paymentData} />
      </div>
    </main>
  );
}
export default Main;
