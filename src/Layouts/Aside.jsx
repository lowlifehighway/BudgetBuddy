import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import Chart from '../Components/Chart';

function Aside({ topPad, budget, paymentData, totalSpent }) {
  return (
    <aside
      className={`h-screen order-1 px-6 pb-10 bg-secondary grid grid-rows-2 gap-10 items-center`}
      style={{ paddingTop: topPad }}
    >
      <div className="h-full aspect-square mx-auto">
        <CircularProgressbar
          value={(totalSpent / budget) * 100}
          text={`${Math.round((totalSpent / budget) * 100)}%`}
          styles={buildStyles({
            strokeLinecap: 'butt',
            textColor: 'white',
            pathColor: '#c08ec5',
            trailColor: 'white',
            height: '100%',
          })}
        />
      </div>
      <div className="w-full h-full min-h-96 flex items-end">
        <Chart payment_data={paymentData} />
      </div>
    </aside>
  );
}
export default Aside;
