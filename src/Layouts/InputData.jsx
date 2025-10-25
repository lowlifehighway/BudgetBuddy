import { CloseSquare } from 'iconsax-reactjs';
import api from '../api/axios';
import { useState } from 'react';

function InputData({ inputData }) {
  const [newPayment, setNewPayment] = useState({
    payment_name: '',
    payment_type: '',
    payment_category: '',
    amount: '',
    due_date: '',
  });

  // Handles input updates
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPayment((prev) => ({ ...prev, [name]: value }));
  };

  // Submit Form
  const inputFormData = async (e) => {
    e.preventDefault();
    try {
      // Send new payment to backend
      await api.post('/payments', newPayment);

      // Reset the form
      setNewPayment({
        payment_name: '',
        payment_type: '',
        payment_category: '',
        amount: '',
        due_date: '',
      });
      console.log('Payment added successfully!');
    } catch (err) {
      console.error('Error adding payment:', err.message);
      console.log('Failed to add payment');
    }
  };

  return (
    <>
      <div className="flex flex-col bg-primary px-12 py-8 rounded-2xl gap-4">
        <div className="flex justify-between">
          <span className="font-semibold text-lg mb-2">Add New Payment</span>
          <CloseSquare
            size={32}
            onClick={(e) => inputData(e)}
            className="cursor-pointer"
          />
        </div>

        <form
          onSubmit={inputFormData}
          className="flex flex-col gap-4 items-center"
        >
          <label className="flex gap-2">
            Payment Name
            <input
              name="payment_name"
              type="text"
              value={newPayment.payment_name}
              required
              className="border px-1 rounded-md"
              onChange={handleChange}
            />
          </label>

          <label className="flex gap-2">
            Payment Type
            <select
              name="payment_type"
              value={newPayment.payment_type}
              required
              className="border px-1 rounded-md"
              onChange={handleChange}
            >
              <option value="">Select type</option>
              <option value="recurring">Recurring</option>
              <option value="one-off">One-off</option>
            </select>
          </label>

          <label className="flex gap-2">
            Payment Category
            <select
              name="payment_category"
              value={newPayment.payment_category}
              required
              className="border px-1 rounded-md"
              onChange={handleChange}
            >
              <option value="">Select category</option>
              <option value="rent">Rent</option>
              <option value="subscription">Subscription</option>
              <option value="medical">Medical</option>
            </select>
          </label>

          <label className="flex gap-2">
            Amount
            <input
              name="amount"
              type="number"
              step="0.01"
              min="0"
              value={newPayment.amount}
              required
              className="border px-1 rounded-md"
              onChange={handleChange}
            />
          </label>

          <label className="flex gap-2">
            Due Date
            <input
              name="due_date"
              type="date"
              value={newPayment.due_date}
              required
              className="border px-1 rounded-md"
              onChange={handleChange}
            />
          </label>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md"
          >
            Add Payment
          </button>
        </form>
      </div>
    </>
  );
}

export default InputData;
