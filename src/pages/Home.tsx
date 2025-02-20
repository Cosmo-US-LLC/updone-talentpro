import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import {
  decrement,
  increment,
  incrementByAmount,
} from '@/store/slice/counter';

function Home() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="min-h-screen w-full flex items-center justify-center gap-x-4">
      <button
        onClick={() => dispatch(decrement())}
        disabled={count === 0}
        className="bg-neutral-800 text-neutral-100 text-base px-2 py-1 rounded-md"
      >
        Decrement
      </button>
      <span className="text-neutral-900 text-base border border-neutral-800 rounded-md px-2 py-1">
        {count}
      </span>
      <button
        onClick={() => dispatch(increment())}
        className="bg-neutral-800 text-neutral-100 text-base px-2 py-1 rounded-md"
      >
        Increment
      </button>
      <button
        onClick={() => dispatch(incrementByAmount(10))}
        className="bg-neutral-800 text-neutral-100 text-base px-2 py-1 rounded-md"
      >
        Increment by Amount
      </button>
    </div>
  )
}

export default Home