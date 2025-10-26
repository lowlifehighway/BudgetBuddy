// import { useState } from 'react';
import api from '../api/axios';
// import axios from 'axios';
import Header from '../Layouts/Header';
import Main from '../Layouts/Main';
import Aside from '../Layouts/Aside';
import 'react-circular-progressbar/dist/styles.css';
import BudgetItem from '../Components/BudgetItem';
import { useEffect, useRef, useState } from 'react';

function App() {
  const topOfListRef = useRef(null);
  const headerRef = useRef(null);
  const [paymentData, setPaymentData] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [search, setSearch] = useState('');
  const [activeStatus, setActiveStatus] = useState('All');
  const [layout, setLayout] = useState({
    topPad: '0px',
    listHeight: '100vh',
  });
  const [userData, setUserData] = useState(null);

  // Data pull
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await api.get('/users/profile');
        setUserData(res.data.user);
      } catch (err) {
        console.error('Error fetching user profile:', err);
      }
    };
    const fetchPaymentData = async () => {
      try {
        const res = await api.get('/payments');

        const data = res.data;

        const total = data.reduce((acc, item) => acc + Number(item.amount), 0);
        setTotalSpent(total);
        setPaymentData(data);
      } catch (err) {
        console.error('Error fetching payments:', err);
      }
    };

    fetchUserProfile();
    fetchPaymentData();
  }, []);

  // function that actually updates layout {screen size and top padding}
  const updateLayout = () => {
    if (!headerRef.current || !topOfListRef.current) return;

    const headerHeight = headerRef.current.clientHeight + 16;
    const topOfList = topOfListRef.current.getBoundingClientRect().top;

    setLayout({
      topPad: `${headerHeight}px`,
      listHeight: `calc(${window.innerHeight - topOfList - headerHeight}px)`,
    });
  };

  // useEffect to adjust padding to fit header and screen size
  useEffect(() => {
    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  // for filtered payments
  const filteredPayments = paymentData
    .filter((item) =>
      item.payment_name?.toLowerCase().includes(search.toLowerCase())
    )
    .filter((item) => {
      if (activeStatus === 'All') return true;
      return item.payment_status === activeStatus;
    });

  let budget = 5000000.0;
  return (
    <>
      <div className="relative h-screen overflow-hidden cursor-default">
        <Header headerRef={headerRef} username={userData?.first_name} />
        <div className="grid grid-cols-[25%_75%]">
          <Main
            paymentData={filteredPayments}
            topOfListRef={topOfListRef}
            layout={layout}
            search={search}
            setSearch={setSearch}
            activeStatus={activeStatus}
            setActiveStatus={setActiveStatus}
          />
          <Aside
            topPad={layout.topPad}
            budget={budget}
            paymentData={filteredPayments}
            totalSpent={totalSpent}
          />
        </div>
      </div>
    </>
  );
}
export default App;
