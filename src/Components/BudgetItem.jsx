function BudgetItem({ payment_data }) {
  return (
    <div className="py-4 flex flex-col gap-3 h-full overflow-y-scroll">
      {payment_data.map((payment) => {
        const dueDate = new Date(payment.due_date);

        const paidDate = payment.payment_date
          ? new Date(payment.payment_date)
          : null;
        const isOverdue = dueDate < new Date();

        return (
          <div
            key={payment.id || payment.payment_name + payment.due_date}
            className="grid grid-cols-4 justify-items-center p-1 rounded-md hover:bg-gray-100 ease-in-out duration-300"
          >
            <a className="flex flex-col w-full">
              {payment.payment_name}
              <span className="text-sm text-gray-500">
                {payment.payment_category}
              </span>
            </a>

            <ul className="flex flex-col items-start w-full">
              <li
                className={`${
                  paidDate
                    ? 'bg-green-500'
                    : isOverdue
                    ? 'bg-red-500'
                    : 'bg-yellow-500'
                } text-white px-3 flex gap-1 items-center rounded-md`}
              >
                {paidDate ? 'Done' : isOverdue ? 'Overdue' : 'Due'}
                {/* {isOverdue ? 'Overdue' : 'Due'} */}
              </li>
              <span className="text-sm">
                Due Date: {dueDate.toDateString()}
              </span>
            </ul>

            <ul className="flex flex-col items-start w-full">
              <li className="bg-green-500 text-white px-3 flex gap-1 items-center rounded-md">
                {paidDate ? 'Paid' : 'Unpaid'}
              </li>
              <span className="text-sm text-gray-500">
                Paid on: {paidDate ? paidDate.toDateString() : '—'}
              </span>
            </ul>

            <ul className="flex flex-col items-start">
              <span className="font-semibold">{payment.amount}$</span>
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default BudgetItem;
